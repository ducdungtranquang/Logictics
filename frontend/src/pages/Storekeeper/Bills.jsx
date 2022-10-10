import { Table, Input } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState, useContext } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import BillDetail from "./BillDetail";
import EditStatus from "./EditStatus";
import { MainContext } from "../../context/MainContext";
function Bills() {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState([]);
  const [dataRecord, setDataRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const columns2 = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
    },
    {
      title: "Thời gian cập nhật lần cuối",
      dataIndex: "updateAt",
      sorter: true,
      render: (a) => <div>{a?.split("T")[0]}</div>,
    },
    {
      title: "Thời gian Tạo",
      dataIndex: "createAt",
      sorter: true,
      render: (a) => <div>{a?.split("T")[0]}</div>,
    },
    // {
    //   title: "Driver",
    //   dataIndex: "driver",
    // },
    // {
    //   title: "Bưu cục đi",
    //   dataIndex: "origin",
    // },
    // {
    //   title: "Bưu cục đến",
    //   dataIndex: "destination",
    // },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Đang chờ",
          value: "waiting",
        },
        {
          text: "Đang giao hàng",
          value: "procesing",
        },
        {
          text: "Đã hoàn thành",
          value: "completed",
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <>
          {status === "completed" || status === "processing" ? (
            status === "completed" ? (
              <div className="text-green-600 font-bold bg-green-200 text-center rounded-lg py-1">
                Hoàn thành
              </div>
            ) : (
              <div className="text-yellow-600 font-bold bg-yellow-200 text-center rounded-lg py-1">
                Đang giao
              </div>
            )
          ) : (
            <div className="text-gray-600 font-bold bg-gray-200 text-center rounded-lg py-1">
              Đang đợi
            </div>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      render: (a, record) => (
        <div
          onClick={() => {
            setIsDetailVisible(true);
            setDataRecord(record);
            console.log(record);
          }}
          className="text-blue-700 cursor-pointer"
        >
          Chi tiết
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex flex-row gap-y-1 gap-x-3">
          <button
            className="flex items-baseline gap-x-1 hover:text-blue-600 "
            onClick={() => {
              setIsEditVisible(true);
              setDataRecord(record);
            }}
          >
            <AiFillEdit className="translate-y-[1px]" />
            Sửa
          </button>
          {/* <button
                        className="flex items-baseline gap-x-1 hover:text-red-600"
                        onClick={() => {
                            setIsDeleteVisible(true)
                            setValueCompare(record.name)
                        }}
                    >
                        <AiOutlineDelete className='translate-y-[1px]' />Xóa
                    </button> */}
        </div>
      ),
    },
  ];
  const data2 = [
    {
      key: 1,
      status: "waiting",
      code_bill: "MXJJA0",
      updateAt: "14/02/22",
      time: "19:03",
      detail: "Chi tiết",
    },
    {
      key: 2,
      status: "completed",
      code_bill: "MXJJB3",
      updateAt: "10/11/22",
      time: "17:03",
      detail: "Chi tiết",
    },
    {
      key: 3,
      status: "processing",
      code_bill: "MXJJB3",
      updateAt: "10/11/22",
      time: "17:03",
      detail: "Chi tiết",
    },
  ];
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(`${END_POINT}/admin/bill`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setData(response.data.bills);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-between mb-4">
        <Input.Search className="max-w-xl lg:w-[400px] mx-auto" placeholder="Search" />
      </div>
      <Table
        rowKey={(record) => record._id}
        columns={columns2}
        dataSource={data}
        pagination={true}
        loading={loading}
        scroll={{ x: 700 }}
      />
      {isDetailVisible && (
        <BillDetail onClose={() => setIsDetailVisible(false)} dataForFetch={dataRecord} />
      )}

      {isEditVisible && <EditStatus onClose={() => setIsEditVisible(false)} data={dataRecord} />}
    </>
  );
}

export default Bills;
