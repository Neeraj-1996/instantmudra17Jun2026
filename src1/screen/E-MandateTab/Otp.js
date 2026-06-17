import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';



const Otp = props => {
    const [showLoader, setShowLoader] = useState(false)

    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);
    const pin5Ref = useRef(null);

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');
    const [pin5, setPin5] = useState('');


    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />

            <View style={styles.container}>
            <Header navigation={props.navigation} title={'Otp Verifications'} />




                <ScrollView>

                    <Image
                        source={require('../../assests/sm.png')}
                        style={{ alignSelf: 'center', width: 120, height: 120, marginTop: 25 }}
                    />
                    <View style={styles.verification}>
                        <Text style={styles.verificationtext}>Enter Verification code</Text>
                    </View>
                    {/* Loader added */}
                    {
                        showLoader && (
                            <View
                                style={{
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        height: 100,
                                        width: 100,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <ActivityIndicator color={'#fff'} size={'large'} style={styles.indicator} />

                                </View>
                            </View>
                        )
                    }
                    {/* end loader */}

                    <View style={{ alignSelf: 'center', }}>
                        <Text style={styles.des}>
                            Please enter verification code send to your mobile number
                        </Text>
                    </View>

                    <View>
                        <View style={styles.inputroot}>
                            <View style={styles.textinputview}>
                                <TextInput
                                    ref={pin1Ref}
                                    keyboardType={'number-pad'}
                                    maxLength={1}
                                    onChangeText={text => setPin1(text)}
                                    onChange={pin1 => {
                                        console.log('text', typeof pin1);
                                        if (pin1 !== '') {
                                            pin2Ref.current.focus();
                                        }
                                    }}
                                    style={styles.textinputtext}
                                />
                            </View>
                            <View style={styles.textinputview}>
                                <TextInput
                                    ref={pin2Ref}
                                    keyboardType={'number-pad'}
                                    onChangeText={text => setPin2(text)}
                                    maxLength={1}
                                    onChange={pin2 => {
                                        if (pin2 !== '') {
                                            pin3Ref.current.focus();
                                        }
                                    }}
                                    style={styles.textinputtext}
                                />
                            </View>
                            <View style={styles.textinputview}>
                                <TextInput
                                    ref={pin3Ref}
                                    keyboardType={'number-pad'}
                                    onChangeText={text => setPin3(text)}
                                    maxLength={1}
                                    onChange={pin3 => {
                                        if (pin3 !== '') {
                                            pin4Ref.current.focus();
                                        }
                                    }}
                                    style={styles.textinputtext}
                                />
                            </View>
                            <View style={styles.textinputview}>
                                <TextInput
                                    ref={pin4Ref}
                                    keyboardType={'number-pad'}
                                    onChangeText={text => setPin4(text)}
                                    maxLength={1}
                                    onChange={pin4 => {
                                        if (pin4 !== '') {
                                            pin5Ref.current.focus();
                                        }
                                    }}
                                    style={styles.textinputtext} style={styles.textinputtext}
                                />
                            </View>
                            <View style={styles.textinputview}>
                                <TextInput
                                    ref={pin5Ref}
                                    keyboardType={'number-pad'}
                                    onChangeText={text => setPin5(text)}
                                    maxLength={1}
                                    onChange={pin5 => { }}
                                    style={styles.textinputtext}
                                />
                            </View>
                        </View>
                        <View style={styles.dontrectext}>
                            <Text style={{ fontSize: 16, color: '#000', opacity: 0.5 }}>
                                Didn't receve OTP ?
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.resendotptext}>Resend OTP</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => props.navigation.navigate('Form1')}
                        >
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#B53059', '#B53059']}
                                style={styles.btnbac}>
                                <Text style={styles.sendotp}>Submit</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default Otp;

const styles = StyleSheet.create({
    verification: {
        alignSelf: 'center',
        // marginTop: 0,
    },
    verificationtext: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 30,
        marginTop: 40
    },

    submittext: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 20,
    },
    textinputview: {
        borderBottomEndWidth: 1,
        width: 50,
        height: 50,
        alignItems: 'center',
        borderColor: '#470083',
        marginHorizontal: 8,
        borderRadius: 10,
        backgroundColor: '#Ffff',
        justifyContent: "center",
        borderWidth: 0.5,
        elevation: 5
    },
    textinputtext: {
        fontSize: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    des: {
        color: '#000',
        fontSize: 16,
        textAlign: 'center',
        padding: 30,
    },

    btntext: {
        color: '#fff',
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: 20,
    },
    inputroot: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dontrectext: {
        alignSelf: 'center',
        marginTop: 30,
    },
    resendotptext: {
        alignSelf: 'center',
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
        textDecorationLine: 'underline',
        // marginTop: 10,
    },


    indicator: {
        width: 100,
        height: 100,
        borderRadius: 15,

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

    },
    btnbac: {
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
        color: "#fff"
    },

});

