import { Table, Input } from "antd";
import {useContext, useEffect, useState } from "react";
import AddNewCareer from "../../components/Admin/Career/AddNewCareer";
import EditCareer from "../../components/Admin/Career/EditCareer";
import ConfirmModal from "../../components/ConfirmModal";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { END_POINT } from "../../utils/constant";
import axios from "axios";
import { MainContext } from "../../context/MainContext";
function AdminCareer() {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 15,
  });
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [idCompare, setIdCompare] = useState("");
  const [nameCompare, setNameCompare] = useState("");
  const [dataForEdit, setDataForEdit] = useState({});
  const [params, setParams] = useState({
    total:pagination.total,
    pageSize:pagination.pageSize,
    page: pagination.current - 1,
    keyword: null,
    sortBy: null,
    name: null,
    department: null,
    type: null,
    location: null,
    state: null,
  });
  const columns = [
    {
      title: "Tên việc làm",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Hạn nộp hồ sơ",
      dataIndex: "deadline",
      sorter: true,
      render: (a) => <div>{a?.split("T")[0]}</div>,
    },
    // {
    //   title: "Phòng ban",
    //   dataIndex: "department",
    //   filters: [
    //     {
    //       text: "Kĩ thuật",
    //       value: "Kĩ thuật",
    //     },
    //     {
    //       text: "Nhân sự",
    //       value: "Nhân sự",
    //     },
    //   ],
    //   onFilter: (value, record) => record.department === value,
    // },
    {
      title: "Loại công việc",
      dataIndex: "type",
      filters: [
        {
          text: "technical",
          value: "technical",
        },
        {
          text: "human",
          value: "human",
        },
      ],
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Địa điểm làm việc",
      dataIndex: "location",
      filters: [
        {
          text: "Hồ Chí Minh",
          value: "HCM",
        },
        {
          text: "Hà Nội",
          value: "HN",
        },
      ],
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      filters: [
        {
          text: "Đang mở",
          value: "Đang mở",
        },
        {
          text: "Đã đóng",
          value: "Đã đóng",
        },
      ],
      render: (state) => (
        <>
          {state === "Đang mở" ? (
            <div className="text-green-600 font-bold bg-green-200 text-center rounded-lg py-1">
              Đang mở
            </div>
          ) : (
            <div className="text-red-600 font-bold bg-red-300 text-center rounded-lg py-1">
              Đã đóng
            </div>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (a, record) => (
        <div className="flex flex-row gap-y-1 gap-x-3">
          <button
            className="flex items-baseline gap-x-1 hover:text-blue-600"
            onClick={() => handleClickEdit(record)}
          >
            <AiFillEdit className="translate-y-[1px]" />
            Sửa
          </button>
          <button
            className="flex items-baseline gap-x-1 hover:text-red-600"
            onClick={() => {
              setIsDeleteVisible(true);
              setIdCompare(record._id);
              setNameCompare(record.name);
            }}
          >
            <AiOutlineDelete className="translate-y-[1px]" />
            Xóa
          </button>
        </div>
      ),
    },
  ];
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(`${END_POINT}/career`, {
        params
      });
      setData(response.data.career);
      setLoading(false);
      setPagination({
        pageSize: params.pageSize,
        current: params.page + 1,
        total: response.data.length,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData(params);
  }, [params]);
  const handleTableChange = (newPagination, filters, sorter) => {
    const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
    setParams({
      ...params,
      ...filters,
      sortBy: sort,
      ...newPagination,
      page: newPagination.current - 1,
    });
  };
  const acceptDelete = async () => {
    // setLoading(true);
    setIsDisable(true);
    try {
      await axios.delete(`${END_POINT}/admin/career/${idCompare}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      // setIsDisable(false);
      fetchData({ ...pagination, page: pagination.current - 1 });
      setIsDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickEdit = (record) => {
    setIsEditVisible(true);
    setDataForEdit(record);
  };
  const searchByKeyword = (value) => {
    setParams({
      ...params,
      page: 0,
      keyword: value,
    });
  };
  return (
    <>
      <div className="flex justify-between mb-4">
        <span className="text-3xl font-bold uppercase">Việc làm</span>

        <Input.Search
          className="w-1/3 lg:w-[400px]"
          placeholder="Nhập từ khóa"
          onSearch={searchByKeyword}
        />
        <button
          className="px-5 py-2 border border-neutral-800 text-center hover:bg-slate-300"
          onClick={() => setIsAddVisible(true)}
        >
          + Thêm mới
        </button>
      </div>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 700 }}
      />
      {isAddVisible && (
        <AddNewCareer
          onClose={() => setIsAddVisible(false)}
          refetchData={() => fetchData(params)}
        />
      )}
      {isEditVisible && (
        <EditCareer
          onClose={() => setIsEditVisible(false)}
          data={dataForEdit}
          refetchData={() => fetchData(params)}
        />
      )}
      <ConfirmModal //Modal delete career
        isVisible={isDeleteVisible}
        text={`xóa Công việc ${nameCompare}`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />
    </>
  );
}

export default AdminCareer;
