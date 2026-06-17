import React, { Component, useEffect, useState ,useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
// import CheckBox from '@react-native-community/checkbox';
import CustomCheckBox from '../../components/Checkbox/Checkbox';
import colors from '../../common';
import LoginButton from '../../components/LoginButton/LoginButton';
import LinearButton from '../../components/LinearButton/LinearButton';
import axios from 'axios';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
// import { Canvas, Image as CanvasImage } from 'react-native-canvas';
import Canvas from 'react-native-canvas';

import Captcha from '../../components/Captcha/Captcha';


const PhoneNumberVerify = (props) => {
  const { navigation } = props;
  const [Phone, setPhone] = useState('');

  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    if (!isChecked) {
      Alert.alert("Consent Required", "Please provide your consent to proceed.");
      return;
    }
    Alert.alert("Submitted", "Thank you for providing your consent.");
  };


    const handleValidation = () => {
    const mobileRegex = /^\d{10}$/;

    if (!isChecked) return false;
    if (!mobileRegex.test(Phone)) return false;
    if (enteredCaptcha !== generatedCaptcha) return false;  // ✅ Captcha check

    return true;
  };



  // const handleValidation = () => {
  //   const mobileRegex = /^\d{10}$/;
  
  //   if (!isChecked) {
  //     // Alert.alert("Consent Required", "Please provide your consent to proceed.");
  //     return false;
  //   }
  
  //   if (mobileRegex.test(Phone)) {
  //     return true;
  //   } else {
  //     // Alert.alert("Invalid Phone Number", "Please enter a valid 10-digit phone number.");
  //     return false;
  //   }
  // };

  
  // const handleValidation = () => {
  //   const mobileRegex = /^\d{10}$/;


  //   if (mobileRegex.test(Phone)) {
  //     return true;
  //   } else {
  //     return false;
  //   }

 
  // }



  return (
  
     
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.2 }}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      // style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
      style={{ flex: 1 }}
      >
         <StatusBar hidden={true} translucent={false} backgroundColor="white" barStyle="dark-content" />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.2 }}
        locations={[0, 0.6, 1]}
        colors={['#7B4397', '#B53059', '#DC2430']}
        style={{ height: '40%', width: '100%', backgroundColor: 'white' }}>
        <SafeAreaView>
          <TouchableOpacity onPress= {()=> props.navigation.goBack()}>
            <Image
              style={styles.arrowImage}
              source={require('../../assests/arrowBack.png')}
            />
          </TouchableOpacity>

          <Image
            style={styles.otpImage}
            source={require('../../assests/LockImage.png')}
          />
        
        </SafeAreaView>
      </LinearGradient>
      <ScrollView
        style={{
          height: '60%',
          width: '100%',
          backgroundColor: 'white',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}>
            {/* <View style={styles.LogoImage}>
                  <Image
                    style={styles.LogoImage1}
                    source={require('../../assest/logo.png')}
                    resizeMode="contain"
                  />
                </View> */}
        <View style={styles.footer}>
          <Text style={[styles.loginText, { color: '#161A30' }]}>Login with OTP</Text>
          <Text style={[styles.textField, { color: '#161A30' }]}>Enter Phone Number</Text>
          <TextInput onChangeText={text => setPhone(text)}
            style={[styles.textInput, { color: '#000' }]}
            placeholder="Enter Phone Number"
            keyboardType='number-pad'
            maxLength={10}
            placeholderTextColor={'#394867'}
            tint
          />

                <Captcha
            onValueChange={(typedValue, captchaValue) => {
              setEnteredCaptcha(typedValue);
              setGeneratedCaptcha(captchaValue);
            }}
          />
          <View style={styles.checkboxContainer}>

     


           
              <CustomCheckBox isChecked={isChecked} onToggle={() => setIsChecked(!isChecked)} />
              
            <Text style={styles.text}>
              I hereby consent to Chintamani Finlease Ltd being appointed as authorised representative to receive my Credit Information from Experian and other bureau for the purpose of offering loan offers.
              <Text 
                style={{ textDecorationLine: "underline", color: "blue" }} 
                onPress={() => navigation.navigate("wv")}
              >
                Terms & Condition
              </Text>
            </Text>
          </View>
     

          {
            handleValidation() ?
              <LinearButton title={'Confirm'}
                width={150}
                customStyle={{ alignSelf: "flex-start", marginTop: 40 }}
                onPress={() => props.navigation.navigate("PhoneOtpVerify", { mobile: Phone })}
                // onPress={() => props.navigation.navigate("CreditScoreScreen")}
                // onPress={() => props.navigation.navigate("CreditScoreScreen", { progress: 850 })}
                // onPress={() => props.navigation.navigate("JobdetailTest")}
                // onPress={() => props.navigation.navigate("InstalationForm")}
              />
              :
              <LoginButton 
                title={'Confirm'}
                style={{ marginTop: 40 }}
              />
          }
          <View style={{justifyContent:'center',alignItems:'center',marginTop:40}}>
           <Text style={styles.footer1}>Powered By</Text>
          <View style={{flexDirection:'row',width:'100%',justifyContent:'center',alignItems:'center'}}>
       
        <Image source={require("../../assest/exprain/experian.png")} style={styles.experianLogo} />
        <Image source={require("../../assest/exprain/Equifax_Logo.png")} style={styles.experianLogo} />
        <Image source={require("../../assest/exprain/Criflogo.png")} style={styles.experianLogo} />
        <Image source={require("../../assest/exprain/CIBILxjpg.jpeg")} style={styles.experianLogo} />
        </View>
        </View>
        </View>

        <View style={{ height: 100, width: "100%", backgroundColor: "white" }}></View>
      </ScrollView>
    </LinearGradient>

    //
  );
};
export default PhoneNumberVerify;
