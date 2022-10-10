import { useContext, useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";

const { Option } = Select;
const { Item } = Form;
function EditDepartment({ onClose, data, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [dataEdit, setDataEdit] = useState(data);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  console.log("data là", dataEdit);
  console.log(staffList);
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
  const acceptEditDepartment = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.put(`${END_POINT}/admin/department/${data._id}`, dataEdit, {
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
  useEffect(() => {
    getStaffList();
  }, []);
  return (
    <>
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3">
            <span className="text-xl uppercase font-bold h-fit">
              Chỉnh sửa Phòng ban
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
            initialValues={dataEdit}
            onFinish={acceptEditDepartment}
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
              name="director"
              label="Trưởng ban"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thông tin",
                },
              ]}
            >
              <Select
                value={dataEdit.director}
                allowClear
                showSearch
                onChange={(value) =>
                  setDataEdit({ ...dataEdit, director: value })
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
                  message: "Không được bỏ trống",
                },
              ]}
            >
              <Input
                value={dataEdit.description}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
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
                  message: "Không được bỏ trống",
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
            <Item
              label="Số nhân viên"
              name="scale"
              rules={[
                {
                  required: true,
                  message: "Không được bỏ trống",
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: "Vui lòng chỉ nhập số",
                },
              ]}
            >
              <Input
                value={dataEdit.scale}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
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

export default EditDepartment;
