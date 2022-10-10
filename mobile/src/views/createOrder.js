import React, { useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, StatusBar, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Location from "react-native-vector-icons/Ionicons";

const windowwidth = Dimensions.get("window").width
const windowheight = Dimensions.get("window").height
const CreateOrder = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [passHidden,setPassHidden] = useState("")
    return (
        <View style={{flex:1,backgroundColor:"#ffd124"}}>
           <StatusBar barStyle="white" />
            <View style={{width:"100%",height:"10%",alignItems:"center",backgroundColor:"#ffd124",justifyContent:"center",position:'relative'}}> 
                    <Icon name="arrow-left"  style={{width:50,height:45,fontSize:30,position:"absolute",fontWeight:700,top:8,left:10}}  />
                     <Image source={require("../images/logo.png")} style={{width:107,height:38}} />
            </View>
          {/*   <View style={{width:"100%",height:50}}> 
                    <Icon name="arrow-left"  style={{width:50,height:55,fontSize:25}}  />
                     <Image source={require("../images/logo.png")} style={{width:"40%",height:"100%",textAlign:"center"}} />
            </View> */}
  {/*           <View style={{width:"100%",height:"6%",backgroundColor:"#f6f8f6",borderTopRightRadius:45,borderTopLeftRadius:45}}>
                <Text style={{fontSize:25,textAlign:"center",fontWeight:"900",color:"#3a3c3f",marginBottom:-8}}>Đăng ký tài khoản</Text>
            </View> */}
            <View style={{width:"100%",height:"100%",backgroundColor:"white",borderTopRightRadius:45,borderTopLeftRadius:45}}>
                <View style={{width:"100%",height:50,alignItems:"center",justifyContent:"flex-start",marginTop:20}}>
                    <Text style={{color:"#3A3C3F",fontSize:25,fontWeight:"700",textAlign:"left"}}>Tạo đơn hàng</Text>
                </View>
                <View style={{width:windowwidth-50,paddingBottom:15,marginBottom:10,marginLeft:25,height:230,borderRadius:8,borderWidth:1,alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                      <View style={{width:"100%",height:35,backgroundColor:"#ffd124",alignItems:"center",justifyContent:"center"}}>
                        <Text style={{textAlign:"center",fontSize:20,fontWeight:"700"}}>Thông tin người gửi</Text>
                      </View>
                      <View style={{width:"90%",paddingHorizontal:25,height:50,marginTop:10,borderRadius:9,borderWidth:2,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                        <Icon name="user"  style={{width:20,height:15,fontSize:15}}  />
                        <TextInput style={{width:"100%",height:"100%",fontSize:18}}
                            placeholder="Email"
                            autoCapitalize={false}
                        />
                      </View>
                      <View style={{width:"90%",paddingHorizontal:25,height:50,marginTop:10,borderRadius:9,borderWidth:2,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                        <Icon name="phone"  style={{width:20,height:15,fontSize:15}}  />
                        <TextInput style={{width:"100%",height:"100%",fontSize:18}}
                            placeholder="SĐT"
                            autoCapitalize={false}
                        />
                      </View>
                      <View style={{width:"90%",paddingHorizontal:25,height:50,marginTop:10,borderRadius:9,borderWidth:2,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                        <Location name="location"  style={{width:20,height:15,fontSize:15}}  />
                        <TextInput style={{width:"100%",height:"100%",fontSize:18}}
                            placeholder="Địa chỉ"
                            autoCapitalize={false}
                        />
                      </View>
                      
                </View>
                <View style={{width:windowwidth-50,paddingBottom:15,marginBottom:10,marginLeft:25,height:230,borderRadius:8,borderWidth:1,alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                      <View style={{width:"100%",height:35,backgroundColor:"#ffd124",alignItems:"center",justifyContent:"center"}}>
                        <Text style={{textAlign:"center",fontSize:20,fontWeight:"700"}}>Thông tin người nhận</Text>
                      </View>
                      <View style={{width:"90%",paddingHorizontal:25,height:50,marginTop:10,borderRadius:9,borderWidth:2,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                        <Icon name="user"  style={{width:20,height:15,fontSize:15}}  />
                        <TextInput style={{width:"100%",height:"100%",fontSize:18}}
                            placeholder="Email"
                            autoCapitalize={false}
                        />
                      </View>
                      <View style={{width:"90%",paddingHorizontal:25,height:50,marginTop:10,borderRadius:9,borderWidth:2,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                        <Icon name="phone"  style={{width:20,height:15,fontSize:15}}  />
                        <TextInput style={{width:"100%",height:"100%",fontSize:18}}
                            placeholder="SĐT"
                            autoCapitalize={false}
                        />
                      </View>
                      <View style={{width:"90%",paddingHorizontal:25,height:50,marginTop:10,borderRadius:9,borderWidth:2,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                         <Location name="location"  style={{width:20,height:15,fontSize:15}}  />
                        <TextInput style={{width:"100%",height:"100%",fontSize:18}}
                            placeholder="Địa chỉ"
                            autoCapitalize={false}
                        />
                      </View>
                      
                </View>
               
                <View style={{width:windowwidth-50,marginLeft:25,height:230,borderRadius:8,borderWidth:1,alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                      <View style={{width:"100%",height:35,backgroundColor:"#ffd124",alignItems:"center",justifyContent:"center"}}>
                        <Text style={{textAlign:"center",fontSize:20,fontWeight:"700"}}>Thông tin người nhận</Text>
                      </View>
                      <View style={{width:"90%",paddingHorizontal:25,height:50,marginTop:10,borderRadius:9,borderWidth:2,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                        <Icon name="user"  style={{width:20,height:15,fontSize:25}}  />
                        <TextInput style={{width:"100%",height:"100%",fontSize:18}}
                            placeholder="Email/SĐT"
                            autoCapitalize={false}
                        />
                      </View>
                      <View style={{width:"90%",paddingHorizontal:25,height:50,marginTop:10,borderRadius:9,borderWidth:2,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                        <Icon name="user"  style={{width:20,height:15,fontSize:25}}  />
                        <TextInput style={{width:"100%",height:"100%",fontSize:18}}
                            placeholder="Email/SĐT"
                            autoCapitalize={false}
                        />
                      </View>
                      <View style={{width:"90%",paddingHorizontal:25,height:50,marginTop:10,borderRadius:9,borderWidth:2,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                        <Icon name="user"  style={{width:20,height:15,fontSize:25}}  />
                        <TextInput style={{width:"100%",height:"100%",fontSize:18}}
                            placeholder="Email/SĐT"
                            autoCapitalize={false}
                        />
                      </View>                  
                </View>               
            </View>
       </View>
    );
};

export default CreateOrder;