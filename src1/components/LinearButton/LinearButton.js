import React, { Component } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, } from "react-native"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
const LinearButton = (props) => {
    // console.log("🚀 ~ file: LinearButton.js ~ line 8 ~ LinearButton ~ props.marginTop", props.marginTop)
    return (
        <TouchableOpacity onPress={() => props.onPress()} style={[
            styles.touchable,
            {width: props.width || '80%',  marginTop: props.marginTop},
            props.customStyle
            ]}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
                locations={[0, 0.6, 1]}
                colors={['#7B4397', "#B53059", '#DC2430']} style={styles.button}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}
export default LinearButton