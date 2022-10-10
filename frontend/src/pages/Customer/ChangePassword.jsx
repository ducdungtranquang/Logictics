import React, { useEffect, useRef, useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import SideBar from "../../components/SideBarCustomer";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineEdit
} from "react-icons/ai";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../utils/constant";


const ChangePassword = () => {
     const oldPwRef = useRef(null);
  const newPwRef = useRef(null);
  const verify_passwordRef = useRef(null);
  const [eyeOp, setEyeOp] = useState(false);
  const [eyeNp, setEyeNp] = useState(false);
  const [eyeCf, setEyeCf] = useState(false);
  const [cPassword, setCPassword] = useState({
    oldPw: "",
    newPw: "",
    verify_password: "",
  });
  const { accessToken } = useContext(MainContext);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEyeOp = () => {
    setEyeOp(!eyeOp);
  };
  const handleEyeNp = () => {
    setEyeNp(!eyeNp);
  };
  const handleEyeCf = () => {
    setEyeCf(!eyeCf);
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCPassword({ ...cPassword, [name]: value });
    console.log(cPassword);
  };
  const handleCloseModal = (e) => {
    oldPwRef.current.value = "";
    newPwRef.current.value = "";
    verify_passwordRef.current.value = "";
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (handleCloseModal) {
      setIsSubmit(false);
      setCPassword({
        oldPw: "",
        newPw: "",
        verify_password: "",
      });
      setEyeOp(false);
      setEyeNp(false);
      setEyeCf(false);
      setFormErrors({});
    }
  }, [isModalVisible]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${END_POINT}/auth/change-pw` ,
        
          cPassword
        ,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      setIsSubmit(true);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.response.data.message[0]);
      setFormErrors(validate(err.response.data.message[0]));
    }
  };
  const validate = (message) => {
    const { oldPw, verify_password, newPw } = cPassword;
    const errors = {};
    if (!oldPw) {
      errors.oldPw = "Vui lòng nhập trường này";
    }
    if (oldPw && message==="c") {
      errors.oldPw = "Sai mật khẩu,vui lòng nhập lại";
    }
    if (!newPw) {
      errors.newPw = "Vui lòng nhập trường này"
    }
    if (newPw && newPw.length <= 5) {
      errors.newPw = "Mật khẩu phải trên 6-24 kí tự";
    }
    if (!verify_password) {
      errors.verify_password = "Vui lòng nhập trường này";
    }
    if (verify_password && verify_password.length <= 5) {
      errors.verify_password = "Mật khẩu phải từ 6-24 kí tự";
    }
    if (verify_password && newPw && verify_password !== newPw) {
      errors.verify_password = "Mật khẩu không trùng nhau";
    }
    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      alert("Update password success");
      setIsModalVisible(false);
      setIsSubmit(false);
      oldPwRef.current.value = "";
      newPwRef.current.value = "";
      verify_passwordRef.current.value = "";
    }
  }, [formErrors, cPassword, isSubmit]);

    return (
         <div className="  top-[20%] w-[70%] h-[65vh]  mx-auto flex justify-center items-center  ">
            <div className="relative bg-white rounded-lg shadow  h-[100%] w-[100%] lg:w-[80%] py-2 mx-1 border-[1px]">
              <div className="pb-6 pt-[6px] px-6 ">
                <h3 className="mb-3 text-2xl font-bold text-black ">
                  Thay đổi mật khẩu của bạn
                </h3>
                <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                  <div>
                    <label className="block mb-2 text-sm font-medium ">
                      Mật khẩu cũ
                    </label>
                    <div className="relative">
                      <input
                        ref={oldPwRef}
                        type={eyeOp ? "text" : "password"}
                        name="oldPw"
                        defaultValue={cPassword.oldPw}
                        onChange={handleChangePassword}
                        placeholder="Add your password"
                        className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white relative"
                      />
                      {eyeOp ? (
                        <AiOutlineEye
                          onClick={handleEyeOp}
                          className="absolute right-2 top-[10px] w-5 h-5 cursor-pointer "
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={handleEyeOp}
                          className="absolute right-2 top-[10px] w-5 h-5 cursor-pointer"
                        />
                      )}
                    </div>
                    <p className="text-red-400">{formErrors.oldPw}</p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        ref={newPwRef}
                        type={eyeNp ? "text" : "password"}
                        name="newPw"
                        defaultValue={cPassword.newPw}
                        onChange={handleChangePassword}
                        placeholder="Add your new password"
                        className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white relative"
                      />
                      {eyeNp ? (
                        <AiOutlineEye
                          onClick={handleEyeNp}
                          className="absolute right-2 top-[10px] w-5 h-5 cursor-pointer "
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={handleEyeNp}
                          className="absolute right-2 top-[10px] w-5 h-5 cursor-pointer"
                        />
                      )}
                    </div>
                    <p className="text-red-400">{formErrors.newPw}</p>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Xác nhận mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        ref={verify_passwordRef}
                        type={eyeCf ? "text" : "password"}
                        name="verify_password"
                        defaultValue={cPassword.verify_password}
                        placeholder="Confirm new password"
                        onChange={handleChangePassword}
                         className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white relative"
                      />
                      {eyeCf ? (
                        <AiOutlineEye
                          onClick={handleEyeCf}
                          className="absolute right-2 top-[10px] w-5 h-5 cursor-pointer "
                        />
                      ) : (
                        <AiOutlineEyeInvisible
                          onClick={handleEyeCf}
                          className="absolute right-2 top-[10px] w-5 h-5 cursor-pointer"
                        />
                      )}
                    </div>
                    <p className="text-red-400">{formErrors.verify_password}</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-[#00003B] bg-yellow-500 hover:bg-yellow-600 focus:outline-none  font-semibold rounded-lg text-sm px-5 py-2.5 text-center  "
                  >
                    Thay đổi
                  </button>
                </form>
              </div>
            </div>
          </div>
    );
};

export default ChangePassword;