import React from "react";
import Banner from "../../assets/images/banner.png";
import LifeInJTDetail from "../../components/LifeInJTDetail/LifeInJTDetail";
import Welfare from "../../components/Welfare/Welfare";
import RecruitmentBannerForLife from "../../components/RecruitmentBannerForLife/RecruitmentBannerForLife";

const Life = () => {
  return (
    <>
      <div>
        <img src={Banner} alt="Banner" style={{paddingTop:"32px"}}/>
      </div>
      <LifeInJTDetail />
      <Welfare />
      <RecruitmentBannerForLife />
    </>
  );
};

export default Life;