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
  Button,
  Pressable,
} from "react-native";
import {getDistrictsByProvinceCode, getProvinces} from "sub-vn";
import IconAwesome from "react-native-vector-icons/FontAwesome";
import IconAnt from "react-native-vector-icons/AntDesign";
import {Select, CheckIcon, Radio, Stack} from "native-base";

function Tracking({navigation}) {
  const [warehouse, setWarehouse] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [dataForSearch, setDataForSearch] = useState({
    province: null,
    district: null,
  });
  useEffect(() => {
    const dataProvinces = getProvinces();
    setProvinces(dataProvinces);
  }, []);
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
          Tra cứu phí vận chuyển
        </Text>
      </View>
      <View
        style={{
          height: "88%",
          backgroundColor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          paddingHorizontal: 24,
          // justifyContent: "center",
        }}
      >
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              paddingVertical: 10,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{flex: 1}}>
              <Text style={{paddingVertical: 5, paddingLeft: 15, fontSize: 13}}>
                Chọn điểm đi
              </Text>
              <Select
                selectedValue={dataForSearch.province}
                minWidth="42%"
                height="56px"
                borderRadius={16}
                backgroundColor="#FFD124"
                placeholderTextColor="black"
                accessibilityLabel="Choose Service"
                fontSize="14px"
                // alignSelf="center"
                placeholder="Tỉnh/Thành phố"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                onValueChange={itemValue =>
                  setDataForSearch({province: itemValue, district: null})
                }
              >
                {provinces.map(province => (
                  <Select.Item
                    label={province.name}
                    value={province.name}
                    key={province.name}
                  />
                ))}
              </Select>
            </View>
            <IconAnt
              name="arrowright"
              size={24}
              style={{marginHorizontal: 2, transform: [{translateY: 15}]}}
            />
            <View style={{flex: 1}}>
              <Text style={{paddingVertical: 5, paddingLeft: 15, fontSize: 13}}>
                Chọn điểm đi
              </Text>
              <Select
                selectedValue={dataForSearch.province}
                minWidth="42%"
                height="56px"
                borderRadius={16}
                backgroundColor="#FFD124"
                placeholderTextColor="black"
                accessibilityLabel="Choose Service"
                fontSize="14px"
                // alignSelf="center"
                placeholder="Quận/Huyện"
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />,
                }}
                onValueChange={itemValue =>
                  setDataForSearch({province: itemValue, district: null})
                }
              >
                {provinces.map(province => (
                  <Select.Item
                    label={province.name}
                    value={province.name}
                    key={province.name}
                  />
                ))}
              </Select>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              paddingVertical: 10,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 1,
                position: "relative",
                backgroundColor: "white",
                borderRadius: 16,
                borderWidth:1
              }}
            >
              <TextInput
                style={{height: 56}}
                textAlign="center"
                fontSize={16}
              />
              <Text
                style={{
                  position: "absolute",
                  top: 0,
                  fontSize: 13,
                  lineHeight: 20,
                  transform: [{translateX: 16}, {translateY: -12}],
                  backgroundColor: "white",
                }}
              >
                Khối lượng
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingLeft: 5,
              }}
            >
              <Radio.Group
                defaultValue="2"
                // name="exampleGroup"
                accessibilityLabel="select unit"
              >
                <Stack
                  direction={{
                    base: "row",
                  }}
                  alignItems={{
                    base: "space-between",
                  }}
                  space={3}
                >
                  <Radio value="1" my={1} size="sm">
                    <Text style={{fontSize: 12, lineHeight: 30, color: "#000"}}>
                      Tấn
                    </Text>
                  </Radio>
                  <Radio value="2" my={1} size="sm">
                    <Text style={{fontSize: 12, lineHeight: 30, color: "#000"}}>
                      KG
                    </Text>
                  </Radio>
                  <Radio value="3" my={1} size="sm">
                    <View style={{flexDirection: "row"}}>
                      <Text
                        style={{fontSize: 12, lineHeight: 30, color: "#000"}}
                      >
                        M
                      </Text>
                      <Text
                        style={{fontSize: 7, lineHeight: 18, color: "#000"}}
                      >
                        3
                      </Text>
                    </View>
                  </Radio>
                </Stack>
              </Radio.Group>
            </View>
          </View>
          <View style={{paddingVertical: 10}}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <View
                style={{
                  flex: 1,
                  position: "relative",
                  backgroundColor: "white",
                  borderRadius: 16,
                  borderWidth:1
                }}
              >
                <TextInput
                  placeholder="Dài"
                  style={{height: 56}}
                  textAlign="center"
                  fontSize={16}
                />
                <Text
                  style={{
                    position: "absolute",
                    top: 0,
                    fontSize: 13,
                    lineHeight: 20,
                    transform: [{translateX: 16}, {translateY: -12}],
                    backgroundColor: "white",
                  }}
                >
                  Kích thước
                </Text>
              </View>
              <View style={{paddingHorizontal: 5}}>
                <Text fontSize={12}>x</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 16,
                  borderWidth:1
                }}
              >
                <TextInput
                  placeholder="Rộng"
                  style={{height: 56}}
                  textAlign="center"
                  fontSize={16}
                />
              </View>
              <View style={{paddingHorizontal: 5}}>
                <Text fontSize={12}>x</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: 16,
                  borderWidth:1
                }}
              >
                <TextInput
                  placeholder="Cao"
                  style={{height: 56}}
                  textAlign="center"
                  fontSize={16}
                />
              </View>
            </View>
          </View>
          <View style={{width:"40%", paddingVertical:10, justifyContent:"center"}}>
            <Select
              width="40%"
              minWidth="135px"
              // selectedValue="nhanh"
              height="56px"
              borderRadius={16}
              backgroundColor="#FFD124"
              placeholderTextColor="black"
              accessibilityLabel="Choose Service"
              fontSize="14px"
              placeholder="Tiêu chuẩn"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              // onValueChange={itemValue =>
              //   setDataForSearch({province: itemValue, district: null})
              // }
            >
              <Select.Item label="Nhanh" value="nhanh" key="nhanh" />
              <Select.Item label="Siêu giao hàng" value="nhanh" key="nhanh" />
              <Select.Item label="Tươi sống" value="nhanh" key="nhanh" />
            </Select>
          </View>
        </View>
        <View
          style={{
            alignItems:"center",
            marginTop:20,
          }}
        >
          <TouchableOpacity style={{width:150,height:58,borderRadius:16,backgroundColor:"#FFD124",justifyContent:"center"}}>
            <Text style={{textAlign:"center", fontSize:18,color:"white"}}>Tra cứu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Tracking;
