import { Button, Checkbox, Form, Input } from "antd";
import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { TOKEN } from "./adminToken";
import { useEffect } from "react";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";
export default function AdminContactUs() {
  const { accessToken } = useContext(MainContext);
  const [contactState, setContactState] = useState({
    // address: "string",
    // phone: "phone",
    // email: "email@gmail.com",
    // facebook: "url",
    // instagram: "url",
    // tiktok: "url",
    // youtube: "url",
  });
  const callContactData = async () => {
    try {
      const result = await axios({
        url: `${END_POINT}/contactUs`,
        method: "get",
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(result);
      if (result.status === 200) {
        setContactState(result.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const postApi = async (values, id) => {
    try {
      const result = await axios({
        url: `${END_POINT}/admin/contactUs/`,
        method: "post",
        headers: { authorization: `Bearer ${accessToken}` },
        data: values,
      });
      console.log(result);
      if (result.status === 200) {
        // setContactState(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    callContactData();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
    alert("Thông tin được update");
    setContactState(values);
    postApi(values);
    setTimeout(callContactData(), 1000)
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    alert("vui lòng kiểm tra lại thông tin ");
  };
  const renderInput = () => {
    let inputArray = [];
    for (let [key, datavalue] of Object.entries(contactState)) {
      inputArray.push(
        <Form.Item
        style={{fontWeight:"bold"}}
          key={key}
          label={key.toUpperCase()}
          name={key}
          initialValue={datavalue}
          rules={[
            {
              required: false,
              message: `mời nhập ${key}`,
              type: key === "email" ? key : "string",
            },
          ]}
        >
          <Input style={{fontWeight:"500"}}/>
        </Form.Item>
      );
    }
    return inputArray;
  };
  return (
    <>
      <h1 className="mb-[38px]" style={{ margin: "auto", fontSize: "25px", fontWeight: "600", }}>Liên Hệ</h1>
      <Form
        name="basic"
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {renderInput()}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            style={{
              color: "",
            }}
            htmlType="submit"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
