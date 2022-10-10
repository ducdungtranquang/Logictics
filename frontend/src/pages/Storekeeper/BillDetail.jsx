import { Steps, Button } from "antd";
import { HiChevronDoubleDown } from "react-icons/hi";
import { useEffect } from "react";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
const { Step } = Steps;

function BillDetail({ onClose, dataForFetch }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return (
    <div className="fixed inset-0 z-20 bg-white">
      <div className="relative w-full ">
        <div className="flex w-full bg-gray-300">
          <Button
            type="primary"
            size="large"
            // className="hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
            onClick={onClose}
          >
            <HiChevronDoubleDown />
          </Button>
        </div>
        <div className="px-4">
          <div className="text-2xl font-black pt-10">Chi tiết Bill ABC XYZ</div>
          <div className="grid grid-cols-1 md:grid-cols-2 py-8">
            <div className="flex flex-col gap-y-8 px-5 mb-4">
              <div className="flex flex-col gap-y-3">
                <span>
                  <b>Kho đi:</b> ABC Tân Bình
                </span>
                <span>
                  <b>Kho đến:</b> ABC Tân Bình
                </span>
                <span>
                  <b>Khoảng cách dự tính:</b> ABC Tân Bình
                </span>
              </div>
              <div className="w-4/5 h-[1px] bg-red-600 "></div>
              <div className="flex flex-col gap-y-3">
                <span>
                  <b>Tài xế:</b> Ph A B
                </span>
                <span>
                  <b>Loại xe:</b> 10 ton
                </span>
              </div>
              <div className="w-4/5 h-[1px] bg-red-600 "></div>
              <div className="flex flex-col gap-y-3">
                <span>
                  <b>Tổng sản phẩm:</b> 100
                </span>
                <span>
                  <b>Tình trạng: </b>
                   <span className="text-green-600">đầy đủ</span>
                </span>
              </div>
              <div className="md:hidden w-4/5 h-[1px] bg-red-600 "></div>
            </div>
            <div>
              <div className="flex flex-col-reverse z-1">
                <Steps progressDot current={3} direction="vertical " style={{ zIndex: 1 }}>
                  <Step
                    style={{ zIndex: 1 }}
                    title="16:34 10-02-2022"
                    description="Lấy hàng thành công"
                  />
                  <Step
                    style={{ zIndex: 1 }}
                    title="04:45 13-02-2022"
                    description="Đơn hàng đã xuất kho"
                  />
                  <Step
                    style={{ zIndex: 1 }}
                    title="00:30 15-02-2022"
                    description="Đơn hàng đã đến kho Cu Chi SOC"
                  />
                  <Step
                    style={{ zIndex: 1 }}
                    title="13:36 15-02-2022"
                    description="Đơn hàng đã đến kho 50-HCM D2/An Phu LM Hub"
                  />
                  <Step
                    style={{ zIndex: 1 }}
                    title="14:32 15-02-2022"
                    description="Giao hàng thành công. Người nhận hàng: Bùi Đăng Khoa"
                  />
                </Steps>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillDetail;
