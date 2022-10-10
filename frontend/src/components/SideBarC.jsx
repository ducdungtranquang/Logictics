import React from "react";
import {
  IoPersonOutline,
  IoClipboardOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import { RiLockPasswordLine } from "react-icons/ri";
function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
const items = [
  getItem(
      <div className="">
        <Link to="/khach-hang/trang-ca-nhan"><div className="text-base font-medium">Tài khoản </div></Link>
      </div>,
      "1",
      <IoPersonOutline className="text-xl ml-[-26px] md:ml-[-16px] lg:ml-0" />
    ),
    getItem(
      <div>
        <Link to="/khach-hang/thay-doi-mat-khau"><div className="text-base font-medium">Đổi mật khẩu</div></Link>
      </div>,
      "2",
      <RiLockPasswordLine className="text-xl ml-[-26px] md:ml-[-16px] lg:ml-0"/>
    ),
    getItem(
      <div className="">
        <Link to="/khach-hang/dat-hang"><div className="text-base font-medium">Đơn mua hàng</div></Link>
      </div>,
      "3",
      <IoClipboardOutline className="text-xl ml-[-26px] md:ml-[-16px] lg:ml-0"/>
    ),

    getItem(
      <div>
        <Link to="/khach-hang/thong-bao/don-hang"><div className="text-base font-medium">Thông báo</div></Link>
      </div>,
      "4",
      <IoNotificationsOutline className="text-xl ml-[-26px] md:ml-[-16px] lg:ml-0"/>
    ),
];


const SideBarC = () => {
  return (
     <div
     
      style={{
        width: "95%",
        backgroundColor:"white",
        height:"100%"
      }}
    >
        <div className=" mb-2 border-b-[1px] border-gray-500 ">
            <div className="text-center">Chào mừng</div>
            <div className="md:text-xl sm:text-lg  text-center font-semibold text-[#00003B]">Nguyễn văn thật</div>
        </div>
        <Menu  theme="" mode="inline" defaultSelectedKeys={[""]} items={items} />
    </div>
    
  );
};

export default SideBarC;
