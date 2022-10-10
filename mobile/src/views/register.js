import React, { useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, StatusBar, Dimensions, TouchableOpacity, Image, TextInput, Switch, Button } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo"
import Icon from "react-native-vector-icons/FontAwesome";
const windowwidth = Dimensions.get("window").width
const windowheight = Dimensions.get("window").height
const Register = ({navigation}) => {
        const [page,setPage] = useState(null)
    return (
        <View style={{flex:1}}>
           <StatusBar barStyle="default" />
            <View style={{width:"100%",height:"25%"}}>
                <Image source={require("../images/img1.png")} style={{width:"100%",height:"100%"}} />
            </View>
            <View style={{width:"100%",height:"3%",flexDirection:"column"}}>
                    <Text style={{width:"5%",height:"5%",borderRadius:50,backgroundColor:"#ffd124"}}>.</Text>
            </View>      
              {/* <PreviousRegister page={page} setPage={setPage} />  */} 
              <NextRegister page={page} setPage={setPage} />  
       </View>
    );
};
const PreviousRegister = ({navigation,page,setPage})=>{
        const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [passHidden,setPassHidden] = useState("")
    const [navigate,setNavigate]=useState("")
    return (
        <View style={{flex:1}}>
            <View style={{width:"100%",height:"12%",backgroundColor:"#f6f8f6",borderTopRightRadius:45,borderTopLeftRadius:45}}>
                <Text style={{fontSize:25,textAlign:"center",fontWeight:"900",color:"#3a3c3f",marginBottom:-8,marginTop:4}}>Đăng nhập tài khoản</Text>
            </View>
            <View style={{width:"100%",height:"100%",backgroundColor:"#ffd124",borderTopRightRadius:45,borderTopLeftRadius:45}}>
                {/* <View style={{width:"100%",height:"12%",alignItems:"center",justifyContent:"center",marginTop:20}}>
                     <Image source={require("../images/logo.png")} style={{width:"40%",height:"100%",textAlign:"center"}} />
                </View> */}
                <View style={{width:"100%",height:70,alignItems:"center",justifyContent:"space-evenly",marginTop:20,flexDirection:"row",marginBottom:10}}>
                    <TouchableOpacity style={{borderRadius:15,width:"25%",height:"85%",alignItems:"center",backgroundColor:"white",justifyContent:"center",marginTop:6}}>
                            <Text style={{fontWeight:"500"}}>Cá Nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius:15,paddingLeft:3,paddingRight:3,width:"25%",height:"85%",alignItems:"center",backgroundColor:"white",justifyContent:"center",marginTop:6}}>
                            <Text style={{fontWeight:"500"}}>Doanh Nghiệp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{borderRadius:15,width:"25%",height:"85%",alignItems:"center",backgroundColor:"white",justifyContent:"center",marginTop:6}}>
                            <Text style={{fontWeight:"500"}}>Trung gian</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width:windowwidth-70,marginLeft:35,height:45,borderBottomWidth:1,alignItems:"center",justifyContent:"center",marginTop:10,flexDirection:"row"}}>
                     <TextInput style={{flex:1,height:"100%",fontSize:20}}
                         placeholder="Tên tài khoản"
                        autoCapitalize={false}
                     />
                </View>
                <View style={{width:windowwidth-70,marginLeft:35,height:45,borderBottomWidth:1,alignItems:"center",justifyContent:"center",marginTop:10,flexDirection:"row"}}>
                     <TextInput style={{flex:1,height:"100%",fontSize:20}}
                         placeholder="Số điện thoại"
                        autoCapitalize={false}
                        keyboardType='numeric'
                     />
                </View>
                <View style={{width:windowwidth-70,marginLeft:35,height:45,borderBottomWidth:1,alignItems:"center",justifyContent:"center",marginTop:10,flexDirection:"row"}}>
                     <TextInput style={{flex:1,height:"100%",fontSize:20}}
                         placeholder="Mật Khẩu"
                        autoCapitalize={false}
                        secureTextEntry={passHidden?true:false}
                     />
                     <TouchableOpacity  style={{height:"100%",aspectRatio:1,alignItems:"center",justifyContent:"center"}}
                           onPress={()=>setPassHidden(!passHidden)}
                     >
                        {passHidden ? 
                         <Icon name="eye"  style={{width:20,height:15,fontSize:20}}  />
                        :    <Icon name="eye-slash"  style={{width:20,height:15,fontSize:20}}  />
                    }
                     </TouchableOpacity>
                </View>
                <View style={{width:windowwidth-70,marginLeft:35,height:"5%",alignItems:"center",justifyContent:"flex-end",marginTop:10,flexDirection:"row"}}>
                </View>
            
                  <TouchableOpacity style={{backgroundColor:"white",borderRadius:100 ,width:windowwidth-70,marginLeft:48,height:"10%",alignItems:"center",justifyContent:"center",marginTop:10}}>
                      <Text className={{position:"absolute",color:"black",fontWeight:"1000"}}>Tiếp theo</Text>
                  </TouchableOpacity>
                <View style={{width:windowwidth-70,marginLeft:35,height:"5%",alignItems:"center",justifyContent:"center",marginTop:10}}>
                
                   <Text className={{position:"absolute",color:"black",fontWeight:"700"}}>Hoặc</Text>
                
                </View>
                 <View style={{width:windowwidth-70,marginLeft:35,height:"5%",alignItems:"center",flexDirection:"row",justifyContent:"center",marginTop:20}}>
                  <Text className={{position:"absolute",color:"white"}}>Bạn đã có tài khoản?</Text>
                  <TouchableOpacity style={{marginLeft:4}} 
                      onPress={()=>{
                        navigation.navigate("Login")
                    }}
                  >
                   <Text className={{position:"absolute",color:"white"}}>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const NextRegister = ({page,setPage})=>{
        const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [passHidden,setPassHidden] = useState("")
    const [navigate,setNavigate]=useState("")
    const [isEnable,setIsEnable]=useState(false)
    const handleToggleSwitch = ()=>{
        setIsEnable(!isEnable)
    }
    return (
        <View style={{flex:1}}>
           {/*  <View style={{width:"100%",height:"12%",backgroundColor:"#f6f8f6",borderTopRightRadius:45,borderTopLeftRadius:45}}>
                <Text style={{fontSize:25,textAlign:"center",fontWeight:"900",color:"#3a3c3f",marginBottom:-8,marginTop:4}}>Đăng nhập tài khoản</Text>
            </View> */}
            <View style={{width:"100%",height:"100%",backgroundColor:"#ffd124",borderTopRightRadius:45,borderTopLeftRadius:45}}>
                <View style={{width:"100%",height:40,alignItems:"center",justifyContent:"flex-start",marginTop:20,flexDirection:"row",marginBottom:10}}>
                     <TouchableOpacity style={{borderRadius:15,width:"25%",height:"100%",alignItems:"center",justifyContent:"center",marginTop:6}}>
                            <Icon name="arrow-left"  style={{width:50,height:55,fontSize:25}}  />
                    </TouchableOpacity>
                </View>
                <View style={{width:windowwidth-70,marginLeft:35,height:45,borderBottomWidth:1,alignItems:"center",justifyContent:"center",marginTop:10,flexDirection:"row"}}>
                     <TextInput style={{flex:1,height:"100%",fontSize:20}}
                         placeholder="Email"
                        autoCapitalize={false}
                     />
                </View>
                <View style={{width:windowwidth-70,marginLeft:35,height:45,borderBottomWidth:1,alignItems:"center",justifyContent:"center",marginTop:10,flexDirection:"row"}}>
                     <TextInput style={{flex:1,height:"100%",fontSize:20}}
                         placeholder="Mật Khẩu"
                        autoCapitalize={false}
                        secureTextEntry={passHidden?true:false}
                     />
                     <TouchableOpacity  style={{height:"100%",aspectRatio:1,alignItems:"center",justifyContent:"center"}}
                           onPress={()=>setPassHidden(!passHidden)}
                     >
                        {passHidden ? 
                         <Icon name="eye"  style={{width:20,height:15,fontSize:20}}  />
                        :    <Icon name="eye-slash"  style={{width:20,height:15,fontSize:20}}  />
                    }
                     </TouchableOpacity>
                </View>
                <View style={{width:windowwidth-70,marginLeft:35,height:45,borderBottomWidth:1,alignItems:"center",justifyContent:"center",marginTop:10,flexDirection:"row"}}>
                     <TextInput style={{flex:1,height:"100%",fontSize:20}}
                         placeholder="Xác nhận mật Khẩu"
                        autoCapitalize={false}
                        secureTextEntry={passHidden?true:false}
                     />
                     <TouchableOpacity  style={{height:"100%",aspectRatio:1,alignItems:"center",justifyContent:"center"}}
                           onPress={()=>setPassHidden(!passHidden)}
                     >
                        {passHidden ? 
                         <Icon name="eye"  style={{width:20,height:15,fontSize:20}}  />
                        :    <Icon name="eye-slash"  style={{width:20,height:15,fontSize:20}}  />
                    }
                     </TouchableOpacity>
                </View>
                <View style={{width:windowwidth-70,marginLeft:35,height:45,alignItems:"center",justifyContent:"space-between",marginTop:10,flexDirection:"row"}}>
                  <View style={{flexDirection:'row'}}>
                        <TextInput style={{width:100,borderBottomWidth:1,height:"100%",fontSize:20,textAlign:"left"}}
                            placeholder="Nhập OTP"
                            autoCapitalize={false}
                            secureTextEntry={passHidden?true:false}
                        />
                        <TouchableOpacity style={{marginLeft:8,paddingHorizontal:30,paddingVertical:4,backgroundColor:"white",borderRadius:8,alignItems:"center",justifyContent:"center"}} >
                    <Text className={{color:"white"}}>Gửi</Text>
                    </TouchableOpacity>

                  </View>
                  <View style={{flexDirection:'row'}}>
                        <TextInput style={{width:110,borderBottomWidth:1,height:"100%",fontSize:20,textAlign:"left"}}
                            placeholder="Mã số thuế"
                            autoCapitalize={false}
                            secureTextEntry={passHidden?true:false}
                        />
                  </View>
                
                </View>
                <View style={{width:windowwidth-70,marginLeft:35,height:"5%",alignItems:"center",justifyContent:"flex-start",marginTop:10,flexDirection:"row"}}>
                    <Switch 
                        trackColor={{false:"gray",true:"tomato"}}
                        thumbColor={isEnable ? "orange":"black"}
                        onValueChange={handleToggleSwitch}
                        value={isEnable}
                    />
                   <Text className={{marginLeft:4,color:"black",fontWeight:900}}>Tôi đồng ý với các điều khoản</Text>
                    
                </View>
            
                  <TouchableOpacity style={{backgroundColor:"white",borderRadius:100 ,width:windowwidth-70,marginLeft:35,height:48,alignItems:"center",justifyContent:"center",marginTop:10}}>
                      <Text className={{position:"absolute",color:"black",fontWeight:"1000"}}>Đăng ký</Text>
                  </TouchableOpacity>
                <View style={{width:windowwidth-70,marginLeft:35,height:"5%",alignItems:"center",justifyContent:"center",marginTop:10}}>
                
                   <Text className={{position:"absolute",color:"black",fontWeight:"700"}}>Hoặc</Text>
                
                </View>
                 <View style={{width:windowwidth-70,marginLeft:35,height:"5%",alignItems:"center",flexDirection:"row",justifyContent:"center",marginTop:20}}>
                  <Text className={{position:"absolute",color:"white"}}>Bạn đã có tài khoản?</Text>
                  <TouchableOpacity style={{marginLeft:4}} 
                      onPress={()=>{
                        navigation.navigate("Login")
                    }}
                  >
                   <Text className={{position:"absolute",color:"white"}}>Đăng nhập</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Register;