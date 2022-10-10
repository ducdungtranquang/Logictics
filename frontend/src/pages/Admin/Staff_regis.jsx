import React from 'react'
import 'antd/dist/antd.css'
import { Form, Button, Input, Select, Typography, message } from "antd";
import styled from 'styled-components';
import * as axios from 'axios'
import { useContext } from 'react';
import { MainContext } from '../../context/MainContext';

const RegisForm = styled.div`
.Regis{
    display: flex;
    flex-direction:row;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    @media (max-height: 628px) {
      flex-direction: column;
    }
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

function Staff_Register() {
  const [form] = Form.useForm();

  const success = () => {
    message.success({
      content: 'Thêm nhân viên mới thành công',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  const failed400 = () => {
    message.error({
      content: 'Email hoặc số điện thoại đã tồn tại',
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
  
  let email = Form.useWatch('email', form);
  let phone = Form.useWatch('phone', form);
  let name = Form.useWatch('name', form);
  let password = Form.useWatch('password', form);
  let staff_type = Form.useWatch('staff_type', form);

  const {accessToken} = useContext(MainContext);
  const onFinish = async() => {
    try{
      const response = await axios({
        method: 'post',
        url: 'http://localhost:8000/api/admin/auth/register',
        headers: { authorization: `Bearer ${accessToken}` },
        data: {
          name: name,
          email: email,
          phone: phone,
          password: password,
          staff_type: staff_type
        }
      });
      success();
    } catch(error){
      if(error.message == "Request failed with status code 400") {
        failed400();
      }
      if(error.message == "Request failed with status code 500") {
        failed500();
      }
    }
  };

  return (
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
                    Thêm nhân viên mới
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
                    name="email"
                    label="Email"
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
                    name="phone"
                    label="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },                  
                    ]}
                    hasFeedback
                    >
                    <Input placeholder="Nhập số điện thoại" />
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
                  name="staff_type" 
                  label="Nhân viên"
                  rules={[
                    {
                      required: true,
                      message: "Xin vui lòng chọn kiểu nhân viên",
                    },
                  ]}
                  hasFeedback
                >
                  <Select placeholder="Chọn kiểu nhân viên">
                    <Select.Option value="admin">admin</Select.Option>
                    <Select.Option value="driver">driver</Select.Option>
                    <Select.Option value="shipper">shipper</Select.Option>
                    <Select.Option value="storekeeper">storekeeper</Select.Option>
                    <Select.Option value="staff">staff</Select.Option>
                  </Select>
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
  );
}

export default Staff_Register;