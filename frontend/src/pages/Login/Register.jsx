import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { Form, Button, Input, Select, Typography, message, Modal } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';
import axios from 'axios'
import { END_POINT } from "../../utils/constant";

const RegisForm = styled.div`
.Regis{
    height: 150vh;
    display: flex;
    flex-direction:row;
    @media (max-width: 768px) {
      flex-direction: column;
      height: 140vh;
    }
    @media (max-height: 628px) {
      flex-direction: column;
      height: 140vh;
    }
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 50px;
    background-color: #FBAB7E;
    background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
}
.Regis-header{
    max-width: 500px;
    width: 100%;
    background-color: #fff;
    padding: 25px 30px;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.15);
    overflow:auto;
}
.ant-typography{
    font-size: 45px;
    font-weight: 500;
    position: relative;
}
.ant-input-affix-wrapper {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
}
.sign{
    text-align:right;
}`
const ButtonContainer = styled.div`
.ant-btn-primary {
    height: 100%;
    width: 100%;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #FBAB7E;
    &:hover{
        background-color: #FBAB7E;
        background-image: linear-gradient(250deg, #e3ed1f 0%, #F7CE68 100%);
    }
}`;

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const { Title } = Typography;

function Register() {
  const { setMetadata } = useContext(MainContext);
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Đăng kí | TKTL",
      };
    });
  }, []);

  const [form] = Form.useForm();
  const emailphone = Form.useWatch('email/phone', form);
  let email;
  let phone;
  (isValidEmail(emailphone)) ? email = emailphone : phone = emailphone
  let name = Form.useWatch('name', form);
  let address = Form.useWatch('address', form);
  let customer_type = Form.useWatch('customer_type', form);
  let tax = Form.useWatch('tax', form);
  let description = Form.useWatch('description', form);
  let password = Form.useWatch('password', form);
  let verify_password = Form.useWatch('confirmPassword', form);
  let verify_op;
  (email) ? verify_op = "email" : verify_op = "phone"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otp, setOtp] = useState(null);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  let navigate = useNavigate();
  //message cua otp submit
  const otp_success = () => {
    message.success({
      content: 'Đăng kí thành công',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const otp_failed400 = () => {
    message.error({
      content: 'Mã OTP không chính xác',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const otpsubmit = async () => { //submit otp
    try{
      const response = await axios({
          method: 'post',
          withCredentials: true,
          url: `${END_POINT}/auth/verify-otp`,
          data: {
              otp: otp
          }  
      });
      otp_success();
      navigate("/dang-nhap");
    } catch(error) {
        if(error.message == "Request failed with status code 400") {
          otp_failed400();
        }
        if(error.message == "Request failed with status code 500") {
          failed500();
      }
    }
  }
  //message cua otp update
  const update_success = () => {
    message.success({
      content: 'Mã OTP mới đã được gửi đến email hoặc số điện thoại của bạn',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const update_failed400 = () => {
    message.error({
      content: 'Gửi lại mã OTP gửi không thành công',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const update_failed404 = () => {
    message.error({
      content: 'Quyền xác thực không còn hiệu lực',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const otpupdate = async () => { //udate otp
    try{
      const response = await axios({
          method: 'get',
          withCredentials: true,
          url: `${END_POINT}/auth/update-otp`,
          param: {
              verify_op: verify_op
          }  
      });
      update_success();
    } catch(error) {
        if(error.message == "Request failed with status code 400") {
          update_failed400();
        }
        if(error.message == "Request failed with status code 404") {
          update_failed404();
        }
        if(error.message == "Request failed with status code 500") {
          failed500();
      }
    }
  }

  //message cua register
  const success = () => {
    message.success({
      content: 'Mã OTP đã được gửi về email hoặc số điện thoại của bạn, vui lòng nhập mã OTP để xác thực tài khoản',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const business_success = () => {
    message.success({
      content: 'Xin vui lòng đợi quản trị viên kích hoạt tài khoản của bạn',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  }
  const existed = () => {
    message.error({
      content: 'Email hoặc số điện thoại đã tồn tại',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const failed400 = () => {
    message.error({
      content: 'Đăng kí không thành công',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const failed500 = () => {
    message.error({
      content: 'Lỗi hệ thống',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const onFinish = async () => {    //submit register form
    try{
      const response = await axios({
        method: 'post',
        withCredentials: true,
        url: `${END_POINT}/auth/register`,
        data: {
          name: name,
          email: email,
          phone: phone,
          password: password,
          verify_password: verify_password,
          address: address,
          description: description,
          customer_type: customer_type,
          verify_op: verify_op
        }
      });
      if(customer_type != "business") {
        success();
        handleShowModal();
      }
      else {
        business_success();
        setTimeout(() => {  navigate("/"); }, 4000);
      }
    } catch(error){
      if(error.response.data.message == "user is exist"){
        existed();
      }
      if(error.message == "Request failed with status code 400") {
        failed400();
      }
      if(error.message == "Request failed with status code 500") {
        failed500();
      }
    }
  };

  return (
    <div>
      <>   
        <div
          className={`${
            isModalVisible ? `block` : `hidden`
          } overflow-y-auto overflow-x-hidden fixed  z-50 w-full top-0 left-0   h-full bg-[#1114]`}
        >
          <div className="relative min-w-[350px] top-[15%] sm:min-w-[550px]  md:mx-auto flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 min-w-[350px] sm:min-w-[400px] mx-1 ">
              <div className="flex item-center justify-end ">
                <span
                  className="cursor-pointer mr-1 text-2xl"
                  onClick={handleCloseModal}
                >
                  X
                </span>
              </div>

              <div className="pb-6 pt-[6px] px-6 ">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white ">
                  Vui lòng nhập mã OTP, mã sẽ hết hạn sau 1 phút
                </h3>
                <form className="space-y-4" >
                  <div>
                    <div className="relative">
                      <input                                         
                        placeholder="Nhập mã OTP"   
                        name="OTP"           
                        onChange={(e) => setOtp(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white relative"
                      />                    
                    </div>                 
                  </div>

                  <div className="text-right dark:text-white">
                      Mã hết hạn?
                      <span className="font-semibold text-blue-700">
                        <Button type="link" onClick={otpupdate}>Gửi lại OTP</Button>
                      </span>
                  </div>

                  <ButtonContainer>
                    <Button block type="primary" onClick={otpsubmit}>
                      Xác nhận
                    </Button>
                  </ButtonContainer>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
      <RegisForm> 
          <div className="Regis">
            <div className="Regis-header">
              <Form
                  form ={form}
                  autoComplete="off"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }}
                  onFinish={(onFinish)}
                  onFinishFailed={(error) => {
                    console.log({ error });
                  } }
              >
                  <Title level={2} className="text-center">
                      Đăng kí
                  </Title>

                  <Form.Item
                      name="name"
                      label="Tên tài khoản"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên tài khoản",
                        },
                      ]}
                      hasFeedback
                  >
                      <Input placeholder="Nhập tên tài khoản" />
                  </Form.Item>

                  <Form.Item
                      name="email/phone"
                      label="Email/Phone"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email hoặc số điện thoại",
                        },                  
                      ]}
                      hasFeedback
                      >
                      <Input placeholder="Nhập email hoặc số điện thoại" />
                  </Form.Item>

                  <Form.Item
                      name="password"
                      label="Mật khẩu"
                      rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu",
                          },
                          { 
                            min: 6,
                            message: "Mật khẩu phải dài hơn 6 chữ số",
                          },
                          {
                            max: 24,
                            message: "Mật khẩu chỉ được tối đa 24 chữ số",
                          },
                      ]}
                      hasFeedback
                  >
                    <Input.Password placeholder="Nhập mật khẩu" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Mật khẩu không khớp"
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "Mật khẩu không khớp"
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Xác nhận mật khẩu" />
                  </Form.Item>

                  <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Nhập địa chỉ" />
                  </Form.Item>


                  <Form.Item 
                    name="customer_type" 
                    label="Khách hàng"
                    rules={[
                      {
                        required: true,
                        message: "Xin vui lòng chọn loại khách hàng",
                      },
                    ]}
                    hasFeedback
                  >
                    <Select placeholder="Chọn loại khách hàng">
                      <Select.Option value="intermediary">Trung gian</Select.Option>
                      <Select.Option value="business">Doanh nghiệp</Select.Option>
                      <Select.Option value="passers">Khách vãng lai</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="tax"
                    label="Mã số thuế"
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, tax) {
                          if ((tax && getFieldValue("customer_type") === "business") || getFieldValue("customer_type") === "passers" || getFieldValue("customer_type") === "intermediary") {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "Vui lòng nhập mã số thuế nếu là doanh nghiệp"
                          );
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Nhập mã số thuế" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ span: 24 }}>
                      <div className='sign'>
                          Bạn đã có tài khoản?  
                          <Link to="/dang-nhap" className="font-semibold text-blue-700">
                              Đăng nhập
                          </Link>
                      </div>
                  </Form.Item>

                  <Form.Item wrapperCol={{ span: 24 }}>
                      <ButtonContainer>
                          <Button block type="primary" htmlType="submit">
                              Đăng ký
                          </Button>
                      </ButtonContainer>
                  </Form.Item>
              </Form>
            </div>
          </div>
      </RegisForm>
    </div>
  );
}

export default Register;