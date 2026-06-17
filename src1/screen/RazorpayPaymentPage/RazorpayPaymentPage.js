import React, { Component, useEffect, useState } from "react"
import { View, Text } from "react-native"
import styles from "./styles"
import Header from "../../components/Header/Header"
import { WebView } from 'react-native-webview'
import { API_BASE_URL, BASE_URL } from "../../utils"
import AsyncStorage from "@react-native-async-storage/async-storage"

const RazorpayPaymentPage = (props) => {
    const user_id = props.route.params?.user_id;
    const order_id = props.route.params?.order_id;
    const emiAmount = props.route.params?.emiAmount
    const webViewURL = API_BASE_URL + "payWithRazorpay/" + user_id + "/" + order_id + "/" + emiAmount
    console.log("🚀 ~ file: RazorpayPaymentPage.js ~ line 13 ~ webViewURL", webViewURL)
    return (
        <View style={styles.container}>
            <Header
                navigation={props.navigation}
                title={"Razorpay Payment"}
                fontWeight={100} />
            <WebView source={{ uri: webViewURL }} />
        </View>
    )
}
export default RazorpayPaymentPage
