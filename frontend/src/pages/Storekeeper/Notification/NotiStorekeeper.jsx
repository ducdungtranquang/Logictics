import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { TiArrowBackOutline } from "react-icons/ti";
import { MainContext } from "../../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
function NotiStorekeeper() {
  const { user, accessToken, refreshNoti } = useContext(MainContext);
  const [dataReceive, setDataReceive] = useState([]);
  const [dataSend, setDataSend] = useState();
  const getNoti = async () => {
    try {
      const res = await axios.get(
        `${END_POINT}/notification?limit=10`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      res.data.data.length > 0 && setDataReceive(() => res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNoti();
  }, [refreshNoti]);

  return (
    <div>
      <div className="w-full md:w-[750px] mx-auto border border-black px-4 py-2 bg-white rounded-md">
        <div className="flex justify-between items-center py-3 border-b border-black">
          <h2 className="m-0 text-xl font-extrabold">Thông báo</h2>
          <Link to="/thu-kho" className="flex items-center gap-x-2 border rounded-lg py-1 px-2">
            <TiArrowBackOutline className="w-6 h-6 font-semibold" />
            Quay lại
          </Link>
        </div>
        <div className="flex gap-x-4 py-4">
          <button className="py-4 px-2 border rounded-xl hover:bg-slate-100">Tất cả</button>
          <button className="py-4 px-2 border rounded-xl hover:bg-slate-100">Chưa xem</button>
        </div>
        <div className="flex flex-col gap-y-2">
          {dataReceive.map(data=>(
            <div className="flex justify-start items-center gap-x-2" key={data._id}>
            <img
              alt="noti"
              className="w-14 h-14"
              src="https://images.squarespace-cdn.com/content/v1/56001a27e4b08aa6c7fa74e1/1560511769633-THRKK2P2TKYE2ZNOLSY9/Notify_Red.png"
            />
            <div className="flex flex-col gap-y-1">
              <span className="font-bold">{data.title}</span>
              <span>{data.message}</span>
              <span className="text-xs text-blue-500">{data.updatedAt?.split("T")[0]}</span>
            </div>
          </div>
          ))}
          {/* <div className="flex justify-start items-center gap-x-2 ">
            <img
              alt="noti"
              className="w-14 h-14"
              src="https://images.squarespace-cdn.com/content/v1/56001a27e4b08aa6c7fa74e1/1560511769633-THRKK2P2TKYE2ZNOLSY9/Notify_Red.png"
            />
            <div className="flex flex-col gap-y-1">
              <span className="font-bold">Title Title</span>
              <span>description description description description description description </span>
              <span className="text-xs text-blue-500">9 giờ trước</span>
            </div>
          </div>

          <div className="flex justify-start items-center gap-x-2 ">
            <img
              alt="noti"
              className="w-14 h-14"
              src="https://images.squarespace-cdn.com/content/v1/56001a27e4b08aa6c7fa74e1/1560511769633-THRKK2P2TKYE2ZNOLSY9/Notify_Red.png"
            />
            <div className="flex flex-col gap-y-1">
              <span className="font-bold">Title Title</span>
              <span>description description description description description description </span>
              <span className="text-xs text-blue-500">9 giờ trước</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default NotiStorekeeper;
