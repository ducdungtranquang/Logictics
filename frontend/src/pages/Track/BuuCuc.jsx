import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getProvinces, getDistrictsByProvinceCode } from "sub-vn";
import { IoLocationOutline } from "react-icons/io5";
import { FiMap } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { END_POINT } from "../../utils/constant";
import { MainContext } from "../../context/MainContext";

export default function BuuCuc() {
  const { dataWarehouse, setDataWarehouse } = useContext(MainContext);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(null);
  const [districtSelected, setDistrictSelected] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [result, setResult] = useState([]);
  const pathname = useLocation();
  // get all provinces
 
  useEffect(() => {
    const getProvince = getProvinces()
    setProvinces(getProvince);
    setProvinceSelected(dataWarehouse.province);
    setDistrictSelected(dataWarehouse.district);
    const provinceCode = getProvince.find((province) =>
      province.name.includes(dataWarehouse.province)
    )?.code;
    const dataDistricts = getDistrictsByProvinceCode(provinceCode);
    setDistricts(dataDistricts);
    const province = dataWarehouse.province?.replace("Thành phố ", "")?.replace("Tỉnh ", "");
    if (dataWarehouse.province && dataWarehouse.district) {
      const findWarehouse = async () => {
        try {
          const res = await axios.get(`${END_POINT}/warehouse`, {
            params: {
              ...dataWarehouse,
              province
            },
          });
          setResult(res.data.data.warehouses);
        } catch (error) {
          console.log(error);
        }
      };
      findWarehouse();
    }
  }, []);
  // useEffect( ()=>{
  //   const provinceCode = getProvinces().find((province) =>
  //     province.name.includes(dataWarehouse.province)
  //   )?.code;
  //   const dataDistricts = getDistrictsByProvinceCode(provinceCode);
  //   setDistricts(dataDistricts);
  // },[])
  useEffect(() => {
    dataWarehouse.district && window.scrollTo(0, 350);
  }, [pathname]);

  //   // get all districts by province code
  //   useEffect(() => {
  //     setDistricts(getDistrictsByProvinceCode(provinceSelected));
  //   }, [provinceSelected]);
  const handleSelectProvince = (provinceSelected) => {
    setDataWarehouse({
      province: null,
      district: null,
    });
    //   setIsValid(()=>false)
    const provinceCode = provinces.find((province) => province.name === provinceSelected)?.code;
    const dataDistricts = getDistrictsByProvinceCode(provinceCode);
    setProvinceSelected(provinceSelected);
    setDistrictSelected(null);
    setDistricts(dataDistricts);
  };
  const handleSubmit = async () => {
    // check empty field
    if (!provinceSelected || !districtSelected) {
      setIsValid(false);
      return;
    }

    try {
      // find province and district by code
      //   let province = provinces?.find((province) => province.code === provinceSelected)?.name || "";
      //   let district = districts?.find((district) => district.code === districtSelected)?.name || "";

      // replace Thành phố || Tỉnh to empty
      //   province = province.replace("Thành phố ", "").replace("Tỉnh ", "");
      let province = provinceSelected.replace("Thành phố ", "").replace("Tỉnh ", "");

      const res = await axios.get(`${END_POINT}/warehouse`, {
        params: {
          province,
          district: districtSelected,
        },
      });

      setResult(res.data.data.warehouses);
      setIsValid(true);
    } catch (error) {
      alert("Có lỗi xảy ra, thử chọn 1 địa điểm khác!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <div className="flex items-center flex-col lg:flex-row gap-[24px]">
        <div className="w-full h-[43px] lg:w-1/3">
          <select
            style={{ border: "1px solid black" }}
            id="city"
            className="search-select w-full h-full  "
            // onChange={(e) => {setProvinceSelected(e.target.value)}}
            onChange={(e) => handleSelectProvince(e.target.value)}
          >
            {dataWarehouse.province ? (
              <option value={dataWarehouse.province}>{dataWarehouse.province}</option>
            ) : (
              <option data-select2-id="select2-data-81-rsyi" value="">
                Tỉnh/ Thành phố
              </option>
            )}

            {provinces?.length > 0 &&
              provinces.map((province) => (
                <option className="text-[#161D25]" value={province.name} key={province.code}>
                  {province.name}
                </option>
              ))}
          </select>
          <span style={{ width: "345.337px" }}>
            <span className="selection">
              <span>
                <span title="Tỉnh/ Thành phố">Tỉnh/ Thành phố</span>
                <span>
                  <b />
                </span>
              </span>
            </span>
            <span />
          </span>
          {!isValid && !provinceSelected && (
            <div className="text-[#F0B90B] ">Vui lòng chọn tỉnh/thành phố</div>
          )}
        </div>
        <div className="w-full  h-[43px] lg:w-1/3 ">
          <select
            style={{ border: "1px solid black" }}
            id="district"
            className=" w-full h-full  "
            onChange={(e) => setDistrictSelected(e.target.value)}
          >
            {dataWarehouse.district ? (
              <option value={dataWarehouse.district}>{dataWarehouse.district}</option>
            ) : (
              <option value="">Quận/ Huyện</option>
            )}

            {districts?.length > 0 &&
              districts.map((district) => (
                <option className="text-[#161D25]" value={district.name} key={district.code}>
                  {district.name}
                </option>
              ))}
          </select>
          <span style={{ width: "345.337px" }}>
            <span>
              <span>
                <span title="Quận/huyện">Quận/huyện</span>
                <span>
                  <b />
                </span>
              </span>
            </span>
            <span />
          </span>
          {!isValid && !districtSelected && (
            <div className="text-[#F0B90B] ">Vui lòng chọn quận/huyện</div>
          )}
        </div>
        <div className="text-center w-full lg:w-1/3" onClick={handleSubmit}>
          <button className="text-white bg-[#e5a663] rounded-[2px] min-h-[44px] w-full font-semibold">
            Tìm kiếm bưu cục
          </button>
        </div>
      </div>

      {/* result */}
      <div className="mt-14 flex flex-wrap"> 
        {result?.length > 0 ? (
          // result.map((warehouse) => (
          //   <div id="bill" className="w-1/2 px-10 lg:px-0" key={warehouse._id}>
          //     <div className="m-2 bg-[#FFF2F4] min-h-[140px] rounded-[10px] border-[#fdb0b0] border flex items-center">
          //       <div className="p-6">
          //         <p className="text-[#F0B90B] font-black text-[20px] mb-1">{warehouse.name}</p>

          //         <div className="flex items-baseline">
          //           <div className="w-4 h-4 pt-0.5 mr-2">
          //             <IoLocationOutline />
          //           </div>
          //           <span className="text-[16px] font-medium mb-0">{warehouse.street}</span>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // ))

          <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-y-3 gap-x-6 lg:mx-0">
        {result.map((warehouse) => (
          <div
            key={warehouse._id}
            className="flex flex-col bg-[#FFF2F4] border-[#fdb0b0] border bg-opacity-70 p-4 rounded-xl gap-y-6"
          >
            <div className="flex flex-row justify-between gap-x-1">
              <span className="text-xl font-extrabold text-red-700">{warehouse.name}</span>
              <a
                href={`https://www.google.com/maps?q=${warehouse?.lon}${warehouse?.lat}`}
                target="_blank"
                className="flex items-center text-red-600"
              >
                <FiMap className="w-4 h-4 inline-block mr-2" />
                <span className=" text-lg text-inherit font-semibold min-w-[131px]">Tìm đường đi</span>
              </a>
            </div>
            <div className="flex items-stretch">
              <IoLocationOutline className="w-4 h-4 inline-block mr-2" />
              <span className="font-semibold">{warehouse.street}</span>
            </div>
          </div>
        ))}
      </div>
        ) : (
          <div id="bill" className="w-full px-10 lg:px-0">
            <div className="m-2 bg-[#FFF2F4] min-h-[100px] rounded-[10px] border-[#fdb0b0] border flex items-center justify-center">
              <div className="p-6">
                <p className="text-[#F0B90B] font-black text-[20px] mb-1">Không có kết quả</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}