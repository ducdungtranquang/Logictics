import { Table, Input } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { useState, useEffect } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { END_POINT } from "../../utils/constant";

function Inventory() {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 100,
  });
  const columns = [
    {
      title: "Mã chi nhánh",
      dataIndex: "_id",
    },
    {
      title: "Tên chi nhánh",
      dataIndex: "name",
    },
    {
      title: "Số sản phẩm tồn kho",
      dataIndex: "quantity",
    },
    // {
    //   title: "Trọng lượng tồn kho",
    //   dataIndex: "weight",
    // },
    // {
    //   title: "Vận phí tồn kho",
    //   dataIndex: "fee",
    // },
    // {
    //     title: 'COD tồn kho',
    //     dataIndex: 'cod',
    // },
    {
      title: "",
      dataIndex: "detail",
      key: "detail",
      render: (a,{_id}) => (
        <div
          // onClick={() => { setIsModalVisible(true) }}
          className="text-blue-700 cursor-pointer"
        >
          <Link to={_id}>Chi tiết</Link>
        </div>
      ),
    },
  ];
  const data2 = [
    {
      key: 1,
      warehouse_code: "ABCD",
      name: "50 Bình Thạnh",
      quantity: 3000,
      weight: "216",
      fee: 1300,
    },
    {
      key: 2,
      warehouse_code: "BCDE",
      name: "50 Tân Bình",
      quantity: 2102,
      weight: "400",
      fee: 2889,
    },
  ];
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(`${END_POINT}/warehouse`, {
        params: params,
      });
      const dataModify = response.data.warehouses.map((record) => ({
        ...record,
        // quantity: record?.inventory_product_shipments?.length,
        quantity:11
      }));
      setData(dataModify);
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
    fetchData({
      ...pagination,
      page: pagination.current - 1,
    });
  }, []);
  const handleTableChange = (newPagination, filters, sorter) => {
    const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
    fetchData({
      sortBy: sort,
      ...newPagination,
      page: newPagination.current - 1,
    });
  };
  return (
    <>
      <div className="flex justify-between mb-4">
        <Input.Search className="max-w-xl lg:w-[400px] mx-auto" placeholder="Search" />
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
    </>
  );
}

export default Inventory;
