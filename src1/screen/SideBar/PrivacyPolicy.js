import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';



const PrivacyPolicy = (props) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header navigation={props.navigation} title={'Privacy Policy'} />

      <SafeAreaView style={{ flex: 1,}}>
        {/* <WebView source={{uri: 'https://www.instantmudra.com/privacy_policy.php'}} style={{marginTop:-135}} /> */}
        <WebView source={{ uri: 'https://www.instantmudra.com/privacy_policy.html' }} style={{ marginTop: -115}} />
      </SafeAreaView>
    </>
  );
};

export default PrivacyPolicy;