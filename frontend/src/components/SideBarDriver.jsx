import React, { useContext } from "react";
import { FaPen } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {
  IoPersonOutline,
  IoArrowForwardCircleOutline,
  IoClipboardOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { MainContext } from "../context/MainContext";

const SideBarDriver = ({ open, handleOpen }) => {
    const { user } = useContext(MainContext)
  return (
    <div>
      <div
        className={` w-35vh  md:min-h-[100%]  duration-700 flex flex-col transition-all ease-out  delay-100  z-[102]   border-t-4 rounded-lg fixed top-0 left-0 bg-white   min-h-full ${
          open
            ? ` peer:transition ease-out delay-150 duration-400`
            : `translate-x-[-300px] duration-1000 ease-in duration-400  `
        }`}
      >
        <div className="flex items-center justify-center ml-2 pb-2  border-b-2 border-black-400 ">
          <div className="flex flex-col px-2 pb-1 flex-1 ">
            <div
              className="flex justify-end "
              onClick={() => handleOpen(!open)}
            >
              <IoArrowBackCircleOutline className="w-6 h-6 z-101" />
            </div>
            <div className="text-xl font-semibold text-[#00003B] ">
             {user.role.name}
            </div>
            <div className="flex items-center  ">
              <FaPen />
              <div className=" m-w-[70px] mx-2 mt-1 flex-shrink-0 cursor-pointer text-[#00003B] ">
                <Link
                  to="/khach-hang/trang-ca-nhan"
                  className=" font-normal text-sm md:text-base text text-black hover:text-yellow-500 preventselect"
                >
                  Sửa hồ sơ
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start mx-3 mt-2 ">
          <div>
            <div className="flex items-center py-1 ">
              <IoPersonOutline className="mr-2 w-[18px] h-[18px] shrink-0" />
              <Link
                className="text-lg  text-[#00003B] hover:text-yellow-500 preventselect"
                to="/khach-hang/trang-ca-nhan"
              >
                Tài khoản của tôi
              </Link>
            </div>

            <div className="flex items-center py-1 ">
              <IoClipboardOutline className="mr-2 w-[18px] h-[18px] shrink-0" />
              <Link
                className="text-lg  text-[#00003B] hover:text-yellow-500 preventselect"
                to="/tai-xe/dat-hang"
              >
                Đơn của khách
              </Link>
            </div>
            <div className="flex items-center py-1">
              <IoNotificationsOutline className="mr-2 w-[18px] h-[18px] shrink-0" />
              <Link
                className="text-lg  text-[#00003B] hover:text-yellow-500 preventselect"
                to="/tai-xe/thong-bao/don-hang"
              >
                Thông báo
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          open
            ? `z-100 lg:hidden fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 `
            : `opacity-0 `
        }   transition-all ease-out  delay-100  `}
      ></div>
    </div>
  );
};

export default SideBarDriver;
