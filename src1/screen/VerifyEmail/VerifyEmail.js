import React, { Component, useState, useEffect } from "react"
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, TouchableOpacityBase } from "react-native"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
import colors from "../../common";
import OTPTextInput from 'react-native-otp-textinput';
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import axios from "axios";
import { API_BASE_URL } from "../../utils";
const VerifyEmail = (props) => {

    const [otpText, setOTP] = React.useState(null);
    const [emailRefId, setEmailRefId] = React.useState(null);

    const emailId = props.route?.params?.emailId;
    console.log("🚀 ~ file: VerifyEmail.js ~ line 15 ~ VerifyEmail ~ emailId", emailId)

    const xyz = ()=>{
        axios.post(API_BASE_URL+"verify-otp",{
            "reference_id": emailRefId,
            "otp": otpText
        }) 
        .then(res=>{
            console.log("response", res)
            if(res.data.message==="OTP verified successfully !"){
                props.navigation.navigate("Login")
            }else{
                alert ("Something went wrong")
            }
        })
        .catch(err=>{
            alert('We are facing some techical issue. Team is looking into it.')
            console.log("error", err )
        })   

    }
    console.log("prem", props.route?.params?.from)
    useEffect(()=>{
        axios
        .post(API_BASE_URL+"send-email-otp",{
          email: emailId
        })
        .then(res=>{
            setEmailRefId(res?.data?.data?.reference_id)
            console.log("response", res)
            alert("Otp sent succesfully")
        })
        .catch(err=>{
            console.log("error", err)
            alert('We are facing some techical issue. Team is looking into it.')
        })
    },[])





    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
            locations={[0, 0.6, 1]}
            colors={['#7B4397', "#B53059", '#DC2430']} style={{ flex: 1, backgroundColor: "white" }}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
                locations={[0, 0.6, 1]}
                colors={['#7B4397', "#B53059", '#DC2430']} style={{ height: "40%", width: "100%", backgroundColor: "white" }}>
                <SafeAreaView>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Image style={styles.arrowImage} source={require("../../assests/arrowBack.png")} />
                    </TouchableOpacity>
                    <Image style={styles.otpImage} source={require("../../assests/OtpImage.png")} />
                </SafeAreaView>
            </LinearGradient>
            <View style={styles.footer}>
                <Text style={styles.loginText}>Verify Email Address</Text>
                <Text style={styles.loginTextTwo}>Please enter the verification code sent to your email, </Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>

                    <OTPTextInput
                        containerStyle={[
                            styles.textInputContainer,
                        ]}
                        textInputStyle={[
                            styles.squareTextInput,
                        ]}
                        inputCount={5}
                        tintColor="dimgrey"
                        offTintColor="gray"
                        handleTextChange={otpText => setOTP(otpText)}
                        returnKeyType={'done'}
                        autoCompleteType='off'
                        autoCorrect={false}
                        selectionColor={'red'}
                    />
                </View>
                <TouchableOpacity onPress= {()=>xyz()} 
                disabled={otpText?.length !== 5}>

                    {otpText?.length === 5 ?
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
                            locations={[0, 0.6, 1]}
                            colors={['#7B4397', "#B53059", '#DC2430']}
                            style={{
                                height: 40,
                                width: "46%",
                                borderRadius: 16,
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 80
                            }}>

                            <Text style={[styles.buttonText, { color: "white" }]}>Confirm OTP</Text>

                        </LinearGradient>
                        :
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Confirm OTP</Text>
                        </View>
                    }

                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: "center", position: "absolute", bottom: 44 }}>
                    <Text style={{ fontSize: 14, fontWeight: "400", color: colors.red }}>RESEND OTP</Text>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    )
}
export default VerifyEmail