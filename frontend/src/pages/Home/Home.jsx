import { useState, useEffect, useContext } from "react";
import { Carousel, Tabs, Select } from "antd";
import { Link } from "react-router-dom";
import appStore from "../../assets/images/appStore.png";
import ggPlay from "../../assets/images/ggPlay.png";
import { getDistrictsByProvinceCode, getProvinces } from "sub-vn";
import { Fade, Zoom } from "react-reveal";
import { MainContext } from "../../context/MainContext";
import { data } from "autoprefixer";
import { END_POINT } from "../../utils/constant";
import axios from "axios";

const { TabPane } = Tabs;
const { Option } = Select;

const flags = [
  {
    id: 1,
    name: "Indonesia",
    url: "https://jtexpress.vn/themes/jtexpress/assets/images/nation1.png",
  },
  {
    id: 2,
    name: "Malaysia",
    url: "https://jtexpress.vn/themes/jtexpress/assets/images/nation2.jpg",
  },
  {
    id: 3,
    name: "Philippines",
    url: "https://jtexpress.vn/themes/jtexpress/assets/images/nation3.jpg",
  },
  {
    id: 4,
    name: "Thái Lan",
    url: "https://jtexpress.vn/themes/jtexpress/assets/images/nation4.jpg",
  },
  {
    id: 5,
    name: "Singapore",
    url: "https://jtexpress.vn/themes/jtexpress/assets/images/nation5.jpg",
  },
  {
    id: 6,
    name: "Campuchia",
    url: "https://jtexpress.vn/themes/jtexpress/assets/images/nation6.jpg",
  },
  {
    id: 7,
    name: "Mexico",
    url: "https://jtexpress.vn/themes/jtexpress/assets/images/mexico.png",
  },
  {
    id: 8,
    name: "Saudi Arabia",
    url: "https://jtexpress.vn/themes/jtexpress/assets/images/saudi.png",
  },
  {
    id: 9,
    name: "UAE",
    url: "https://jtexpress.vn/themes/jtexpress/assets/images/uae.png",
  },
];
const DeliveryServices = [
  {
    _id: 1,
    type: "TKTL Epress",
    name: "Chuyển phát tiêu chuẩn",
    path: "chuyen-phat-tieu-chuan",
    images: {
      front:
        "https://jtexpress.vn/storage/app/uploads/public/627/5d6/892/6275d68928ffd381036854.png",
      back: "https://jtexpress.vn/storage/app/uploads/public/627/5d6/866/6275d6866e7c4229470575.png",
    },
  },
  {
    _id: 2,
    type: "TKTL Fast",
    name: "Chuyển phát nhanh",
    path: "chuyen-phat-nhanh",
    images: {
      front:
        "https://jtexpress.vn/storage/app/uploads/public/618/4e6/37b/6184e637b45ca442099845.png",
      back: "https://jtexpress.vn/storage/app/uploads/public/627/5d6/866/6275d6866e7c4229470575.png",
    },
  },
  {
    _id: 3,
    type: "TKTL Super",
    name: "Siêu dịch vụ giao hàng",
    path: "sieu-dich-vu-chuyen-phat",
    images: {
      front:
        "https://jtexpress.vn/storage/app/uploads/public/618/4e6/872/6184e6872c887801133904.png",
      back: "https://jtexpress.vn/storage/app/uploads/public/627/5d6/866/6275d6866e7c4229470575.png",
    },
  },
  {
    _id: 4,
    type: "TKTL Fresh",
    name: "Giao hàng tươi sống",
    path: "chuyen-phat-do-tuoi-song",
    images: {
      front:
        "https://jtexpress.vn/storage/app/uploads/public/618/4e8/077/6184e8077e894431352453.png",
      back: "https://jtexpress.vn/storage/app/uploads/public/627/5d6/866/6275d6866e7c4229470575.png",
    },
  },
];
const coops = [
  {
    _id: 1,
    name: "Đỗ Thị Vân",
    description: "Chủ cửa hàng đồ gốm tại TP. Hà Nội",
    avatar:
      "https://jtexpress.vn/storage/app/uploads/public/628/374/58a/62837458a31d2598134718.jpg",
    quote:
      "Nhờ dịch vụ J&T International gửi đi hàng mẫu thành công, nhanh chóng mà vừa rồi tôi đã có được hợp đồng cung cấp sản phẩm cho một công ty ở Mỹ.",
  },
  {
    _id: 2,
    name: "Dương Hoàng Minh",
    description: "Giám đốc công ty dệt may tại Bắc Ninh",
    avatar:
      "https://jtexpress.vn/storage/app/uploads/public/628/599/24b/62859924bde0b670971722.jpg",
    quote:
      "J&T International là một trợ thủ đắc lực trong quá trình xuất khẩu thành phẩm sang các nước Đông Nam Á của công ty tôi, đặc biệt là gửi hàng trễ chuyến",
  },
  {
    _id: 3,
    name: "Trần Minh Trí",
    description: "Giám đốc công ty cà phê tại Buôn Ma Thuột",
    avatar:
      "https://jtexpress.vn/storage/app/uploads/public/628/374/c8b/628374c8ba994977079446.jpg",
    quote:
      "Gửi hàng mẫu cà phê đi nước ngoài không phải là chuyện dễ để cân đối thu chi, tối ưu chi phí cho công ty. May là công ty chúng tôi tìm được J&T International. Dịch vụ vượt mong đợi với giá cả phải chăng, lại còn hay có ưu đãi.",
  },
  {
    _id: 4,
    name: "Vũ An Phương",
    description: "Chủ cửa hàng thiết bị gia dụng tại Hà Nội",
    avatar:
      "https://jtexpress.vn/storage/app/uploads/public/628/5b6/c28/6285b6c28930f965243715.jpg",
    quote:
      "Nhờ J&T Express mà shop của tôi được nhiều khách hàng đánh giá tốt về thời gian ship hàng. Giá thành tiết kiệm, đội ngũ shipper chuyên nghiệp hỗ trợ rất nhiều cho công việc kinh doanh của tôi.",
  },
  {
    _id: 5,
    name: "Võ Ngọc Trâm",
    description: "Chủ shop quần áo tại Tp.HCM",
    avatar:
      "https://jtexpress.vn/storage/app/uploads/public/628/5ba/16a/6285ba16a1c9c707213911.jpg",
    quote:
      "Tôi đã từng hợp tác với nhiều đơn vị chuyển phát nhưng cuối cùng quyết định đồng hành cùng J&T Express. Phải nói rằng, hệ thống bưu cục đồng nhất về chất lượng khắp 63 tỉnh thành là điểm làm tôi hài lòng nhất.",
  },
];
const partnersFake = [
  {
    _id: 1,
    name: "Thế giới di động",
    logo: "https://jtexpress.vn/storage/app/uploads/public/629/9c2/482/6299c2482b64c523421235.png",
  },
  {
    _id: 2,
    name: "uops",
    logo: "https://jtexpress.vn/storage/app/uploads/public/629/9c6/0a6/6299c60a6662d497515747.png",
  },
  {
    _id: 3,
    name: "vivo",
    logo: "https://jtexpress.vn/storage/app/uploads/public/627/1fb/b53/6271fbb5318e6298080325.png",
  },
  {
    _id: 4,
    name: "tiktok",
    logo: "https://jtexpress.vn/storage/app/uploads/public/629/9e4/4a9/6299e44a9aae4450398133.png",
  },
  {
    _id: 5,
    name: "tiki",
    logo: "https://jtexpress.vn/storage/app/uploads/public/629/9c1/536/6299c1536126c561166062.png",
  },
  {
    _id: 6,
    name: "harvan",
    logo: "https://jtexpress.vn/storage/app/uploads/public/627/1fb/d18/6271fbd18abfc963904367.png",
  },
];
// const banner = {
//     _id: 1,
//     description: "",
//     vision: "",
//     logo: "",
//     value: "",
//     banners: [
//       "https://jtexpress.vn/storage/app/uploads/public/629/6bd/ca2/6296bdca297c7512128382.jpg",
//       "https://jtexpress.vn/storage/app/uploads/public/629/6ce/a24/6296cea2443e2392069160.jpg",
//       "https://jtexpress.vn/storage/app/uploads/public/629/5ed/e5b/6295ede5b2956262118810.jpg"
//     ],
//   }
const Home = () => {
  const [listProvinces, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [services, setServices] = useState([]);
  // const [banners, setBanners] = useState(banner.banners);
  const [partners, setPartners] = useState([]);
  const [person, setPerson] = useState({});
  const [keyOrder, setKeyOrder] = useState("");
  const { setMetadata, dataWarehouse, setDataWarehouse, order, setOrder } =
    useContext(MainContext);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get(`${END_POINT}/quote?limit=10`);
      if (res.status === 200) {
        setQuotes(res.data.data);
        res.data.data.length > 0 && setPerson(res.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPartner = async () => {
    try {
      const res = await axios.get(`${END_POINT}/partner`);
      if (res.status === 200) {
        setPartners(res.data.data.partners);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDeliveryService = async () => {
    try {
      const res = await axios.get(`${END_POINT}/service`);
      if (res.status === 200) return setServices(res.data.data.service);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Trang chủ | TKTL",
      };
    });
    const dataProvinces = getProvinces();
    setListProvince(dataProvinces);
    const provinceCode = dataProvinces.find(
      (province) => province.name === dataWarehouse.province
    )?.code;
    const dataDistricts = getDistrictsByProvinceCode(provinceCode);
    setListDistricts(dataDistricts);

    fetchQuotes();
    fetchPartner();
    fetchDeliveryService()

  }, []);
  const handleSelectProvince = (provinceSelected) => {
    const provinceCode = listProvinces.find(
      (province) => province.name === provinceSelected
    )?.code;
    const dataDistricts = getDistrictsByProvinceCode(provinceCode);
    setDataWarehouse({
      province: provinceSelected,
      district: null,
    });
    setListDistricts(dataDistricts);
  };
  const handleSelectDistrict = (districtSelected) => {
    // setCurrentDistrict(districtSelected);
    setDataWarehouse({
      ...dataWarehouse,
      district: districtSelected,
    });
  };
  const showPerson = (id) => {
    const person = quotes.find((quote) => quote._id === id);
    setPerson(person);
  };
  return (
    <div className="pt-[65px] pb-4">
      <Carousel autoplay autoplaySpeed={2000} effect="fade">
        {/* {banners.map((banner,key) => (
          <div key={key}>
            <a href="/">
              <img
                src={banner[key]}
                className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
                alt="banner"
              />
            </a>
          </div>
        ))} */}
        <div>
          <a href="/">
            <img
              src="https://i.ytimg.com/vi/h7QedpfpWQ0/maxresdefault.jpg"
              className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
              alt="banner"
            />
          </a>
        </div>
        <div>
          <a href="/">
            <img
              // src="https://jtexpress.vn/storage/app/uploads/public/629/6ce/a24/6296cea2443e2392069160.jpg"
              src="https://ntlogistics.vn/tin-tuc/wp-content/uploads/2020/05/7e054b1d577caa22f36d-scaled.jpg"
              className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
              alt="banner"
            />
          </a>
        </div>
        <div>
          <a href="/">
            <img
              src="https://ntlogistics.vn/tin-tuc/wp-content/uploads/2021/08/SGK-re.jpg"
              className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
              alt="banner"
            />
          </a>
        </div>
      </Carousel>

      <div className="container flex items-center justify-center mx-auto w-full py-4 ">
        <Tabs
          defaultActiveKey="vận đơn"
          type="card"
          className="w-full shadow-xl p-3 rounded-xl "
        >
          <TabPane
            tab={
              <div className="text-lg h-[30px] text-[#fcd535]">
                Tra cứu đơn hàng
              </div>
            }
            key="vận đơn"
          >
            <div>
              <form className="flex flex-col lg:flex-row ">
                <input
                  value={keyOrder}
                  onChange={(e) => setKeyOrder(e.target.value)}
                  className="border border-gray-300 text-[#F0B90B] text-sm rounded focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3 mb-2 lg:mb-0   "
                  placeholder="Nhập mã vận đơn của bạn (cách nhau bới dấu phẩy), tối đa 10 vận đơn"
                ></input>
                <Link
                  to="tra-cuu/van-don"
                  className="text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4  focus:ring-red-500 font-medium rounded-lg text-lg w-full lg:w-44 lg:ml-2 px-5 py-2.5 text-center "
                  onClick={(e) => {
                    if (keyOrder !== "" && keyOrder !== null) {
                      setOrder(keyOrder);
                    } else {
                      e.preventDefault();
                      alert("Vui lòng điền đầy đủ thông tin");
                    }
                  }}
                >
                  Tìm kiếm
                </Link>
              </form>
            </div>
          </TabPane>
          <TabPane
            tab={
              <div className="text-lg h-[30px] text-[#fcd535]">
                Tra cứu bưu cục
              </div>
            }
            key="2"
          >
            <form className="flex flex-col items-center lg:flex-row gap-y-3">
              <Select
                showSearch
                allowClear
                className="w-full lg:w-2/5"
                placeholder="Tỉnh/Thành Phố"
                onClear={() => {
                  setDataWarehouse({
                    province: null,
                    district: null,
                  });
                  setListDistricts([]);
                }}
                value={dataWarehouse.province}
                onChange={(value) => handleSelectProvince(value)}
              >
                {listProvinces.map((city) => (
                  <Option key={city.code} value={city.name}>
                    {city.name}
                  </Option>
                ))}
              </Select>
              <Select
                showSearch
                allowClear
                className="w-full lg:w-2/5"
                placeholder="Quận/Huyện"
                onSelect={(value) => handleSelectDistrict(value)}
                value={dataWarehouse.district}
                onClear={() =>
                  setDataWarehouse({
                    ...dataWarehouse,
                    district: null,
                  })
                }
              >
                {listDistricts.map((distr) => (
                  <Option key={distr.code} value={distr.name}>
                    {distr.name}
                  </Option>
                ))}
              </Select>
              <Link
                to="tra-cuu/buu-cuc"
                className="inline-block h-full w-full text-white  bg-yellow-500 hover:bg-yellow-400 focus:ring-2  focus:ring-red-500 font-medium rounded-lg text-lg lg:w-44 lg:ml-2 px-5 py-2.5 text-center"
              >
                Tìm kiếm
              </Link>
            </form>
          </TabPane>
          <TabPane
            tab={
              <Link
                to="tra-cuu/bang-gia"
                className="text-lg h-[30px] text-[#fcd535]"
              >
                Bảng giá
              </Link>
            }
            key="bảng giá"
          ></TabPane>
        </Tabs>
      </div>

      {/* Test searching */}

      {/* <div className=" container mt-4 grid grid-cols-1 lg:grid-cols-2 mx-auto gap-y-3 gap-x-6">
        {warehouses.map((warehouse, key) => (
          <div
            key={key}
            className="flex flex-col bg-[#FFFF00] bg-opacity-70 p-4 rounded-xl gap-y-2"
          >
            <div className="flex flex-row justify-between">
              <span className="text-xl font-extrabold text-red-700">{warehouse.name}</span>
              <a
                href={"https://www.google.com/maps?q=" + warehouse?.lon + warehouse?.lat}
                target="_blank"
                className="flex items-center text-red-600"
              >
                <FiMap className="w-4 h-4 inline-block mr-2" />
                <span className=" text-lg text-inherit font-semibold">Tìm đường đi</span>
              </a>
            </div>
            <div className="flex items-stretch">
              <IoLocationOutline className="w-4 h-4 inline-block mr-2" />
              <span className="font-semibold">{warehouse.street}</span>
            </div>
          </div>
        ))}
      </div> */}
      {/* Test searching */}

      <div className="flex flex-col justify-center items-center py-4 mt-6">
        <span className="uppercase text-xl font-black">
          mạng lưới phủ sóng hầu hết các tỉnh thành Việt Nam
        </span>
        <span className="text-sm">
          Tien Kim Thanh express tự hào đã & đang mở rộng mạng lưới trên khắp
          đất nước, mang trong mình sứ mệnh vươn ra tầm cỡ thế giới
        </span>
      </div>
      <div className="flex flex-col justify-center items-center m-6 text-red-500">
        <img src="" alt="Hình chụp bưu cục tại 3 chí nhánh HCM HN Đà Nẵng! Không có thì bỏ" />
      </div>

      {/* <Fade bottom duration={1500}>
        <div className="grid grid-cols-3 text-white text-center gap-y-12 mb-9">
          {flags.map((flag, key) => (
            <div
              className="relative flex flex-col justify-start items-center"
              key={key}
            >
              <img
                src={flag.url}
                alt={flag.name}
                className="peer w-12 h-12 shadow-md rounded-full  "
              />
              <span className="hidden lg:peer-hover:block  absolute top-14 px-5 py-1 rounded-md bg-slate-800">
                {flag.name}
              </span>
            </div>
          ))}
        </div>
      </Fade> */}

      <div className="flex flex-col lg:flex-row ">
        <div className="flex flex-col items-center justify-center text-justify gap-y-7 w-full lg:max-w-[500px] py-6 px-3 bg-[#F0B90B] lg:rounded-r-xl">
          <Fade left duration={1500}>
            <span className="text-4xl font-black container text-white">
              VỀ CHÚNG TÔI
            </span>
            <span className=" text-base container tracking-wide px-4 lg:px-6 w-full">
              J&T Express là thương hiệu chuyển phát nhanh dựa trên sự phát
              triển của công nghệ và Internet. Chúng tôi sở hữu mạng lưới rộng
              khắp nhằm hỗ trợ các hoạt động giao nhận hàng hóa nhanh chóng
              không chỉ ở nội thành mà còn ở ngoại thành và các vùng xa của các
              tỉnh thành trong cả nước Việt Nam.
            </span>
          </Fade>
        </div>
        <div className="grid grid-cols-2 mx-auto gap-y-2 px-6 bg-yellow-100 lg:rounded-l-2xl w-full">
          <Fade right duration={2000}>
            <div className="flex flex-col items-center text-center py-4">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/63tinh-thanh.png"
                alt="63-tinh-thanh-pic"
              />
              <span className="text-xl font-extrabold">63 TỈNH THÀNH</span>
              <span>Dịch vụ phủ sóng khắp 63 tỉnh thành</span>
            </div>
            <div className="flex flex-col items-center text-center py-4">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/1000xe.png"
                alt="vehicle-pic"
              />
              <span className="text-xl font-extrabold">850 PHƯƠNG TIỆN</span>
              <span>Sở hữu 850 xe tải vận chuyển hàng hóa</span>
            </div>
            <div className="flex flex-col items-center text-center py-4">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/25000nhan-vien.png"
                alt="staff-pic"
              />
              <span className="text-xl font-extrabold">19.000+ NHÂN VIÊN</span>
              <span>
                Hơn 19.000 nhân viên đang làm việc khắp các tỉnh thành
              </span>
            </div>
            <div className="flex flex-col items-center text-center py-4">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/1900bu-cuc.png"
                alt="office-pic"
              />
              <span className="text-xl font-extrabold">1.900 BƯU CỤC</span>
              <span>Hơn 1.900 bưu cục hoạt động trên toàn quốc</span>
            </div>
          </Fade>
        </div>
      </div>
      <div className="hidden lg:flex flex-row flex-wrap justify-around items-center container mx-auto my-12 ">
        {services.length >0 && services.map((service) => (
          <Link to={`dich-vu/${service._id}`} key={service._id}>
            <div className="group shadow-2xl">
              <img
                src={`${END_POINT}/public/${service.logo}`}
                alt={service.name}
                className="group-hover:scale-110 duration-500 w-[174px]"
              />
            </div>
            <div className="pt-4 flex flex-col">
              <span className="text-xl font-bold uppercase">
                {service.name}
              </span>
              <span className="text-base">{service.sub_detail}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* <div className="flex items-center justify-center my-6 container mx-auto">
        <Zoom duration={1000}>
          <iframe
            width="731"
            height="411"
            src="https://www.youtube.com/embed/99RCEdAP_yk"
            title="J&T Express tự hào ra mắt Trung tâm trung chuyển lớn nhất Việt Nam"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Zoom>
      </div> */}
      <div className="relative h-[670px] lg:h-[462px]">
        <img
          src="https://jtexpress.vn/themes/jtexpress/assets/images/bg-download-appnew.png"
          alt=""
          className=" h-full w-full object-cover"
        />
        <div className="absolute bottom-0 flex flex-col lg:flex-row justify-around items-center gap-y-3 w-full ">
          <div className="flex flex-col text-center gap-y-5">
            <span className="text-white text-4xl font-black">TẢI ỨNG DỤNG</span>
            <span className="text-white  text-base font-bold mt-[-12px]">
              Tải ngay App J&T Express - Giao Hàng Nhanh
              <br />
              Hưởng trọn bộ tính năng giao hàng chỉ với 1 chạm
            </span>
            <div className="flex flex-row justify-around">
              <img src={appStore} alt="appstore" />
              <img src={ggPlay} alt="ggplay" />
            </div>
          </div>
          <div>
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/phone-at-home.png"
              alt=""
              className=""
            />
          </div>
        </div>
      </div>
      {quotes.length > 0 && (
        <div className="container mx-auto px-2 lg:px-0  my-10">
          <span className="block text-2xl sm:text-4xl lg:text-4xl font-black my-6 lg:my-0">
            ĐỐI TÁC NÓI VỀ CHÚNG TÔI
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-[60%_35%] gap-x-10 ">
            <div className="flex flex-col justify-center items-center  ">
              <span>
                Từ khi đặt chân vào Việt Nam năm 2018, J&T Express luôn nỗ lực
                hết mình, hoàn thành nghĩa vụ của một đối tác vận chuyển lớn
                trong khu vực, mang lại dịch vụ tốt nhất cho tất cả khách hàng,
                nhận về nhiều lời khen và nhận xét tích cực. Đây là sự tự hào và
                động lực để J&T Express tiếp tục giữ vững thành tích, phát huy
                dịch vụ, nâng cao hơn nữa trải nghiệm khách hàng.
              </span>

              <div className="w-full py-4">
                <Carousel
                  autoplay
                  autoplaySpeed={2000}
                  focusOnSelect
                  draggable
                  slidesToShow={3}
                  arrows
                  // responsive={[]}
                  className=" overflow-hidden"
                >
                  {quotes.map((quote) => (
                    <div
                      className="flex flex-col items-center text-center"
                      key={quote._id}
                      onClick={() => showPerson(quote._id)}
                    >
                      <div className="w-[100px] h-[100px] sm:w-[134px] sm:h-[134px]">
                        <img
                          src={`${END_POINT}/public/${quote.avatar}`}
                          className="h-full w-full rounded-full object-cover"
                          alt={quote.name}
                        />
                      </div>
                      <span className="font-bold">{quote.name}</span>
                      <span className="px-2 ">{quote.description}</span>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="bg-[#F0B90B] rounded-xl shadow-2xl lg:min-h-[450px] overflow-hidden  ">
              <div className="flex flex-col items-center px-4 py-8">
                <div className="w-[134px] h-[134px]">
                  {person.avatar !== undefined && (
                    <img
                      src={`${END_POINT}/public/${person.avatar}`}
                      className=" h-full w-full rounded-full object-cover"
                      alt=""
                    />
                  )}
                </div>
                <span className="text-xl font-bold pt-4">{person.name}</span>
                <span>{person.description}</span>
                <div className="mx-3 sm:mx-10 lg:mx-0">
                  <span className="py-6 line-clamp-6 text-justify">
                    {person.quote}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container m-auto">
        <Carousel
          autoplay
          autoplaySpeed={2000}
          draggable
          slidesToShow={5}
          dots={false}
          className="w-full"
        >
          {partners.length > 0 &&
            partners.map((partner) => (
              <img
                src={`${END_POINT}/public/${partner.logo}`}
                alt={partner.name}
                className="w-[186px] h-[100px] object-scale-down"
                key={partner._id}
              />
            ))}
        </Carousel>
      </div>
    </div>
  );
};
export default Home;
