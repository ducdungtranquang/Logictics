import { useState, useContext } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import moment from "moment";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";
const { Option } = Select;
const { Item } = Form;
function EditCareer({ onClose, data, refetchData }) {
  const [dataEdit, setDataEdit] = useState({ ...data, _id: null });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  console.log("data là", dataEdit);
  const { accessToken } = useContext(MainContext);
  const acceptEditCareer = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.put(`${END_POINT}/admin/career/${data._id}`, dataEdit, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      // setIsDisable(false);
      refetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3">
            <span className="text-xl uppercase font-bold h-fit">
              Chỉnh sửa công việc
            </span>
            <Button
              size="large"
              disabled={isDisable}
              className={
                !isDisable &&
                "hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
              }
              onClick={onClose}
            >
              x
            </Button>
          </div>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            autoComplete="off"
            initialValues={{
              ...dataEdit,
              deadline:moment(dataEdit.deadline)
            }}
            onFinish={acceptEditCareer}
          >
            <Item
              label="Tên công việc"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên công việc",
                },
              ]}
            >
              <Input
                value={dataEdit.name}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    name: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Vị trí công việc"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập loại công việc",
                },
              ]}
            >
              <Input
                value={dataEdit.type}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    type: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Hạn nộp hồ sơ"
              name="deadline"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn hạn nộp",
                },
              ]}
            >
              <DatePicker
                onChange={(e, dateString) => 
                  setDataEdit({
                    ...dataEdit,
                    deadline: dateString,
                  })
                }
              />
            </Item>
            <Item
              label="Địa điểm làm việc"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nơi làm việc",
                },
              ]}
            >
              <Input
                value={dataEdit.location}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    location: e.target.value,
                  })
                }
              />
            </Item>
            <Item label="Trạng thái">
              <Select
                value={dataEdit.state}
                onChange={(value) =>
                  setDataEdit({
                    ...dataEdit,
                    state: value,
                  })
                }
              >
                <Option value="Đang mở">
                  <div className="text-green-600 font-bold">Mở</div>
                </Option>
                <Option value="Đã đóng">
                  <span className="text-red-600 font-bold">Đóng</span>
                </Option>
              </Select>
            </Item>
            <div className="flex justify-end mt-2 text-sm gap-x-6">
              <Button
                size="large"
                disabled={isDisable}
                className={
                  !isDisable &&
                  "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
                }
                onClick={onClose}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                size="large"
                loading={loading}
                htmlType="submit"
                className="rounded-lg"
              >
                Xác nhận
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditCareer;
