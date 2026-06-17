import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Header from '../../components/Header/Header';
import { WebView } from 'react-native-webview';
import LinearButton from '../../components/LinearButton/LinearButton';
import { API_BASE_URL, BASE_URL } from '../../utils';

//https://instantmudra.com/admin/icici-upi-form/user_id/227060/loan_id/124374/amount/5000


const IciciPaymentPage = props => {
  const user_id = props.route.params?.user_id;
  const order_id = props.route.params?.order_id;
  const emiAmount = props.route.params?.emiAmount
  const webViewURL = BASE_URL + "icici-upi-form/user_id/" + user_id + "/loan_id/" + order_id + "/amount/" + emiAmount;
  console.log("helloL", webViewURL)

  return (
    <View style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <Header
        navigation={props.navigation}
        title={'ICICI Payment'}
        fontWeight={100}
      />
      <WebView source={{ uri: webViewURL }} />
    </View>
  );
};
export default IciciPaymentPage;
