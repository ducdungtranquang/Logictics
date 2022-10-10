import { Table, Input } from "antd";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { END_POINT } from "../../utils/constant";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AddDepartment from "../../components/Admin/Department/AddDepartment";
import EditDepartment from "../../components/Admin/Department/EditDepartment";
import ConfirmModal from "../../components/ConfirmModal";
import { MainContext } from "../../context/MainContext";

function AdminDepartment() {
  const columns = [
    {
      title: "Tên phòng ban",
      dataIndex: "name",
      sorter: true
    },
    // {
    //   title: "Trưởng ban",
    //   dataIndex: "director",
    //   sorter: true
    // },
    // {
    //     title: 'Vị trí',
    //     dataIndex: 'location',
    // },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Địa điểm làm việc",
      dataIndex: "location",
      filters: [
        {
          text: "HN",
          value: "HN",
        },
        {
          text: "HCM",
          value: "HCM",
        },
      ],
    },
    {
      title: "Số lượng nhân viên",
      dataIndex: "scale",
      sorter: (a, b) => {
        if (a.scale < b.scale) return -1;
        if (a.scale > b.scale) return 1;
      },
    },
    {
      title: "",
      width: 160,
      dataIndex: "action",
      render: (a, record) => (
        <div className="flex flex-row gap-y-1 gap-x-3 justify-around">
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
              setValueCompare(record._id);
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
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
    total: 15,
  });
  const [params, setParams] = useState({
    ...pagination,
    page: pagination.current - 1,
    keyword: null,
    sortBy: null,
  });
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [IdCompare, setValueCompare] = useState("");
  const [nameCompare, setNameCompare] = useState("");
  const [dataForEdit, setDataForEdit] = useState({});
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(`${END_POINT}/department`, {
        params: params,
      });
      setData(response.data.department);
      setLoading(false);
      setPagination({
        total: params?.total,
        pageSize: params?.pageSize,
        current: params?.page + 1,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchData(params);
  }, [params]);
  const acceptDelete = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      await axios.delete(`${END_POINT}/admin/department/${IdCompare}`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      fetchData({ ...pagination, page: pagination.current - 1 });
      setIsDisable(false);
      setIsDeleteVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickEdit = (record) => {
    setIsEditVisible(true);
    const [dataEdit] = data.filter((ele) => ele.name === record.name);
    setDataForEdit(dataEdit);
  };
  const searchByKeyword = (value) => {
    setParams({
      ...params,
      page:0,
      keyword:value
    })
  };
  const handleTableChange = (newPagination, filters, sorter) => {
    const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
    setParams({
      ...params,
      sortBy: sort,
      ...newPagination,
      page: newPagination.current - 1,
    });
  };
  return (
    <div>
      <div className="flex justify-between mb-4">
        <span className="text-3xl font-bold uppercase">Phòng ban</span>
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
      />
      {isAddVisible && (
        <AddDepartment
          onClose={() => setIsAddVisible(false)}
          refetchData={()=>fetchData(params)}
        />
      )}
      {isEditVisible && (
        <EditDepartment
          onClose={() => setIsEditVisible(false)}
          data={dataForEdit}
          refetchData={()=>fetchData(params)}
        />
      )}
      <ConfirmModal //Modal delete department
        isVisible={isDeleteVisible}
        text={`xóa Phòng ban ${nameCompare}`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />
    </div>
  );
}

export default AdminDepartment;
