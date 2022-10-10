import { RightOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { END_POINT } from "../../utils/constant";

const HotJob = ({ setDetail }) => {
    const api = `${END_POINT}/career`;
    const [hotJob, setJob] = useState([]);


    const getDataFromApi = async () => {
        try {
            const res = await axios({
                url: api,
                method: "get",
                // headers: "Bears" + TOKEN,
            })
            console.log(res);
            if (res.status === 200) {
                let item = res.data.data.career;
                if (item.length > 1) {
                    let newItem = item.sort((a, b) => a.applicants.length - b.applicants.length);
                    let items = []
                    for (let i = newItem.length - 1; i >= newItem.length - 5; i--) {
                        items.push(newItem[i]);
                    }
                    setJob(items);
                }
                setJob(item)
                // console.log(items);
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
            <h2 className="text-[24px] sm:text-[32px] font-bold mb-[16px] sm:mb-[28px] truncate">Việc làm nổi bật</h2>

            {hotJob && (
                <>
                    {hotJob.map((job, index) => {
                        return (
                            <div
                                key={index}
                                className="border-[1px] rounded-r-xl before:content-['']  p-[16px] mb-[16px] overflow-hidden bg-[#f2f2f2] lg:hover:scale-105 duration-300"
                            >
                                <h4 className="text-[16px] sm:text-[18px] font-bold tracking-wider whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">
                                    {job.name}
                                </h4>
                                <p className="text-[16px] opacity-70 cursor-pointer truncate">
                                    <FontAwesomeIcon icon={faLocationDot} className=" pr-[16px]" />
                                    {job.location}
                                </p>
                                <div style={{ cursor: 'pointer' }}>
                                    <span
                                        className="text-[14px] text-[#e5a663] tracking-wider flex items-center gap-2 font-bold"
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

export default HotJob;
// ô muốn link đến trang nào
