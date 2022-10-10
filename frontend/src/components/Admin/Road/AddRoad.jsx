import { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";

const { Item } = Form;
function AddNewRoad({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState({
    distance: "",
    origin: "",
    destination: ""
  });
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const acceptAddNewRoad = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.post(`${END_POINT}/admin/road/create`, data, {
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
            <span className="text-xl uppercase font-bold h-fit">Thêm hành trình mới</span>
            <Button
              size="large"
              disabled={isDisable}
              className={
                !isDisable && "hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
              }
              onClick={onClose}
            >
              x
            </Button>
          </div>
          <Form
            autoComplete="off"
            onFinish={acceptAddNewRoad}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
          >
            <Item
              label="Khoảng cách"
              name="distance"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập khoảng cách",
                },
              ]}
            >
              <Input
                type="number"
                value={data.distance}
                onChange={(e) =>
                  setData({
                    ...data,
                    distance: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Điểm bắt đầu"
              name="origin"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập điểm bắt đầu",
                },
              ]}
            >
              <Input
                value={data.origin}
                onChange={(e) =>
                  setData({
                    ...data,
                    origin: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Điểm kết thúc"
              name="destination"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập điểm kết thúc",
                },
              ]}
            >
              <Input
                value={data.destination}
                onChange={(e) =>
                  setData({
                    ...data,
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
                  !isDisable && "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
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

export default AddNewRoad;
