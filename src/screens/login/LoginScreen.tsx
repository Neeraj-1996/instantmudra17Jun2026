import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sendOtp, verifyOtp } from "../../redux/slices/userSlice";
import styles from "./Login.style";

const LoginScreen = ({ navigation }: any) => {

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.user);

    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    // const handleSendOtp = async () => {
    //     const result = await dispatch(sendOtp({ mobile }));

    //     if (result.meta.requestStatus === "fulfilled") {
    //         setOtpSent(true);
    //     }
    // };


    const handleMobileSubmit = () => {
        if (mobile.length === 10) {
            setShowOtp(true);
        } else {
            Alert.alert("Invalid Number", "Enter valid 10 digit mobile number");
        }
    };


    // const handleVerifyOtp = async () => {
    //     const result = await dispatch(verifyOtp({ mobile, otp }));

    //     if (result.meta.requestStatus === "fulfilled") {
    //         navigation.replace("Home");
    //     }
    // };
    const handleVerifyOtp = () => {

        if (otp === "123456") {
            navigation.replace("Home");
        } else {
            Alert.alert("Invalid OTP", "Please enter correct OTP");
        }

    };
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Login with OTP</Text>

            {/* <TextInput
                placeholder="Enter Mobile Number"
                keyboardType="number-pad"
                value={mobile}
                maxLength={10}
                onChangeText={setMobile}
                style={styles.input}
            /> */}

            {!showOtp && (
                <>
                    <TextInput
                        placeholder="Enter Mobile Number"
                        keyboardType="number-pad"
                        maxLength={10}
                        value={mobile}
                        onChangeText={setMobile}
                        style={styles.input}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleMobileSubmit}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </>
            )}
            {showOtp && (
                <>
                    <Text style={styles.otpLabel}>Enter OTP</Text>

                    <OTPTextInput
                        inputCount={6}
                        tintColor="#5B6EF5"
                        offTintColor="#ddd"
                        handleTextChange={(code) => setOtp(code)}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
                        <Text style={styles.buttonText}>Verify OTP</Text>
                    </TouchableOpacity>

                    <Text style={{ textAlign: "center", marginTop: 15 }}>
                        Demo OTP: 123456
                    </Text>
                </>
            )}


        </View>
    );
};

export default LoginScreen;