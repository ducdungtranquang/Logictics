import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaTruckMoving } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import {
  AiOutlineGift,
  AiOutlineUser,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BiTargetLock } from "react-icons/bi";
import { MdOutlineEditCalendar } from "react-icons/md";
import IMG from "../../assets/images/noorder.jpg"
import { Link } from "react-router-dom";
import { Pagination, Tabs } from "antd";
import  axios  from "axios";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import useNavigateHook from './../../hooks/useNavigateHook';
import { END_POINT } from "../../utils/constant";
const { TabPane } = Tabs;
const PurchaseDriver = () => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState([]);
  const  { pushQuery} = useNavigateHook()
  const handleOpen = () => {
    setOpen(!open);
    console.log(open);
  };
  const [total,setTotal] = useState(1)
  const navigate = useNavigate()
   const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 2,
  });
  const [status,setStatus] = useState(
    {
      status:""
    }
  )
  const [params, setParams] = useState({
    ...pagination,
    page: pagination.page - 1
  });
  const {accessToken} = useContext(MainContext)
  const handllePage = (newPagination)=>{
    console.log(newPagination)
      setParams({
      ...params,
      ...newPagination,
      page: newPagination - 1,
    });
    console.log(params)
    
  }

   const fetchapi = async(params={})=>{
      try {
        const res = await axios.get(
          `${END_POINT}/order`,{
             params: params,
            headers: { authorization: `Bearer ${accessToken}` },
          }, 
        );
        console.log(params)
          console.log(res)
        const {data} = res.data
        console.log('length',data.length)
        console.log("order",data.order)
      setTotal(data.length)
        setOrder(data.order);
        setPagination({
        pageSize: params?.pageSize,
        page: params?.page,
      });
      pushQuery(params)
      } catch (err) {
        console.log(err);
      }
    };
  
   useEffect(() => {
    fetchapi(params)
  },[params]);
 
  const [key, setKey] = useState("tất cả");
  function handleTabs(key) {
    setKey(key);
    setParams({
      ...params,
      status:key
    })
    navigate(`/tai-xe/dat-hang?status=${key}`);
  }
  const handleDate=(string)=>{
    return string.split("T")[0]
  }
  const handleStatus=(status)=>{
    if(status==="waiting"){
      return status="chờ xác nhận"
    }
    else if(status==="accepted"){
      return status="đã chấp nhận"
    }
    else if(status==="probably proceed"){
      return status="đang xử lý"
    }
    else if(status==="processing"){
      return status="đang xử lý"
    }
    else if(status==="completed"){
      return status="hoàn thành"
    }
    else if(status==="refused"){
      return status="bị từ chối"
    }
    else if(status==="cancel"){
      return status="hủy bỏ"
    }
    return;
  }
  
  return (
    <div className="">
      <div className="bg-gray-100 relative ">
          {/*  <div className="w-20 h-20">
        <img
          src="${END_POINT}/public/logo/z3189151135845_feecf773f56257376d4f14e1116d90df.jpg"
          alt="#"
          className="w-[100%] h-[100%] object-contain"
        />
      </div> */}          
          <div
            className="custom-tab  container w-[100%] px-auto  text-xl bg-white  "
            style={{ width: "100%" }}
          >
            <Tabs
              defaultActiveKey=""
              onChange={handleTabs}
              centered
              size="large"
              tabPosition="top"
              type="line"
              className="pt-1 px-2 lg:px-2"
              tabBarStyle={{ color: "#ffbb00" }}
            >
              <TabPane tab="Tất cả" key=""></TabPane>
              <TabPane tab="Chờ xác nhận" key="waiting"></TabPane>
              <TabPane tab="Chấp thuận" key="accepted"></TabPane>
              <TabPane tab="Đang giao" key="processing"></TabPane>
              <TabPane tab="Hoàn thành" key="completed"></TabPane>
              <TabPane tab="Đã hủy" key="cancel"></TabPane>
              <TabPane tab="Bị từ chối" key="refused"></TabPane>
            </Tabs>
          </div>

          <div className=" relative flex items-center text-gray-400 focus-within:text-gray-600 my-1">
            <input
              type="text"
              name="search"
              placeholder="Tìm kiếm sản phẩm,id đơn hàng"
              autoComplete="off"
              className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-xl border-none ring-2 ring-gray-300 focus:ring-yellow-500 focus:ring-2"
            />
            <IoSearchOutline className="w-5 h-5 absolute ml-4 pointer-events-none " />
          {/*   <button className=" right-0   absolute p-[6px]  font-bold items-center min-w-[70px] flex rounded-xl  bg-yellow-500 focus:ring-yellow-600   border-button_color border-2  text-[#00003B] ">Search</button> */}
          </div>

      
        {
          
          order<=0 ?
          <div className="flex justify-center mt-3 mb-4 items-center flex-col">
          <img className="w-80 h-80 mb-2" src={IMG} alt="#" />
          <div className="font-bold text-2xl">Không có đơn hàng</div>

        </div>
          : 
          order.map((orderItem,index)=>{
            return(
              <div key={index} className="flex flex-col mt-2 bg-white rounded-sm shadow-xl border-[1px]">
                <div className="  overflow-auto mb-3 w-[100%]" >
                <div className="flex justify-between items-center border-gray-300 border-b-[1px] py-2 bg-[#ffd124]">
                  <div className="flex flex-nowrap items-center mx-2">
                    <div className=" text-lg sm:text-lg font-bold ml-2 text-[#00003B]">
                      {orderItem.orderId}
                    </div>
                  </div>
                  <div className=" flex flex-nowrap items-center mx-2 flex-row">
                    <FaTruckMoving className=" sm:mr-2 mr-[2px]" />
                    <Link
                      className=" text-[10px] font-semibold sm:mr-4 sm:text-sm  hover:translate-y-[-1px] transition-all hover:text-[#00003B]  cursor-pointer "
                      to="/tai-xe/dat-hang/123"
                    >
                       {handleStatus(orderItem.status)}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center py-2 border-gray-300 border-b-[1px]">
                  <div className="ml-3 flex flex-col ">
                    <div className="ml-2 flex items-center py-1">
                      <IoLocationOutline className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                      <div className="text-base font-semibold md:text-lg mr-1">Điểm bắt đầu:</div>
                      <div className="text-base font-semibold md:text-lg">{orderItem.origin}</div>
                    </div>
                    <div className="ml-2 flex items-center py-1">
                      <IoLocationOutline className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                      <div className="text-base font-semibold md:text-lg mr-1">
                        Điểm đến:
                      </div>
                      <div className="text-base font-semibold md:text-lg">{orderItem.destination}</div>
                    </div>
                    <div className="ml-2 flex items-center py-1">
                      <AiTwotoneCalendar className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                      <div className="text-base font-semibold md:text-lg mr-1">
                        Ngày tạo đơn:
                      </div>
                      <div className="text-base font-semibold md:text-lg" >{handleDate(`${orderItem.createdAt}`)}</div>
                    </div>
                  </div>
                </div>
  
                <div className="flex justify-end  sm:mr-4 mb-1 mt-[16px]">
   
                  <div className="flex justify-end mb-1 mr-2">
                    <Link className=" " to={`/tai-xe/dat-hang/don-hang/${orderItem._id}`} >
                      <button  className="p-2 ml-3 font-bold items-center max-w-[140px] flex  bg-yellow-500  border-button_color border-2  hover:translate-y-[-1px] transition-all text-[#00003B] rounded-sm">
                        <BiTargetLock />
                        <div>Tra hành trình</div>
                      </button>
                    </Link>
                  </div>
                  <div className="flex justify-end mb-1 mr-2">
                    <Link className=" " to={`/tai-xe/dat-hang/${orderItem.orderId}`}>
                      <button className="p-2 ml-3 font-bold max-w-[140px] items-center flex  bg-yellow-500  border-button_color border-2  hover:translate-y-[-1px] transition-all text-[#00003B] rounded-sm">
                        <MdOutlineEditCalendar className="mr-1" />
                        <div> Chi tiết đơn</div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>  
            </div>
         )
         
           })
        
        } 
      </div>
          <div className="flex justify-center mt-2 mb-3 items-center">
            <Pagination  defaultCurrent={pagination.current} onChange={handllePage} total={total} pageSize={pagination.pageSize}/>;
          </div>
    </div>
  );
};

export default PurchaseDriver;
