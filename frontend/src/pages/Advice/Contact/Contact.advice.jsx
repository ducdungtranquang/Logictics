import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faLocationDot, faWheelchair } from '@fortawesome/free-solid-svg-icons'
import * as axios from 'axios'
import { useContext } from "react";
import { MainContext } from "../../../context/MainContext";
import { END_POINT } from "../../../utils/constant";

export default function ContactAdvice() {
  const { setMetadata } = useContext(MainContext);
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Liên hệ | TKTL",
      };
    });
  }, []);

  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null)
  const [massage, setMassage] = useState(null)
  const [isValid, setIsValid] = useState(false);

  const [contactPhone, setContactPhone] = useState(null);
  const [contactAddress, setContactAddress] = useState(null);
  const [contactEmail, setContactEmail] = useState(null);
  const [contactFacebook, setContactFacebook] = useState(null);
  const [contactInsta, setContactInsta] = useState(null);
  const [contactTiktok, setContactTiktok] = useState(null);
  const [contactYoutube, setContactYoutube] = useState(null);
  const [hrMail, setHrMail] = useState(null);
  const getAboutUsInfo = async() =>{
    try{ 
      const info = await axios({
        method: 'get',
        url: `${END_POINT}/contactUs`,
      })   
      console.log(info);
      setContactPhone(info?.data?.data?.phone);
      setContactAddress(info?.data?.data?.address);       
      setContactEmail(info?.data?.data?.email); 
      setContactFacebook(info?.data?.data?.facebook);
      setContactInsta(info?.data?.data?.instagram);
      setContactTiktok(info?.data?.data?.tiktok);
      setContactYoutube(info?.data?.data?.youtube);
      setHrMail(info?.data?.data?.hr_mailbox);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() =>{ 
    getAboutUsInfo();
  }, []);
    
  
  const handleClick = async() => {
    if (
      !fullName ||
      !phone ||
      !email ||
      !massage
    ) {
      setIsValid(false);
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    } else {
      try{ 
        const response = await axios({
          method: 'post',
          url: `${END_POINT}/message`,
          data: {
              name: fullName,
              email: email,
              phone: phone,
              message: massage
          }  
        })   
        alert("Liên hệ thành công");
      } catch(error) {
        console.log(error);
      }
    }
    setIsValid(true);
  }

  return (
    <div className='layoutContactAdvice'>
      <div className="thumbAdvice">
        <a href="#" target="_blank">
          <img className="w-full h-full object-cover" src=" https://jtexpress.vn/storage/app/uploads/public/626/a55/4e9/626a554e9ad10644694520.png " alt="banner-tuvan" />
        </a>
      </div>
      <div className="w-full lg:w-[1111px] lg:translate-y-[-130px] mx-auto lg:rounded-[10px] bg-white" >

        <div className="flex flex-col  lg:flex-row shadow-xl lg:rounded-[10px]">
          <div className="p-4 lg:p-12 basis-1/2 ">
            <h5 className="text-[24px] text-center lg:text-left lg:text-[56px] font-bold">Liên hệ</h5>
            <span className="text-[#454F5B] mt-4 mb-8 inline-block text-center lg:text-left text-lg">
              J&amp;T Express rất vui vì được tiếp nhận liên hệ của bạn. Có bất cứ điều gì cần phản hồi/giải đáp, gửi ngay cho chúng mình bên dưới nhé!
            </span>
            <div className="text-[#161D25]">
              <form action="https://jtexpress.vn/contact" >
                <input type="hidden" name="_handler" />
                <input name="_token" type="hidden" />
                <input type="hidden" name="sendEmail" />
                <div className="text-[#161D25]">
                  <div className="flex flex-col mb-6">
                    <span className="mb-2 text-base ">
                      Họ và tên <span className="text-red-500 inline-block">*</span>
                    </span>
                    <input id="name" placeholder="Họ và tên" className="custom_input name_input text-base ml-1" type="text" name="name"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mb-6">
                    <span className="mb-2 text-base">
                      Email <span className="text-red-500 inline-block">*</span>
                    </span>
                    <input placeholder="Email" name="email" className="custom_input name_input text-base ml-1" type="text"
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="flex flex-col mb-6">
                    <span className="mb-2 text-base">
                      Số điện thoại <span className="text-red-500 inline-block">*</span>
                    </span>
                    <input placeholder="Số điện thoại" name="cellphone" className="custom_input name_input text-base ml-1" type="text"
                      onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="flex flex-col mb-6">
                    <span className="mb-2 text-base">
                      Message <span className="text-red-500 inline-block">*</span>
                    </span>
                    <textarea placeholder="Message" name="content" className="custom_textarea pt-2 name_select name_input text-base ml-1"
                      onChange={(e) => setMassage(e.target.value)} />
                  </div>
                  <button type="button" className="rounded-[2px] bg-[#e5a663] text-white h-[55px] w-full mt-6 text-xl" id="btnSubmit" onClick={handleClick}>
                    Gửi
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="bg-[#2E2E31] text-[#FFFFFF] p-4 lg:p-12 basis-1/2 rounded-r-[10px]">
            <h5 className="text-[24px] lg:text-[36px] font-bold mt-2 mb-3 text-white">Kết nối với J&amp;T Express</h5>
            <div className="flex items-start">
              <FontAwesomeIcon icon={faPhone} className="mt-2" />
              <div className="flex flex-col border-b pb-[20px] ml-3 mr-10 border-[#5D6A7A] flex-1">
                <span className=" block mb-2 text-base">
                  Hotline
                </span>
                <span className="font-bold">
                  {contactPhone}
                </span>
              </div>
            </div>
            <div className="flex items-start mt-[20px]">
              <FontAwesomeIcon icon={faEnvelope} className="mt-2" />
              <div className="flex flex-col border-b pb-[20px] ml-3 mr-10 border-[#5D6A7A] flex-1" >
                <span className="block mb-2 text-base">
                  Email
                </span>
                <span className="font-bold">
                  {contactEmail}
                </span>
              </div>
            </div>
            <div className="flex items-start mt-[20px]">
              <FontAwesomeIcon icon={faEnvelope} className="mt-2" />
              <div className="flex flex-col border-b pb-[20px] ml-3 mr-10 border-[#5D6A7A] flex-1" >
                <span className="block mb-2 text-base">
                  HR email
                </span>
                <span className="font-bold">
                  {hrMail}
                </span>
              </div>
            </div>
            <div className="flex items-start mt-[20px]">
              <FontAwesomeIcon icon={faLocationDot} className="mt-2" />
              <div className="flex flex-col border-b pb-[20px] ml-3 mr-10 border-[#5D6A7A] flex-1">
                <span className="text-base block mb-2">
                  Địa chỉ liên hệ
                </span>
                <span className="font-bold">
                  {contactAddress}
                </span>
              </div>
            </div>
            <h5 className="text-[24px] lg:text-[36px]  text-white mt-2 mb-3"> Mạng xã hội</h5>
            <div className="flex mb-2">
              <a href={contactFacebook} target="_blank">
                <img src="https://jtexpress.vn/themes/jtexpress/assets/images/facebook.png" alt="facebook" />
              </a>
              <a href={contactInsta} target="_blank">
                <img src="https://jtexpress.vn/themes/jtexpress/assets/images/Instagram.png" alt="Instagram" />
              </a>
              <a href={contactTiktok} target="_blank">
                <img src="https://jtexpress.vn/themes/jtexpress/assets/images/tiktok.png" alt="tiktok" />
              </a>
              <a href={contactYoutube} target="_blank">
                <img src="https://jtexpress.vn/themes/jtexpress/assets/images/YT.png" alt="YT" />
              </a>
            </div>
            <div className="relative h-full lg:h-[276px]">
              <img src="https://jtexpress.vn/themes/jtexpress/assets/images/mapininfo.png" className="w-full h-full object-cover" alt="mapininfo" />
              <img className="w-[176px] absolute bottom-0 left-0" src="https://jtexpress.vn/themes/jtexpress/assets/images/logo.svg" alt srcSet />
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
