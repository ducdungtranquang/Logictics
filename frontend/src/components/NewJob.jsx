import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const NewJob = () => {
    const newJob = [
        {
            id: 6,
            name: '[HCM _ Q2] KỸ SƯ CÔNG NGHIỆP _ IE',
            location: 'Quận 2 - Hồ Chí Minh',
        },
        {
            id: 7,
            name: 'System Admin',
            location: 'Quận Bình Thạnh - Hồ Chí Minh',
        },

        {
            id: 8,
            name: '[Bình Dương]_Kế toán doanh thu',
            location: 'Thành Phố Thủ Dầu Một - Bình Dương',
        },
        {
            id: 9,
            name: '[Bình Dương]_Kế toán Thuế',
            location: 'Thành Phố Thủ Dầu Một - Bình Dương',
        },
        {
            id: 10,
            name: 'Full stack Developer',
            location: 'Quận Bình Thạnh - Hồ Chí Minh',
        },
    ];
    return (
        <div className="w-[100%]">
            <h2 className="text-[24px] sm:text-[32px] font-bold mb-[16px] sm:mb-[28px] truncate">Việc làm mới</h2>
            {newJob.map((job, index) => {
                return (
                    <div
                        key={index}
                        className="border-[1px] rounded-r-xl before:content-[''] before:block before:border-l-[10px] before:border-[#ccc] p-[16px] mb-[16px] bg-[#f2f2f2] hover:scale-105 duration-300"
                    >
                        <h4 className="text-[16px] sm:text-[18px] font-bold tracking-wider cursor-pointer truncate">
                            {job.name}
                        </h4>
                        <p className="text-[16px] opacity-70 cursor-pointer truncate">
                            <FontAwesomeIcon icon={faLocationDot} className=" pr-[16px]" />
                            {job.location}
                        </p>
                        <Link to="/chi-tiet-viec-lam-moi">
                            <a
                                className="text-[14px] text-[#e5a663] font-bold tracking-wider flex items-center gap-2 "
                                href="#"
                            >
                                <RightOutlined />
                                XEM CHI TIẾT
                            </a>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default NewJob;
