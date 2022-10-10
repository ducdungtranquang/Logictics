import { useContext, useState } from "react";
import { Form, Button, Select, Input, InputNumber } from "antd";
import { MainContext } from "../../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
const { Item } = Form;
const { Option } = Select;
function EditApplicant({ onClose, onOk, data, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const acceptEditApplicant = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.put(`${END_POINT}/admin/applicant/${data._id}`, {status:dataEdit.state}, {
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
  console.log(dataEdit);
  return (
    <>
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div className="relative w-full md:w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3">
            <span className="text-xl uppercase font-bold h-fit">
              Chỉnh sửa ứng viên
            </span>
            <Button
              size="large"
              disabled={disable}
              className={
                !disable &&
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
            onFinish={acceptEditApplicant}
          >
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
                <Option value="approved">Duyệt</Option>
                <Option value="rejected">Loại</Option>
                <Option value="pending">Đang đợi</Option>
              </Select>
            </Item>
            <div className="flex justify-end mt-2 text-sm gap-x-6">
              <Button
                size="large"
                disabled={disable}
                className={
                  !disable &&
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

export default EditApplicant;
