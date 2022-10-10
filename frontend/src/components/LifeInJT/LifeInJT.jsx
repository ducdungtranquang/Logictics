import Images from '../../utils/images';
import { RightOutlined } from '@ant-design/icons';

const LifeInJT = () => {
    return (
        <div className="m-auto px-[16px] lg:px-[0px] text-2xl max-w-[1140px] mb-[60px]">
            <div className="flex justify-between mb-[20px]">
                <h3 className="flex items-center font-extrabold text-1xl sm:text-3xl">
                    Cuộc sống <img src={Images.LOGO} alt="" />
                </h3>
                <a
                    href="#"
                    className="hidden items-center gap-2 bg-[#e5a663] px-[12px] sm:py-[4px] sm:px-[16px] rounded-lg text-[14px] text-[#000] sm:text-sm sm:flex"
                >
                    <RightOutlined className="text-[12px] sm:text-sm" />
                    Xem chi tiết
                </a>
            </div>
            <div className="grid grid-cols-2 gap-3 overflow-hidden md:grid-cols-3 md:gap-8">
                <img src={Images.image1} alt="J&T daily working" className="w-[100%] h-[100%] rounded-lg shadow-xl" />
                <img src={Images.image2} alt="J&T daily working" className="w-[100%] h-[100%] rounded-lg shadow-xl" />
                <img src={Images.image3} alt="J&T daily working" className="w-[100%] h-[100%] rounded-lg shadow-xl" />
                <img src={Images.image4} alt="J&T daily working" className="w-[100%] h-[100%] rounded-lg shadow-xl" />
                <img src={Images.image5} alt="J&T daily working" className="w-[100%] h-[100%] rounded-lg shadow-xl" />
                <img src={Images.image6} alt="J&T daily working" className="w-[100%] h-[100%] rounded-lg shadow-xl" />
            </div>

            <a
                href="#"
                className="flex sm:hidden items-center gap-2 bg-[#e5a663] px-[12px] sm:py-[4px] sm:px-[16px] rounded-lg text-[14px] sm:text-sm mt-[16px] w-[120px]  text-[#000]"
            >
                <RightOutlined className="text-[12px] sm:text-sm" />
                Xem chi tiết
            </a>
        </div>
    );
};

export default LifeInJT;
