import React, { Component, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, Touchable, TouchableOpacity } from "react-native"
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers"
import styles from "./styles"
import { useNavigation } from '@react-navigation/native';

const HomeFooter = (props) => {
  console.log("props handlefooter",props)
  const navigation = useNavigation();


  const { selectedBottomTab, setSelectedBottomTab } = props;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          setSelectedBottomTab('Home')
          props.onHomePress()
        }} style={{ justifyContent: 'center', alignItems: 'center' }}>
          {selectedBottomTab === 'Home' ?
            <Image style={{ height: 24, width: 24, tintColor: "#2C3E50" }} source={require("../../assest/home.png")} />
            :
            <Image style={{ height: 28, width: 28 }} source={require("../../assests/arrow.png")} />
          }
          <Text style={[styles.text, { color: selectedBottomTab === 'Home' ? '#2C3E50' : '#2C3E50' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyLoanDetails')}

          style={{ justifyContent: 'center', alignItems: 'center' }}>

          <Image style={{ height: 28, width: 28, tintColor: "#808B96" }} source={require("../../assest/personal.png")} />

          <Text style={[styles.text, { color: selectedBottomTab === 'Profile' ? '#808B96' : '#808B96' }]}>Loans</Text>
        </TouchableOpacity>
        {/* E-Mandate */}
        <TouchableOpacity onPress={() => 
          // setSelectedBottomTab('Profile')
          navigation.navigate('Mobilelogin')
          
        } style={{ justifyContent: 'center', alignItems: 'center' }}>
          {selectedBottomTab === 'Profile' ?
            <Image style={{ height: 28, width: 28, tintColor: "#808B96" }} source={require("../../assest/M.png")} />
            :
            <Image style={{ height: 28, width: 28, tintColor: "#808B96" }} source={require("../../assest/M.png")} />
          }
          <Text style={[styles.text, { color: selectedBottomTab === 'Profile' ? '#808B96' : '#808B96' }]}>E-Mandate</Text>
        </TouchableOpacity>
        {/* Loans */}
        <TouchableOpacity onPress={() => {
          setSelectedBottomTab('Profile')
          props.onProfilePress()
        }} style={{ justifyContent: 'center', alignItems: 'center' }}>
          {selectedBottomTab === 'Profile' ?
            <Image style={{ height: 28, width: 28, tintColor: "#808B96" }} source={require("../../assest/account.png")} />
            :
            <Image style={{ height: 28, width: 28, tintColor: "#808B96" }} source={require("../../assest/account.png")} />
          }
          <Text style={[styles.text, { color: selectedBottomTab === 'Profile' ? '#808B96' : '#808B96' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}
export default HomeFooter