import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import SideBar from "../../components/SideBarCustomer";
import { FaTruckMoving } from "react-icons/fa";
import { Steps } from "antd";
import { Link } from "react-router-dom";
const { Step } = Steps;

function PurchaseStage() {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const handleOpen = () => {
    setOpen(!open);
    console.log(open);
  };
  const newStage = () => {
    setStage(stage + 1);
  };
  return (
    <div className="">
      <div className="bg-gray-100 relative">
      
          <div className=" bg-gray-white  bg-white  rounded-sm shadow-xl pb-2">
            <div className="flex items-center justify-between cursor-pointer ml-2 mr-3 ">
              <Link
                className="flex items-center justify-start mt-1  hover:translate-y-[-1px] transition-all hover:text-yellow-500  "
                to="/khach-hang/trang-ca-nhan"
              >
                <LeftOutlined className="text-[12px] sm:text-xs" />
                <span className="  font-medium sm:mt-1   cursor-pointer text-[12px] sm:text-xs">
                  Trở lại
                </span>
              </Link>
              <div className="flex items-center text-yellow-500 flex-col sm:flex-row">
                <div className="flex items-center text-yellow-500 text-[12px] sm:text-sm">
                  ID ĐƠN HÀNG. 2202092MBR2HBG
                </div>
                <div className=" sm:border-l-[1px]  sm:pl-1 sm:ml-2 sm:text-sm  border-gray-200 flex items-center text-yellow-500">
                  Đơn hàng đã giao
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3  mx-2  my-3 ">
              <div className="col-span-3 sm:col-span-1 justify-self-center mb-2 ml-4 md:ml-6 ">
                <div className="text-xl font-semibold text-[#00003B] ">
                  Địa Chỉ Nhận Hàng
                </div>
                <div>
                  <div className="text-lg font-semibold ">Nguyễn Văn Thật</div>
                  <div className="text-sm font-light ">(+84) 48532372</div>
                  <div className="text-sm font-thin ">
                    Chung Cư Bình Khánh, lô c-d, Đường C, Phường An Khánh, Thành
                    Phố Thủ Đức, TP. Hồ Chí Minh
                  </div>
                </div>
              </div>
              <div className=" col-span-3 sm:col-span-2  px-4 my-3 justify-self-center  border-t-[1px] border-gray-300 sm:border-l-[1px] sm:border-t-[0px]">
                <div className="text-right text-sm sm:text-base font-semibold text-[#00003B] ">
                  Tổng: 36km
                </div>
                <div className="flex flex-col-reverse z-1">
                  <Steps
                    progressDot
                    current={3}
                    direction="vertical "
                    style={{ zIndex: 1 }}
                  >
                    <Step
                      style={{ zIndex: 1 }}
                      title="16:34 10-02-2022"
                      description="Lấy hàng thành công"
                    />
                    <Step
                      style={{ zIndex: 1 }}
                      title="04:45 13-02-2022"
                      description="Đơn hàng đã xuất kho"
                    />
                    <Step
                      style={{ zIndex: 1 }}
                      title="00:30 15-02-2022"
                      description="Đơn hàng đã đến kho Cu Chi SOC"
                    />
                    <Step
                      style={{ zIndex: 1 }}
                      title="13:36 15-02-2022"
                      description="Đơn hàng đã đến kho 50-HCM D2/An Phu LM Hub"
                    />
                    <Step
                      style={{ zIndex: 1 }}
                      title="14:32 15-02-2022"
                      description="Giao hàng thành công. Người nhận hàng: Bùi Đăng Khoa"
                    />
                  </Steps>
                </div>
              </div>
            </div>
              <div className="flex items-end justify-evenly md:justify-right mb-4 ">
              <button
                onClick={newStage}
                className="px-4 py-2 sm:px-4  min-w-[100px] hover:translate-y-[-1px] transition-all font-semibold text-[#00003B] bg-yellow-500 rounded-sm"
              >
                Hủy
              </button>
              <button className="p-2 sm:px-4 min-w-[100px]  hover:translate-y-[-1px] transition-all font-semibold bg-yellow-500 rounded-sm text-[#00003B]">
                Liên hệ tài xế
              </button>
            </div>
          </div>

          <div className="flex flex-col mt-2 bg-white rounded-sm shadow-lg">
            <div className="  overflow-auto mb-3">
              <div className="flex justify-between items-center border-gray-300 border-b-[1px] py-2 ">
                <div className="flex flex-nowrap items-center mx-2">
                  <div className=" text-sm font-medium mr-3 ">Rarusote </div>
                  <button className=" text-sm shrink-0 font-semibold px-[4px] py-[2px] text-[#00003B] bg-yellow-500  ">
                    Xem shop
                  </button>
                </div>
                <div className=" flex flex-nowrap items-center mx-2 flex-row">
                  <FaTruckMoving className=" sm:mr-2 mr-[3px]" />
                  <Link
                    className=" text-[10px] font-medium  sm:mr-4 sm:text-sm  hover:translate-y-[-1px] transition-all hover:text-yellow-500  cursor-pointer "
                    to="/khach-hang/dat-hang/don-hang/2323"
                  >
                    Đang xử lý
                  </Link>
                </div>
              </div>
              <div className="flex items-center py-2 ">
                <div className="ml-2 flex ">
                  <img
                    className="w-[72px] h-[72px] mr-2 sm:w-24 sm:h-24 sm:mr-4"
                    src="https://media.bongda.com.vn/files/quan.le/2018/04/06/var-trong-tai-02-1830.jpg"
                    alt="product"
                  ></img>
                  <div>
                    <div className="font-bold text-base sm:text-xl sm:mb-1">
                      Điện thoại Oppo
                    </div>
                    <div className="font-light sm:text-base sm:mb-1">
                      Điện thoại Oppo Trung Quốc
                    </div>
                    <div className="md:text-base ">X1</div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="grid grid-cols-5  px-1 border-t-[1px] border-gray-300">
                  <div className="col-span-3 sm:col-span-3 flex items-center justify-end mr-2 py-[6px]">
                    <div className="md:text-base font-semibold ">
                      Tổng tiền hàng
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-2 flex items-center justify-end border-l-[1px] border-gray-300 py-[6px]">
                    <div className=" md:text-base mr-1">660.000 đ</div>
                  </div>
                </div>
                <div className="grid grid-cols-5  px-1 border-t-[1px] border-gray-300">
                  <div className="col-span-3 sm:col-span-3 flex items-center justify-end mr-2 py-[6px]">
                    <div className="md:text-base font-semibold">
                      Phí vận chuyển
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-2 flex items-center justify-end border-l-[1px] border-gray-300 py-[6px]">
                    <div className=" md:text-base mr-1">20.000 đ</div>
                  </div>
                </div>
                <div className="grid grid-cols-5  px-1 border-t-[1px] border-gray-300">
                  <div className="col-span-3 sm:col-span-3 flex items-center justify-end mr-2 py-[6px]">
                    <div className="md:text-base font-semibold">Phí COD</div>
                  </div>
                  <div className="col-span-2 sm:col-span-2 flex items-center justify-end border-l-[1px] border-gray-300 py-[6px]">
                    <div className=" md:text-base mr-1">10.000 đ</div>
                  </div>
                </div>
                <div className="grid grid-cols-5  px-1 border-t-[1px]  border-b-[1px] border-gray-300">
                  <div className="col-span-3 sm:col-span-3 flex items-center justify-end mr-2 py-[6px]">
                    <div className="md:text-base font-semibold">
                      Tổng số tiền:
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-2 flex items-center justify-end border-l-[1px] border-gray-300 py-[6px]">
                    <div className="text-yellow-500 text-xl mr-1">
                      690.000 đ
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-2 mr-4  ">
                <button className="p-2 font-semibold bg-yellow-500  hover:translate-y-[-1px] transition-all text-[#00003B] rounded-sm">
                  Mua lại
                </button>
                <button className="p-2 ml-3  font-semibold bg-yellow-500  hover:translate-y-[-1px] transition-all text-[#00003B] rounded-sm">
                  Liên hệ shop
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default PurchaseStage;
