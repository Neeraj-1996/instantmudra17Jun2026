import React from 'react';
import {SafeAreaView, StatusBar, View, Image, Text, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';



const Contact = (props) => {
    const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header navigation={props.navigation} title={'Contact Us'} />

    
      <SafeAreaView style={{flex: 1}}>
        <WebView source={{uri: 'https://www.instantmudra.com/contact.php'}} style={{marginTop:-160}} />
      </SafeAreaView>
    </>
  );
};

export default Contact;