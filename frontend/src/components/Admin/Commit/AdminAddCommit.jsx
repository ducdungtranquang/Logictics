import { Button, Form, Input, Upload } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

import React, { useState } from "react";

export default function AdminAddCommit(props) {
  const { isModalVisibleAdd, onClose } = props;
  const [addCommit, setAddCommit] = useState({
    heading: "",
    detail: "",
    file: "",
  });
  const postNewCommitAPI = async (newData) => {
    try {
      const result = await axios({
        url: "",
        method: "post",
        data: newData,
        headers: "Bearer",
      });
    } catch (error) {}
  };
  const onFinish = (values) => {
    // console.log("Success:", values);
    setAddCommit(() => {
      return { ...addCommit, heading: values.Heading, detail: values.Detail,file : values.file };
    });
    postNewCommitAPI(addCommit);
    // console.log(addCommit);
  };
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  // console.log("Upload event:", e?.fileList);

  return e?.fileList;
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
              initialValues={{
                // remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <h1 className="uppercase"> VUI LÒNG nhập commit mới </h1>
              <Form.Item
                label="Heading"
                name="Heading"
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
                label="Detail"
                name="Detail"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập chi tiết",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name={"file"} label={"file"} rules={[{
                required : true,
                message : 'upload hình mới'
              }]} valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload
                  name={"logo"}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                
                >
                  <Button icon={<UploadOutlined />}>Click to Upload new logo</Button>
                </Upload>
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
