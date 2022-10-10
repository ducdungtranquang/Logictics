import { Button, Form, Input, Upload } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const { TextArea } = Input;
export default function AdminNewMessage(props) {
  const { isModalVisibleAdd, onClose } = props;
  const [addCommit, setAddCommit] = useState({
    name: "string",
    email: "string",
    phone: "string",
    message: "string",
  });
  const postNewMessage = async (newData) => {
    try {
      const result = await axios({
        url: "",
        method: "post",
        data: newData,
        headers: "Bearer",
      });
      if (result.status === 200) {
        alert("Thêm mới thành công ");
        onClose();
      }
    } catch (error) {}
  };
  const onFinish = (values) => {
    // console.log("Success:", values);
    setAddCommit(() => {
      return { ...values };
    });
    postNewMessage(addCommit);
    // console.log(addCommit);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  return (
    <>
      {isModalVisibleAdd && (
        <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
          <div className="relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={
                {
                  // remember: true,
                }
              }
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <h1 className="uppercase"> VUI LÒNG nhập Message mới </h1>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập tiêu đề",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="Phone"
                rules={[
                  {
                    required: true,
                    message: "nhập số phone",
                    type: "number/text",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập email",
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="message"
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập chi tiết",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 13,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="  bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-2 rounded-lg hover:opacity-80"
                >
                  Submit
                </Button>
                <Button
                  onClick={onClose}
                  type="primary"
                  htmlType=""
                  className=" bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg hover:opacity-80"
                >
                  Hủy
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
