import React, { Component, useEffect, useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, TouchableOpacityBase } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Splash = (props) => {

  const [store, setStore] = useState('')
  const [cache, setCache] = useState('')
  const [tempData, setTempData] = useState({}) 

  useEffect(() => {
    statuscheck()
  }, [])


  console.log("tempData tempData", tempData)

  const statuscheck = async () => {
    const phone = await AsyncStorage.getItem('phone');
    console.log("phone",phone);
    const loggedInData = await AsyncStorage.getItem('USER_DATA')
    console.log("loggedInData loggedInData", loggedInData)
    const PanCardNumber = await AsyncStorage.getItem('PanCardNumber') // 22-12-2023 Sujeet
    const AdharCardNumber = await AsyncStorage.getItem('AdharCardNumber') // 22-12-2023 Sujeet

    // Update tempData state with new values
    setTempData({
      PanCardNumber,
      AdharCardNumber
    });
    
    setCache(loggedInData)
    console.log("Splash.js Offline ❤ loggedInData", loggedInData)
    const body = {
      phone_no: phone,
    }
    // console.log("Splash.js", body)
    axios
      .post('https://instantmudra.com/admin/API/checkProfileStatus', body)
      .then(res => {
        console.warn("Splash.js online 😎 userData by number", res?.data)
        setStore(res?.data)
      })
      .catch(err => {
        console.log("Splash.js", err)
        alert(err)

      });
  }



  // useEffect(() => {

  setTimeout(() => {

    if (store?.user_type == 'old') {

      // Chanaged Here updated
      if (store.reference_status == false) {
        props.navigation.navigate("Ref", {
          aadharNumber: tempData.AdharCardNumber,
          panNumber: tempData.PanCardNumber,
        })
        return;
      }
      if (store.document_status == false) {
        props.navigation.navigate("Document", {
          aadharNumber: tempData.AdharCardNumber,
          panNumber: tempData.PanCardNumber,
        })
        return;
      }
      if (store.bank_status == false) {
        props.navigation.navigate("SalariesWorkDetails", { from: "Document" })
        return;
      }
      // changed end
      props.navigation.replace("Home")
      return;
    }

    if (store?.user_type == 'new') {

      if (store?.settings?.pan_enabled == "1" && store?.pan_verified == "0") {
        props.navigation.navigate("Pan")
        return;
      }

      if (store?.settings?.aadhar_enabled == "1" && store?.aadhar_verified == "0") {
        props.navigation.navigate("Aadhar")
        return;
      }

    }

    // add new code end

    if (cache == null) {
      props.navigation.replace("Onboarding")
    } else {
      if (store?.user_type == 'old') {
        props.navigation.replace("Home")
        return;
      }

      if (store?.user_type == 'new') {
        if (store?.settings?.pan_enabled == "1" && store?.pan_verified == "0") {
          props.navigation.navigate("Pan")
          return;
        }

        if (store?.settings?.aadhar_enabled == "1" && store?.aadhar_verified == "0") {
          props.navigation.navigate("Aadhar")
          return;
        }
        // *** add here else condition to check and naviagate (problem: screen will stuck)
        if (store?.profile_status == false || store?.document_status == false) {
          // props.navigation.navigate("PersonalInformation");

          props.navigation.replace("Onboarding");
          return;
        } else {
          props.navigation.navigate("Home")
          return;
        }
      }

    }


  }, 2000)
  //}, [])


  return (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', "#B53059", '#DC2430']} style={{ flex: 1 }}>
      <SafeAreaView style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image style={{ height: 310, width: 310, }} source={require("../../assests/OnboardingOne.png")} />
      </SafeAreaView>
    </LinearGradient >
  )
}

export default Splash;
