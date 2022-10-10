import React, { useContext, useState,useEffect } from 'react';
import { Tabs } from 'antd';
import CuocVanChuyen from './CuocVanChuyen';
import HangCamGui from './HangCamGui';
import VanDon from './VanDon';
import BuuCuc from './BuuCuc';
import BangGia from './BangGia';
import { Outlet, useNavigate } from 'react-router-dom';
import { MainContext } from '../../context/MainContext';
const { TabPane } = Tabs;

export default function Track({ number }) {
    const {setMetadata} = useContext(MainContext);
    useEffect(() => {
        setMetadata((prev) => {
          return {
            ...prev,
            title: "Tra cứu | TKTL",
          };
        });
    },[])


    const onChange = (key) => {
        console.log(key);
    };
    const navigate = useNavigate()
    const [defaultService, setDefaultService] = useState("cước vận chuyển")
    function callback(dichVu) {
        setDefaultService(dichVu);
        navigate(`/tra-cuu/${dichVu}`)   
    }

   

    return (
        <>
            <div className='carousel' style={{paddingTop:"50px"}}>
                <a href="#">
                    <img className='h-full' src="https://jtexpress.vn/storage/app/uploads/public/628/5cf/ebd/6285cfebd1130135260962.jpg" alt="" />
                </a>
            </div>
            <div className='custom-tab shadow-[#000000] container mx-auto text-xl '
                style={{ maxWidth: "1200px" }} >
                <Tabs activeKey={number} onChange={callback} centered size='large' tabPosition='top' type='line' className='p-3' tabBarStyle={{ color: "#fcd535" }} >
                    <TabPane tab="Cước vận chuyển" key="cuoc-van-chuyen" >
                        <CuocVanChuyen />
                    </TabPane>
                    <TabPane tab="Vận đơn" key="van-don">
                        <VanDon />
                    </TabPane>
                    <TabPane tab="Bưu cục" key="buu-cuc">
                        <BuuCuc />
                    </TabPane>
                    <TabPane tab="Bảng giá" key="bang-gia">
                        <BangGia />
                    </TabPane>
                    <TabPane tab="Hàng cấm gửi" key="hang-cam-gui">
                        <HangCamGui />
                    </TabPane>
                </Tabs>
            </div>
            <Outlet />
        </>
    )
}
