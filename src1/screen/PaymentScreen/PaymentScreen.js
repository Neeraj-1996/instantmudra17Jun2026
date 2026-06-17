import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
// import { LoginButton } from 'react-native-fbsdk-next';
import LinearGradient from 'react-native-linear-gradient';
import LinearButton from '../../components/LinearButton/LinearButton';
import styles from './styles';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../utils';

const PaymentScreen = props => {
  const [selectedTick, setSelectedTick] = useState('RazorPay');
  const [razorPayURL, setRazorPayURL] = useState('')
  const [iciciURL, setIciciURL] = useState('')
  const amount = props.route?.params?.amount
  const loanId = props.route?.params?.loanId

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("USER_DATA")
    const _userData = JSON.parse(userData);
    const userId = _userData?.id
    const iciciURL = BASE_URL + "admin/icici-upi-form/user_id/" + userId + "/loan_id/" + loanId + "/amount/" + amount;
    console.log("iciciURL", iciciURL)
    const razorPayURL = BASE_URL + 'admin/razorpay-pay-form/user_id/' + userId + '/loan_id/' + loanId + '/amount/' + amount
    console.log("razorPayURL", razorPayURL)
    setIciciURL(iciciURL)
    setRazorPayURL(razorPayURL)
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={props.navigation} title={''} />

      <View style={{ flex: 1, padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => setSelectedTick('RazorPay')}>
            <Image style={{ height: 24, width: 24 }} source={require('../../assests/Ellipse.png')} />
            {selectedTick === 'RazorPay' && (
              <Image
                source={require('../../assests/smallTick.png')}
                style={{ height: 24, width: 24, marginTop: -24 }}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.text}> Pay with Razorpay</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: 60,
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => setSelectedTick('ICICI')}>
            <Image style={{ height: 24, width: 24 }} source={require('../../assests/Ellipse.png')} />

            {selectedTick === 'ICICI' && (
              <Image
                source={require('../../assests/smallTick.png')}
                style={{ height: 24, width: 24, marginTop: -24 }}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.text}> Pay with ICICI UPI</Text>
        </View>

        <LinearButton
          marginTop={20}
          width={180}
          title="Pay Now"
          onPress={() => props.navigation.navigate('RazorpayPaymentPage', { selectedTick: selectedTick, webViewURL: selectedTick === 'ICICI' ? iciciURL : razorPayURL })}
        />
      </View>
    </View>
  );
};
export default PaymentScreen;
