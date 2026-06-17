import React, { Component } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TouchableOpacityBase } from "react-native"
import colors from "../../common"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
import LinearButton from "../LinearButton/LinearButton";
import WhiteButton from "../WhiteButton/WhiteButton";
const FooterSheet = (props) => {
    return (
        <View style={styles.container}>
            <LinearButton
                title={'Sign Up'}
                onPress={() => props.navigation.navigate("Registration")}

            />
            <WhiteButton
                onPress={() => {
                    props.navigation.navigate("Login")
                }} />
        </View>
    )
}
export default FooterSheet