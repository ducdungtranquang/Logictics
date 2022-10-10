import React, { useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, StatusBar, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Pie from 'react-native-pie'
import StepIndicator from 'react-native-step-indicator';
import Search1 from "react-native-vector-icons/AntDesign";
import Scan from "react-native-vector-icons/MaterialCommunityIcons";
const windowwidth = Dimensions.get("window").width
const windowheight = Dimensions.get("window").height
const ListOrder = ({navigation}) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [passHidden,setPassHidden] = useState("")
    const labels = ["Lấy hàng","Delivery Address"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}
    return (
        <View style={{flex:1,backgroundColor:"#ffd124"}}>
           <StatusBar barStyle="white" />
            <View style={{width:"100%",height:60,alignItems:"center",backgroundColor:"#ffd124",justifyContent:"center",position:'relative'}}> 
                    <Icon name="bars"  style={{width:50,height:45,fontSize:30,position:"absolute",fontWeight:700,top:8,left:12}}  />
                    <Icon name="bell"  style={{width:50,height:45,fontSize:30,position:"absolute",top:8,right:10}}  />
                     <Image source={require("../images/logo.png")} style={{width:107,height:38}} />
            </View>
            <View style={{width:"100%",height:60,alignItems:"center",backgroundColor:"#ffd124",justifyContent:"center",alignItems:"center",position:'relative'}}> 
                    <Text style={{fontSize:28,fontWeight:"700"}}>Theo dõi đơn hàng</Text>
                    <Text style={{fontSize:12}}>Vui lòng nhập mã vận đơn hoặc quét Barcode phía dưới</Text>
            </View>
              <View style={{width:windowwidth-50,marginLeft:20,marginBottom:25,flexDirection:"row",width:"100%",height:58,alignItems:"center",backgroundColor:"#ffd124",position:'relative'}}> 
                   <View style={{width:"70%",height:"100%",backgroundColor:"white",borderRadius:7,flexDirection:"row",alignItems:"center",marginRight:8}}>
                        <TextInput style={{width:"85%",height:"100%",fontSize:17,marginLeft:9}}
                            placeholder="Nhập mã đơn vận"
                            autoCapitalize={false}
                        />
                       <Search1 name="search1"  style={{fontSize:30}}  />
                   </View>
                   <View style={{width:"15%",height:"100%",borderRadius:7,backgroundColor:"white",alignItems:"center",justifyContent:"center"}}>
                        <View  >
                               <Scan name="barcode-scan"  style={{fontSize:40}}  />
                        </View>
                   </View>
            </View>
            <View style={{width:"100%",height:"100%",backgroundColor:"white",borderTopRightRadius:45,borderTopLeftRadius:45}}>
                <View style={{width:"100%",height:40,alignItems:"flex-start",justifyContent:"flex-start",marginTop:25,marginLeft:25}}>
                    <Text style={{color:"#3A3C3F",fontSize:25,fontWeight:"700",textAlign:"left"}}>Thống kê đơn hàng</Text>
                </View>
                <View style={{width:windowwidth-50,backgroundColor:"#28303F",marginLeft:25,height:185,borderRadius:12,borderWidth:1,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
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
                         {/*     <Text style={{color:"#3A3C3F",fontWeight:"700"}}>1M</Text>  */}
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
                <View style={{width:"100%",height:40,alignItems:"flex-start",justifyContent:"flex-start",marginTop:10,marginBottom:4,marginLeft:25}}>
                    <Text style={{color:"#3A3C3F",fontSize:25,fontWeight:"700",textAlign:"left"}}>Đơn hàng của bạn</Text>
                </View>
                
                <View style={{width:windowwidth-50,marginBottom:10,marginLeft:25,height:150,borderRadius:12,borderWidth:1,justifyContent:"center",flexDirection:"column"}}>
                      <View style={{width:"100%",height:35,alignItems:"center",justifyContent:"space-between",flexDirection:"row"}}>
                        <View style={{backgroundColor:"#4E9F3D",marginLeft:6,paddingHorizontal:15,paddingVertical:6}}>
                          <Text style={{color:"white"}}>#13123</Text>
                        </View>
                        <Icon name="angle-right"  style={{width:25,height:25,fontSize:25}}  />
                      </View>
                    
                      <View style={{marginLeft:6,marginBottom:6,borderBottomWidth:1,borderColor:"#CCCCCC",width:"100%",height:30,alignItems:"flex-start",justifyContent:"flex-start",marginTop:5}}>
                          <Text style={{color:"#3A3C3F",fontSize:20,fontWeight:"700",textAlign:"left"}}>Đang vận chuyển</Text>
                       </View>
   
                      <View style={{width:"100%",height:85,marginTop:10,borderRadius:9,alignItems:"center",justifyContent:"center",flexDirection:"row"}} >
                        <StepIndicator
                            customStyles={customStyles}
                           currentPosition="1"
                            labels={labels}  
                        />
                      </View>       
                </View>
                                  
            </View>
       </View>
    );
};

export default ListOrder;