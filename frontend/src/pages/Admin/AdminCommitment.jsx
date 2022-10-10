import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal } from "antd";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import AdminAddCommit from "../../components/Admin/Commit/AdminAddCommit";
import AdminEditCommit from "../../components/Admin/Commit/AdminEditCommit";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { handleSearch } from "../../components/Admin/HandleSearch/HandleSearch";

export default function AdminCommitment() {
  //state data commit
  const [dataCommit, setDataCommit] = useState([
    {
      id: "1",
      heading: "Nodea",
      logo: "https://play-lh.googleusercontent.com/5qotPJfklVo9cNI6JLJivYm3OGYRIIgRSrlKMbWQAUuAl03WwWUQwurYz36yDQUUww",
      detail: "store",
    },
    {
      id: "2",
      heading: "Danske",
      logo: "https://danskebank.com/-/media/danske-bank-images/global/graphics/logo/danske-bank-logo-dark-bg.jpg?rev=db1d1203e2fb49a68beea65b43eeb689&hash=59231469392BF4421574B3E6D1402911",
      detail: "Banking",
    },
  ]);
  const [dataRender, setDataRender] = useState([
    {
      id: "1",
      heading: "Nodea",
      logo: "https://play-lh.googleusercontent.com/5qotPJfklVo9cNI6JLJivYm3OGYRIIgRSrlKMbWQAUuAl03WwWUQwurYz36yDQUUww",
      detail: "store",
    },
    {
      id: "2",
      heading: "Danske",
      logo: "https://danskebank.com/-/media/danske-bank-images/global/graphics/logo/danske-bank-logo-dark-bg.jpg?rev=db1d1203e2fb49a68beea65b43eeb689&hash=59231469392BF4421574B3E6D1402911",
      detail: "Banking",
    },
  ]);
  //   state open edit commit modal
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  //   state open add commit modal
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  // state search text

  //   state for edit commit
  const [editCommitInfor, setEditCommitInfor] = useState({
    heading: "",
    detail: "",
    logo: "",
  });

  const getInforCommitAPI = async () => {
    try {
      const result = await axios({
        url: "",
        method: "get",
        headers: "Bearer",
      });
      if (result.status === 200) {
        setDataCommit(result.data);
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
  // onChange={(e) => handleChangeFile(e, setImg, setEditCommit, editCommit)}

  //
  useEffect(() => {
    getInforCommitAPI();
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
      title: "heading",
      dataIndex: "heading",
      key: "heading",
      width: "20%",
      sorter: (a, b) => a.heading.length - b.heading.length,

      //   ...getColumnSearchProps("heading"),
    },
    {
      title: "detail",
      dataIndex: "detail",
      key: "details",
      // ...getColumnSearchProps("details"),
      sorter: (a, b) => a.detail.length - b.detail.length,
      //   sortDirections: ["descend", "ascend"],
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
      <div className="flex   justify-between mb-4">
        {<AdminAddCommit isModalVisibleAdd={isModalVisibleAdd} onClose={onCloseAddModal}></AdminAddCommit>}
        <AdminEditCommit
          isModalVisibleEdit={isModalVisibleEdit}
          infor={editCommitInfor}
          setEditCommitInfor={setEditCommitInfor}
          onClose={onClose}
        ></AdminEditCommit>
        <span className="text-3xl font-blod py-4 px-2">Commit</span>
        <Input.Search
          className="w-1/3 lg:w-[400px]"
          placeholder="Search"
          onChange={(e) => {
            handleSearch(dataCommit, e.target.value, setDataRender);
          }}
        />
        <div>
          <button
            className=" justify-around flex items-center absolute right-10 w-32 border rounded-lg p-2 shadow-xl hover:bg-yellow-100"
            onClick={() => setIsModalVisibleAdd(!isModalVisibleAdd)}
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
