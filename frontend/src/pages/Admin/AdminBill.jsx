import React, { useState, useRef, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { Button, Input, Table, Space, DatePicker, Form, InputNumber, Select } from "antd";
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ConfirmModal from '../../components/ConfirmModal';
import EditBill from '../../components/Admin/Bill/EditBill';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'
import { MainContext } from '../../context/MainContext';
import AddNewBill from '../../components/Admin/Bill/AddNewBill';
import AddProductShipment from '../../components/Admin/Bill/AddProductShipment';
import { END_POINT } from "../../utils/constant";
import { TOKEN } from "./adminToken";
import axios from 'axios';

export default function AdminBill() {
  const { accessToken } = useContext(MainContext)
  const [idItem, setId] = useState()

  const [dataEdit, setDataEdit] = useState()
  const [openEdit, setOpenEdit] = useState(false)

  const [openDel, setOpenDel] = useState(false)

  const [openShipment,setOpenShipment] = useState(false)

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false)
  const [open, setOpen] = useState(false);
  const api = `${END_POINT}/admin/bill`
  const [data, setData] = useState([
    {
      service: "123456bna2",
      road: "1237hf7y784",
      car: "713948hdsf7",
      driver: "sdfh361813",
      product_shipments: [
        "123687vgqwds",
        "13789adhagad"
      ],
      status: "waiting",
      actual_fuel: 120,
      theoretical_fuel: 150
    },
  ])


  // ____
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const getDataFromApi = async () => {
    try {
      const res = await axios({
        url: api,
        method: "get",
        headers: { authorization: `Bearer ${accessToken}` },
      })
      setData(res.data.data.bills);
    }
    catch (e) {
      console.log(e);
    }
  }

  const postData = async (data) => {
    try {
      const res = await axios({
        url: `${api}/create`,
        method: "post",
        data: data,
        headers: { authorization: `Bearer ${accessToken}` },
      })
    }
    catch (e) {
      console.log(e);
    }
  }

  const editData = async (data, id) => {
    try {
      const res = await axios({
        url: `${api}/${id}`,
        method: "put",
        headers: { authorization: `Bearer ${accessToken}` },
        data: data,
      })
      console.log(data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const postProductShipment = async (data, id) => {
    const res = await axios({
      url: `${api}/product_shipments/${id}`,
      method: "post",
      headers: { authorization: `Bearer ${accessToken}` },
      data: data,
    })
  }

  const delData = async (id) => {
    try {
      const res = await axios({
        url: `${api}/${id}`,
        method: "delete",
        headers: { authorization: `Bearer ${accessToken}` },
      })
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getDataFromApi()
  }, [])

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handledit = (e, id) => {
    const oldData = data.filter(e => e._id === id);
    console.log(oldData);
    setDataEdit(oldData[0]);
    setId(id)
    setOpenEdit(true);
  }

  const handleditShpment = (e, id) => {
    const oldData = data.filter(e => e._id === id);
    console.log(oldData);
    setDataEdit(oldData[0]);
    setId(id)
    setOpenShipment(true);
  }

  const handleDel = (e, id) => {
    setId(id)
    setOpenDel(true)
    console.log(idItem);
  }


  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });




  const columns = [
    {
      title: "Thiết bị",
      dataIndex: "service",
      key: "service",
      width: 100,
      onFilter: (value, record) => record.service.indexOf(value) === 0,
      sorter: (a, b) => a.service.length - b.service.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('service'),
    },
    {
      title: "Đường đi",
      dataIndex: "road",
      key: "road",
      width: 100,
      onFilter: (value, record) => record.road.indexOf(value) === 0,
      sorter: (a, b) => a.road.length - b.road.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('road'),
    },
    {
      title: "Xe",
      dataIndex: "car",
      key: "car",
      width: 100,
      onFilter: (value, record) => record.car.indexOf(value) === 0,
      sorter: (a, b) => a.car.length - b.car.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('car'),
    },
    {
      title: "Lái xe",
      dataIndex: "driver",
      key: "driver",
      width: 100,
      onFilter: (value, record) => record.driver.indexOf(value) === 0,
      sorter: (a, b) => a.driver.length - b.driver.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('driver'),
    },
    {
      title: "Xăng thực tế",
      dataIndex: "actual_fuel",
      key: "actual_fuel",
      width: 100,
      onFilter: (value, record) => record.actual_fuel.indexOf(value) === 0,
      sorter: (a, b) => a.actual_fuel.length - b.actual_fuel.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('actual_fuel'),
    },
    {
      title: "Xăng ước tính",
      dataIndex: "theoretical_fuel",
      key: "theoretical_fuel",
      width: 100,
      onFilter: (value, record) => record.theoretical_fuel.indexOf(value) === 0,
      sorter: (a, b) => a.theoretical_fuel.length - b.theoretical_fuel.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('theoretical_fuel'),
    },
    {
      title: "Doanh số",
      dataIndex: "product_shipments",
      key: "product_shipments",
      width: 100,
      render: (e) => e.map(el => (
        <div>{el.turnover}</div>
      ))
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      ...getColumnSearchProps('status'),
    },
    {
      title: '',
      dataIndex: "id",
      width: "15%",
      fixed: 'right',
      render: (e, data) => (
        <div className="flex flex-row justify-around">
          <button className="flex flex-row " role="button" onClick={(e) => handleditShpment(e, data._id)}>
            <PlusCircleOutlined style={{
              marginTop: "0.2rem",
              marginRight: "0.5rem"
            }} />
            Thêm Lô Hàng
          </button>

          <button className="flex flex-row " role="button" onClick={(e) => handledit(e, data._id)}>
            <AiFillEdit style={{
              marginTop: "0.2rem",
              marginRight: "0.5rem"
            }} />
            Sửa
          </button>
          <button className="flex flex-row " role="button" onClick={(e) => handleDel(e, data._id)}>
            <AiOutlineDelete style={{
              marginTop: "0.2rem",
              marginRight: "0.5rem"
            }} />
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const { Search } = Input;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  // const getSearch = async (key) => {
  //   try {
  //     const res = await axios.get(`${api}?keyword=${key}`);
  //     setData(res.data.data);
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  // const onSearch = (value) => {
  //   console.log(value)
  //   if (value === "" || value === undefined) {
  //     getDataFromApi();
  //   }
  //   else {
  //     getSearch(value)
  //   }
  // };

  const acceptAddNewBill = async (e) => {
    setLoading(true)
    setIsDisable(true)
    const tableData = e.target.parentElement.parentElement.parentElement.querySelectorAll('input');
    const selectData = e.target.parentElement.parentElement.parentElement.querySelectorAll('select');
    const newData = {
      "service": tableData[5].value,
      "road": tableData[0].value,
      "car": tableData[1].value,
      "driver": tableData[2].value,
      "actual_fuel": tableData[4].value,
      "theoretical_fuel": tableData[3].value,
      // "product_shipment": tableData[4].value,
      "status": selectData[0].value
    }

    postData(newData);
    try {
      await setTimeout(() => {
        setLoading(false)
        setOpen(false)
        setIsDisable(false)
        getDataFromApi()
      }, 2000)
    }
    catch {

    }
  }

  const acceptAddProductShipmet = async e=>{
    setLoading(true)
    setIsDisable(true)
    const tableData = e.target.parentElement.parentElement.parentElement.querySelectorAll('input');
    const newData = {
      "shipment": tableData[0].value,
      "turnover": tableData[1].value,
    }

    // const bill = new FormData();
    // bill.append("bill", items);
    postProductShipment(newData,idItem)
    try {
      await setTimeout(() => {
        setLoading(false)
        setOpenShipment(false)
        setIsDisable(false)
        getDataFromApi()
      }, 2000)
    }
    catch {

    }
  }

  const acceptEditNewBill = async (e) => {
    setLoading(true)
    setIsDisable(true)
    // const lengthShipment = dataEdit.product_shipments.length;
    // console.log(lengthShipment);
    const tableData = e.target.parentElement.parentElement.parentElement.querySelectorAll('input');
    const selectData = e.target.parentElement.parentElement.parentElement.querySelectorAll('select');
    let product_shipment = [];
    
    // for(let i=6;i<6+lengthShipment;i++){
    //   let items={
    //     shipment:tableData[i].value,
    //     turnover:tableData[i+lengthShipment].value,
    //   }
    //   product_shipment.push(items)
    // }
    const newData = {
      "service": tableData[3].value,
      "road": tableData[0].value,
      "car": tableData[1].value,
      "driver": tableData[2].value,
      // "actual_fuel": tableData[3].value,
      // "theoretical_fuel": tableData[4].value,
      "product_shipment": dataEdit.product_shipments,
      "status": selectData[0].value
    }

    // console.log(newData);
    editData (newData,idItem)
    // editData(newData,idItem);
    try {
      await setTimeout(() => {
        setLoading(false)
        setOpenEdit(false)
        setIsDisable(false)
        getDataFromApi();
        // console.log(newData);

      }, 2000)
    }
    catch {

    }
  }

  const acceptDelete = async () => {
    setLoading(true)
    setIsDisable(true)
    delData(idItem)
    // console.log(idItem);
    try {
      await setTimeout(() => {
        setLoading(false)
        setOpenDel(false)
        setIsDisable(false)
        getDataFromApi()
      }, 2000)
    }
    catch {

    }
  }

  return (
    <div>
      <div className='flex justify-end mb-5'>
        {/* <Search
          placeholder="Search"
          onSearch={onSearch}
          style={{
            width: 400,
            margin: "auto",
            display: "block",
          }}
        /> */}
        <button
          className="p-2 w-32 hover:opacity-80  border-black border-2 "
          onClick={() => setOpen(true)}
        >
          +Thêm
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1800,
        }}
        onChange={onChange}
      >
      </Table>


      <AddNewBill
        isVisible={open}
        onOk={acceptAddNewBill}
        loading={loading}
        disable={isDisable}
        onClose={() => setOpen(false)}
      />

      <AddProductShipment
        isVisible={openShipment}
        onOk={acceptAddProductShipmet}
        loading={loading}
        disable={isDisable}
        onClose={() => setOpenShipment(false)}
      />

      <EditBill
        isVisible={openEdit}
        onOk={acceptEditNewBill}
        loading={loading}
        disable={isDisable}
        dataEdit={dataEdit}
        onClose={() => setOpenEdit(false)}
        data={dataEdit}
      />

      <ConfirmModal
        isVisible={openDel}
        text={`Xóa sản phẩm`}
        onClose={() => setOpenDel(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />



    </div>
  )
}