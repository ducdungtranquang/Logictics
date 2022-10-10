import { Dropdown, Menu,Avatar} from "antd";
import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5"
import {MdAccountCircle} from "react-icons/md"
import { MainContext } from "../../context/MainContext";
function AvatarStorekeeper() {
  const {logoutHandle} = useContext(MainContext)
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="">Quản lý tài khoản</Link>,
          icon:  <MdAccountCircle/>
        },
        {
          key: "2",
          label: <div onClick={logoutHandle} >Đăng xuất</div>,
          icon: <IoExitOutline />
        },
      ]}
    />
  );
  return (
    <>
      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </a>
      </Dropdown>
    </>
  );
}
export default AvatarStorekeeper