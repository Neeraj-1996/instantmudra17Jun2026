import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../utils';
import axios from 'axios';
import LinearButton from '../../components/LinearButton/LinearButton';
const ThankyouScreen = props => {
  const fetchLoanDetails = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const body = {
      loan_id: props.route?.params?.loanId,
    };
    console.log('fetchLoanDetails body', body);
    axios
      .post(API_BASE_URL + 'check-loan-current-status', body, config)
      .then(res => {
        console.log('fetchLoanDetails response', res);
        setLoanDetailsData(res?.data?.data?.loan_details?.[0] ?? {});
      })
      .catch(err => {
        alert('We are facing some techical issue. Team is looking into it.')
        console.log('fetchLoanDetails error', err);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      {/* <Image style={styles.image} source={require('../../assests/check.png')} /> */}

      <Text style={styles.title}> Thank You</Text>

      <Text style={[styles.subTitle, { marginTop: 12 }]}>
        Congratulations you have successfully submitted your application.
      </Text>
      <View style={{ alignItems: 'center' }}></View>

      <View
        style={{
          width: '90%',
          marginTop: 24,
          borderRadius: 8,
          backgroundColor: '#86B6F6',
          borderWidth: 1,
          padding: 16,
          alignSelf: 'center',
        }}>
        <Text style={[styles.subTitle, { fontWeight:'500'}]}>
          Please save your loan application reference number :{' '}
          {props?.route?.params?.referenceNumber}
        </Text>
      </View>
      <Text style={[styles.subTitle, { marginTop: 12 }]}>
        You may receive call from our customer care team to verify the details.
      </Text>
      <View style={{ display: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' , marginTop:20, }}>
        <Text style={{fontSize:20, textDecorationLine: 'underline',}}>LENDER</Text>
        <Text style={{fontSize:22, color:'blue', fontWeight:'600'}}><Text style={{color:'red'}}>CHINTAMANI</Text> FINLEASE LTD</Text>
        <Text style={{fontSize:17, color:'#000', fontWeight:'600'}}>(RBI Approved NBFC)</Text>
      </View>
      <LinearButton
        onPress={() => props.navigation.navigate("Home")}
        title={'Done'}
        width={170}
        marginTop={50}
      />
    </View>
  );
};
export default ThankyouScreen;
