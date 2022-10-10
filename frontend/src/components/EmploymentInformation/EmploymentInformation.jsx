import { faCity, faChartLine, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { END_POINT } from "../../utils/constant";

const EmploymentInformation = () => {
    const api = `${END_POINT}/career?`;
    const [job,setJob] = useState([])

    const getDataFromApi = async ()=>{
        try{
            const res = await axios({
                url:api,
                method:"get",
                // headers: "Bears" + TOKEN,
            })
            console.log(res);
            if(res.status===200){
                setJob( res.data.data.career)
            }
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getDataFromApi()
    },[])

   
    const professions = [
        {
            id: 1,
            profession: 'Ngành nghề',
        },
        {
            id: 2,
            profession: 'Bưu cục',
            numberOfRecruitment: job.filter(e=>e.type==="Bưu cục").length,
            type: 'văn phòng',
        },
        {
            id: 3,
            profession: 'Chăm sóc khách hàng',
            numberOfRecruitment: job.filter(e=>e.type==="Chăm sóc khách hàng").length,
            type: 'văn phòng',
        },
        {
            id: 4,
            profession: 'Công nghệ thông tin',
            numberOfRecruitment: job.filter(e=>e.type==="Công nghệ thông tin").length,
            type: 'văn phòng',
        },
        {
            id: 5,
            profession: 'Đào tạo',
            numberOfRecruitment: job.filter(e=>e.type==="Đào tạo").length,
            type: 'văn phòng',
        },
        {
            id: 6,
            profession: 'Kế toán - Tài chính',
            numberOfRecruitment: job.filter(e=>e.type==="Kế toán - Tài chính").length,
            type: 'văn phòng',
        },
        {
            id: 7,
            profession: 'Kiểm toán & Kiểm soát nội bộ',
            numberOfRecruitment: job.filter(e=>e.type==="Kiểm toán & Kiểm soát nội bộ").length,
            type: 'văn phòng',
        },
        {
            id: 8,
            profession: 'Kinh doanh',
            numberOfRecruitment: job.filter(e=>e.type==="Kinh doanh").length,
            type: 'kinh doanh',
        },
        {
            id: 9,
            profession: 'Nhân sự & Hành chính',
            numberOfRecruitment: job.filter(e=>e.type==="Nhân sự & Hành chính").length,
            type: 'văn phòng',
        },
        {
            id: 10,
            profession: 'Quản lí chất lượng',
            numberOfRecruitment: job.filter(e=>e.type==="Quản lí chất lượng").length,
            type: 'văn phòng',
        },
        {
            id: 11,
            profession: 'Thu mua',
            numberOfRecruitment: job.filter(e=>e.type==="Thu mua").length,
            type: 'kinh doanh',
        },
        {
            id: 12,
            profession: 'Trợ lí',
            numberOfRecruitment: job.filter(e=>e.type==="Trợ lí").length,
            type: 'văn phòng',
        },
        {
            id: 13,
            profession: 'Trung tâm khai thác',
            numberOfRecruitment: job.filter(e=>e.type==="Trung tâm khai thác").length,
            type: 'văn phòng',
        },
        {
            id: 14,
            profession: 'Vận hành',
            numberOfRecruitment: job.filter(e=>e.type==="Vận hành").length,
            type: 'văn phòng',
        },
    ];
    return (
        <div className="lg:grid  lg:grid-cols-3 border-[1px] border-[#e5a663] rounded-xl  bg-[#f2f2f2] mb-[60px] mt-[25px]">
            <div className="p-[20px] sm:p-[32px] ">
                <div className="flex gap-4 font-bold">
                    <FontAwesomeIcon icon={faCity} />
                    VĂN PHÒNG
                </div>
                <div className="py-[16px]">
                    {professions
                        .filter((item) => item.type === 'văn phòng' && item.numberOfRecruitment !== 0)
                        .map((item, index) => {
                            return (
                                <div key={index}>
                                    <div key={index} className="cursor-pointer py-[8px] sm:py-[16px]">
                                        <h3 className="text-[16px] font-bold truncate">{item.profession}</h3>
                                        <p className="flex items-center gap-3 text-[16px] truncate">
                                            <FontAwesomeIcon icon={faArrowRight} className="text-base text-[#e5a663]" />
                                            {item.numberOfRecruitment} vị trí tuyển dụng
                                        </p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                </div>
            </div>

            <div className="p-[32px]">
                <div className="flex gap-4 font-bold">
                    <FontAwesomeIcon icon={faChartLine} />
                    KINH DOANH
                </div>
                <div className="py-[16px]">
                    {professions
                        .filter((item) => item.type === 'kinh doanh' && item.numberOfRecruitment !== 0)
                        .map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="cursor-pointer py-[8px] sm:py-[16px]">
                                        <h3 className="text-[16px] font-bold truncate ">{item.profession}</h3>
                                        <p className="flex items-center gap-3 text-[16px] truncate">
                                            <FontAwesomeIcon icon={faArrowRight} className="text-base text-[#e5a663]" />
                                            {item.numberOfRecruitment} vị trí tuyển dụng
                                        </p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default EmploymentInformation;
