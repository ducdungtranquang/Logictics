import React, { useState, useRef, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { Button, Input, Table, Space, DatePicker, Form, InputNumber, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import AddNewStaff from '../../components/Admin/Staff/AddNewStaff';
import ConfirmModal from '../../components/ConfirmModal';
import EditStaff from '../../components/Admin/Staff/EditStaff';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'
import { END_POINT } from '../../utils/constant';
import { TOKEN } from "./adminToken";
import axios from 'axios';
import { MainContext } from '../../context/MainContext';


export default function AdminStaff() {
  const [idItem,setId] = useState()
  const {accessToken} = useContext(MainContext)
  const [dataEdit, setDataEdit] = useState()
  const [openEdit, setOpenEdit] = useState(false)

  const [openDel, setOpenDel] = useState(false)

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false)
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([])

  const getDataFromApi = async ()=>{
    try{
      const res = await axios({
        url:`${END_POINT}/admin/staff`,
        method:"get",
        headers: { authorization: `Bearer ${accessToken}` },
      })
      setData(res.data.data)
      console.log(res);
    }

    catch(e){
      console.log(e);
    }
  }

  const editStaff = async (data,id)=>{
    const res = await axios({
      method:"put",
      data:data,
      url:`${END_POINT}/admin/staff/${id}`,
      headers: { authorization: `Bearer ${accessToken}` },
    })
  }

  const delStaff = async (id)=>{
    const res = await axios({
      method:"delete",
      url:`${END_POINT}/admin/staff/${id}`,
      headers: { authorization: `Bearer ${accessToken}` },
    })
  }

  useEffect(()=>{
    getDataFromApi()
  },[])

  // ____
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handledit = (e,id) => {
    const oldData = data.filter(e=>e._id===id);
    setDataEdit(oldData[0]);
    setId(id)
    setOpenEdit(true);
    // console.log(dataEdit);
  }

  const handleDel = (e,id) => {
    setId(id)
    setOpenDel(true)
    // console.log(idItem);
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
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: "14%",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('name'),
    },
    {
      title: "Mã phòng ban",
      dataIndex: "department",
      key: "department",
      width: "14%",
    },

    {
      title: "Công việc",
      dataIndex: "staff_type",
      key: "staff_type",
      width: "14%",
    },

    {
      title: "Đội xe",
      dataIndex: "car_fleet",
      key: "car_fleet",
      width: "14%",
    },
    {
      title: "Ngày bắt đầu làm việc",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "14%",
      onFilter: (value, record) => record.createdAt.indexOf(value) === 0,
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '',
      dataIndex: "_id",
      // width: "14%",
      render: (e,data) => (
        <div className="flex flex-row justify-around">
          <button className="flex flex-row " role="button" onClick={(e)=>handledit(e,data._id)}>
            <AiFillEdit style={{
              marginTop: "0.2rem",
              marginRight: "0.5rem"
            }} />
            Sửa
          </button>
          <button className="flex flex-row " role="button" onClick={(e)=>handleDel(e,data._id)}>
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
  const searchDataFromApi = async (key)=>{
    try{
      const res = await axios.get(`${END_POINT}/admin/staff?keyword=${key}`)
      setData(res.data.data)
      console.log(res.data.data);
    }

    catch(e){
      console.log(e);
    }
  }
  const { Search } = Input;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    console.log(value)
    searchDataFromApi(value)
    if(value===""||value===undefined){
     getDataFromApi();
    }
  };

  const acceptAddNewStaff = async (e) => {
    setLoading(true)
    setIsDisable(true)

    try {
      await setTimeout(() => {
        setLoading(false)
        setOpen(false)
        setIsDisable(false)
        const tableData = e.target.parentElement.parentElement.parentElement.querySelectorAll('input');
        const newData = {
          name: tableData[0].value,
          staff_type: tableData[1].value,
        }

      }, 2000)
    }
    catch {

    }
  }

  const acceptEditNewStaff = async (e) => {
    setLoading(true)
    setIsDisable(true)
    const tableData = e.target.parentElement.parentElement.parentElement.querySelectorAll('input');
    const newData = {
      name: tableData[0].value,
      staff_type: tableData[1].value,
    }

    editStaff(newData,idItem)

    try {
      await setTimeout(() => {
        setLoading(false)
        setOpenEdit(false)
        setIsDisable(false)
        getDataFromApi()
        // console.log(newData);

      }, 2000)
    }
    catch {

    }
  }

  const acceptDelete = async () => {
    setLoading(true)
    setIsDisable(true)
    delStaff(idItem)
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
        <Search
          placeholder="Search"
          onSearch={onSearch}
          style={{
            width: 400,
            margin: "auto",
            display: "block",
          }}
        />
        {/* <button
          className="p-2 w-32 hover:opacity-80  border-black border-2 "
          onClick={() => setOpen(true)}
        >
          +Thêm
        </button> */}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
      >
      </Table>


      {/* <AddNewStaff
        isVisible={open}
        onOk={acceptAddNewStaff}
        loading={loading}
        disable={isDisable}
        onClose={() => setOpen(false)}
      /> */}

      <EditStaff
        isVisible={openEdit}
        onOk={acceptEditNewStaff}
        loading={loading}
        disable={isDisable}
        dataEdit={dataEdit}
        onClose={() => setOpenEdit(false)}
      />

      <ConfirmModal
        isVisible={openDel}
        text={`xóa nhân viên`}
        onClose={() => setOpenDel(false)}
        loading={loading}
        disable={isDisable}
        onOk={acceptDelete}
      />



    </div>
  )
}