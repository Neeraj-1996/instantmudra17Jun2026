import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/Header';
import { WebView } from 'react-native-webview';
import LinearButton from '../../components/LinearButton/LinearButton';
import { API_BASE_URL, BASE_URL } from '../../utils';

const Emandateweb = props => {
  const user_id = props.route.params?.user_id;
  const order_id = props.route.params?.order_id;

  const webViewURL = API_BASE_URL + "mandateRegisterWeb/" + user_id + "/" + order_id;
  console.log("Emandateweb.js", webViewURL)

  return (
    <View style={{
      flex: 1,
      backgroundColor: "white"
    }}>
      <Header
        navigation={props.navigation}
        title={'E-Mandate'}
        fontWeight={100}
      />
      <WebView source={{ uri: webViewURL }} style={{ flex: 1 }} />

    </View>
  );
};
export default Emandateweb;
