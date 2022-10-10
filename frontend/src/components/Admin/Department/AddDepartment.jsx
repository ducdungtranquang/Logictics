import { useContext, useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";

const { Option } = Select;
const { Item } = Form;
function AddNewDepartment({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState({
    name: "",
    director: "",
    description: "",
    location: "",
    scale: "",
  });
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const getStaffList = async () => {
    try {
      const res = await axios.get(`${END_POINT}/admin/staff`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setStaffList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStaffList();
  }, []);
  const acceptAddNewDepartment = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.post(`${END_POINT}/admin/department`, data, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      setIsDisable(false);
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
              Thêm phòng ban mới
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
            autoComplete="off"
            onFinish={acceptAddNewDepartment}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Item
              label="Tên phòng ban"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên phòng ban",
                },
              ]}
            >
              <Input
                value={data.name}
                onChange={(e) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              name="direcotr"
              label="Trưởng ban"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thông tin",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                onChange={(_, option) =>
                  setData({ ...data, director: option?.value })
                }
              >
                {staffList.map((staff) => (
                  <Option value={staff._id} key={staff._id}>
                    {staff.name}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống",
                },
              ]}
            >
              <Input
                value={data.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    description: e.target.value,
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
                  message: "Vui lòng nhập địa điểm",
                },
              ]}
            >
              <Input
                value={data.location}
                onChange={(e) =>
                  setData({
                    ...data,
                    location: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Số nhân viên"
              name="scale"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số",
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: "Vui lòng chỉ nhập số",
                },
              ]}
            >
              <Input
                value={data.scale}
                onChange={(e) => {
                  setData({
                    ...data,
                    scale: e.target.value,
                  });
                }}
              />
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
                htmlType="submit"
                size="large"
                loading={loading}
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

export default AddNewDepartment;
