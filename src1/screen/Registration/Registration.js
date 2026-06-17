import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import colors, { resetScreen } from '../../common';
import LinearButton from '../../components/LinearButton/LinearButton';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, ERROR_MESSAGE } from '../../utils';
import Loader from '../../components/Loader/Loader';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Registration = props => {
  const [showLoader, setShowLoader] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userName, setUserName] = useState('');
  // const [lastName, setLastName] = useState('');

  const handleValidated = () => {
    const mobileRegex = /^\d{10}$/;
    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );

    return (
      firstName?.length > 2 &&
      mobileRegex.test(mobile) &&
      emailRegex.test(email) &&
      passwordRegex.test(password)
      // userName?.length > 2 &&
      // lastName?.length > 2 &&
    );
  };

  const sendRegistrationOtp = () => {
    const body = {
      phone_no: mobile,
      email: email,
    };

    axios
      .post(API_BASE_URL + 'sendRegistrationOtp', body)
      .then(res => {
        console.log('sendRegistrationOtp response', res);
        if (res.status === 200 && res.data.status === true) {
          props.navigation.navigate('Verify', {
            firstName: firstName,
            mobile: mobile,
            email: email,
            password: password,
          });
        } else {
          alert(res?.data?.msg);
        }
      })
      .catch(err => {
        alert('We are facing some techical issue. Team is looking into it.');
        console.log('sendRegistrationOtp error', err);
      });
  };
  const registerUser = () => {
    setShowLoader(true);
    const body = {
      full_name: firstName,
      phone_no: mobile,
      email: email,
      password: password,
    };
    console.log('registerUser body', body);
    axios
      .post(API_BASE_URL + 'UserSignUp', body)
      .then(res => {
        setShowLoader(false);
        console.log('registerUser res', res);
        if (res.status === 200 && res.data.status === true) {
          verifyPhoneNumber();
          Toast.show(res.data.messages, Toast.SHORT);
          AsyncStorage.setItem('TOKEN', res.data?.data?.token);
          AsyncStorage.setItem('RESPONSE', JSON.stringify(res.data?.response));
          resetScreen(props.navigation, 'Verify', { mobileNumber: mobile });
        } else {
          alert('Something Went Wrong');
        }
      })
      .catch(err => {
        setShowLoader(false);
        alert(ERROR_MESSAGE);
        console.log('registerUser err', err);
      });
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.2 }}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.2 }}
        locations={[0, 0.6, 1]}
        colors={['#7B4397', '#B53059', '#DC2430']}
        style={{ height: '20%', width: '100%', backgroundColor: 'white' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Loader showLoader={showLoader} />
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <TouchableOpacity
              style={{
                height: 26,
                width: 38,
                marginLeft: 23,
              }}
              onPress={() => props.navigation.goBack()}>
              <Image
                style={styles.arrowImage}
                source={require('../../assests/arrowBack.png')}
              />
            </TouchableOpacity>
            <Text style={styles.create}>Create New Account</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : null}
         keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        > */}
      <ScrollView style={styles.footer}>
        <Text style={styles.textField}>First Name *</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setFirstName(text)}
          placeholder="Enter First Name"
        />

        <Text style={styles.textField}>Email Address *</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setEmail(text)}
          placeholder="Enter Email"
        />

        <Text style={styles.textField}>Mobile Number *</Text>
        <TextInput
          style={styles.textInput}
          keyboardType={'numeric'}
          maxLength={10}
          onChangeText={text => setMobile(text)}
          placeholder="Enter Mobile Number"
        />

        <Text style={styles.textField}>Password *</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setPassword(text)}
          placeholder="Enter Password"
          secureTextEntry={true}
        />

        <View style={{ marginTop: 24 }}>
          {handleValidated() ? (
            <LinearButton
              onPress={() => sendRegistrationOtp()}
              customStyle={{ width: 170, alignSelf: 'flex-start' }}
              title={'Register Now'}
            />
          ) : (
            <View style={styles.button}>
              <Text style={styles.buttonText}>Register Now</Text>
            </View>
          )}
        </View>

        <View style={{ height: 140, width: '100%' }}></View>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}

      <View
        style={{
          backgroundColor: '#F5F5F5',
          height: '25%',
          width: '100%',
          padding: 23,
          position: 'absolute',
          bottom: 0,
        }}>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
           
          }}>
          <Text style={{color: '#595959'}}>or continue with</Text>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require('../../assests/facebook.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.image}
              source={require('../../assests/google.png')}
            />
          </TouchableOpacity>
         
        </View> */}
        <View
          style={{
            height: 1,
            width: '100%',
            marginTop: 8,
            backgroundColor: '#E3E5E5',
          }}></View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '400',
              marginTop: 8,
              alignSelf: 'center',
              color: colors.red,
            }}>
            Already have an Account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
export default Registration;
