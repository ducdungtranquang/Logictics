import React, { useState } from 'react'
import { Tabs } from 'antd';
import MienNam from './Area/TieuChuan/MienNam';
import MienNamNhanh from './Area/Nhanh/MienNam.nhanh';
import MienNamSuper from './Area/Super/MienNam.super';
import { MIEN_NAM } from '../../utils/constant';
import { MIEN_NAM_NHANH } from '../../utils/constant';
import { MIEN_NAM_SUPER } from '../../utils/constant';

const { TabPane } = Tabs;
export default function BangGia() {
    const [mienNam,setMienNam] = useState(MIEN_NAM);
    const [mienNamNhanh,setNhanh] = useState(MIEN_NAM_NHANH);
    const [mienNamSuper,setSuper] = useState(MIEN_NAM_SUPER);
    const [key,setKey] = useState('');

    const findKey = (data)=>{
        return data.filter(e=>{
            return e.name.toLowerCase().includes(key.toLowerCase())
        })
    }
    

    const handleSearch = ()=>{
        setMienNam(findKey(MIEN_NAM));
        setNhanh(findKey(MIEN_NAM_NHANH));
        setSuper(findKey(MIEN_NAM_SUPER));
        if(key===""){
            setMienNam(MIEN_NAM);
            setNhanh(MIEN_NAM_NHANH);
            setSuper(MIEN_NAM_SUPER)
        }
    }


    return (
        <div className='price_list ' style={{ 
			maxWidth: "1200px",
			margin:"auto"
		 }}>
            <div className='p-7'>
                <div className="flex rounded-[2px] h-[43px] items-center w-full my-[20px] mb-[40px]">
                    <div className="w-full mb-[10px] lg:mb-0" data-request="onSearchPriceList" id="form-price-list">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-[20px]">
                            <div className="flex items-center border border-[#b2b2b2] w-full input_block_tab">
                                <input className="bg-transparent focus:outline-none ml-2 w-full h-[43px]" id="price-from" placeholder="Gửi từ Tỉnh/Thành phố" type="text" onChange={(e)=>setKey(e.target.value)} />
                            </div>
                            <div className="flex flex-row items-center w-full lg:w-[180px]">
                                <button className="w-full lg:w-[180px] mr-0 lg:mr-2 bg-[#e5a663] h-[45px] rounded-[2px] text-white" onClick={handleSearch}>
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <h5 className="uppercase  text-center mb-4 text-[20px] text-[#F0B90B]" name={1}>
                    CƯỚC VẬN CHUYỂN DỊCH VỤ TIÊU CHUẨN
                </h5>
                <div className='border border-[#ffbb0f] rounded-[5px] area'>
                    <div className='rounded-[5px] bg-[#f2f2f2]'>
                        <h2 className='text-center text-xl p-5 border-b-2 border-[#F0B90B] text-[#ffbb0f]'>KHU VỰC MIỀN NAM</h2>
                    </div>
                    <MienNam data={mienNam}/>
                </div>

                <h5 className="uppercase text-center mb-4 mt-10 text-[20px] text-[#F0B90B]" name={1}>
                    CƯỚC VẬN CHUYỂN NHANH
                </h5>
                <div className='border border-black rounded-[10px] area'>
                    <div className='rounded-[5px] bg-[#f2f2f2]'>
                        <h2 className='text-center text-xl p-5 border-b-2 border-[#F0B90B] text-[#ffbb0f]'>KHU VỰC MIỀN NAM</h2>
                    </div>
                    <MienNamNhanh data={mienNamNhanh}/>
                </div>

                <h5 className="uppercase  text-center mb-4 mt-10 text-[20px] text-[#F0B90B]" name={1}>
                    CƯỚC VẬN CHUYỂN DỊCH VỤ SUPER
                </h5>
                <div className='border border-black rounded-[10px] area '>
                    <div className='rounded-[5px] bg-[#f2f2f2]'>
                        <h2 className='text-center text-xl p-5 border-b-2 border-[#F0B90B] text-[#ffbb0f]'>KHU VỰC MIỀN NAM</h2>
                    </div>
                    <MienNamSuper data={mienNamSuper}/>
                </div>


            </div>
        </div>

    )
}
