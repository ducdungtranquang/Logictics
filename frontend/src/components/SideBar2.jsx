import { Link } from "react-router-dom"
import { Menu } from "antd"
import {useContext, useState} from "react"
import { MainContext } from "../context/MainContext";
function Sidebar({items,rootSubmenuKeys=[],hiddenSidebar}) {
    const [openKeys, setOpenKeys] = useState([]);
    const {logoutHandle} = useContext(MainContext)
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          setOpenKeys(keys);
        } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
      };
    return (
        
            <div
                className="fixed left-0 top-[65px] right-0 bottom-0 bg-slate-400/40 z-100"
                onClick={hiddenSidebar}
            >
                <Menu
                    className="h-full animate-menu_in"
                    style={{ width: "50%" }}
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    items={items}
                />
            </div>
        
    );
}

export default Sidebar;