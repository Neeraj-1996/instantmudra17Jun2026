import React from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';



const Term = (props) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Header navigation={props.navigation} title={'Terms & Conditions'} />

      <SafeAreaView style={{ flex: 1 }}>
        <WebView source={{ uri: 'https://www.instantmudra.com/terms_and_conditions.php' }} style={{ marginTop: -135 }} />
      </SafeAreaView>
    </>
  );
};

export default Term;