import { useState, useEffect, useContext } from "react";
import { BsThreeDots, BsCheck2 } from "react-icons/bs";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MainContext } from "../../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
function NotificationDropdown() {
  const {accessToken, refreshNoti } = useContext(MainContext);
  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const [dataReceive,setDataReceive] = useState([])
  const getNoti = async () => {
    try {
      const res = await axios.get(
        `${END_POINT}/notification?limit=5`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      res.status===200 && setDataReceive(() => res.data.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoti();
  }, [refreshNoti]);
  return (
    <div>
      <div className="absolute w-96 top-16 right-5 border border-black bg-white z-20 p-2">
        <div className="relative flex justify-between items-center h-10 py-3">
          <span className="text-lg font-semibold">Thông báo</span>
          <div
            className="flex items-center justify-center w-7 h-7 rounded-full hover:bg-slate-100 duration-200"
            onClick={() => setIsSettingVisible(!isSettingVisible)}
          >
            <BsThreeDots className="w-5 h-5 " />
          </div>
          {isSettingVisible && (
            <div className="absolute top-10 right-5 border border-black rounded-md bg-white z-30">
              <div className="flex justify-start items-center gap-x-4 py-2 px-4 rounded-md hover:bg-neutral-300">
                <BsCheck2 className="w-6 h-6 font-semibold" />
                <span>Đánh dấu tất cả đã đọc</span>
              </div>
              <Link
                to="thong-bao"
                className="flex justify-start items-center gap-x-4 py-2 px-4 rounded-md hover:bg-neutral-300"
              >
                <AiOutlineFundProjectionScreen className="w-6 h-6 font-semibold" />
                <span>Mở trang thông báo</span>
              </Link>
            </div>
          )}
        </div>
        <div className="">
          {dataReceive.map(data=>(
            <div className="flex justify-start items-center gap-x-2 leading-3 py-1 hover:bg-slate-100" key={data._id}>
            <img
              alt="noti"
              className="w-10 h-10"
              src="https://images.squarespace-cdn.com/content/v1/56001a27e4b08aa6c7fa74e1/1560511769633-THRKK2P2TKYE2ZNOLSY9/Notify_Red.png"
            />
            <div className="flex flex-col gap-y-2">
              <h4 className="font-bold m-0">{data.title}</h4>
              <h5 className="m-0">{data.message}</h5>
              <span className="text-xs text-blue-500">{data.updatedAt?.split("T")[0]}</span>
            </div>
          </div>
          ))}
          {/* <div className="flex justify-start items-center gap-x-2 leading-3 py-1 hover:bg-slate-100">
            <img
              alt="noti"
              className="w-10 h-10"
              src="https://images.squarespace-cdn.com/content/v1/56001a27e4b08aa6c7fa74e1/1560511769633-THRKK2P2TKYE2ZNOLSY9/Notify_Red.png"
            />
            <div className="flex flex-col gap-y-2">
              <h4 className="font-bold m-0">Title Title</h4>
              <h5 className="m-0">description description </h5>
              <span className="text-xs text-blue-500">9 giờ trước</span>
            </div>
          </div>
          <div className="flex justify-start items-center gap-x-2 leading-3 py-1 hover:bg-slate-100">
            <img
              alt="noti"
              className="w-10 h-10"
              src="https://images.squarespace-cdn.com/content/v1/56001a27e4b08aa6c7fa74e1/1560511769633-THRKK2P2TKYE2ZNOLSY9/Notify_Red.png"
            />
            <div className="flex flex-col gap-y-2">
              <h4 className="font-bold m-0">Title Title</h4>
              <h5 className="m-0">description description </h5>
              <span className="text-xs text-blue-500">9 giờ trước</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NotificationDropdown;
