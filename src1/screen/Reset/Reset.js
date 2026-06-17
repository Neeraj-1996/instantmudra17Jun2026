import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,ScrollView
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../common';
import LoginButton from '../../components/LoginButton/LoginButton';
import LinearButton from '../../components/LinearButton/LinearButton';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import axios from 'axios';
import { API_BASE_URL } from '../../utils';

const mobileRegex = /^\d{10}$/;
const emailRegex = /\S+@\S+\.\S+/;

const Reset = props => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const body =()=>{
    phone_no : emailOrPhone
  }

  const ResetPassword =()=>{
      axios
      .post (API_BASE_URL + 'userForgetPassword', {phone_no : emailOrPhone})
      .then(res=>{
        console.log("ResetPassword response", res)
        if(res.status=== 200 && res.data.status=== true){
          props.navigation.navigate('Verify', {
                  from: 'Reset',
                  mobile: emailOrPhone,
                });
        }else{
          alert("Something went wrong")
        }
      })
      .catch(err=>{
        alert('We are facing some techical issue. Team is looking into it.')
        console.log("ResetPassword error", err)
      })
  }




  const handleValidation = () => {
    if (mobileRegex.test(emailOrPhone) || emailRegex.test(emailOrPhone)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0.2}}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0.2}}
        locations={[0, 0.6, 1]}
        colors={['#7B4397', '#B53059', '#DC2430']}
        style={{height: '40%', width: '100%', backgroundColor: 'white'}}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
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
        <View style={styles.footer}>
          <Text style={styles.loginText}>Reset Password</Text>
          <Text style={styles.loginTextTwo}>
            Enter email or phone number linked to your account and we'll confirm
            it once to reset your password,{' '}
          </Text>
          <Text style={styles.textField}>Email or Phone Number</Text>
          <TextInput
            onChangeText={text => setEmailOrPhone(text)}
            style={styles.textInput}
            placeholder="Enter your Email or Phone Number"
          />
         {handleValidation() ? ( 
            <LinearButton
              title={'Confirm'}
              width={150}
              customStyle={{alignSelf: 'flex-start', marginTop: 40}}
              onPress={() => {
                ResetPassword()

                if (mobileRegex.test(emailOrPhone)) {
                  props.navigation.navigate('Verify', {
                    from: 'Reset',
                    mobile: emailOrPhone,
                  });
                } else {
                  props.navigation.navigate('CheckEmail', {
                    email_id: emailOrPhone,
                  });
                }
              }}
            />
          ) : ( 
            <LoginButton title={'Confirm'} 
              style={{marginTop: 40}} 
              onPress={()=>alert('Hi')}
            />
           )}
        </View>
        <View style= {{height:360, width:"100%", }}></View>
      </ScrollView>
    </LinearGradient>
    //
  );
};
export default Reset;
