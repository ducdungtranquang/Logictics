import InputDesktop from "../../components/InputDesktop/InputDesktop";
import RecruitForm from "../../components/RecruitForm/RecruitForm";
import Images from "../../utils/images";

import {
  faCalendar,
  faCoins,
  faClock,
  faLocationDot,
  faPlane,
  faHeartPulse,
  faMugHot,
  faMoneyBillTrendUp,
  faPersonBreastfeeding,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RecruitmentDetails = ({ data }) => {
  // console.log(data);
  return (
    <>
      {data && (
        <>
          {/* Banner */}
          {/* <div className="relative" style={{ top: "35px" }}>
        <img src={Images.TOP_BANNER} alt="banner" />
        <InputDesktop />
      </div> */}

          <div className="m-auto max-w-[1140px] px-[16px] lg:px-[0px]  mt-[90px] lg:mt-[180px]">
            <h2 className="text-[24px] lg:text-[32px] font-bold mb-6">
              {data.name}
            </h2>
            <div className="gap-4 lg:grid lg:grid-cols-2 bg-[#f2f2f2]">
              <div className="p-4">
                <h4 className="text-[#e5a663] font-bold">
                  <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                  Hạn nộp
                </h4>
                <p className="py-2 ml-5">{data.deadline.toString()}</p>
                <hr />
              </div>
              <div className="p-4">
                <h4 className="text-[#e5a663] font-bold">
                  <FontAwesomeIcon className="mr-2" icon={faCoins} />
                  Mức lương
                </h4>
                <p className="py-2 ml-5">{data.bonus}</p>
                <hr />
              </div>
              <div className="p-4">
                <h4 className="text-[#e5a663] font-bold">
                  <FontAwesomeIcon className="mr-2" icon={faClock} />
                  Thời gian làm việc
                </h4>
                <p className="py-2 ml-5">
                  08:00 - 17:30, từ thứ 2 - thứ 6 | 08:00 - 12:00, thứ 7 <br /> Nghỉ
                  trưa 12:00 - 13:30
                </p>
                <hr />
              </div>
              <div className="p-4">
                <h4 className="text-[#e5a663] font-bold">
                  <FontAwesomeIcon className="mr-2" icon={faLocationDot} />
                  Địa điểm làm việc
                </h4>
                <p className="py-2 ml-5">
                  {data.location}
                </p>
                <hr />
              </div>
            </div>

            <article className="tracking-wide">
              <h4 className="mt-8 mb-2 text-2xl font-bold">Phúc lợi của bạn</h4>
              <p>
                <FontAwesomeIcon className="mr-2 text-[#e5a663]" icon={faPlane} />
                Travel Trip & Teambuilding trip each year
              </p>
              <p>
                <FontAwesomeIcon
                  className="mr-2 text-[#e5a663]"
                  icon={faHeartPulse}
                />
                Annual Health check-up
              </p>
              <p>
                <FontAwesomeIcon className="mr-2 text-[#e5a663]" icon={faMugHot} />
                Tea break 3 times/week
              </p>
              <p>
                <FontAwesomeIcon
                  className="mr-2 text-[#e5a663]"
                  icon={faMoneyBillTrendUp}
                />
                Year bonus
              </p>
              <p>
                <FontAwesomeIcon
                  className="mr-2 text-[#e5a663]"
                  icon={faPersonBreastfeeding}
                />
                Rearing child allowance for female employees
              </p>
            </article>
          </div>
          <div className="relative mb-[165px]">
            <img
              src={Images.BOTTOM_BANNER}
              alt="IMG"
              className="w-full h-[580px] "
            />

            <RecruitForm id={data._id} />
          </div>
        </>
      )}
    </>
  );
};

export default RecruitmentDetails;
