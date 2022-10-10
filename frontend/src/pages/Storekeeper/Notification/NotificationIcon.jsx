import { useState, useEffect, useContext } from "react";
import { Badge } from "antd";
import { MdNotificationsNone } from "react-icons/md";
import NotificationDropdown from "./NotificationDropdown";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { MainContext } from "../../../context/MainContext";
import {notification} from "antd"
import {SOCKET_URL} from "../../../utils/constant"
function NotificationIcon() {
  const {user, setRefreshNoti} = useContext(MainContext)
  const [isNotiVisible, setIsNotiVisible] = useState(false);
  const [dotShow,setDotShow] = useState(false)
  let { pathname } = useLocation();
  const openNotification = ({ message, title, link }) => {
    notification.open({
      message: title,
      description:message,
      onClick: () => {
        console.log('Notification Clicked!');//link
      },
    });
  };
  useEffect(() => {
    setIsNotiVisible(false);
  }, [pathname]);
  useEffect(() => {
    const socket = io(SOCKET_URL , { reconnection: true });
    console.log(`Connecting socket...`);
    socket.emit("add-session", user.id)
    socket.on("receive", ({ message, title, link }) => {
      openNotification({ message, title, link })
      setDotShow(true)
      setRefreshNoti((pre)=>pre+1)
    });
    console.log(socket);
    return ()=>socket.disconnect()
  }, []);
  return (
    <div className="">
      <Badge
        className="flex items-center justify-center"
        dot={dotShow}
        offset={[-5, 10]}
        size="small"
        onClick={() => {
          setIsNotiVisible(!isNotiVisible)
          setDotShow(false)
        }}
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 hover:scale-125 duration-500">
          <MdNotificationsNone className="w-7 h-7 " />
        </div>
        {/* Dropdown */}
      </Badge>
      {isNotiVisible && <NotificationDropdown/>}
    </div>
  );
}

export default NotificationIcon;
