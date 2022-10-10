import { useState, useEffect, useContext } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";
const { Option } = Select;
const { Item } = Form;
const { TextArea } = Input;
function AddNewCareer({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState({
    name: "",
    type: "",
    description: "",
    location: "",
    state: "Đang mở",
    bonus: "",
    deadline: "",
  });
  const [departments, setDepartments] = useState([]);
  const [idDepartment, setIdDepartment] = useState();
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  useEffect(() => {
    const fetchDepartmentsList = async () => {
      try {
        const { data: response } = await axios.get(`${END_POINT}/department`);
        setDepartments(response.data.department);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDepartmentsList();
  }, []);
  const acceptAddNewCareer = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.post(`${END_POINT}/admin/career/${idDepartment}`, data, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      setIsDisable(false);
      onClose();
      refetchData();
    } catch(error) {
      console.log(error)
    }
  };
  return (
    <>
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3">
            <span className="text-xl uppercase font-bold h-fit">
              Thêm công việc mới
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
            onFinish={acceptAddNewCareer}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
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
              name="type"
              label="Loại công việc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập loại công việc",
                },
              ]}
            >
              <Input
                value={data.type}
                onChange={(e) =>
                  setData({
                    ...data,
                    type: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              name="description"
              label="Mô tả"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả",
                },
              ]}
            >
              <TextArea
                rows={3}
                placeholder="Tối đa 1000 kí tự"
                maxLength={1000}
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
              name="deadline"
              label="Hạn nộp hồ sơ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn deadline",
                },
              ]}
            >
              <DatePicker
                placeholder="yyyy-mm-dd"
                onChange={(e, dateString) =>
                  setData({
                    ...data,
                    deadline: dateString,
                  })
                }
              />
            </Item>
            <Item
              name="location"
              label="Địa điểm làm việc"
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
              name="department"
              label="Phòng ban"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thông tin",
                },
              ]}
            >
              <Select
                allowClear
                onChange={(_, option) => setIdDepartment(() => option?.key)}
              >
                {departments.map((department) => (
                  <Option value={department.name} key={department._id}>
                    {department.name}
                  </Option>
                ))}
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

export default AddNewCareer;
