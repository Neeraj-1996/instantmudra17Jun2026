import React, { Component } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TouchableOpacityBase, } from "react-native"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
const Header = (props) => {
  // console.log("🚀 ~ file: Header.js ~ line 6 ~ Header ~ props", props)
  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', "#B53059", '#DC2430']} style={styles.button}>
      <SafeAreaView style={{ flexDirection: 'row', }}>
        { props.navigation && !props.hideLeftHeader &&
          <TouchableOpacity onPress={() => {
            if (props.navigation) {
              props.navigation.goBack()
            } else {
              console.log("Try to go back")
            }
          }}>
            <Image style={styles.image} source={require("../../assests/arrowBack.png")} />
          </TouchableOpacity>
        }
        <Text style={[styles.text, { marginLeft: props.navigation? 26: 2}]}>{props.title}</Text>
      </SafeAreaView>
    </LinearGradient>
  )
}
export default Header