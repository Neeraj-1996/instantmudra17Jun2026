import React, { useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import colors, { resetScreen } from '../../common';
import OTPTextInput from 'react-native-otp-textinput';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../utils';
import Toast from "react-native-simple-toast";
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';


const PhoneOtpVerify = props => {
  const [otpText, setOTP] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [deviceId, setDeviceId] = React.useState("");
  const phone = props.route?.params?.mobile;

  useEffect(() => {


    getDeviceId();
  }, []);


  useEffect(() => {
    if (deviceId) {      // ✅ Only call OTP API when deviceId is not null/empty
      sendOTP();
    }
  }, [deviceId, sendOTP]);

  const getDeviceId = async () => {
    const id = await DeviceInfo.getUniqueId();
    console.log("Actual device ID:", id);
    setDeviceId(id);
  };


  const sendOTP = useCallback(() => {
    if (!deviceId) {
      console.log("Device ID is null — not sending OTP");
      return;
    }

    console.log("Actual device ID hjhkkjjlk:", deviceId);

    axios
      .post(API_BASE_URL + 'loginWithOtpChint_otp', {
        phone_no: phone,
        device_id: deviceId,
      })
      .then(res => {
        console.log('OTP res', res.data);
        if (res?.data?.status === true) {
          Toast.showWithGravity('Otp send successfully', Toast.LONG, Toast.BOTTOM);
        }
      })
      .catch(error => {
        console.log('error while sending otp:', error);
      });
  }, [deviceId, phone]);   // ✅ declare dependencies


  // const sendOTP = () => {
  //   //  const deviceId = DeviceInfo.getUniqueId(); 
  //   console.log("Actual device ID hjhkkjjlk:", deviceId);
  //   // console.log("Actual device 23976493294 ID:",deviceId._j);
  //   axios
  //     // .post(API_BASE_URL + 'loginWithOtp', {
  //     .post(API_BASE_URL + 'loginWithOtpChint_otp', {
  //       phone_no: phone, device_id: deviceId,
  //     })
  //     .then(res => {
  //       console.log('OTP res', res.data);
  //       if (res?.data?.status === true) {
  //         // setMobileReferenceId(res.data?.data?.reference_id);
  //         // alert('Otp send successfully');
  //         Toast.showWithGravity('Otp send successfully', Toast.LONG, Toast.BOTTOM);
  //       }
  //     })
  //     .catch(error => {
  //       console.log('error while sending otp:', error);
  //       /// alert('We are facing some techical issue. Team is looking into it.')
  //     });
  // }

  const verifyLoginWithOTP = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("phone_no", phone);
      formData.append("otp", otpText);

      // Debugging FormData - you must log values manually
      console.log("Phone:", phone);
      console.log("OTP:", otpText);

      const response = await axios.post(`${API_BASE_URL}verifyOTP`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('verifyLoginWithOTP response:', response.data);

      const userData = response?.data?.result;

      if (response?.data?.status === true) {
        Toast.showWithGravity(response?.data?.msg, Toast.LONG, Toast.BOTTOM);

        await AsyncStorage.setItem("USER_DATA", JSON.stringify(userData));
        await AsyncStorage.setItem("user_id", JSON.stringify(userData));
        await AsyncStorage.setItem("userIdZ", userData?.user_id);
        await AsyncStorage.setItem("phone", phone);
        // await AsyncStorage.setItem("Name", userData?.first_name);

        fetchUserNotificationToken(userData?.user_id, token);
        statuscheck();
      } else {
        Toast.showWithGravity("Please enter a valid OTP", Toast.LONG, Toast.BOTTOM);
      }
    } catch (error) {
      console.log("verifyLoginWithOTP Error:", error);

      if (error.response) {
        console.log("Server responded with:", error.response.data);
        alert(error.response?.data?.msg || 'Invalid OTP or phone number.');
      } else if (error.request) {
        console.log("No response received:", error.request);
        alert('No response from server. Please try again.');
      } else {
        console.log("Request error:", error.message);
        alert('We are facing some technical issue. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };





  const statuscheck = () => {
    const body = {
      phone_no: phone,
    }
    axios
      .post('https://instantmudra.com/admin/API/checkProfileStatus', body)
      .then(res => {
        // 
        AsyncStorage.setItem("oldnew", res?.data?.user_type)
        AsyncStorage.setItem("aadhar", res?.data?.settings?.aadhar_enabled)
        AsyncStorage.setItem("pan", res?.data?.settings?.pan_enabled)


        AsyncStorage.setItem("PanCardNumber", res?.data?.pancard_no) // Saving Temporary to just navigate to spefic screen if needed 22-12-2023
        AsyncStorage.setItem("AdharCardNumber", res?.data?.aadhar_no)  // Saving Temporary to just navigate to spefic screen if needed 22-12-2023

        // console.warn('>>>>>>>>>>>>',res?.data?.settings?.pan_enabled)
        console.log("🚀 ~ file: PhoneOtpVerify.js:84  userType:", res?.data)

        // if (res?.data?.user_type == "old") {
        //   props.navigation.replace('Home');
        //   return;
        // }

        if (res?.data?.user_type == 'old') {

          // Chanaged Here updated
          // **** Personal Information screen par wo starting me v jayega aur jab status new rahega tab v jayega agar false hoga to
          if (res?.data?.reference_status == false) {
            props.navigation.navigate("Ref", {
              aadharNumber: res?.data?.aadhar_no,
              panNumber: res?.data?.pancard_no,
            })
            return;
          }
          if (res?.data?.document_status == false) {
            props.navigation.navigate("Document", {
              aadharNumber: res?.data?.aadhar_no,
              panNumber: res?.data?.pancard_no,
            })
            return;
          }
          if (res?.data?.bank_status == false) {
            props.navigation.navigate("SalariesWorkDetails", { from: "Document" })
            return;
          }
          // changed end
          props.navigation.replace("Home")
          return;
        }

        // store?.settings?.aadhar_enabled == "1" && store?.settings?.aadhar_verified == "0"
        if (res?.data?.user_type == "new") {
          //alert(res?.data.pan_verified);

          if (res?.data?.settings?.pan_enabled == "1" && res?.data.pan_verified == "0") {
            props.navigation.navigate("Pan")
            // console.warn('>>>>>>>>>>>>',res?.data?.settings?.pan_enabled)
            return;
          }

          if (res?.data?.settings?.aadhar_enabled == "1" && res?.data?.aadhar_verified == "0") {
            props.navigation.navigate("Aadhar")
            return;
          } else {
            // alert('Running')
            props.navigation.navigate('PersonalInformation')
          }
        }



      })

      .catch(err => {
        // alert(err?.response?.data?.message);
        console.log('verifyLoginWithOTP error', err?.reponse);
        // alert('alert', err)
      });
  }

  // console.log('PhoneOtpVerify.js', store)


  // React.useEffect(() => {
  // const requestPermission = async () => {
  //   // const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Notification permission granted.');
  //   }
  // };

  // requestPermission();

  // Function to get the token

  // getToken();

  // Listen for foreground messages
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe; // Unsubscribe on unmount
  // }, []);

  // const getToken = async () => {
  //   try {
  //     // const token = await messaging().getToken();
  //     console.log('FCM Token:', token);
  //     // fetchUserNotificationToken(token)
  //     setToken(token);
  //     return token;
  //   } catch (error) {
  //     console.error('Error getting token:', error);
  //   }
  // };

  const fetchUserNotificationToken = async (UserId, token) => {
    // const usersData = await JSON.parse(await AsyncStorage.getItem('USER_DATA'));
    console.log("toekn", token);
    axios.post(
      'https://instantmudra.com/admin/API/TokenUserNotification',
      {
        user_id: UserId,
        token_id: token
      }, { headers: { 'Content-Type': 'application/json' } }
    )
      .then(response => {
        console.log("messsage Token", response.data);
      })
      .catch(error => console.error(error));
  };


  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.2 }}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{ flex: 1, backgroundColor: 'white' }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.2 }}
        locations={[0, 0.6, 1]}
        colors={['#7B4397', '#B53059', '#DC2430']}
        style={{ height: '40%', width: '100%', backgroundColor: 'white' }}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              style={styles.arrowImage}
              source={require('../../assests/arrowBack.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.otpImage}
            source={require('../../assests/OtpImage.png')}
          />
        </SafeAreaView>
      </LinearGradient>

      <ScrollView style={styles.footer}>
        <Text style={[styles.loginText, { color: '#212A3E' }]}>Verify Mobile Number</Text>
        <Text style={styles.loginTextTwo}>
          Please verify code sent to your Mobile Number, {phone}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
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


        {loading ? (
          <View style={{
            height: 40,
            width: '46%',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
            backgroundColor: '#DC2430',
          }}>
            <ActivityIndicator size="small" color="#fff" />
          </View>) : (<TouchableOpacity
            onPress={() => verifyLoginWithOTP()}
            disabled={otpText?.length !== 5}>
            {otpText?.length === 5 ? (
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0.2 }}
                locations={[0, 0.6, 1]}
                colors={['#7B4397', '#B53059', '#DC2430']}
                style={{
                  height: 40,
                  width: '46%',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 80,
                }}>
                <Text style={[styles.buttonText, { color: 'white' }]}>
                  Confirm OTP
                </Text>
              </LinearGradient>
            ) : (
              <View style={{ height: 120, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Confirm OTP</Text>
                </View>
                <TouchableOpacity onPress={() => sendOTP()}>
                  <Text style={{ fontSize: 14, fontWeight: '400', color: colors.red }}>
                    RESEND OTP
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>)}


        <TouchableOpacity
          style={{ alignSelf: 'center', position: 'absolute', bottom: 44 }}>
          {/* <Text style={{fontSize: 14, fontWeight: '400', color: colors.red}}>
            RESEND OTP
          </Text> */}
        </TouchableOpacity>
        <View style={{ height: 160, width: "100%", }}></View>
      </ScrollView>
    </LinearGradient>
  );
};
export default PhoneOtpVerify;
