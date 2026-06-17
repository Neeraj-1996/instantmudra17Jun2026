import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../common';
import LinearButton from '../../components/LinearButton/LinearButton';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import LoginButton from '../../components/LoginButton/LoginButton';
import axios from 'axios';
import {API_BASE_URL} from '../../utils';
const NewPassword = props => {


  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const mobileNumber = props.route?.params?.mobileNumber;
  console.log("🚀 ~ file: NewPassword.js ~ line 25 ~ props.route?.params", props.route?.params)
  console.log("🚀 ~ file: NewPassword.js ~ line 25 ~ mobileNumber", mobileNumber)
  // const password = props.route?.params?. password
  
  // const updatePassword = async () => {
  //   const body = {
  //     user_id: props.route?.params?.user_id,
  //     password: Password,
  //   };
  //   console.log('updatePassword body', body);
  //   axios
  //     .post(API_BASE_URL + 'update-password', body)
  //     .then(res => {
  //       console.log('updatePassword response', res);
  //       if (res.data.status === 200) {
  //         props.navigation.navigate('UpdatePassword');
  //       } else {
  //         alert('Something went wrong');
  //       }
  //     })
  //     .catch(error => {
  //       console.log('error', error?.reponse);
  //     });
  // };

const updateNewPassword = ()=>{
  // alert("Hello")
  props.navigation.navigate('UpdatePassword');
  const body={
    phone_no: mobileNumber,
    password: Password
  }
  console.log("bodyy", body)
    alert("hello")
  axios
  .post (API_BASE_URL + "saveNewPassword", body)
  .then( res => {
    console.log("updateNewPassword response", res)
    if(res.status== 200 && res.data.status === true){
      props.navigation.navigate('UpdatePassword');
    }else{
      
    }
  })
  .catch( err => {
    console.log("updateNewPassword error", err)
    alert('We are facing some techical issue. Team is looking into it.')
  })
}



  
  const handleValidated = () => {
    const PasswordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    const ConfirmPasswordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    return (
      PasswordRegex.test(Password) &&
      ConfirmPasswordRegex.test(ConfirmPassword) &&
      Password === ConfirmPassword
    );
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
            source={require('../../assests/keyImage.png')}
          />
        </SafeAreaView>
      </LinearGradient>
      <View
        style={{
          height: '60%',
          width: '100%',
          backgroundColor: 'red',
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}>
        <ScrollView style={styles.footer}>
          <Text style={styles.loginText}>Create New Password</Text>
          <Text style={styles.loginTextTwo}>
            Your New password must be different from previous used password{' '}
          </Text>
          <Text style={styles.textField}>Password</Text>
          <TextInput
            onChangeText={text => setPassword(text)}
            style={styles.textInput}
            placeholder="Enter Password"
            secureTextEntry={true}
          />
          <Text style={styles.textField}>Confirm Password</Text>
          <TextInput
            onChangeText={text => setConfirmPassword(text)}
            style={styles.textInput}
            placeholder="Enter Password"
            secureTextEntry={true}
          />

          {handleValidated() ? (
            <LinearButton
              width={150}
              title={'Confirm'}
              customStyle={{marginTop: 40, alignSelf: 'flex-start'}}
              onPress={() => updateNewPassword()}
            />
           ) : ( 
            <LoginButton style={{marginTop: 40}} title={'Confirm'} />
           )} 
          <View style= {{height:400, width:"100%", }}></View>
        </ScrollView>
      </View>
    </LinearGradient>
    //
  );
};
export default NewPassword;
