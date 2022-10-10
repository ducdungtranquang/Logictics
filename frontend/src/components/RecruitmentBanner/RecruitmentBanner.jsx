import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Images from '../../utils/images';

const RecruitmentBanner = () => {
    return (
        <div className="mb-[60px] relative">
            <img src={Images.BOTTOM_BANNER} alt="IMG" className="w-full h-[360px] lg:h-auto" />
            <div className="text-[#fff] tracking-wide text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%]">
                <span className="flex">
                    <FontAwesomeIcon icon={faQuoteLeft} className="text-[#e5a663] text-[60px] hidden lg:block" />
                    <h2 className="text-[14px] lg:text-3xl text-[#fff]">
                        "Tại J&T Express, tôi luôn được trao quyền bày tỏ quan điểm cá nhân và sáng tạo. Công ty cũng cố
                        gắng tạo điều kiện để nhân viên cân bằng giữa cuộc sống cá nhân và công việc"
                    </h2>
                    <FontAwesomeIcon
                        icon={faQuoteRight}
                        className="text-[#e5a663]  text-[60px] place-self-end hidden lg:block"
                    />
                </span>
                <p className="text-[14px] lg:text-2xl pt-[20px]">Nguyễn Huỳnh Ngọc Trâm</p>
                <p className="text-[12px]">Nhân viên bộ phận marketing</p>
            </div>
        </div>
    );
};

export default RecruitmentBanner;
