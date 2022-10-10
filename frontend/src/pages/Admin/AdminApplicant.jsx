import { Table, Input } from "antd";
import { useState, useEffect, useContext } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmModal from "../../components/ConfirmModal";
import EditApplicant from "../../components/Admin/Applicant/EditApplicant";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import { MainContext } from "../../context/MainContext";

const dataFetch = [
  {
    name: {
      first: "Nguyen",
      last: "A",
    },
    date: "01/01/2021",
    department: "Kỹ thuật",
    job: "BA",
    location: "Hồ Chí Minh",
    status: "Duyệt",
  },
  {
    name: {
      first: "Tran",
      last: "B",
    },
    date: "05/02/2022",
    department: "Kỹ thuật",
    job: "QC",
    location: "Hà Nội",
    status: "Loại",
  },
  {
    name: {
      first: "Ho",
      last: "C",
    },
    date: "11/11/2021",
    department: "Kỹ thuật",
    job: "FED",
    location: "Hà Nội",
    status: "Đang đợi",
  },
];
function AdminApplicant() {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [valueCompare, setValueCompare] = useState("");
  const [idCompare, setIdCompare] = useState("");
  const [dataForEdit, setDataForEdit] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
    total: 15,
  });
  const [params, setParams] = useState({
    total: pagination.total,
    pageSize: pagination.pageSize,
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
      title: "Họ",
      dataIndex: "firstName",
      sorter: true,
    },
    {
      title: "Tên",
      dataIndex: "lastName",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Nguồn",
      dataIndex: "source",
    },
    {
      title: "Ngày nộp hồ sơ",
      dataIndex: "createAt",
      sorter: true,
      render: (a) => <div>{a?.split("T")[0]}</div>,
    },
    // {
    //   title: "Phòng ban",
    //   dataIndex: "department",
    //   filters: [
    //     {
    //       text: "Kĩ thuật",
    //       value: "technical",
    //     },
    //     {
    //       text: "Nhân sự",
    //       value: "human",
    //     },
    //   ],
    // },
    // {
    //   title: "Vị trí làm việc",
    //   dataIndex: "job",
    //   filters: [
    //     {
    //       text: "noname",
    //       value: "technical",
    //     },
    //     {
    //       text: "noname",
    //       value: "human",
    //     },
    //   ],
    // },
    // {
    //   title: "Địa điểm làm việc",
    //   dataIndex: "location",
    //   filters: [
    //     {
    //       text: "Hồ Chí Minh",
    //       value: "Hồ Chí Minh",
    //     },
    //     {
    //       text: "Hà Nội",
    //       value: "Hà Nội",
    //     },
    //   ],
    // },
    {
      title: "Trạng thái",
      dataIndex: "state",
      filters: [
        {
          text: "Đang đợi",
          value: "pending",
        },
        {
          text: "Duyệt",
          value: "approved",
        },
        {
          text: "Loại",
          value: "rejected",
        },
      ],
      onFilter: (value, record) => record.state === value,
      render: (state) => (
        <>
          {state === "approved" || state === "rejected" ? (
            state === "approved" ? (
              <div className="text-green-600 font-bold bg-green-200 text-center rounded-lg py-1">
                Duyệt
              </div>
            ) : (
              <div className="text-red-600 font-bold bg-red-200 text-center rounded-lg py-1">
                Loại
              </div>
            )
          ) : (
            <div className="text-yellow-600 font-bold bg-yellow-200 text-center rounded-lg py-1">
              Đang đợi
            </div>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex flex-row gap-y-1 gap-x-3">
          <button
            className="flex items-baseline gap-x-1 "
            onClick={() => handleClickEdit(record)}
          >
            <AiFillEdit className="translate-y-[1px]" />
            Sửa
          </button>
          <button
            className="flex items-baseline gap-x-1 "
            onClick={() => {
              setIsDeleteVisible(true);
              setIdCompare(record._id);
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
      const res = await axios.get(
        `${END_POINT}/admin/applicant`,
        {
          params,
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );

      setData(res.data.data);
      setLoading(false);
      setPagination({
        pageSize: params.pageSize,
        current: params.page + 1,
        total: params.total
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(params);
  }, [params]);
  const handleTableChange = (newPagination, filters, sorter) => {
    console.log(sorter)
    const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
    setParams({
      ...params,
      ...filters,
      sortBy: sort,
      ...newPagination,
      page: newPagination.current - 1,
    });
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
  const acceptDelete = async () => {
    // setLoading(true);
    setIsDisable(true);
    try {
      await axios.delete(`${END_POINT}/admin/applicant/${idCompare}`, {
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
  return (
    <div>
      <div className="flex justify-between mb-4">
        <span className="text-3xl font-bold uppercase">Ứng viên</span>

        <Input.Search
          className="w-1/3 lg:w-[400px]"
          placeholder="Search"
          onSearch={searchByKeyword}
        />
        <div className="w-[200px]"></div>
      </div>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      {/* phần Modal sửa xóa */}
      {isEditVisible && (
        <EditApplicant
          isVisible={isEditVisible}
          onClose={() => setIsEditVisible(false)}
          disable={isDisable}
          data={dataForEdit}
          refetchData={() => fetchData(params)}
        />
      )}
      <ConfirmModal
        isVisible={isDeleteVisible}
        text={`xóa ứng viên`}
        onClose={() => setIsDeleteVisible(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />
    </div>
  );
}

export default AdminApplicant;
