import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import Header from '../../components/Header/Header';
import { WebView } from 'react-native-webview';
import LinearButton from '../../components/LinearButton/LinearButton';
import { API_BASE_URL } from '../../utils';

const EMandatePaymentPage = props => {
  const userId = props.route.params?.userId;
  const refId = props.route.params?.refId;
  const webViewURL = API_BASE_URL + "mandateRegisterWeb/" + userId + "/" + refId
  console.log("🚀 ~ file: EMandatePaymentPage.js ~ line 13 ~ webViewURL", webViewURL)
  const [showLoader, setShowLoader] = useState(true)
  return (
    <View style={styles.container}>
      <Header
        navigation={props.navigation}
        title={'Make your Payment'}
        fontWeight={100}
      />
      <WebView source={{ uri: webViewURL }} onLoadEnd={() => setShowLoader(false)} />


    </View>
  );
};
export default EMandatePaymentPage;
