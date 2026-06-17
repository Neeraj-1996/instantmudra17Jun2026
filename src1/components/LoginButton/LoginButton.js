import React, { Component } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, } from "react-native"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
const LoginButton = (props) => {
    return (
        <TouchableOpacity disabled={props.disabled} style={[styles.touchable, props.style]}>
                <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}
export default LoginButton