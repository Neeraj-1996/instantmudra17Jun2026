
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    BackHandler,
    ActivityIndicator

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../utils';




const Otp = (props) => {


    // console.log("props my mobile",props);
    const [impl, setImpl] = useState('');
    const [store, setStore] = useState('');
    const [showLoader, setShowLoader] = useState(false)

    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }

useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => subscription.remove();
}, []);


  useEffect(() => {
        getCurrentStateOfUser();
    }, []);

    const [currentLoanOrderId, setCurrentLoanOrderId] = useState('');
    const getCurrentStateOfUser = async () => {
        try {
          const user_data = await AsyncStorage.getItem('USER_DATA');
          console.log("user_data fdffdafsaneerraj",user_data) 
          const userdata = JSON.parse(user_data);
          const body = {
            user_id: userdata?.user_id,
          };
    
          const res = await axios.post(API_BASE_URL + 'getCurrentStateOfUser', body);
          if (res?.status === 200 && res?.data?.status === true) {
            // setCurrentStateCode(res?.data?.code);
            // setCurrentLoanStatus(res?.data?.laon_status);
            setCurrentLoanOrderId(res?.data?.order_id);
            setImpl(res?.data?.order_id);
          }
        } catch (error) {
          console.log('Error fetching currentStateCode:', error);
          alert('We are facing some technical issue. Team is looking into it.');
        } finally {
          // After currentStateCode is fetched, set isLoading to false
          setIsLoading(false);
        }
      };
    

    return (
        <>
            {/* header added */}

            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <Header navigation={props.navigation} title={'Enter IM-PL-Number'} />
                {
                    showLoader && (
                        <View
                            style={{
                                position: 'absolute',
                                justifyContent: 'center',
                                alignSelf: 'center'}}>
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    // backgroundColor: "#d9d9d9",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 330,
                                    alignSelf: 'center'

                                }}>
                                <ActivityIndicator color={'red'} size={'large'} />
                            </View>
                        </View>
                    )
                }

                {/* header added */}

                <ScrollView>

                    <View style={{ height: '100%', marginTop: 30 }}>
                        <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />
                        <Image
                            source={require('../../assests/sm.png')}
                            style={styles.img}
                        />
                        <Text style={{ fontSize: 18, color: "#000", marginBottom: -30, marginTop: 20, marginLeft: 60, fontWeight: '500' }}>Enter Reference ID</Text>
                        <View style={styles.input}>

                            <TextInput
                                style={{ color: '#000', width:242 }}
                                onChangeText={setImpl}
                                value={impl}
                                placeholder="IM-PL-000000"
                                defaultValue={impl}
                                autoCapitalize='characters'
                                maxLength={12}
                                placeholderTextColor={'#6A7F94'}
                                editable={false}
                            />
                        </View>

                        {/* <TouchableOpacity
                            onPress={() => saveDetails() & props.navigation.navigate('Form1', {


                            })}
                        > */}
                        <TouchableOpacity onPress={() => props.navigation.navigate('Form1', {

                            get: impl

                        })}>
                            <View style={styles.btnback}>
                                <Text style={styles.sendotp}>Continue</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default Otp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    input: {
        height: 55,
        margin: 20,
        fontSize: 20,
        color: '#fff',
        borderRadius: 8,
        width: '70%',
        alignSelf: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',

        fontWeight: "bold",
        elevation: 5,
        marginTop: 40,
        padding: 5

    },

    btnback: {
        width: 180,
        height: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        elevation: 5,
        margin: 10
    },
    sendotp: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: "#000"
    },

    img: {
        width: 140,
        height: 140,
        alignSelf: 'center',
        marginTop: 20

    },

    phnimg: {
        alignSelf: 'center',
        marginLeft: 10,
        padding: 12,
        width: 15,
        height: 15
    },

    header: {
        width: '100%',
        height: '8%',
        backgroundColor: "#000",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: "500",
        color: "#fff",
        alignSelf: "center",
        marginTop: -25
    },

    icon: {
        marginLeft: 10

    }


});

