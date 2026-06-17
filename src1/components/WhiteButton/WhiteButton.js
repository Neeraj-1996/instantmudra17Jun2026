import React, { Component } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, } from "react-native"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
const WhiteButton = (props) => {
    return (
        <TouchableOpacity onPress={()=> props.onPress()} style={styles.touchable}>
            <View style={[styles.button, { borderWidth: 1, borderColor: "#DC2430", }]}>
                <Text style={[styles.buttonText, { color: "#DC2430" }]}> I already have an Account
                </Text>
            </View>
        </TouchableOpacity>
    )
}
export default WhiteButton