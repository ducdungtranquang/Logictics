import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as axios from "axios";
import {
  faPhone,
  faEnvelope,
  faUser,
  faCartShopping,
  faBoxesStacked,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  getProvincesWithDetail,
  getProvinces,
  getWardsByDistrictCode,
  getDistrictsByProvinceCode,
} from "sub-vn";
import { useContext } from "react";
import { MainContext } from "../../../context/MainContext";
import { END_POINT } from "../../../utils/constant";

export default function SignUpForAdvice() {
  const { setMetadata } = useContext(MainContext);
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Tư vấn | TKTL",
      };
    });
  }, []);

  const [provincesTo, setProvincesTo] = useState([]);
  const [districtsTo, setDistrictsTo] = useState([]);
  const [wardsTo, setWardsTo] = useState([]);

  const [provinceCodeTo, setProvinceCodeTo] = useState(null);
  const [districtCodeTo, setDistrictCodeTo] = useState(null);
  const [wardCodeTo, setWardCodeTo] = useState(null);

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const [service, setService] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [prodName, setProdName] = useState(null);
  const [prodQuantity, setProdQuantity] = useState(null);
  const [fullAddress, setFullAddress] = useState(null);

  const [isValid, setIsValid] = useState(false);

  // =================== TO EFFECT =======================//
  // get all provinces
  useEffect(() => {
    setProvincesTo(getProvinces());
  }, []);

  // get all districts by province code
  useEffect(() => {
    setDistrictsTo(getDistrictsByProvinceCode(provinceCodeTo));
  }, [provinceCodeTo]);

  // get all wards by district code
  useEffect(() => {
    setWardsTo(getWardsByDistrictCode(districtCodeTo));
  }, [districtCodeTo]);

  //get province, district, ward name
  useEffect(() => {
    for(let i = 0; i < provincesTo?.length; i++)
      if(provinceCodeTo == provincesTo[i].code)
        setProvince(provincesTo[i].name)     
  })
  useEffect(() => {
    for(let i = 0; i < districtsTo?.length; i++)
      if(districtCodeTo == districtsTo[i].code)
        setDistrict(districtsTo[i].name)     
  })
  useEffect(() => {
    for(let i = 0; i < wardsTo?.length; i++)
      if(wardCodeTo == wardsTo[i].code)
        setWard(wardsTo[i].name)     
  })
  //get full address
  useEffect(() => {
    let fAddress = address + " " + ward + " " + district + " " + province ;
    setFullAddress(fAddress);
  })

  const handleSubmit = () => {
    // check empty field
    if (
      !service ||
      !provinceCodeTo ||
      !districtCodeTo ||
      !wardCodeTo ||
      !fullName ||
      !phone ||
      !email ||
      !address ||
      !prodName ||
      !prodQuantity
    ) {
      setIsValid(false);
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    } else {
      postConsultant();
    }
    setIsValid(true);
  };

  const postConsultant = async() => {
    try{
      const response = await axios({
        method: 'post',
        url: `${END_POINT}/consultancy`,
        data: {
          service: service,
          name: fullName,
          email: email,
          phone: phone,
          fulladdress: fullAddress,
          parcel: prodName,
          quantity: prodQuantity
        }
      });
      alert("đăng kí tư vấn thành công");
    } catch(error){
      console.log(error);
      alert("đăng kí tư vấn không thành công");
    }
  }

  return (
    <div className="layoutAdvice">
      <div className="thumbAdvice">
        <a href="#" target="_blank">
          <img
            className="w-full h-full object-cover"
            src=" https://jtexpress.vn/storage/app/uploads/public/626/a55/4e9/626a554e9ad10644694520.png "
            alt="banner-tuvan"
          />
        </a>
      </div>
      <div className="w-full lg:w-[1111px] lg:translate-y-[-130px] mx-auto lg:rounded-[10px] bg-white">
        <div className="rounded-b-[10px] shadow shadow-[#c2bacc66] lg:px-16 lg:py-16 px-4 ">
          <h5 className="text-[24px] lg:text-[42px] text-center lg:text-left font-bold pt-6 lg:pt-0 lg:pb-6">
            Đăng ký tư vấn
          </h5>
          <form
            className="form-consultant"
            style={{ overflow: "hidden !important" }}
          >
            <div className=" lg:border-t-2 border-[#F2F2F2] lg:pb-10 lg:pt-6">
              <div className="flex flex-col items-start">
                <span className="font-bold text-[#fcd535] uppercase hidden lg:block text-xl">
                  Dịch vụ J&amp;T
                </span>
                <span className=" text-[#161D25] text-lg lg:text-[#8A8E92] lg:w-[350px] lg:text-[14px] block my-4 lg:my-0 ">
                  Chọn một trong các dịch vụ J&amp;T Express đang cung cấp
                </span>
              </div>
              <div className>
                <div className="lg:gap-x-[20px] mb-4 lg:mb-0 mt-5">
                  <div className="flex items-center mb-4">
                    <input
                      id="service-1"
                      type="radio"
                      value="express"
                      name="services"
                      onChange={(e) => setService(e.target.value)}
                    />
                    <label className="text-lg"> J&amp;T Express</label>
                  </div>
                  <div className="flex items-center mb-4 ">
                    <input
                      id="service-2"
                      type="radio"
                      value="fast"
                      name="services"
                      onChange={(e) => setService(e.target.value)}
                    />
                    <label className="text-lg"> J&amp;T Fast</label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="service-3"
                      type="radio"
                      value="super"
                      name="services"
                      onChange={(e) => setService(e.target.value)}
                    />
                    <label className="text-lg"> J&amp;T Super</label>
                  </div>
                </div>
              </div>
            </div>
            <div className=" lg:border-t-2 border-[#F2F2F2] lg:pb-10 lg:pt-6">
              <div className="flex flex-col">
                <span className="font-bold text-[#fcd535] uppercase block mb-3 lg:mb-0 text-xl">
                  Thông tin người gửi
                </span>
                <span className="text-[#8A8E92] w-[280px] text-[14px] hidden lg:block text-lg">
                  Nhập thông tin chi tiết người gửi hàng hóa
                </span>
              </div>
              <div>
                <div className="mb-4">
                  <span className="text-[16px] text-[#161D25] text-xl ml-2">
                    Họ và tên *
                  </span>
                  <div className="flex items-center border  px-2 w-full rounded-[2px] border-[#ced4da] h-[43px]">
                    <FontAwesomeIcon icon={faUser} />
                    <input
                      className="name_input bg-transparent focus:outline-none ml-2 w-full "
                      name="fullname"
                      id="fullname"
                      placeholder="Họ và tên"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-x-[20px] lg:mb-6 items-center justify-center">
                  <div className="w-full mb-4 lg:mb-0">
                    <span className="text-[16px] text-[#161D25] text-lg ml-2">
                      Số điện thoại *
                    </span>
                    <div className="flex items-center border  px-2 w-full rounded-[2px] border-[#ced4da] h-[43px]">
                      <FontAwesomeIcon icon={faPhone} />
                      <input
                        name="phone"
                        id="phone"
                        className="name_input bg-transparent focus:outline-none ml-2 w-full "
                        placeholder="Số điện thoại"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full mb-6 lg:mb-0">
                    <span className="text-[16px] text-[#161D25] ml-1">
                      Email
                    </span>
                    <div className="flex items-center border  px-2 w-full rounded-[2px] border-[#ced4da] h-[43px]">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <input
                        className="name_input bg-transparent focus:outline-none ml-2 w-full "
                        name="email"
                        id="email"
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" lg:border-t-2 border-[#F2F2F2] lg:pb-10 lg:pt-6">
              <div className="flex flex-col">
                <span className="font-bold text-[#fcd535] uppercase block mb-3 lg:mb-0 text-xl ">
                  Địa chỉ người gửi
                </span>
                <span className="text-[#8A8E92] w-[280px] text-[14px] hidden lg:block text-lg">
                  Nhập địa chỉ chi tiết của người gửi hàng hóa
                </span>
              </div>
              <div className="overflow-hidden mt-5 lg:border border-[#edeff1] p-2">
                <div className="flex flex-col lg:flex-row lg:gap-x-[20px] lg:mb-4 ">
                  <div className="w-full mb-4 lg:mb-0">
                    <span className="text-[16px] text-[#161D25] ml-1">
                      Tỉnh/Thành phố
                    </span>
                    <div className="w-full  h-[43px]">
                      <select
                        name="province_id"
                        id="dropdown-province"
                        className="h-full w-full "
                        onChange={(e) => setProvinceCodeTo(e.target.value)}
                      >
                        <option data-select2-id="select2-data-81-rsyi" value="">
                          Tỉnh/ Thành phố
                        </option>

                        {provincesTo?.length > 0 &&
                          provincesTo.map((province) => (
                            <option
                              className="text-[#161D25]"
                              value={province.code}
                              key={province.code}
                            >
                              {province.name}                             
                            </option>
                          ))}
                      </select>
                      <span style={{ width: 275 }}>
                        <span className="selection">
                          <span>
                            <span className="select2-selection__arrow">
                              <b />
                            </span>
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="w-full mb-4 lg:mb-0">
                    <span className="text-[16px] text-[#161D25] ml-1">
                      Quận/huyện
                    </span>
                    <div className="w-full h-[43px]">
                      <select
                        className=" h-full w-full "
                        onChange={(e) => setDistrictCodeTo(e.target.value)}
                      >
                        <option value="">Quận/ Huyện</option>

                        {districtsTo?.length > 0 &&
                          districtsTo.map((district) => (
                            <option
                              className="text-[#161D25]"
                              value={district.code}
                              key={district.code}
                            >
                              {district.name}
                            </option>
                          ))}
                      </select>
                      <span style={{ width: 275 }}>
                        <span className="selection">
                          <span>
                            <span className="select2-selection__arrow">
                              <b />
                            </span>
                          </span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-4 lg:mb-6">
                  <span className="text-[16px] text-[#161D25] ml-1">
                    Phường/xã
                  </span>
                  <div className="w-full  h-[43px]">
                    <select
                      id="dropdown-ward"
                      name="ward_id"
                      className=" h-full w-full "
                      onChange={(e) => setWardCodeTo(e.target.value)}
                    >
                      <option data-select2-id="select2-data-154-1nut" value="">
                        Phường/ Xã
                      </option>

                      {wardsTo?.length > 0 &&
                        wardsTo.map((ward) => (
                          <option
                            className="text-[#161D25]"
                            value={ward.code}
                            key={ward.code}
                          >
                            {ward.name}
                          </option>
                        ))}
                    </select>
                    <span style={{ width: 570 }}>
                      <span className="selection">
                        <span>
                          <span className="select2-selection__arrow">
                            <b />
                          </span>
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-[16px] text-[#161D25] ml-2">
                    Địa chỉ đầy đủ
                  </span>
                  <div className="flex items-center border border-[#ced4da] px-2 w-full rounded-[2px] h-[43px]">
                    <input
                      className=" bg-transparent focus:outline-none  w-full"
                      name="address"
                      placeholder="Địa chỉ đầy đủ"
                      type="text"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className=" lg:border-t-2 border-[#F2F2F2] lg:pb-8 lg:pt-6">
              <div className="flex flex-col">
                <span className="font-bold text-[#fcd535] uppercase block mb-3 lg:mb-0 text-xl">
                  Thông tin hàng hóa gửi đi
                </span>
                <span className="text-[#8A8E92] w-[280px] text-[14px] hidden lg:block text-lg">
                  Nhập thông tin chi tiết hàng hóa được gửi đi
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] mb-4 items-center justify-center">
                <div className="w-full">
                  <span className="text-[16px] text-[#161D25] ml-2">
                    Tên hàng hóa
                  </span>
                  <div className="flex items-center border px-2 w-full rounded-[2px] border-[#ced4da] h-[43px]">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <input
                      className=" bg-transparent focus:outline-none ml-2 w-full "
                      type="text"
                      name="goods_name"
                      placeholder="Tên hàng hóa"
                      onChange={(e) => setProdName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <span className="text-[16px] text-[#161D25] ml-2">
                    Số lượng hàng hóa/tháng
                  </span>
                  <div className="flex items-center border px-2 w-full rounded-[2px] border-[#ced4da] h-[43px]">
                    <FontAwesomeIcon icon={faBoxesStacked} />
                    <input
                      min={0}
                      className=" bg-transparent focus:outline-none ml-2 w-full"
                      type="number"
                      name="goods_amount"
                      placeholder="Số lượng hàng hóa/tháng"
                      onChange={(e) => setProdQuantity(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-[40px] lg:pb-0" onClick={handleSubmit}>
              <div />
              <div className="w-full">
                <button
                  type="button"
                  className="flex items-center justify-center text-white font-bold bg-[#e5a663] h-[55px] w-full text-center"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <span className="ml-2">Đăng ký tư vấn</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
