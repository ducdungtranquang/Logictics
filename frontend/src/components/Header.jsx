import logoJT from "../assets/icons/vietnam-post.png";
import { FaChevronDown, FaBars } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import "antd/dist/antd.css";
import { useContext } from "react";
import { MainContext } from "../context/MainContext";
import Notification from './Notification';
import axios from "axios";
import { END_POINT } from "../utils/constant";



const Header = () => {
  const { user, logoutHandle } = useContext(MainContext);
  const [services,setServices]= useState([])
  function getItem(label, key, children) {
    return {
      key,
      children,
      label,
    };
  }
  const items = [
    getItem(<Link to="/">Trang chủ</Link>, "1"),
    getItem(<Link to="ve-chung-toi">Giới thiệu</Link>, "sub2", [
      getItem(<Link to="ve-chung-toi">Về chúng tôi</Link>, "2"),
      getItem(<Link to="cam-ket">Cam kết</Link>, "3"),
    ]),
    getItem(<Link to="tra-cuu">Tra cứu</Link>, "sub3", [
      getItem(<Link to="tra-cuu/cuoc-van-chuyen">Cước vận chuyển</Link>, "4"),
      getItem(<Link to="tra-cuu/buu-cuc">Bưu cục gần đây</Link>, "5"),
      getItem(<Link to="tra-cuu/van-don">Vận đơn</Link>, "6"),
      getItem(<Link to="tra-cuu/bang-gia">Bảng giá</Link>, "7"),
      getItem(<Link to="tra-cuu/gang-cam-gui">Hàng cấm gửi</Link>, "8"),
    ]),
    getItem(<Link to="dich-vu">Dịch vụ</Link>, "sub4",
    services.map((service,key)=> getItem(
          <Link to={`dich-vu/${service._id}`} className="flex flex-col leading-5">
            <span>{service.name}</span>
            <i className=" text-[#f0b90c] font-bold">{service.sub_detail}</i>
          </Link>,
          key+9
        ))
    //  [
    //   getItem(
    //     <Link to="chuyen-phat-tieu-chuan" className="flex flex-col leading-5">
    //       <span>Dịch vụ chuyển phát tiêu chuẩn</span>
    //       <i className=" text-[#f0b90c] font-bold">TKT Epress</i>
    //     </Link>,
    //     "9"
    //   ),
    //   getItem(
    //     <Link to="chuyen-phat-nhanh" className="flex flex-col leading-5">
    //       <span>Dịch vụ chuyển phát nhanh</span>
    //       <i className=" text-[#f0b90c] font-bold">TKT Fast</i>
    //     </Link>,
    //     "10"
    //   ),
    //   getItem(
    //     <Link to="sieu-dich-vu-chuyen-phat" className="flex flex-col leading-5">
    //       <span>Dịch vụ Siêu giao hàng</span>
    //       <i className=" text-[#f0b90c] font-bold">TKT Super</i>
    //     </Link>,
    //     "11"
    //   ),
    //   getItem(
    //     <Link to="chuyen-phat-do-tuoi-song" className="flex flex-col leading-5">
    //       <span>Dịch vụ Tươi sống</span>
    //       <i className=" text-[#f0b90c] font-bold">TKT Fresh</i>
    //     </Link>,
    //     "12"
    //   ),
    // ]
    ),
    getItem(<Link to="tuyen-dung">Tuển dụng </Link>, "sub5", [
      getItem(<Link to="tuyen-dung">Cơ hội nghề nghiệp</Link>, "20"),
      getItem(<Link to="cuoc-song">Cuộc sống TKT Epress</Link>, "21"),
    ]), 

    getItem(<Link to="tu-van/lien-he">Tư vấn</Link>, "sub6", [
      getItem(<Link to="tu-van/lien-he">Liên hệ</Link>, "22"),
      getItem(<Link to="tu-van/dang-ki-tu-van">Đăng kí tư vấn</Link>, "23"),
    ]), 
  ];
  const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6"];
  const navigate = useNavigate();
  // const [defaultService, setDefaultService] = useState("cước vận chuyển");
  // function callback(dichVu) {
  //   console.log(dichVu)
  //   setDefaultService(dichVu);
  //   navigate(`/track?type=${dichVu}`);
  // }
   useEffect(() => {
       const getService = async()=>{
          const res = await axios.get(`${END_POINT}/service`)
          console.log(res)
          const {data} =res.data
          console.log(data.service)
          setServices(data.service)
        }
      getService()
    
  }, []);


  // xử lý thêm màu menu
  let {pathname}=useLocation()
  const comparePath=(path)=>{
    if(pathname.includes(path)) return "text-yellow-500"
  }
  //Logic mobile-navigation --- Còn lỗi
  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const removeMobileMenu = (e) => {
    if (!e.target.closest(".ant-menu") || e.target.closest("a")) {
      setIsOpen(!isOpen);
    }
  };
  const Logout = () => {
    logoutHandle();
  };

  return (
    <div className='fixed bg-white inset-x-0 h-[65px] z-20'>
      <div className=" lg:static flex justify-around items-center h-full px-4 lg:px-0 container mx-auto text-sm ">
        <div className="bt lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          <FaBars className="w-7 h-7" />
        </div>
        <div className="hidden sm:block">
          <Link to="/">
            <img src={logoJT} className="h-[80px]" alt="logo-JnT"/>
          </Link>
        </div>
        <ul className="hidden lg:flex h-full justify-center items-center m-0">
          <div className="rounded-md hover:bg-yellow-200 ">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 ${pathname==="/" && "text-yellow-500"}`}
            >
              Trang chủ
            </Link>
          </div>
          <div className="group hover:bg-yellow-200 rounded-md">
            <Link
              to="ve-chung-toi"
              className={`inline-flex items-center px-4 py-2 ${comparePath("/ve-chung-toi")||comparePath("/cam-ket") }`}
            >
              Giới thiệu
              <FaChevronDown className="h-4 w-4 pl-[6px]" />
            </Link>
            <ul className="hidden group-hover:block absolute bg-white rounded-lg z-10 border shadow-lg animate-up">
              <li>
                <Link
                  to="ve-chung-toi"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                >
                  Về Chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="cam-ket"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                >
                  Cam kết
                </Link>
              </li>
            </ul>
          </div>
          <div className="group hover:bg-yellow-200 rounded-md">
            <Link to="tra-cuu" className={`inline-flex items-center  px-4 py-2 ${comparePath("/tra-cuu") }`}>
              Tra cứu
              <FaChevronDown className="h-4 w-4 pl-[6px]" />
            </Link>
            <ul
              className="hidden group-hover:block absolute bg-white rounded-lg z-10 border shadow-lg animate-up"
              // onChange={callback}
            >
              <li>
                <Link
                  to="/tra-cuu/cuoc-van-chuyen"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                  key="cước vận chuyển"
                >
                  Cước vận chuyển
                </Link>
              </li>
              <li>
                <Link
                  to="/tra-cuu/buu-cuc"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                  key="bưu cục"
                >
                  Bưu cục gần đây
                </Link>
              </li>
              <li>
                <Link
                  to="/tra-cuu/van-don"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                  key="vận đơn"
                >
                  Vận đơn
                </Link>
              </li>
              <li>
                <Link
                  to="/tra-cuu/bang-gia"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                  key="bảng giá"
                >
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link
                  to="/tra-cuu/hang-cam-gui"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                  key="hàng cấm gửi"
                >
                  Hàng cấm gửi
                </Link>
              </li>
            </ul>
          </div>
          <div className="group hover:bg-yellow-200 rounded-md">
            <Link to="dich-vu" className={`inline-flex items-center px-4 py-2 ${comparePath("/dich-vu")||comparePath("chuyen-phat") }`}>
              Dịch vụ
              <FaChevronDown className="h-4 w-4 pl-[6px]" />
            </Link>
            <ul className="hidden group-hover:block absolute bg-white rounded-lg z-10 border shadow-lg animate-up">
              {
                services.map(service=>(
                  <li>
                    <Link
                      to={`dich-vu/${service._id}`}
                      className="flex flex-col px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                    >
                      <span>{service.name}</span>
                      <i className="text-[#f0b90c] font-bold">{service.sub_detail}</i>
                    </Link>
                  </li>
                ))
              }
                {/*   <li>
                    <Link
                      to="chuyen-phat-tieu-chuan"
                      className="flex flex-col px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                    >
                      <span>Dich vu chuyển phát tiêu chuẩn</span>
                      <i className="text-[#f0b90c] font-bold">TKT Express</i>
                    </Link>
                  </li>
                   <li>
                    <Link
                      to="chuyen-phat-nhanh"
                      className="flex flex-col px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                    >
                      <span>Dịch vụ chuyển phát nhanh</span>
                      <i className="text-[#f0b90c] font-bold">TKT Fast</i>
                    </Link>
                  </li>
                   <li>
                    <Link
                      to="sieu-dich-vu-chuyen-phat"
                      className="flex flex-col px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                    >
                      <span>Dịch vụ siêu giao hàng</span>
                      <i className="text-[#f0b90c] font-bold">TKT Supper</i>
                    </Link>
                  </li>
                   <li>
                    <Link
                      to="chuyen-phat-do-tuoi-song"
                      className="flex flex-col px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                    >
                      <span>Dịch vụ tươi sống</span>
                      <i className="text-[#f0b90c] font-bold">TKT Fresh</i>
                    </Link>
                  </li> */}
                
            </ul>
          </div>
          <div className="group hover:bg-yellow-200 rounded-md">
            <Link
              to="tuyen-dung"
              className={`inline-flex items-center px-4 py-2 ${comparePath("/tuyen-dung") || comparePath("/cuoc-song")}`}
            >
              Tuyển dụng
              <FaChevronDown className="h-4 w-4 pl-[6px]" />
            </Link>
            <ul className="hidden group-hover:block absolute bg-white rounded-lg z-10 border shadow-lg animate-up">
              <li>
                <Link
                  to="tuyen-dung"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100 "
                >
                  Cơ hội nghề nghiệp
                </Link>
              </li>
              <li>
                <Link
                  to="cuoc-song"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                >
                  Cuộc sống TKT Epress
                </Link>
              </li>
            </ul>
          </div>
          <div className="group hover:bg-yellow-200 rounded-md">
            <Link
              to="tu-van/lien-he"
              className={`inline-flex items-center px-4 py-2 ${comparePath("/tu-van") }`}
            >
              Tư vấn
              <FaChevronDown className="h-4 w-4 pl-[6px]" />
            </Link>
            <ul className="hidden group-hover:block absolute bg-white rounded-lg z-10 border shadow-lg animate-up">
              <li>
                <Link
                  to="tu-van/lien-he"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100 "
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  to="tu-van/dang-ki-tu-van"
                  className="flex px-4 py-2 w-auto rounded-lg hover:bg-yellow-100"
                >
                  Đăng kí tư vấn
                </Link>
              </li>
            </ul>
          </div>
        </ul>
        {user ? (
          <div className=" flex ">
            <span className="mr-[8px]">
              <Notification/>
            </span>
            <Link to="/khach-hang/trang-ca-nhan">
              <div className="px-3 py-2 bg-primary border-2 border-button_color hover:bg-opacity-70 rounded-md text-sm cursor-pointer">
                <span className="font-semibold ">
                Thông tin

                </span>
              </div>
            </Link>
            <div>
              <div
                onClick={Logout}
                className="px-3 ml-3 py-2 bg-primary border-2 border-button_color hover:bg-opacity-70 rounded-md text-sm cursor-pointer"
              >
                <span href="#" className="font-semibold ">
                  Đăng xuất
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className=" flex">
            <Link to="/dang-nhap">
              <div className="px-4 py-2 mr-3 bg-primary border-2 border-button_color hover:bg-opacity-70 rounded-md text-sm cursor-pointer">
                <span className="font-semibold ">Đăng nhập</span>
              </div>
            </Link>
            <Link to="/dang-ki">
              <div className="px-6 py-2 bg-primary border-2 border-button_color hover:bg-opacity-70 rounded-md text-sm cursor-pointer">
                <span href="#" className="font-semibold ">
                  Đăng kí
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Phần mobile menu */}
      <div
        className={
          isOpen
            ? "lg:hidden fixed left-0 top-[65px] right-0 bottom-0 bg-slate-400/40"
            : "hidden lg:hidden fixed left-0 top-[65px] right-0 bottom-0 bg-slate-400/40"
        }
        onClick={removeMobileMenu}
      >
        <Menu
          className="h-full animate-menu_in"
          style={{ width: "60%" }}
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={items}
        />
      </div>
    </div>
  );
};
export default Header;