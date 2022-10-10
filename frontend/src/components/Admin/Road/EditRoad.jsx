import { useContext, useState } from "react";
import { Form, Input, DatePicker, Button } from "antd";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";

const { Item } = Form;
function EditRoad({ onClose, data, refetchData }) {
  const {accessToken} = useContext(MainContext)
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  console.log("data là", dataEdit);
  const acceptEditRoad = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.put(`${END_POINT}/admin/road/${data._id}`, dataEdit, {
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
              Chỉnh sửa Hành trình
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
            <Item label="Khoảng cách">
              <Input
                type="number"
                value={dataEdit.distance}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    distance: e.target.value,
                  })
                }
              />
            </Item>
            <Item label="Điểm bắt đầu">
              <Input
                value={dataEdit.origin}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    origin: e.target.value,
                  })
                }
              />
            </Item>
            <Item label="Điểm kết thúc">
              <Input
                value={dataEdit.destination}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    destination: e.target.value,
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
                onClick={acceptEditRoad}
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

export default EditRoad;
