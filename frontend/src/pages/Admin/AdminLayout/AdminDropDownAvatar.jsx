import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message, Space, Avatar } from "antd";
import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { MainContext } from "../../../context/MainContext";

export default function AdminDropDownAvatar() {
  const { user, logoutHandle } = useContext(MainContext);
  
  const menu = (
    <Menu
  
    items={[
        {
            key: "1",
          label : (  <Link to="/">Về trang chủ</Link>),
        },
        {
            key: "2",
          label : (<div  onClick={logoutHandle} > <Link to="/">Đăng xuất</Link> </div> ),
        },
      ]}
    />
  );
  
  return (
    <>
      <Dropdown overlay={menu}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar> ADMIN</Avatar>
            <DownOutlined
              style={{
                color: "orange",
              }}
            />
          </Space>
        </a>
      </Dropdown>
    </>
  );
}
