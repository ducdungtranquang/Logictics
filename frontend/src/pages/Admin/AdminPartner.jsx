import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AdminEditPartner from "../../components/Admin/Partner/AdminEditPartner";
import AdminNewPartner from "../../components/Admin/Partner/AdminNewPartner";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import Search from "antd/lib/transfer/search";
import { handleSearch } from "../../components/Admin/HandleSearch/HandleSearch";
export default function AdminPartner() {
  const [dataPartner, setDataPartner] = useState([
    {
      id: "1",
      name: "Nodea",
      logo: "https://play-lh.googleusercontent.com/5qotPJfklVo9cNI6JLJivYm3OGYRIIgRSrlKMbWQAUuAl03WwWUQwurYz36yDQUUww",
    },
    {
      id: "2",
      name: "Danske",
      logo: "https://danskebank.com/-/media/danske-bank-images/global/graphics/logo/danske-bank-logo-dark-bg.jpg?rev=db1d1203e2fb49a68beea65b43eeb689&hash=59231469392BF4421574B3E6D1402911",
    },
  ]);
  const [dataRender, setDataRender] = useState([
    {
      id: "1",
      name: "Nodea",
      logo: "https://play-lh.googleusercontent.com/5qotPJfklVo9cNI6JLJivYm3OGYRIIgRSrlKMbWQAUuAl03WwWUQwurYz36yDQUUww",
    },
    {
      id: "2",
      name: "Danske",
      logo: "https://danskebank.com/-/media/danske-bank-images/global/graphics/logo/danske-bank-logo-dark-bg.jpg?rev=db1d1203e2fb49a68beea65b43eeb689&hash=59231469392BF4421574B3E6D1402911",
    },
  ]);
  //   state open edit commit modal
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  //   state open add commit modal
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);

  //   state for edit commit
  const [editCommitInfor, setEditCommitInfor] = useState({});
  const getInforPartner = async () => {
    try {
      const result = await axios({
        url: "",
        method: "get",
        headers: "Bearer",
      });
      if (result.status === 200) {
        setDataPartner(result.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  //   close edit modal
  const onClose = () => {
    setIsModalVisibleEdit(false);
  };
  //   close add modal
  const onCloseAddModal = () => {
    setIsModalVisibleAdd(false);
  };

  useEffect(() => {
    getInforPartner();
  }, []);

  const deleteAPI = async (id) => {
    try {
      const result = await axios({
        url: `url${id}`,
        method: "delete",
      });
      if (result.status === 200) {
        alert("đã xóa thành công ");
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: "10%",
      render: (e) => <img src={e} className="h-10 w-10" alt=""></img>,
      // ...getColumnSearchProps("name"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "heading",
      // width: "20%",
      sorter: (a, b) => a.name.length - b.name.length,

      // ...getColumnSearchProps("name"),
    },
    {
      title: "Tao Tac",
      dataIndex: "id",
      width: "20%",
      render: (a, e) => (
        <div className="flex flex-row justify-around gap-y-1 gap-x-3">
          <button
            className="flex items-baseline gap-x-1 hover:text-blue-600 "
            onClick={() => {
              setIsModalVisibleEdit(!isModalVisibleEdit);
              setEditCommitInfor(e);
            }}
          >
            <AiFillEdit className="translate-y-[1px]" />
            Sửa
          </button>
          <button
            className="flex items-baseline gap-x-1 hover:text-red-600"
            onClick={() => {
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
  return (
    <>
      <div className="flex   justify-between mb-4 ">
        {<AdminNewPartner isModalVisibleAdd={isModalVisibleAdd} onClose={onCloseAddModal}></AdminNewPartner>}
        <AdminEditPartner
          isModalVisibleEdit={isModalVisibleEdit}
          infor={editCommitInfor}
          setEditCommitInfor={setEditCommitInfor}
          onClose={onClose}
        ></AdminEditPartner>
        <span className="text-2xl font-blod py-4 px-2">Partner</span>
        <Input.Search
          onChange={(e) => {
            handleSearch(dataPartner, e.target.value, setDataRender);
          }}
          className="w-1/3 lg:w-[400px]"
          placeholder="Tìm dựa trên tên khách hàng"
        />

        <div className="relative">
          <button
            className=" justify-around flex items-center absolute right-10 w-32 border rounded-lg p-2 shadow-xl hover:bg-yellow-100"
            onClick={() => {
              setIsModalVisibleAdd(!isModalVisibleAdd);
            }}
          >
            <AiOutlinePlus className="" />
            Thêm mới
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={dataRender} />
    </>
  );
}
