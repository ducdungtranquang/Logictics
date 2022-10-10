import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { END_POINT } from "../../utils/constant";

const NewJob = ({ setDetail }) => {
    const api = `${END_POINT}/career?sortBy=deadline`;
    const [newJob, setJob] = useState([])
    const job = [
        {
            // name: '[HCM _ Q2] KỸ SƯ CÔNG NGHIỆP _ IE',
            // location: 'Quận 2 - Hồ Chí Minh',
            "name": "[HCM _ Q2] KỸ SƯ CÔNG NGHIỆP _ IE",
            "type": "string",
            "description": "string",
            "location": "Quận 2 - Hồ Chí Minh",
            "state": "string",
            "bonus": "string",
            "deadline": "YYYY/MM/DD",
            "applicants": "object"
        },
        {
            // name: 'System Admin',
            // location: 'Quận Bình Thạnh - Hồ Chí Minh',
            "name": "System Admin",
            "type": "string",
            "description": "string",
            "location": "Quận Bình Thạnh - Hồ Chí Minh",
            "state": "string",
            "bonus": "string",
            "deadline": "YYYY/MM/DD",
            "applicants": "object"
        },

    ];

    const getDataFromApi = async () => {
        try {
            const res = await axios({
                url: api,
                method: "get",
                // headers: "Bears" + TOKEN,
            })

            if (res.status === 200) {
                let item = res.data.data.career;
                let items = []
                for (let i = item.length - 1; i >= item.length - 5; i--) {
                    items.push(item[i]);
                }
                setJob(items);
                // console.log(items)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataFromApi()
    }, [])
    return (
        <div className="w-[100%]">
            <h2 className="text-[24px] sm:text-[32px] font-bold mb-[16px] sm:mb-[28px] truncate">Việc làm mới</h2>
            {newJob && (
                <>
                    {newJob.map((job, index) => {
                        return (
                            <div
                                key={index}
                                className="border-[1px] rounded-r-xl before:content-[''] before:block before:border-l-[10px] before:border-[#ccc] p-[16px] mb-[16px] bg-[#f2f2f2] lg:hover:scale-105 duration-300"
                            >
                                <h4 className="text-[16px] sm:text-[18px] font-bold tracking-wider cursor-pointer truncate">
                                    {job?.name}
                                </h4>
                                <p className="text-[16px] opacity-70 cursor-pointer truncate">
                                    <FontAwesomeIcon icon={faLocationDot} className=" pr-[16px]" />
                                    {job?.location}
                                </p>
                                <div style={{ cursor: 'pointer' }}>
                                    <span
                                        className="text-[14px] text-[#e5a663] font-bold tracking-wider flex items-center gap-2 "
                                        onClick={(e) => setDetail(e, job)}
                                    >
                                        <RightOutlined />
                                        XEM CHI TIẾT
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default NewJob;
