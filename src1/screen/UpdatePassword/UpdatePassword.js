import React, { Component } from "react"
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
import colors from "../../common";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
const UpdatePassword= (props)=>{
    return(
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
        locations={[0, 0.6, 1]}
        colors={['#7B4397', "#B53059", '#DC2430']} 
        style={{ height: "100%", width: "100%", backgroundColor: "white", justifyContent:"center", alignItems:"center" }}>
            <Image style={styles.otpImage} source={require("../../assests/PasswordImage.png")} />
            <Text style= {styles.text}>Password Updated 
                </Text>
                <Text style= {[styles.text,{width:"40%"}]}>Successfully! </Text>
               
                <TouchableOpacity onPress = {()=> props.navigation.navigate("Login")}>
                <Text style= {{fontSize:16, fontWeight:"400", marginTop:40, color:"white", marginLeft:20}}>Click here to Login </Text>
               </TouchableOpacity>
        
        </LinearGradient>

    )
}
export default UpdatePassword