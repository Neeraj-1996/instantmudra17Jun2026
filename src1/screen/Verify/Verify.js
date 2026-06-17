import React, {useEffect, Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableOpacityBase,
  Button,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../common';
import OTPTextInput from 'react-native-otp-textinput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from '../../utils';
import LinearButton from '../../components/LinearButton/LinearButton';
import LoginButton from '../../components/LoginButton/LoginButton';

const Verify = props => {
  const [mobileReferenceId, setMobileReferenceId] = useState('');

  const [otpText, setOTP] = React.useState(null);
  const firstName = props?.route?.params?.firstName
  const mobileNumber= props?.route?.params?.mobile
  console.log("🚀 ~ file: Verify.js ~ line 29 ~ mobileNumber", mobileNumber)
  const emailId = props?.route?.params?.email
  const password = props?.route?.params?.password

  const registerUser = ()=>{
      const body= {
        full_name:firstName,
        email:emailId,
        phone_no:mobileNumber,
        password:password
      }
   
    axios
    .post (API_BASE_URL + "UserSignUp", body)
    .then(res=>{
      console.log("registerUser response", res)
      if(res.status === 200 && res.data.status === true){
          props.navigation.navigate("Login")
      }
    })
    .catch(err=>{
      alert('We are facing some techical issue. Team is looking into it.')
      console.log("registerUser error", err)
    })
    
  }
  const otpVerify = () => { 
    const formData = new FormData();
    formData.append("phone_no", mobileNumber);
    formData.append("otp", otpText);
    axios
      .post(API_BASE_URL + 'verifyOTP', formData)
      .then(res => {
        console.log("otpVerify, responsess", res)
        if (res.status === 200 && res.data.status === true) {
          //  props.navigation.navigate("Login")
          if (props.route?.params?.from === "Reset") {
            props.navigation.navigate("NewPassword", {mobileNumber: mobileNumber})
          } else {
            registerUser()
          }
          } else {
            alert('something went wrong');
        }
      })
      .catch(err => {
        console.log('otpVerify', err);
        alert('We are facing some techical issue. Team is looking into it.')
      });
  };;

  const ResetPassword =()=>{
    axios
    .post (API_BASE_URL + 'userForgetPassword', {phone_no : mobileNumber})
    .then(res=>{
      console.log("ResetPassword response", res)
      if(res.status=== 200 && res.data.status=== true){
        alert("OTP sent successfully")
        // props.navigation.navigate('Verify', {
        //         from: 'Reset',
        //         mobile: emailOrPhone,
        //       });
      }else{
        alert("Something went wrong")
      }
    })
    .catch(err=>{
      console.log("ResetPassword error", err)
      alert('We are facing some techical issue. Team is looking into it.')
    })
  }

  const sendRegistrationOtp = () => {
    const body = {
      phone_no: mobileNumber,
      email: emailId,
    };
    axios
      .post(API_BASE_URL + 'sendRegistrationOtp', body)
      .then(res => {
        console.log('sendRegistrationOtp response', res);
        if (res.status === 200 && res.data.status === true) {
          alert("OTP Sent successfully")
        } else{
          alert(res?.data?.msg)
        }
      })
      .catch(err => {
        alert('We are facing some techical issue. Team is looking into it.')
        console.log('sendRegistrationOtp error', err);
      });
  };

  const resendOTP = () => {
    if (props.route?.params?.from === "Reset") {
      ResetPassword()
    } else {
      sendRegistrationOtp()
    }
  }

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0.2}}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{flex: 1, backgroundColor: 'white'}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0.2}}
        locations={[0, 0.6, 1]}
        colors={['#7B4397', '#B53059', '#DC2430']}
        style={{height: '40%', width: '100%', backgroundColor: 'white'}}>
        <SafeAreaView>
          {/* <TouchableOpacity onPress= {()=>props.navigation.goBack()}>
             <Image style={styles.arrowImage} source={require("../../assests/arrowBack.png")} />
          </TouchableOpacity> */}
          <Image
            style={styles.otpImage}
            source={require('../../assests/OtpImage.png')}
          />
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.footer}>
        <Text style={styles.loginText}>Enter Otp</Text>
        <Text style={styles.loginTextTwo}>
          Please enter verification code sent to your Mobile Number,{' '}
          {mobileNumber}{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            // marginTop: 20,
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <OTPTextInput
            containerStyle={[styles.textInputContainer]}
            textInputStyle={[styles.squareTextInput]}
            inputCount={5}
            tintColor="dimgrey"
            offTintColor="gray"
            handleTextChange={otpText => setOTP(otpText)}
            returnKeyType={'done'}
            autoCompleteType="off"
            autoCorrect={false}
            selectionColor={'red'}
          />
        </View>
        
        <View style={{ width: '100%',alignItems:"center",flexDirection:"row", justifyContent:"space-between"}}>
            {otpText?.length === 5 ? (
                <LinearButton
                  onPress={() => otpVerify()}
                  title= {"Confirm OTP"}
                  width = {150}/>

            ) : (
                <LoginButton
                title= {"Confirm OTP"}/>
            )}
          <TouchableOpacity 
          onPress= {()=>resendOTP()}
            style={{}}>
            <Text style={{fontSize: 14, fontWeight: '400', color: colors.red}}>
              RESEND OTP
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', height: 400}}></View>
      </ScrollView>
    </LinearGradient>
  );
};
export default Verify;
