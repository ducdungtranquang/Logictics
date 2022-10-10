import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import backGroundImg from "../assets/images/slider-tuyen-dung.png";

const RecruitmentBannerForLife = () => {
  return (
    <div className="mb-[60px] relative">
      <img
        src={backGroundImg}
        alt="IMG"
        className="w-full h-[360px] lg:h-auto"
      />
      <div className="text-[#fff] tracking-wide text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%]">
        <span className="flex">
          <FontAwesomeIcon
            icon={faQuoteLeft}
            className="text-[#e5a663] text-[60px] hidden lg:block"
          />
          <h2 className="text-[14px] lg:text-3xl text-white">
            "8h01p không phải 8h" là một trong những phong cách làm việc làm cho
            tôi ấn tượng ngay ngày đầu tiên. Tính "kỷ luật" chính là yếu tố mang
            lại cho tôi một định nghĩa mới về sự "chuyên nghiệp".
          </h2>
          <FontAwesomeIcon
            icon={faQuoteRight}
            className="text-[#e5a663]  text-[60px] place-self-end hidden lg:block"
          />
        </span>
        <p className="text-[14px] lg:text-2xl pt-[20px]">Vũ Mạnh Thắng</p>
        <p className="text-[12px]">Nhân viên bộ phận quy hoạch</p>
      </div>
    </div>
  );
};

export default RecruitmentBannerForLife;
