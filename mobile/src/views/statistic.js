import React, { useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, StatusBar, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Pie from 'react-native-pie'
const windowwidth = Dimensions.get("window").width
const windowheight = Dimensions.get("window").height
const Statistic = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [passHidden,setPassHidden] = useState("")
    return (
        <View style={{flex:1,backgroundColor:"#ffd124"}}>
           <StatusBar barStyle="white" />
            <View style={{width:"100%",height:60,alignItems:"center",backgroundColor:"#ffd124",justifyContent:"center",position:'relative'}}> 
                    <Icon name="arrow-left"  style={{width:50,height:45,fontSize:30,position:"absolute",fontWeight:700,top:8,left:10}}  />
                    
                     <Text style={{width:"60%",height:40,color:"#3A3C3F",fontSize:25,fontWeight:"700",textAlign:"center"}}>Thống kê doanh thu</Text>
            </View>
          {/*   <View style={{width:"100%",height:50}}> 
                    <Icon name="arrow-left"  style={{width:50,height:55,fontSize:25}}  />
                     <Image source={require("../images/logo.png")} style={{width:"40%",height:"100%",textAlign:"center"}} />
            </View> */}
  {/*           <View style={{width:"100%",height:"6%",backgroundColor:"#f6f8f6",borderTopRightRadius:45,borderTopLeftRadius:45}}>
                <Text style={{fontSize:25,textAlign:"center",fontWeight:"900",color:"#3a3c3f",marginBottom:-8}}>Đăng ký tài khoản</Text>
            </View> */}
            <View style={{width:"100%",height:"100%",backgroundColor:"white",borderTopRightRadius:45,borderTopLeftRadius:45}}>
                 <View style={{width:"100%",height:35,alignItems:"flex-start",justifyContent:"flex-start",marginTop:20,marginLeft:25}}>
                    <Text style={{color:"#3A3C3F",fontSize:25,fontWeight:"700",textAlign:"left"}}>Doanh thu</Text>
                </View>
                <View style={{width:windowwidth-50,backgroundColor:"#28303F",marginLeft:25,height:190,borderRadius:12,borderWidth:1,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                      <View style={{width:"50%",paddingHorizontal:25,height:60,marginTop:10,borderRadius:9,alignItems:"center",justifyContent:"center"}} >
                         <Pie
                          radius={70}
                          innerRadius={45}
                          sections={[
                            {
                              percentage: 50,
                              color: '#11468F',
                            },
                            {
                              percentage: 20,
                              color: '#DA1212',
                            },
                            {
                              percentage: 30,
                              color: '#FFD124',
                            },
                           
                          ]}
                          /* dividerSize={6} */
                          strokeCap={'butt'}
                        />
                      </View>
                      <View style={{flex:1,minWidth:50,height:55,alignItems:"center",justifyContent:"center"}}>
                       
                         <View style={{flexDirection:"row",alignItems:"flex-start",justifyContent:"flex-start",marginBottom:20}}>
                            <View style={{height:28,width:28,marginRight:7,borderRadius:4,backgroundColor:"#FFD124",justifyContent:"center",alignItems:"center"}}>
                             <Text style={{color:"#3A3C3F",fontWeight:"700"}}>1D</Text> 
                            </View>
                            <View style={{height:28,width:28,marginRight:7,borderRadius:4,backgroundColor:"#FFD124",justifyContent:"center",alignItems:"center"}}>
                             <Text style={{color:"#3A3C3F",fontWeight:"700"}}>1M</Text> 
                            </View>
                            <View style={{height:28,width:28,marginRight:7,borderRadius:4,backgroundColor:"#FFD124",justifyContent:"center",alignItems:"center"}}>
                             <Icon name="calendar"  style={{fontSize:20}}  />
                            </View>
                            
                        </View>
                        <View style={{justifyContent:"flex-start"}}>
                          <Text style={{textAlign:"left",fontWeight:"700",color:"white"}}>Chú thích:</Text>
                          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",marginBottom:6}}>
                              <View style={{height:10,width:10,marginRight:3,backgroundColor:"#DA1212"}}></View>
                               <Text style={{textAlign:"center",fontWeight:"700",color:"white"}}>Chưa ký nhận 20%</Text>
                          </View>
                          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",marginBottom:6}}>
                              <View style={{height:10,width:10,marginRight:3,backgroundColor:"#11468F"}}></View>
                               <Text style={{textAlign:"center",fontWeight:"700",color:"white"}}>Đã ký nhận 50%</Text>
                          </View>
                          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"flex-start",marginBottom:6}}>
                              <View style={{height:10,width:10,marginRight:3,backgroundColor:"#FFD124"}}></View>
                               <Text style={{textAlign:"center",fontWeight:"700",color:"white"}}>Chuyển hàng 30%</Text>
                          </View>
                        </View>
                      </View>           
                </View>
                <View style={{width:windowwidth-50,marginTop:20,marginLeft:25,height:179,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                      <View style={{width:"50%",marginRight:20,backgroundColor:"#FFD124",height:"100%",borderRadius:10,alignItems:"center",justifyContent:"center"}} >
                             <Icon name="calendar"  style={{fontSize:60}}  />
                             <Text  style={{textAlign:"center",fontWeight:"700"}}>Tháng 7</Text>
                      </View>
                      <View style={{flex:1,minWidth:50,height:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                          <View style={{width:"90%",backgroundColor:"#DA1212",height:"40%",borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                                <Text style={{}}>Tháng trước</Text>
                              <View style={{ flexDirection:"row"}}>
                                <Text style={{textAlign:"center",fontSize:18,fontWeight:"700",marginRight:6}}>16.000.000</Text>
                                 <Icon name="arrow-down"  style={{fontSize:20}}  />

                              </View>
                          </View>
                          <View style={{width:"90%",backgroundColor:"#75FF00",height:"40%",marginTop:30,borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                                <Text style={{}}>Tháng này</Text>
                              <View style={{ flexDirection:"row"}}>
                                <Text style={{textAlign:"center",fontSize:18,fontWeight:"700",marginRight:6}}>24.000.000</Text>
                                 <Icon name="arrow-up"  style={{fontSize:20}}  />

                              </View>
                          </View>
                        
                      </View>           
                </View>     
                <View style={{width:"100%",height:30,alignItems:"flex-start",justifyContent:"flex-start",marginTop:10,marginLeft:25}}>
                    <Text style={{color:"#3A3C3F",fontSize:25,fontWeight:"700",textAlign:"left"}}>Chi tiết </Text>
                </View>   
                 <View style={{width:windowwidth-50,marginTop:5,marginBottom:10,marginLeft:25,height:30,alignItems:"center",flexDirection:"row",justifyContent:"space-between",flexDirection:"row"}}>
                    <Text style={{color:"#3A3C3F",borderRadius:10,backgroundColor:"#FFD124",fontSize:15,paddingHorizontal:6,paddingVertical:4,fontWeight:"700",textAlign:"center"}}>Hôm nay</Text>
                    <Text style={{color:"rgba(58, 60, 63, 0.56)",borderWidth:1,borderColor:"rgba(58, 60, 63, 0.56)",borderRadius:10,backgroundColor:"white",fontSize:15,paddingHorizontal:8,paddingVertical:4,fontWeight:"700",textAlign:"center"}}>Hôm qua</Text>
                    <Text style={{color:"rgba(58, 60, 63, 0.56)",borderRadius:10,borderWidth:1,borderColor:"rgba(58, 60, 63, 0.56)",fontSize:15,paddingHorizontal:8,paddingVertical:4,fontWeight:"700",textAlign:"center"}}>Tuần</Text>
                    <Text style={{color:"rgba(58, 60, 63, 0.56)",borderRadius:10,borderWidth:1,borderColor:"rgba(58, 60, 63, 0.56)",fontSize:15,paddingHorizontal:8,paddingVertical:4,fontWeight:"700",textAlign:"center"}}>Tháng</Text>
                 </View>
                   <View style={{width:windowwidth-50,backgroundColor:"#28303F",marginLeft:25,height:80,borderRadius:12,borderWidth:1,alignItems:"flex-start",justifyContent:"center",flexDirection:"column"}}>
                          <View style={{alignItems:"center",flexDirection:"row"}}>
                            <View style={{width:"35%",justifyContent:"center"}}>
                              <Text style={{color:"rgba(255, 255, 255, 0.56)",fontWeight:"700",textAlign:"center"}}>Tổng cộng</Text>
                            </View>
                            <View style={{width:"30%"}}>
                              <Text style={{color:"rgba(255, 255, 255, 0.56)",fontWeight:"700",textAlign:"center"}}>Đơn hàng</Text>
                            </View>
                            <View style={{width:"35%"}}>
                              <Text style={{color:"rgba(255, 255, 255, 0.56)",fontWeight:"700",textAlign:"center"}}>Đã thanh toán</Text>
                            </View>
                          </View>
                          <View style={{alignItems:"center",flexDirection:"row",paddingTop:8}}>
                            <View style={{width:"35%",justifyContent:"center"}}>
                              <Text style={{color:"white",fontWeight:"700",textAlign:"center"}}>20.000.000 VND</Text>

                            </View>
                            <View style={{width:"30%"}}>
                              <Text style={{color:"white",fontWeight:"700",textAlign:"center"}}>8</Text>

                            </View>
                            <View style={{width:"35%"}}>
                              <Text style={{color:"white",fontWeight:"700",textAlign:"center"}}>15.000.000 VND</Text>

                            </View>
                          </View>
                 </View>
            </View>
       </View>
    );
};

export default Statistic;