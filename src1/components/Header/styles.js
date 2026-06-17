import React, { Component } from "react"
import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({

    button: {
        height: 60,
        width: "100%",
        flexDirection: "row",
        paddingHorizontal:20,
        alignItems: 'center',
    },
    image: {
        height: 24,
        width: 24,
        marginTop:6
    },
    text:{
        fontSize:20,
        fontWeight:"500",
        color: colors.white,
        marginLeft:26,
        marginTop:6
    }
})
export default styles
