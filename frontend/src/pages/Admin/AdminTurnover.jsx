import React, { useState, useRef, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { Button, Input, Table, Space, DatePicker, Form, InputNumber, Select } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import ConfirmModal from '../../components/ConfirmModal';
import EditProhibit from '../../components/Admin/ProhibitProduct/EditProhibit';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'
import { MainContext } from '../../context/MainContext';
import AddNewBill from '../../components/Admin/Bill/AddNewBill';
import { END_POINT } from "../../utils/constant";
import { TOKEN } from "./adminToken";
import axios from 'axios';

export default function AdminBill() {
  const { accessToken } = useContext(MainContext)
  const [idItem, setId] = useState()

  const [dataEdit, setDataEdit] = useState()
  const [openEdit, setOpenEdit] = useState(false)

  const [openDel, setOpenDel] = useState(false)

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false)
  const [open, setOpen] = useState(false);
  const api = `${END_POINT}/admin/bill`
  const [data, setData] = useState([
    {
        total: 200,
        payment_method: "cash",
        paid: 150,
        type_of_turnover: "complete order",
        refund: 250,
        bill: "12345678",
        order: "1071263",
        message: "Đây là doanh số"
  },
  ])

  const [imgFile, setImgFile] = useState()

  // ____
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

//   const getDataFromApi = async () => {
//     try {
//       const res = await axios({
//         url:api,
//         method:"get",
//         headers: { authorization: `Bearer ${accessToken}` },
//       })
//       setData(res.data.data.bills);
//     }
//     catch (e) {
//       console.log(e);
//     }
//   }

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
    }
    catch (e) {
      console.log(e);
    }
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
    // getDataFromApi()
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
    const tableData = e.target.parentElement.parentElement.parentElement.querySelectorAll('td');
    const oldData = data.filter(e => e._id === id);
    console.log(oldData);
    setDataEdit(oldData[0]);
    setId(id)
    setOpenEdit(true);
  }

  const handleDel = (e, id) => {
    setId(id)
    setOpenDel(true)
    console.log(idItem);
  }

  const changeFile = (e) => {
    const img = e.target.files[0];
    img.preview = URL.createObjectURL(img)
    setImgFile(img);
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
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      width: "13%",
      onFilter: (value, record) => record.total.indexOf(value) === 0,
      sorter: (a, b) => a.total.length - b.total.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('total'),
    },
    {
      title: "Đã trả",
      dataIndex: "paid",
      key: "paid",
      width: "13%",
      onFilter: (value, record) => record.paid.indexOf(value) === 0,
      sorter: (a, b) => a.paid.length - b.paid.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('paid'),
    },
    {
      title: "Trả lại",
      dataIndex: "refund",
      key: "refund",
      width: "13%",
      onFilter: (value, record) => record.refund.indexOf(value) === 0,
      sorter: (a, b) => a.refund.length - b.refund.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('refund'),
    },
    {
      title: "Phương thức thanh toàn",
      dataIndex: "payment_method",
      key: "payment_method",
      width: "13%",
      onFilter: (value, record) => record.payment_method.indexOf(value) === 0,
      sorter: (a, b) => a.payment_method.length - b.payment_method.length,
      sortDirections: ['descend'],
      ...getColumnSearchProps('payment_method'),
    },
    {
      title: "Kiểu doanh số",
      dataIndex: "type_of_turnover",
      key: "type_of_turnover",
      width: "13%",
    },
    {
      title: "Mã hóa đơn",
      dataIndex: "bill",
      key: "bill",
      width: "13%",
    },

    {
        title: "Thông điệp",
        dataIndex: "message",
        key: "message",
        width: "13%",
      },

    {
        title: "Mã vận đơn",
        dataIndex: "order",
        key: "order",
        width: "13%",
      },
    {
      title: '',
      dataIndex: "",
      // width: "15%",
      render: (e, data) => (
        <div className="flex flex-row justify-around">
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

  const getSearch = async (key) => {
    try {
      const res = await axios.get(`${api}?keyword=${key}`);
      setData(res.data.data);
    }
    catch (e) {
      console.log(e);
    }
  }

  const onSearch = (value) => {
    console.log(value)
    if (value === "" || value === undefined) {
    //   getDataFromApi();
    }
    else {
      getSearch(value)
    }
  };

  const acceptAddNewProhibit = async (e) => {
    setLoading(true)
    setIsDisable(true)
    let valueImg = new FormData();
    valueImg.append("images", imgFile);
    // setImgFile(valueImg)
    const tableData = e.target.parentElement.parentElement.parentElement.querySelectorAll('input');
    const newData = {
     
    }
    console.log(newData);
    // postData(newData)
    try {
      await setTimeout(() => {
        setLoading(false)
        setOpen(false)
        setIsDisable(false)
        // getDataFromApi()
      }, 2000)
    }
    catch {

    }
  }

  const acceptEditNewProhibit = async (e) => {
    setLoading(true)
    setIsDisable(true)
    let valueImg = new FormData();
    valueImg.append("images", imgFile);
    const tableData = e.target.parentElement.parentElement.parentElement.querySelectorAll('input');
    const newData = {
      name: tableData[0].value,
      detail: tableData[1].value,
      images :valueImg,
    }

    console.log(newData);
    // editData(newData,idItem);
    try {
      await setTimeout(() => {
        setLoading(false)
        setOpenEdit(false)
        setIsDisable(false)
        // getDataFromApi();
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
        // getDataFromApi()
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
        onChange={onChange}
      >
      </Table>


      <AddNewBill
        isVisible={open}
        onOk={acceptAddNewProhibit}
        loading={loading}
        disable={isDisable}
        onClose={() => setOpen(false)}
        fileData={changeFile}
      />

      <EditProhibit
        isVisible={openEdit}
        onOk={acceptEditNewProhibit}
        loading={loading}
        disable={isDisable}
        dataEdit={dataEdit}
        onClose={() => setOpenEdit(false)}
        data={dataEdit}
        fileData={changeFile}
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
