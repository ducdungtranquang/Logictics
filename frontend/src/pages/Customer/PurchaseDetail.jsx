import React, { useContext, useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import SideBar from "../../components/SideBarCustomer";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineGift, AiOutlineUser, AiOutlineInbox } from "react-icons/ai";
import { TbSteeringWheel } from "react-icons/tb";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { BsCoin } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";
const PurchaseDetail = () => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [receiver, setReceiver] = useState(null);
  const [service, setService] = useState(null);
  const [product, setProduct] = useState(null);
  const [orders,setOrders] = useState(null);
  const location = useLocation();
  const params = useParams()
  const handleOpen = () => {
    setOpen(!open);     
    console.log(open);
  };
   const {accessToken} = useContext(MainContext)
  useEffect(() => {
    console.log(params.id)
    const getDetailOrder = async()=>{
      try{
      const res = await axios.get(`${END_POINT}/order/${params.id}`,{
          headers: { authorization: `Bearer ${accessToken}` }
      })
      const  {data} =res.data
      console.log(data)   
      setOrders(data[0])
      const {customer,receiver,service,orderId,total_price} =data[0]
      if(data){   
        getCustomer(customer)
        getService(service)
        getProduct(orderId)
      }
    }
    catch(err){
        console.log(err)
      }
    }
    getDetailOrder()
    const getCustomer = async(customer)=>{
      try{
      const rescustomer = await axios.get(`${END_POINT}/customer?id=${customer}`,{
          headers: { authorization: `Bearer ${accessToken}` }
      })
       const {data} =rescustomer.data
       const res = data[0]
       console.log("cus",res)
       setCustomer(res)
      }catch(err){
        console.log(err)
      }
    }
    const getService = async(service)=>{
      try{  
        const resservice = await axios.get(`${END_POINT}/service/${service}`,{
          headers: { authorization: `Bearer ${accessToken}` }
        })
       const {data} =resservice.data
       console.log("ser",data)
       setService(data)
       
      }catch(err){
        console.log(err)
      }
    }
    const getProduct = async(orderId)=>{
       try{  
         const resproduct = await axios.get(`${END_POINT}/product/${orderId}`,{
           headers: { authorization: `Bearer ${accessToken}` }
         })
        const {data} =resproduct.data
        console.log(resproduct)
        console.log("prod",data[0])
        setProduct(data[0])
        
       }catch(err){
         console.log(err)
       }
     }
   getCustomer()
   getService()
   getProduct()
  },[]);
  const order = {
    formProvince: "Ho Chi Minh",
    fromDistrict: "Quan 2",
    fromWard: "Binh An",
    toProvince: "Binh Thuan",
    toDistrict: "Phan Thiet",
    toWard: "Lac Dao",
    unit: "kg",
    quantity: 1,
    serviceId: "string",
    serviceName: "string",
  };
  

  return (
    <div className="">
      <div className="bg-gray-100 relative ">
      
       {/*  <div className=" sm:mx-20 lg:mx-52 py-4 bg-gray-white mx-2 mb-2 "> */}
          <div className="flex flex-col mt-2 bg-white rounded-sm shadow-lg mb-3 ">
            <div className="  overflow-auto mb-3">
              <div className="flex justify-between items-center border-gray-300 border-b-[1px] py-2  bg-yellow-400 ">
                <div className="flex flex-nowrap items-center mx-2">
                  <div className=" text-lg sm:text-lg font-bold ml-2 text-[#00003B]">
                    Người gửi
                  </div>
                </div>
                <div className=" flex flex-nowrap items-center mx-2 flex-row"></div>
              </div>
              <div className="flex items-center py-2 border-gray-300 border-b-[1px]">
                <div className="ml-3 flex flex-col ">
                  <div className="ml-2 flex items-center py-1">
                    <AiOutlinePhone className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                    <div className="text-base md:text-lg mr-1">Điện thoại:</div>
                    <div className="text-base md:text-lg">08279372 </div>
                  </div>
                  <div className="ml-2 flex items-center py-1">
                    <AiOutlineUser className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                    <div className="text-base md:text-lg mr-1">
                      Tên người gửi:
                    </div>
                    <div className="text-base md:text-lg">{customer?.name}</div>
                  </div>
                  <div className="ml-2 flex items-center py-1">
                    <div>
                      <IoLocationOutline className="mr-1 w-5 h-5 md:w-7 md:h-7" />
                    </div>
                    <div className="text-base md:text-lg mr-1">Địa điểm :</div>
                    <div className="text-base md:text-lg">
                     {customer?.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2 bg-white rounded-sm shadow-lg mb-3 ">
            <div className="  overflow-auto mb-3">
              <div className="flex justify-between items-center border-gray-300 border-b-[1px] py-2  bg-yellow-400 ">
                <div className="flex flex-nowrap items-center mx-2">
                  <div className=" text-lg sm:text-lg font-bold ml-2 text-[#00003B]">
                    Người nhận
                  </div>
                </div>
                <div className=" flex flex-nowrap items-center mx-2 flex-row"></div>
              </div>
              <div className="flex items-center py-2 border-gray-300 border-b-[1px]">
                <div className="ml-3 flex flex-col ">
                  <div className="ml-2 flex items-center py-1">
                    <AiOutlinePhone className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                    <div className="text-base md:text-lg mr-1">Điện thoại:</div>
                    <div className="text-base md:text-lg">09372239</div>
                  </div>
                  <div className="ml-2 flex items-center py-1">
                    <AiOutlineUser className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                    <div className="text-base md:text-lg mr-1">
                      Tên người nhận:
                    </div>
                    <div className="text-base md:text-lg">Nguyễn Văn Trí</div>
                  </div>
                  <div className="ml-2 flex items-center py-1">
                    <div>
                      <IoLocationOutline className="mr-1 w-5 h-5 md:w-7 md:h-7" />
                    </div>
                    <div className="text-base md:text-lg mr-1">Địa điểm:</div>
                    <div className="text-base md:text-lg">
                      12/B phường An Khánh
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/*   {
            product?.map(product=>(

            )) }*/}
          <div className="flex flex-col mt-2 bg-white rounded-sm shadow-lg mb-3">
            <div className="  overflow-auto mb-3">
              <div className="flex justify-between items-center border-gray-300 border-b-[1px] py-2 bg-yellow-400">
                <div className="flex flex-nowrap items-center mx-2">
                  <div className="  text-lg sm:text-lg font-bold ml-2 text-[#00003B] display:">
                    Thông tin hàng hóa
                  </div>
                </div>
                <div className=" flex flex-nowrap items-center mx-2 flex-row"></div>
              </div>
              <div className="flex items-center py-2 border-gray-300 border-b-[1px]">
                <div className="ml-3 flex flex-col ">
                  <div className="ml-2 flex items-center py-1">
                    <AiOutlineGift className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                    <div className="text-base md:text-lg mr-1">
                      Nội dung hàng hóa:
                    </div>
                    <div className="text-base md:text-lg ">{product?.name}</div>
                  </div>
                 {/*  <div className="ml-2 flex items-center py-1">
                    <AiOutlineInbox className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                    <div className="text-base md:text-lg mr-1">
                      Loại hàng hóa:
                    </div>
                    <div className="text-base md:text-lg">Hàng hóa</div>
                  </div> */}
                  <div className="ml-2 flex items-center py-1">
                    <div>
                      <GiWeight className="mr-1 w-5 h-5 md:w-7 md:h-7" />
                    </div>
                    <div className="text-base md:text-lg mr-1">Khối lượng:</div>
                    <div className="text-base md:text-lg">{product?.quantity}{product?.unit}</div>
                  </div>
                 {/*  <div className="ml-2 flex items-center py-1">
                    <div>
                      <BsCoin className="mr-1 w-5 h-5 md:w-7 md:h-7" />
                    </div>
                    <div className="text-base md:text-lg mr-1">
                      Giá trị hàng hóa:
                    </div>
                    <div className="text-base md:text-lg">1.000.000 đ</div>
                  </div> */}

                  <div className="ml-2 flex items-center py-1">
                    <div>
                      <FaRegMoneyBillAlt className="mr-1 w-5 h-5 md:w-7 md:h-7" />
                    </div>
                    <div className="text-base md:text-lg mr-1">Tổng tiền:</div>
                    <div className="text-base md:text-lg">{orders?.total_price} đ</div>
                  </div>
                  <div className="ml-2 flex items-center py-1">
                    <TbSteeringWheel className="mr-1 w-5 h-5  md:w-7 md:h-7 " />
                    <div className="text-base md:text-lg mr-1">Dịch vụ:</div>
                    <div className="text-base md:text-lg ">J&T {service?.name}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          
      </div>
  );
};

export default PurchaseDetail;
