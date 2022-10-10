import React, {useState, useEffect} from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import axios from "axios";
import {END_POINT} from "../../utils/constant";
console.log("endpoint",END_POINT)
import {getDistrictsByProvinceCode, getProvinces} from "sub-vn";
import IconAwesome from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import {Select, CheckIcon, Icon} from "native-base";
const data = [
  {
    _id: "62ea8067623fd0ded0e0b7bb",
    name: "(HNI)Vĩnh Phúc",
    province: "Hà Nội",
    district: "Quận Ba Đình",
    phone: "0123456789",
    street:
      "Số 1 ngõ 254 đường Bưởi, phường Cống Vị, quận Ba Đình, thành phố Hà Nội",
    inventory:
      '[{"shipment":{"$oid":"62e662ac5d837fd33a08a1e4"},"status":"import"},{"shipment":"62e88fbfa5dd7e226cacef53","status":"export"}]',
    inventory_product_shipments: [],
  },
  {
    _id: "62ea8067623fd0ded0e0b7bc",
    name: "(HNI)Tân Ấp",
    province: "Hà Nội",
    district: "Quận Ba Đình",
    phone: "0123456789",
    street: "26  Tân Ấp,phúc xá,Ba Đình,Hà Nội",
    inventory:
      '[{"shipment":{"$oid":"62e662ac5d837fd33a08a1e4"},"status":"import"},{"shipment":"62e88fbfa5dd7e226cacef53","status":"export"}]',
    inventory_product_shipments: [],
  },
  {
    _id: "62ea8067623fd0ded0e0ba72",
    name: "(HNI) Giang Văn Minh",
    province: "Hà Nội",
    district: "Quận Ba Đình",
    phone: "0123456789",
    street: "Số 3 ngõ 34 Giang Văn Minh, phường Kim Mã, Ba Đình, Hà Nội",
    inventory:
      '[{"shipment":{"$oid":"62e662ac5d837fd33a08a1e4"},"status":"import"},{"shipment":"62e88fbfa5dd7e226cacef53","status":"export"}]',
    inventory_product_shipments: [],
  },
  {
    _id: "62ea8067623fd0ded0e0baee",
    name: "(HNI) Nguyễn Chí Thanh",
    province: "Hà Nội",
    district: "Quận Ba Đình",
    phone: "0123456789",
    street:
      "Số 110B2 đường Nguyễn Chí Thanh, phường Ngọc Khánh, quận Ba Đình, thành phố Hà Nội",
    inventory:
      '[{"shipment":{"$oid":"62e662ac5d837fd33a08a1e4"},"status":"import"},{"shipment":"62e88fbfa5dd7e226cacef53","status":"export"}]',
    inventory_product_shipments: [],
  },
  {
    _id: "62ea8068623fd0ded0e0bbd2",
    name: "(HNI) Đốc Ngữ",
    province: "Hà Nội",
    district: "Quận Ba Đình",
    phone: "0123456789",
    street: "Số 80 phố Đốc Ngữ, phường Vĩnh Phúc, quận Ba Đình, Hà Nội",
    inventory:
      '[{"shipment":{"$oid":"62e662ac5d837fd33a08a1e4"},"status":"import"},{"shipment":"62e88fbfa5dd7e226cacef53","status":"export"}]',
    inventory_product_shipments: [],
  },
  {
    _id: "62ea8068623fd0ded0e0bc64",
    name: "(HNI) Thành Công",
    province: "Hà Nội",
    district: "Quận Ba Đình",
    phone: "0123456789",
    street: "Số 629 đường La Thành, phường Thành Công, quận Ba Đình, Hà Nội",
    inventory:
      '[{"shipment":{"$oid":"62e662ac5d837fd33a08a1e4"},"status":"import"},{"shipment":"62e88fbfa5dd7e226cacef53","status":"export"}]',
    inventory_product_shipments: [],
  },
  {
    _id: "62ea8068623fd0ded0e0bca8",
    name: "(HNI) Đội Cấn",
    province: "Hà Nội",
    district: "Quận Ba Đình",
    phone: "0123456789",
    street: "Số 93 Đội Cấn, phường Đội Cấn, quận Ba Đình, thành phố Hà Nội",
    inventory:
      '[{"shipment":{"$oid":"62e662ac5d837fd33a08a1e4"},"status":"import"},{"shipment":"62e88fbfa5dd7e226cacef53","status":"export"}]',
    inventory_product_shipments: [],
  },
  {
    _id: "62ea8068623fd0ded0e0bd02",
    name: "(HNI) Ngọc Hà",
    province: "Hà Nội",
    district: "Quận Ba Đình",
    phone: "0123456789",
    street:
      "Số 31 đường Hoàng Hoa Thám, phường Ngọc Hà, quận Ba Đình, thành phố Hà Nội",
    inventory:
      '[{"shipment":{"$oid":"62e662ac5d837fd33a08a1e4"},"status":"import"},{"shipment":"62e88fbfa5dd7e226cacef53","status":"export"}]',
    inventory_product_shipments: [],
  },
];
function Warehouse({navigation}) {
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [dataForSearch, setDataForSearch] = useState({
    province: null,
    district: null,
  });
  useEffect(() => {
    const dataProvinces = getProvinces();
    setProvinces(dataProvinces);
    // setWarehouses(data);
  }, []);
  const handleSelectProvince = provinceSelected => {
    const provinceCode = provinces.find(
      province => province.name === provinceSelected,
    )?.code;
    const dataDistricts = getDistrictsByProvinceCode(provinceCode);
    setDataForSearch({
      province: provinceSelected,
      district: null,
    });
    setDistricts(dataDistricts);
   
  };
  const handleSelectDistrict = districtSelected => {
    // setCurrentDistrict(districtSelected);
    setDataForSearch({
      ...dataForSearch,
      district: districtSelected,
    });
    setWarehouses([])
  };
  const handleSearch = () => {
    if (dataForSearch.province && dataForSearch.district) {
    const province = dataForSearch.province?.replace("Thành phố ", "")?.replace("Tỉnh ", "");
      const fetchData = async () => {
        try {
          const res = await axios.get(`${END_POINT}/warehouse`, {
            params: {...dataForSearch,province},
          });
          
          setWarehouses(res.data.data.warehouses);
        } catch (error) {
          Alert.alert("Thông báo", `${error}`, [
            {
              text: "Cancel",
              // onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {text: "OK",
            //  onPress: () => console.log("OK Pressed")
            },
          ]);
        }
      };
      fetchData();
    // setWarehouses(data)
    return
    }
    Alert.alert("Thông báo", "Mời chọn đủ thông tin", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {text: "OK", onPress: () => console.log("OK Pressed")},
    ]);
  };
  return (
    <SafeAreaView style={{backgroundColor: "#FFD124", height: "100%"}}>
      <View
        style={{
          height: "12%",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 24,
            width: 50,
            height: 50,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <IconAwesome name="arrow-left" size={26} />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>
          Danh sách bưu cục
        </Text>
      </View>
      <View
        style={{
          height: "88%",
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingHorizontal: 24,
          // justifyContent:"center"
        }}
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Select
            selectedValue={dataForSearch.province}
            minWidth="45%"
            height="56px"
            borderRadius={5}
            backgroundColor="#FFD124"
            placeholderTextColor="black"
            accessibilityLabel="Choose Service"
            fontSize="14px"
            placeholder="Tỉnh/Thành phố"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={value => handleSelectProvince(value)}
          >
            {provinces.map(province => (
              <Select.Item
                label={province.name}
                value={province.name}
                key={province.name}
              />
            ))}
          </Select>
          <Select
            selectedValue={dataForSearch.district}
            minWidth="45%"
            height="56px"
            borderRadius={5}
            backgroundColor="#FFD124"
            placeholderTextColor="black"
            accessibilityLabel="Choose Service"
            fontSize="14px"
            placeholder="Quận/huyện"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={value => handleSelectDistrict(value)}
          >
            {districts.map(district => (
              <Select.Item
                label={district.name}
                value={district.name}
                key={district.name}
              />
            ))}
          </Select>
        </View>

        <View
          style={{
            flex: 7,
            alignItems: "center",
          }}
        >
          {warehouses.length > 0 ? (
            <FlatList
              keyExtractor={item => item._id}
              data={warehouses}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View
                  style={{
                    height: 146,
                    width: "100%",
                    flexDirection: "row",
                    marginVertical: 12,
                    // marginHorizontal:10,
                    borderRadius: 5,
                    backgroundColor: "white",
                    shadowColor: "#000000",
                    shadowOffset: {
                      width: 3,
                      height: 3,
                    },
                    shadowRadius: 5,
                    shadowOpacity: 1.0,
                    elevation: 5,
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      width: "4%",
                      backgroundColor: "#FFD124",
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                    }}
                  ></View>
                  <View style={{width: "95%"}}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        alignContent: "center",
                        flexDirection: "row",
                        marginRight: 24,
                        backgroundColor: "white",
                      }}
                    >
                      <View style={{justifyContent: "center"}}>
                        <IconAwesome name="circle" color="#00FF57" />
                      </View>
                      <Text
                        style={{
                          textAlignVertical: "center",
                          fontSize: 12,
                          marginLeft: 6,
                        }}
                      >
                        Đang mở cửa
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 6,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          width: "90%",
                          flexDirection: "row",
                          paddingVertical: 10,
                        }}
                      >
                        <View style={{marginRight: 5, minWidth: 20}}>
                          <IonIcon name="location-sharp" size={20} />
                        </View>
                        <Text style={{width: "85%", fontSize: 16}}>
                          {item.street}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          width: "90%",
                          flexDirection: "row",
                          paddingVertical: 10,
                        }}
                      >
                        <View
                          style={{
                            marginRight: 5,
                            minWidth: 20,
                            alignItems: "center",
                          }}
                        >
                          <IconAwesome name="phone" size={20} />
                        </View>
                        <Text
                          style={{
                            fontSize: 16,
                            width: "80%",
                          }}
                        >
                          {item.phone}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <TouchableOpacity
              style={{
                width: 150,
                height: 58,
                borderRadius: 16,
                backgroundColor: "#FFD124",
                justifyContent: "center",
              }}
              onPress={handleSearch}
            >
              <Text style={{textAlign: "center", fontSize: 18, color: "white"}}>
                Tra cứu
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {/* { warehouses.length===0 && <View
          style={{
            flex:1,
            alignItems:"center",
            marginTop:20,
            backgroundColor:"red"
          }}
        >
          <TouchableOpacity 
          style={{width:150,height:58,borderRadius:16,backgroundColor:"#FFD124",justifyContent:"center"}}
          onPress={handleSearch}
          >
            <Text style={{textAlign:"center", fontSize:18,color:"white"}}>Tra cứu</Text>
          </TouchableOpacity>
        </View> } */}
      </View>
    </SafeAreaView>
  );
}

export default Warehouse;
