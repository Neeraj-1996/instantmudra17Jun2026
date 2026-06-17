import React, { Component } from "react"
import {StyleSheet} from "react-native"
import colors from "../../common"
const styles= StyleSheet.create({
    container:{
        height:60,   
        flexDirection:"row",
        paddingHorizontal:26,
        justifyContent:"center",
        alignItems:"center",
        justifyContent:"space-between",
        backgroundColor:"#f1f1f1"
        
    },
    image:{
        height:26,
        width:26
    },
    text:{
        color:"#2C3E50"
    }
})
export default styles