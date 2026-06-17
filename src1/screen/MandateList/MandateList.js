import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableOpacityBase,
} from 'react-native';
import colors from '../../common';
import styles from './styles';
import Header from '../../components/Header/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '../../utils';

const MandateList = props => {
  const [mandateArr, setMandateArr] = useState([]); // Initial Value or Default Value

  useFocusEffect(() => {
    getMandateList();
  });

  const getMandateList = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const userData = await AsyncStorage.getItem('USER_DATA');
    const user_data = JSON.parse(userData);
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const body = {
      user_id: user_data?.id,
    };
    console.log('getMandateList body', body);

    axios
      .post(API_BASE_URL + 'get-mandate-list', body, config)
      .then(res => {
        setMandateArr(res.data?.data?.mandate_list); // ? is a safe check, if res.data is undefined, then our app will not crash
        console.log('getMandateList response', res);
      })
      .catch(err => {
        console.log('getMandateList error', err);
        alert('We are facing some techical issue. Team is looking into it.')
      });
  };

  const Mandate = item => {
    // console.log("DeepaDeepa", item?.item?.id)
    return (
      <View>
        <TouchableOpacity
          disabled={item.item.is_mandate_apply === '0'}
          onPress={() =>
            props.navigation.navigate('EMandatePaymentPage', {
              loanId: item.item.id,
            })
          }>
          <View style={[styles.loanCard]}>
            <View
              style={{
                height: '100%',
                width: '50%',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text}>Mandate</Text>
              <Text style={[styles.subText, {}]}>
                Loan Number : {item.item.id ?? 'NA'}
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                width: '50%',
                justifyContent: 'space-between',
              }}>
              <Text style={[styles.text, { textAlign: 'right' }]}>
                Amount : {item.item.apply_amount}
              </Text>
              {item.item.is_mandate_apply === '1' ? (
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.text,
                      {
                        textAlign: 'right',
                        color: 'green',
                      },
                    ]}>
                    Applied
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Mandate', {
                      loanNumber: item.item.loan_number,
                      loanId: item?.item?.id,
                    })
                  }>
                  <Text
                    style={[
                      styles.text,
                      {
                        textAlign: 'right',
                        color: 'red',
                      },
                    ]}>
                    Not Applied
                  </Text>
                </TouchableOpacity>
              )}
              <Text style={[styles.subText, { textAlign: 'right' }]}>
                Date : {item.item.apply_date}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Mandate Details'} navigation={props.navigation} />
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <FlatList
          data={mandateArr}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => Mandate(item, index)}
        />
      </View>
      <View style={{ height: 40, width: '100%' }}></View>
    </View>
  );
};
export default MandateList;
