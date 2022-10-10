import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import { AiOutlineCheckCircle } from "react-icons/ai";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
export default function Service() {
  const { setMetadata } = useContext(MainContext);
  const [services,setServices] = useState([])


   useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Dịch vụ | TKTL",
      };
    });
    
  }, []);
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

  return (
    <div className="overflow-hidden">
      <section>
        <div className="h-full   md:h-[650px] lg:h-[700px] w-full  pt-12">
          <img
            className="w-full h-full  object-cover"
            src="https://jtexpress.vn/themes/jtexpress/assets/images/overplan.png"
            alt=""
          />
        </div>
        <div className="text-left md:mx-7 mx-3 mt-2">
          <h1 className="text-[30px] mb-[12px] font-bold text-[#f0b90c]">
            Tổng quan dịch vụ
          </h1>
          <span className="  text-base md:text-lg text-justify">
            Sở hữu những ưu điểm vượt trội so với các dịch vụ chuyển phát nhanh
            hiện có trên thị trường, J&amp;T Express thấu hiểu mọi nhu cầu và
            mang đến cho khách hàng 5 dịch vụ với những tiện ích đặc biệt nhất.
          </span>
        </div>
      </section>
      {
        services?.map(service=>(

        <section>
          <div className="h-full sm:h-[500px] md:h-[620px] lg:h-[700px] w-full  pt-10">
            <img
              className=" w-full h-full object-cover "
              src={`${END_POINT}/public/${service?.banner}`}
              alt="#"
            />
          </div>
          <div className="text-left md:mx-7 mx-3 mt-2 ">
            <h1 className="text-[30px] mb-[12px] font-bold text-[#f0b90c]">
               {service?.sub_detail}
            </h1>
            <span className=" text-[20px] text-justify">
              <span className="inline-block mt-4 mb-10 ">
                <p>
                 {service?.target}
                </p>
              </span>
            </span>
          </div>
        </section>
        ))
      }

      <section className="mt-5">
        <div className="relative overflow-hidden w-full h-[414px]">
          <img
            className="  w-full h-full object-cover "
            src="https://jtexpress.vn/themes/jtexpress/assets/images/sec7inservice.png"
            alt=""
          />
          <img
            className="  object-cover w-full md:w-auto h-full z-10 absolute bottom-[-10px] left-[50%] translate-x-[-50%]"
            src="https://jtexpress.vn/themes/jtexpress/assets/images/insec7service.png"
            alt=""
          />
        </div>
        <div className="md:mx-44 sm:mx-36 mx-12 mt-2">
          <div className="text-center ">
            <h1 className="text-[28px] mb-[8px] font-bold text-[#f0b90c]">
              Tải ứng dụng TKTL
            </h1>
            <span className="  text-base md:text-lg text-justify">
              Tải ngay App TKTL - Giao Hàng Nhanh. Hưởng trọn bộ tính
              năng giao hàng chỉ với 1 chạm
            </span>
          </div>
          <div className="flex items-center flex-col mt-5 ">
            <div className="flex flex-row items-center ">
              <Link
                className="w-[134px] h-[40px] my1920:w-[198px] my1920:h-[57px] mr-4"
                to="https://apps.apple.com/us/app/j-t-vnm-vip/id1474072185"
              >
                {" "}
                <img
                  className="w-full h-full object-cover"
                  src="https://jtexpress.vn/storage/app/uploads/public/627/5ca/259/6275ca259876b348340439.png"
                  alt=""
                />
              </Link>
              <Link
                className="w-[134px] h-[40px] my1920:w-[198px] my1920:h-[57px]"
                to="https://play.google.com/store/apps/details?id=com.msd.VIPyueNanClient&hl=vi&gl=US"
              >
                <img
                  className="w-full h-full object-cover"
                  src="https://jtexpress.vn/storage/app/uploads/public/627/5ca/bd7/6275cabd7222d202962202.png"
                  alt="ch-play"
                />
              </Link>
            </div>
            <div className="flex items-center flex-col">
              <img
                src="https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=https://jtexpress.vn/vi/download&choe=UTF-8"
                title="Link to Download"
                className="h-[150px] w-[150px]"
                alt=""
              />
              <p className="font-bold text-base">QUÉT MÃ ĐỂ DOWNLOAD</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
