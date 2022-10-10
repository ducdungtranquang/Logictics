import { Input, Table } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AdminEditMessage from "../../components/Admin/Message/AdminEditMessage";
import { MainContext } from "../../context/MainContext";
// import AdminNewMessage from "../../components/Admin/Message/AdminNewMessage";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { END_POINT } from "../../utils/constant";

// import { handleSearch } from "../../components/Admin/HandleSearch/HandleSearch";

export default function AdminContactMessage() {
  const [change, setChange] = useState(1)
  const api = `${END_POINT}/admin/message`
  const { accessToken } = useContext(MainContext)
  const [dataStore,setStoreData] = useState([])
  const [id, setId] = useState('')
  //   state open edit commit modal
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  // call total message :
  const getMessageAPI = async () => {
    try {
      const result = await axios({
        url: api,
        method: "get",
        headers: { authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 200) {
        setDataMessgae(result.data.data.messages);
        setStoreData(result.data.data.messages)
        // console.log(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onClose = () => {
    setIsModalVisibleEdit(false);
  };


  useEffect(() => {
    getMessageAPI();
  }, [change]);
  // delete API :

  const deleteAPI = async (id) => {
    try {
      const result = await axios({
        url: `${api}/${id}`,
        method: "delete",
        headers: { authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 200) {
        alert("đã xóa thành công ");
        setChange(change + 1)
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const editApi = async (item, id) => {
    try {
      const result = await axios({
        url: `${api}/${id}`,
        method: "put",
        data: item,
        headers: { authorization: `Bearer ${accessToken}` },
      });
      if (result.status === 200) {
        alert("cập thành công ");
        // setChange(change+1)
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  // setdata to edit
  const [dataEditMessage, setDataEditMessage] = useState();
  //  data message
  const [dataMessage, setDataMessgae] = useState([
    {
      name: "a",
      email: "a@gmail42424.com",
      phone: "424",
      message: "new message",
      id: 1,
      date: "",
    },
    {
      name: "b",
      email: "bfasf@gmail.com",
      phone: "4422424",
      message: "new message",
      id: 2,
      date: "",
    },
    {
      name: "c",
      email: "chjhr@gmail.com",
      phone: "4565624",
      message: "new message",
      id: 3,
      date: "",
    },
  ]);
  // colummns table
  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      width: "14.2%",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: "14.2%",
      sorter: (a, b) => a.email.length - b.email.length,
      //   ...getColumnSearchProps("heading"),
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
      width: "14%",
      // ...getColumnSearchProps("details"),
      sorter: (a, b) => a.phone - b.phone,
      //   sortDirections: ["descend", "ascend"],
    },
    {
      title: "message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "14%",
      // ...getColumnSearchProps("details"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: "status",
      width: "12%",
      filters: [
        {
          text: 'seen',
          value: 'seen',
        },
        {
          text: 'unseen',
          value: 'unseen',
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <>
          {status&&(
          <>
          {status === "seen" ?
            <div className="text-green-600 font-bold bg-green-200 text-center rounded-lg py-1">seen</div>
            :
            <div className='text-red-600 font-bold bg-red-300 text-center rounded-lg py-1'>unseen</div>
          }
        </>
        )}
        </>
      )
    },
    {
      title: "",
      dataIndex: "_id",
      width: "14%",
      render: (a, e) => (
        <div className="flex flex-row justify-around gap-y-1 gap-x-3">
          <button
            className="flex items-baseline gap-x-1 hover:text-blue-600"
            onClick={() => {
              console.log(a);
              setId(a)
              setIsModalVisibleEdit(!isModalVisibleEdit);
              setDataEditMessage(e);
            }}
          >
            <AiFillEdit className="translate-y-[1px]" />
            Sửa
          </button>
          <button
            className="flex items-baseline gap-x-1 hover:text-red-600"
            onClick={() => {
              // console.log(a)
              deleteAPI(a);
            }}
          >
            <AiOutlineDelete className="translate-y-[1px]" />
            Xóa
          </button>
        </div>
      ),
    },
  ];

  const acceptEdit = async (e) => {
    const tableData = e.target.parentElement.parentElement.parentElement.querySelector('select')
    const items = {
      status: tableData.value,
    }
    console.log(items);
    try {
      await setTimeout(() => {
        // setChange(change+1)
        editApi(items, id)
        setIsModalVisibleEdit(false)
        getMessageAPI();
      }, 2000)
    }
    catch {

    }
  }

  const onSearch = (value) => {
    // console.log(value)
    // getMessageAPI()
    setDataMessgae(dataStore.filter(e=>{
      return e.name.toLowerCase().includes(value.toLowerCase())||e.email.toLowerCase().includes(value.toLowerCase())||
      e.message.toLowerCase().includes(value.toLowerCase())||e.phone.toLowerCase().includes(value.toLowerCase())
      ||e.status.toLowerCase().includes(value.toLowerCase())
    }))
    console.log(dataMessage);
    if(value===""||value===undefined){
      getMessageAPI();
    }
  };


  return (
    <>
      <div className="flex justify-center mb-[30px]">
        <AdminEditMessage
          isVisible={isModalVisibleEdit}
          data={dataEditMessage}
          onOk={acceptEdit}
          onClose={onClose}
        ></AdminEditMessage>
        <Input.Search
          className="w-1/3 lg:w-[400px]"
          placeholder="Search"
          onSearch={onSearch}
        // onChange={(e) => {
        //   handleSearch(dataMessage, e.target.value, setDataRender,["name","email"]);
        // }}
        />

      </div>
      <Table columns={columns} dataSource={dataMessage} />
    </>
  );
}
