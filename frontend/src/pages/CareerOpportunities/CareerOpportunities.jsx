import Images from '../../utils/images';
import { RightOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import InputDesktop from '../../components/InputDesktop/InputDesktop';
import InputMobile from '../../components/InputMobile/InputMobile';
import HotJob from '../../components/HotJob/HotJob';
import NewJob from '../../components/NewJob/NewJob';
import EmploymentInformation from '../../components/EmploymentInformation/EmploymentInformation';
import RecruitmentBanner from '../../components/RecruitmentBanner/RecruitmentBanner';
import LifeInJT from '../../components/LifeInJT/LifeInJT';
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { RecruitmentDetails } from '../pageExport';
import { div } from 'react-router-dom';
import { MainContext } from '../../context/MainContext';
import { END_POINT } from "../../utils/constant";

const CareerOpportunities = () => {
    const { pathname } = useLocation()
    const [api, setApi] = useState(`${END_POINT}/career?`);
    const [data, setData] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [key, setKey] = useState("")
    const [local, setLocal] = useState('')
    const [type, setType] = useState('')
    const [state, setState] = useState('')
    const [department, setDepartment] = useState('')
    const [showAll, setShowAll] = useState(false)
    const [showDetail, setShowDeatail] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    const { setMetadata } = useContext(MainContext)

    useEffect(() => {
        setMetadata((prev) => {
            return {
                ...prev,
                title: "Tìm kiếm | TKTL",
            };
        });
    }, [])


    const onChangeKey = (e) => {
        setKey(e.target.value)
    }

    const onLocation = (e) => {
        setLocal(e.target.value)
    }

    const onChnageType = (e) => {
        setType(e.target.value)
    }

    const onChangeState = e => {
        setState(e.target.value)
    }

    const onChangeDepartment = (e) => {
        setDepartment(e.target.value)
    }

    const getDataFromApi = async (api) => {
        try {
            const res = await axios({
                url: api,
                method: "get",
            })
            if (res.status === 200) {
                setData(res.data.data.career)
                console.log(data);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const onSearch = (e) => {

        if (key === "" && (local === "" || local === "Tỉnh/Thành phố") && (type === "" || type === "Ngành nghề") &&
            (state === "Chức vụ" || state === "") && (department === "Phòng ban" || department === "")) {
            setShowSearch(false)
            setShowDeatail(false)
        }
        else {
            let newApi = `${END_POINT}/career?`;
            if (key !== "") {
                newApi = `${newApi}&keyword=${key}`
                console.log(key);
            }
            if (local !== "" && local !== "Tỉnh/Thành phố") {
                newApi = `${newApi}&location=${local}`
            }
            if (type !== "" && type !== "Ngành nghề") {
                newApi = `${newApi}&type=${type}`

            }
            if (state !== "Chức vụ" && state !== "") {
                newApi = `${newApi}&state=${state}`
            }
            if (department !== "Phòng ban" && department !== "") {
                newApi = `${newApi}&department=${department}`
            }

            getDataFromApi(newApi)
            setShowSearch(true)
            setShowAll(false)
            setShowDeatail(false)
            console.log(newApi);
        }
    }

    const onSearchMB = () => {
        let newApi = `${END_POINT}/career?`;
        if (key !== '') {
            newApi = `${newApi}&keyword=${key}`
            getDataFromApi(newApi)
            setShowSearch(true)
            setShowAll(false)
            setShowDeatail(false)
        }
        else {
            setShowSearch(false)
            setShowDeatail(false)
        }
    }

    const handleClickAll = () => {
        getDataFromApi(api)
        setShowAll(!showAll)
    }

    const handleClickDetail = (e, item) => {
        setDataDetail(item)
        console.log(dataDetail);
        setShowDeatail(true);
        setShowSearch(false)
    }

    return (

        <>
            {pathname === '/tuyen-dung' ?
                <>
                    {/* Banner */}
                    <div className="relative" style={{ top: "35px" }}>
                        <img src={Images.TOP_BANNER} alt="banner" />
                        <InputDesktop
                            onSearch={onSearch} onChangeKey={onChangeKey}
                            onChangeLocation={onLocation}
                            onChangeState={onChangeState}
                            onChangeType={onChnageType}
                            onChangeDepartment={onChangeDepartment}
                        />
                        <InputMobile onSearch={onSearchMB} onChangeKey={onChangeKey} />
                    </div>

                    {/* CONTAINER */}
                    <div className="m-auto max-w-[1140px]  px-[16px] lg:px-[0px]">
                        {/* JOB LIST */}
                        {(showSearch === false && showDetail === false) && (
                            <div className="mt-5 text-2xl lg:mt-44">
                                <div className="block lg:flex justify-between gap-[100px]" style={{ marginTop: "50px" }}>
                                    <HotJob setDetail={handleClickDetail} />
                                    <NewJob setDetail={handleClickDetail} />
                                </div>

                                <a className="text-[16px] text-[#e5a663] font-bold p-[6px] sm:p-[16px] mb-[40px] sm:mb-[48px] bg-[#f2f2f2] inline-block  rounded-lg"
                                    onClick={handleClickAll}>
                                    <FontAwesomeIcon icon={faEye} className="pr-[8px]" />
                                    XEM TẤT CẢ VỊ TRÍ ỨNG TUYỂN
                                </a>
                            </div>
                        )}

                        {(showAll === true && showDetail === false) && (
                            <div className="text-2xl" >
                                {data.length > 0 && (
                                    <>
                                        {data.map((job, index) => (
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
                                                        onClick={(e) => handleClickDetail(e, job)}
                                                    >
                                                        <RightOutlined />
                                                        XEM CHI TIẾT
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}

                        {showSearch && (
                            <div className="mt-5 text-2xl lg:mt-44">
                                {data && (
                                    <>
                                        {data.map((job, index) => (
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
                                                        onClick={(e) => handleClickDetail(e, job)}
                                                    >
                                                        <RightOutlined />
                                                        XEM CHI TIẾT
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}

                        {showDetail && (
                            <RecruitmentDetails data={dataDetail} />
                        )}

                        <EmploymentInformation />
                    </div>
                    <RecruitmentBanner />
                    <LifeInJT />
                </> : <Outlet />
            }
        </>
    );
};

export default CareerOpportunities;