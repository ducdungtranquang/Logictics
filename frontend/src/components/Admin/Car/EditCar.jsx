import { useContext, useState } from "react";
import { Form, Input, DatePicker, Button, Select } from "antd";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";

const { Item } = Form;
const { Option } = Select;
function EditCar({ onClose, data, refetchData }) {
  const {accessToken} = useContext(MainContext)
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  console.log("data là", dataEdit);
  const carType = (value) =>
  {
    setDataEdit({
        ...dataEdit,
        car_type: value,
      })
  }
  const acceptEditCar = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.put(`${END_POINT}/admin/car/${data._id}`, dataEdit, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      // setIsDisable(false);
      refetchData();
      onClose();
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
              Chỉnh sửa Thông tin xe
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
          >

            <Item label="Loại xe">             
              <Select 
                placeholder="Chọn loại xe"
                onChange={carType}
              >
                <Option value="8_ton">8_ton</Option>
                <Option value="20_ton">20_ton</Option>                            
              </Select>              
            </Item>
            <Item label="Dung tích">
              <Input
                type="number"
                value={dataEdit.volumn}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    volumn: e.target.value,
                  })
                }
              />
            </Item>
            <Item label="Trọng tải">
              <Input
                type="number"
                value={dataEdit.tonnage}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    tonnage: e.target.value,
                  })
                }
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
                onClick={acceptEditCar}
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

export default EditCar;
