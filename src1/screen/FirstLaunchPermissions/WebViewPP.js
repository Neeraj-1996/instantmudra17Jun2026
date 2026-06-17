import React, { useState } from 'react';
import { SafeAreaView, StatusBar, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header/Header';



const WebViewPP = (props) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    const handleLoadStart = () => {
        setLoading(true);
    };

    const handleLoadEnd = () => {
        setLoading(false);
    };
    return (
        <>
            <StatusBar barStyle="dark-content" />
            {/* <Header navigation={props.navigation} title={'Contact Us'} /> */}


            <SafeAreaView style={{ flex: 1 }}>
                {loading && <ActivityIndicator  size="large" color="#0000ff" />}
                <WebView source={{ uri: 'https://www.instantmudra.com/privacy_policy.html' }}
                    onLoadStart={handleLoadStart}
                    onLoad={handleLoadEnd} />
            </SafeAreaView>
            <View>

                <TouchableOpacity activeOpacity={1} onPress={() => navigation.replace('PhoneNumberVerify')}>

                    <View style={{ width: 160, height: 50, elevation: 4, backgroundColor: '#fff', justifyContent: "center", borderRadius: 5, alignSelf: "center", margin: 20 }}>
                        <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: 'bold', color: 'green' }}>
                            Accept & Agree
                        </Text>
                    </View>
                </TouchableOpacity>


            </View>
        </>
    );
};

export default WebViewPP;
