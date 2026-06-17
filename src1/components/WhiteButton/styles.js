import React, { Component } from "react"
import {StyleSheet} from "react-native"
import colors from "../../common"
const styles= StyleSheet.create({
    touchable: {
        height:40,
        width:"80%",
        alignSelf: 'center',
        marginTop: 14,
    },
    button:{
        flex: 1,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",   
    },
    buttonText:{
       fontSize:16,
       fontWeight:"500",
       color: colors.white
    }
})
export default styles
