import React from 'react';
import { Text, View ,SafeAreaView, StatusBar, Dimensions, TouchableOpacity, Image} from 'react-native';

const windowwidth = Dimensions.get("window").width
const windowheight = Dimensions.get("window").height
const Products = ({navigation}) => {
    return (
        <SafeAreaView style={{height:"100%",width:"100%"}}>
       
            <StatusBar barStyle='light-content'/>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",height:"10%",borderColor:"black",borderWidth:2}}>
                <TouchableOpacity style={{height:"100%",aspectRatio:1.6,borderColor:"black",borderWidth:2,justifyContent:"center",alignItems:"center"}}
                    onPress={()=>{
                        navigation.navigate("Login")
                    }}
                >
              <Text style={{fontSize:25}}>Back</Text>   

                </TouchableOpacity>
                <TouchableOpacity style={{height:"100%",aspectRatio:1.6,borderColor:"black",borderWidth:2,justifyContent:"center",alignItems:"center" }} 
                     onPress={()=>{
                        navigation.navigate("Setting")
                    }}>
                    <Image source={require("../images/setting.png")} style={{width:35,height:35}} />
                  
                </TouchableOpacity>

            </View>
                <View style={{height:"100%",width:"100%"}}>
                    <View style={{height:"20%",width:"100%" , marginTop:windowheight*0.3}}>
                        <Text style={{color:"red",textAlign:"center",fontSize:55}}>Products</Text>
                    </View>
            
                </View>
            </SafeAreaView>
      
    );
};

export default Products;