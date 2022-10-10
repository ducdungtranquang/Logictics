import { Table, Input } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { END_POINT } from "../../utils/constant";

function InventoryDetail() {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns2 = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Tiền phải thu",
      dataIndex: "cost",
      sorter: true,
    },
    {
      title: "Thời gian hàng đến",
      dataIndex: "time_in",
      sorter: true,
    },
    // {
    //     title: 'Thời gian phát hàng',
    //     dataIndex: 'fee',
    // },
    {
      title: "Bưu cục hàng đến",
      dataIndex: "warehouse_to",
    },
    {
      title: "Mã Bưu cục hàng đến",
      dataIndex: "warehouseCode_to",
    },
    // {
    //     title: 'Trọng lượng tính cước',
    //     dataIndex: 'weight_fee',
    // },
    // {
    //     title: 'Thời gian quét mã gỡ gói',
    //     dataIndex: 'seal-time',
    //     key: 'seal-time',
    // },
    // {
    //     title: '',
    //     dataIndex: "action",
    //     render: (_, record) => (
    //         <div className='flex flex-row gap-y-1 gap-x-3'>
    //             <button
    //                 className="flex items-baseline gap-x-1 hover:text-blue-600 "
    //             // onClick={() => handleClickEdit(record)}
    //             >
    //                 <AiFillEdit className='translate-y-[1px]' />Sửa
    //             </button >
    //         </div>
    //     )
    // }
    {
      title: "",
      dataIndex: "action",
      render: (a, record) => (
        <div className="flex flex-row gap-y-1 gap-x-3">
          <button
            className="flex items-baseline gap-x-1 hover:text-blue-600"
            // onClick={() => handleClickEdit(record)}
          >
            <AiFillEdit className="translate-y-[1px]" />
            Sửa
          </button>
          <button
            className="flex items-baseline gap-x-1 hover:text-red-600"
            // onClick={() => {
            //   setIsDeleteVisible(true);
            //   setIdCompare(record._id);
            //   setNameCompare(record.name);
            // }}
          >
            <AiOutlineDelete className="translate-y-[1px]" />
            Xóa
          </button>
        </div>
      ),
    },
  ];
  const data2 = [
    {
      key: 1,
      name:"quạt",
      cost: 200,
      time_in: "10:03",
      warehouse_to: "50 Thủ Đức",
      warehouseCode_to: "ABCD",
    },
    {
      key: 2,
      name:"PC",
      cost: 921,
      time_in: "08:03",
      warehouse_to: "50 Bình Thạnh",
      warehouseCode_to: "MAXX",
    },
  ];
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(`${END_POINT}/department`);
      setData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="text-2xl font-bold my-5">Chi nhánh 50 Tân Bình</div>
      <div className="flex justify-between mb-4">
        <Input.Search className="max-w-xl lg:w-[400px] mx-auto" placeholder="Search" />
      </div>
      <Table columns={columns2} dataSource={data2} pagination={true} scroll={{ x: 700 }} />
    </>
  );
}

export default InventoryDetail;
