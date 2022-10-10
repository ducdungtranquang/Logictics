import { useContext, useEffect, useState } from "react";
import { Table, Input } from "antd";
import axios from "axios";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

const data2 = [
  {
    createAt: "2022-04-02",
    license_plate: "52K-22222",
    car_type: "10 ton",
    description: "Sửa ABC XYZ",
    cost: 100_000,
  },
  {
    createAt: "2022-08-11",
    license_plate: "52K-33333",
    car_type: "8 ton",
    description: "Bảo trì ABC XYZ",
    cost: 2_300_000,
  },
];
function Maintenance() {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState(data2);
  const columns = [
    {
      title: "Ngày",
      dataIndex: "createAt",
      sorter: true,
      render: (a) => <div>{a?.split("T")[0]}</div>,
    },
    {
      title: "Biển số",
      dataIndex: "license_plate",
      sorter: true,
    },
    {
      title: "Loại xe",
      dataIndex: "car_type",
    },
    {
      title: "Nội dung",
      dataIndex: "description",
    },
    {
      title: "Chi phí (VNĐ)",
      dataIndex: "cost",
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "state",
    //   filters: [
    //     {
    //       text: "Đang mở",
    //       value: "Đang mở",
    //     },
    //     {
    //       text: "Đã đóng",
    //       value: "Đã đóng",
    //     },
    //   ],
    //   render: (state) => (
    //     <>
    //       {state === "Đang mở" ? (
    //         <div className="text-green-600 font-bold bg-green-200 text-center rounded-lg py-1">
    //           Đang mở
    //         </div>
    //       ) : (
    //         <div className="text-red-600 font-bold bg-red-300 text-center rounded-lg py-1">
    //           Đã đóng
    //         </div>
    //       )}
    //     </>
    //   ),
    // },
    // {
    //   title: "",
    //   dataIndex: "action",
    //   render: (a, record) => (
    //     <div className="flex flex-row gap-y-1 gap-x-3">
    //       <button
    //         className="flex items-baseline gap-x-1 hover:text-blue-600"
    //         onClick={() => handleClickEdit(record)}
    //       >
    //         <AiFillEdit className="translate-y-[1px]" />
    //         Sửa
    //       </button>
    //       <button
    //         className="flex items-baseline gap-x-1 hover:text-red-600"
    //         onClick={() => {
    //           setIsDeleteVisible(true);
    //           setIdCompare(record._id);
    //           setNameCompare(record.name);
    //         }}
    //       >
    //         <AiOutlineDelete className="translate-y-[1px]" />
    //         Xóa
    //       </button>
    //     </div>
    //   ),
    // },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${END_POINT}/admin/carFleet/car/63034deea9ed067de9573463`,
          {
            headers: { authorization: `Bearer ${accessToken}` },
            params:{plate:"palte"}
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <span className="text-3xl font-bold uppercase">
        Quản lý chi phí đội xe
      </span>
      <div className="flex justify-center items-center my-5">
        <Input.Search
          className="w-1/3 lg:w-[400px]"
          placeholder="Nhập từ khóa"
          //   onSearch={searchByKeyword}
        />
        {/* <button
            className="px-5 py-2 border border-neutral-800 text-center hover:bg-slate-300"
          className="lg:w-[200px]"
            onClick={() => setIsAddVisible(true)}
        >
          + Thêm mới
        </button> */}
      </div>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={data}
        // pagination={pagination}
        // loading={loading}
        // onChange={handleTableChange}
        scroll={{ x: 700 }}
      />
    </>
  );
}

export default Maintenance;
