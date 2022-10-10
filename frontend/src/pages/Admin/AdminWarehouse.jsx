import { Table, Input } from "antd";
import { AiFillEdit, AiOutlineDelete, AiOutlineSearch } from "react-icons/ai";
import { END_POINT } from "../../utils/constant";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AddNewWarehouse from "../../components/Admin/Warehouse/AddWarehouse";
import EditWarehouse from "../../components/Admin/Warehouse/EditWarehouse";
import ConfirmModal from "../../components/ConfirmModal";
import { MainContext } from "../../context/MainContext";
import {
    getProvincesWithDetail,
    getProvinces,
    getWardsByDistrictCode,
    getDistrictsByProvinceCode,
  } from "sub-vn";

function AdminWarehouse() {
    const columns = [
        {
            title: 'Tên nhà kho',
            dataIndex: 'name',
            sorter: (a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
            },
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Đường',
            dataIndex: 'street',
        },
        {
            title: 'Phường/Xã',
            dataIndex: 'ward',
        },
        {
            title: 'Quận/Huyện',
            dataIndex: 'district',
        },
        {
            title: 'Tỉnh/TP',
            dataIndex: 'province',
            sorter: (a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
            },
        },
        {/*
            title: 'lon',
            dataIndex: 'lon',
        },
        {
            title: 'lat',
            dataIndex: 'lat',
        */},
        {
        title: "",
        width: 160,
        dataIndex: "action",
        render: (a, record) => (
            <div className="flex flex-row gap-y-1 gap-x-3 justify-around">
            <button
                className="flex items-baseline gap-x-1 hover:text-blue-600"
                onClick={() => handleClickEdit(record)}
            >
                <AiFillEdit className="translate-y-[1px]" />
                Sửa
            </button>
            <button
                className="flex items-baseline gap-x-1 hover:text-red-600"
                onClick={() => {
                setIsDeleteVisible(true);
                setValueCompare(record._id);
                setNameCompare(record.name);
                }}
            >
                <AiOutlineDelete className="translate-y-[1px]" />
                Xóa
            </button>
            </div>
        ),
        },
    ];
    const { accessToken } = useContext(MainContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 1,
        total: 3,
    });
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [IdCompare, setValueCompare] = useState("");
    const [nameCompare, setNameCompare] = useState("");
    const [dataForEdit, setDataForEdit] = useState({});

    const fetchData = async (params = {}) => {
        setLoading(true);
        try {
        const { data: response } = await axios.get(`${END_POINT}/warehouse`, {
            params: params,
        });
        setData(response.data.warehouses);
        setLoading(false);
        setPagination({
            total: params?.total,
            pageSize: params?.pageSize,
            current: params?.page + 1,
        });
        } catch (error) {
        console.error(error.message);
        }
    };
    useEffect(() => {
        fetchData({
        ...pagination,
        page: pagination.current - 1,
        });
    }, []);
    const acceptDelete = async () => {
        setLoading(true);
        setIsDisable(true);
        try {
        await axios.delete(`${END_POINT}/admin/warehouse/${IdCompare}`, {
            headers: { authorization: `Bearer ${accessToken}` },
        });
        setLoading(false);
        fetchData();
        setIsDisable(false);
        setIsDeleteVisible(false);
        } catch (error) {
        console.log(error);
        }
    };
    const handleClickEdit = (record) => {
        setIsEditVisible(true);
        const [dataEdit] = data.filter((ele) => ele.name === record.name);
        setDataForEdit(dataEdit);
    };
    const searchByKeyword = async () => {
        setLoading(true);
        try {
        const { data: response } = await axios.get(`${END_POINT}/warehouse`, {
            params: { district: district, province: province },
        });
        setData(response.data.warehouses);
        setLoading(false);
        } catch (error) {
        console.error(error.message);
        }
    };
    const handleTableChange = (newPagination, filters, sorter) => {
        const sort = sorter.order === "descend" ? `-${sorter.field}` : sorter.field;
        fetchData({
        sortBy: sort,
        ...newPagination,
        page: newPagination.current - 1,
        });
    };

    const [provincesTo, setProvincesTo] = useState([]);
    const [districtsTo, setDistrictsTo] = useState([]);
    const [wardsTo, setWardsTo] = useState([]);
  
    const [provinceCodeTo, setProvinceCodeTo] = useState(null);
    const [districtCodeTo, setDistrictCodeTo] = useState(null);
    const [wardCodeTo, setWardCodeTo] = useState(null);
  
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [ward, setWard] = useState(null);

      // get all provinces
    useEffect(() => {
        setProvincesTo(getProvinces());
    }, []);

    // get all districts by province code
    useEffect(() => {
        setDistrictsTo(getDistrictsByProvinceCode(provinceCodeTo));
    }, [provinceCodeTo]);

    // get all wards by district code
    useEffect(() => {
        setWardsTo(getWardsByDistrictCode(districtCodeTo));
    }, [districtCodeTo]);

    //get province, district, ward name
    useEffect(() => {
        for(let i = 0; i < provincesTo?.length; i++)
        if(provinceCodeTo == provincesTo[i].code)
            setProvince(provincesTo[i].name)     
    })
    useEffect(() => {
        for(let i = 0; i < districtsTo?.length; i++)
        if(districtCodeTo == districtsTo[i].code)
            setDistrict(districtsTo[i].name)     
    })
    useEffect(() => {
        for(let i = 0; i < wardsTo?.length; i++)
        if(wardCodeTo == wardsTo[i].code)
            setWard(wardsTo[i].name)     
    })

    return (
        <div>
        <div className="flex justify-between mb-4">
            <span className="text-3xl font-bold uppercase">Kho bãi</span>
                <div className="w-1/3 lg:w-[400px]">
                    <select
                        name="province_id"
                        id="dropdown-province"
                        className="h-1/2 w-full "
                        onChange={(e) => setProvinceCodeTo(e.target.value)}
                    >
                        <option data-select2-id="select2-data-81-rsyi" value="">
                            Tỉnh/ Thành phố
                        </option>

                        {provincesTo?.length > 0 && provincesTo.map((province) => (
                            <option
                                className="text-[#161D25]"
                                value={province.code}
                                key={province.code}
                            >
                                {province.name}                             
                            </option>
                        ))}
                    </select>
                    <select
                        className=" h-1/2 w-full "
                        onChange={(e) => setDistrictCodeTo(e.target.value)}
                    >
                        <option value="">Quận/ Huyện</option>

                        {districtsTo?.length > 0 && districtsTo.map((district) => (
                            <option
                                className="text-[#161D25]"
                                value={district.code}
                                key={district.code}
                            >
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button>
                    <AiOutlineSearch  className="w-1/24 lg:w-[100px] hover:text-blue-600 text-4xl" onClick={searchByKeyword}/>
                </button>
            <button
            className="px-5 py-2 border border-neutral-800 text-center hover:bg-slate-300"
            onClick={() => setIsAddVisible(true)}
            >
            + Thêm mới
            </button>
        </div>
        <Table
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
        {isAddVisible && (
            <AddNewWarehouse
            onClose={() => setIsAddVisible(false)}
            refetchData={()=>fetchData({
                ...pagination,
                page: pagination.current - 1,
            })}
            />
        )}
        {isEditVisible && (
            <EditWarehouse
            onClose={() => setIsEditVisible(false)}
            data={dataForEdit}
            refetchData={()=>fetchData({
                ...pagination,
                page: pagination.current - 1,
            })}
            />
        )}
        <ConfirmModal //Modal delete 
            isVisible={isDeleteVisible}
            text={`xóa nhà kho ${nameCompare}`}
            onClose={() => setIsDeleteVisible(false)}
            loading={loading}
            disable={isDisable}
            onOk={acceptDelete}
        />
        </div>
    );
}

export default AdminWarehouse;




