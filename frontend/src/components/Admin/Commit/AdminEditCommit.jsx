import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import React from "react";

export default function AdminEditCommit(props) {
  const { isModalVisibleEdit, onClose, infor, setEditCommitInfor } = props;

  const postNewCommitAPI = async (newData, id) => {
    try {
      const result = await axios({
        url: `url${id}`,
        method: "post",
        data: newData,
        headers: "Bearer",
      });
      if (result.status === 200) {
        alert("cap nhập thành công");
        onClose();
      }
    } catch (error) {}
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    // console.log("Upload event:", e?.fileList);
    return e?.fileList;
  };
  const onFinish = (values) => {
    // console.log("Success:", values);
    setEditCommitInfor(() => {
      if (values.logo) {
        infor.logo = values.logo;
      }
      return { ...infor, heading: values.Heading, detail: values.Detail };
    });
    console.log(infor);
    // send new commit to backend
    postNewCommitAPI(infor, infor.id);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {isModalVisibleEdit && (
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
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <h1 className="uppercase"> VUI LÒNG nhập chỉnh sửa commit </h1>
              <Form.Item
                label="Heading"
                name="Heading"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập tiêu đề",
                  },
                ]}
                initialValue={infor.heading}
                onChange={(e) =>
                  setEditCommitInfor(() => {
                    return { ...infor, heading: e.target.value };
                  })
                }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Detail"
                name="Detail"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập chi ",
                  },
                ]}
                initialValue={infor.detail}
                onChange={(e) =>
                  setEditCommitInfor(() => {
                    return { ...infor, detail: e.target.value };
                  })
                }
              >
                <Input />
              </Form.Item>

              <Form.Item name={"logo"} label={"logo"} valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload
                  name={"logo"}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  defaultFileList={[
                    {
                      // uid: "-",
                      name: "defaul-logo",
                      // status: "done",
                      // url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                      thumbUrl: infor.logo,
                    },
                  ]}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload ne logo</Button>
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
