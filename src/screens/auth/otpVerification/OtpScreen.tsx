import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    BackHandler,
    Platform,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import moment from 'moment';
import styles from './Otp.styles';
import GradientButton from '../../../components/button/Button';
import { BackIcon, OtpIcon } from '../../../assets/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { verifyOtp, sendOtp, saveFcmToken } from '../../../redux/slices/userSlice';
import { handleUserNavigation } from '../../../utils/navigationHelper';
import { moderateScale } from '../../../styles/responsive';
import { StackActions } from '@react-navigation/native';
// import {
//     getHash,
//     startOtpListener,
//     removeListener,
// } from 'react-native-otp-verify';

import DeviceInfo from "react-native-device-info";

// import {
//     getApp,
//     getApps,
//     initializeApp,
// } from "@react-native-firebase/app";

import {
    getMessaging,
    getToken,
    requestPermission,
    AuthorizationStatus,
} from "@react-native-firebase/messaging";
import { getApp } from '@react-native-firebase/app';
import ScreenWrapper from '../../../components/screenWrapper/ScreenWrapper';

// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID",
// };


const OtpScreen: React.FC = ({ navigation, route }: any) => {
    const { phone, full_name, email, gender } = route.params;

    const otpRef = useRef<OTPTextInput>(null);
    const [otp, setOtp] = useState<string>('');
    const [timer, setTimer] = useState<number>(60);
    const [canResend, setCanResend] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.user);


    const saveDeviceFcmToken = async () => {

        try {
            const app = getApp();
            // const app =
            //     getApps().length === 0
            //         ? await initializeApp(firebaseConfig)
            //         : getApp();

            const messaging = getMessaging(app);

            const authStatus =
                await requestPermission(messaging);

            const enabled =
                authStatus === AuthorizationStatus.AUTHORIZED ||
                authStatus === AuthorizationStatus.PROVISIONAL;

            if (!enabled) {
                console.log(" Notification Permission Denied");
                return;
            }

            // Get FCM Token
            const fcmToken = await getToken(messaging);

            // Device Id
            const deviceId = await DeviceInfo.getUniqueId();

            //  Save API
            await dispatch(
                saveFcmToken({
                    deviceId,
                    fcmToken,
                    platform: Platform.OS,
                })
            ).unwrap();

            console.log(" FCM TOKEN SAVED");

        } catch (error) {

            console.log(" SAVE FCM ERROR:", error);

        }
    };

    // useEffect(() => {
    //     console.log(" OTP LISTENER INIT");

    //     //  Get app hash (VERY IMPORTANT)
    //     getHash()
    //         .then(hash => {
    //             console.log(" APP HASH:", hash);
    //         })
    //         .catch(error => {
    //             console.log(" HASH ERROR:", error);
    //         });

    //     // 📲 Start listening SMS
    //     startOtpListener(message => {
    //         // console.log(" FULL SMS:", message);

    //         try {
    //             //  extract 4–6 digit OTP
    //             const otpMatch = message.match(/\d{4,6}/);

    //             if (otpMatch) {
    //                 const otpCode = otpMatch[0];

    //                 setOtp(otpCode);

    //                 // fill UI
    //                 otpRef.current?.setValue(otpCode);

    //                 //AUTO VERIFY
    //                 handleVerifyAuto(otpCode);
    //             } else {
    //                 console.log(" OTP NOT FOUND");
    //             }

    //         } catch (err) {
    //             console.log(" PARSE ERROR:", err);
    //         }
    //     });

    //     return () => {
    //         console.log("🧹 OTP LISTENER REMOVED");
    //         removeListener();
    //     };
    // }, []);
    const handleVerifyAuto = async (autoOtp: string) => {

        dispatch(
            verifyOtp({
                phone,
                otp: autoOtp
            })
        )
            .unwrap()
            .then(async (res) => {

                const fcmSaved = await saveDeviceFcmToken();

                console.log("FCM SAVED STATUS:", fcmSaved);

                handleUserNavigation(
                    navigation,
                    res.user_status,
                    {
                        email,
                    }
                );
            })
            .catch(() => {
                console.log("AUTO VERIFY FAILED");
                Alert.alert("Invalid OTP");
            });
    };

    // Countdown using moment
    useEffect(() => {
        if (timer <= 0) {
            setCanResend(true);
            return;
        }

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    //  Verify OTP
    const handleVerify = () => {
        if (otp.length < 5) {
            Alert.alert("Enter valid OTP");
            return;
        }
        // console.log("VERIFYING OTP:", otp);
        // console.log("PHONE:", phone);

        dispatch(
            verifyOtp({
                phone,
                otp
            })
        )
            .unwrap()
            .then(async (res) => {
                console.log("OTP VERIFIED, res:", res);
                try {
                    await saveDeviceFcmToken();
                } catch (fcmErr) {
                    console.log("FCM SAVE FAILED (non-blocking):", fcmErr);
                    // don't let this block navigation
                }

                // console.log("NAVIGATING with status:", res.user_status);
                // console.log("NAVIGATING with email:", email);
                handleUserNavigation(
                    navigation,
                    res.user_status,
                    {
                        email,
                    }
                );
                // handleUserNavigation(navigation, res.user_status);

                // console.log("FCM SAVED STATUS:", fcmSaved);
                // console.log("FCM res:", res);

                // handleUserNavigation(
                //     navigation,
                //     res.user_status
                // );
            })
            .catch(() => {
                Alert.alert("Invalid OTP");
            });
    };

    // Resend OTP
    const handleResendOtp = () => {
        if (!canResend) return;

        dispatch(
            sendOtp({
                phone,
                // full_name,
                email,
                gender
            })
        )
            .unwrap()
            .then(() => {
                Alert.alert("OTP Resent Successfully");

                setTimer(60);
                setCanResend(false);
                otpRef.current?.clear();
                setOtp('');
            })
            .catch(() => {
                Alert.alert("Failed to resend OTP");
            });
    };

    //  Format using moment
    const formattedTime = moment.utc(timer * 1000).format("mm:ss");


    const handleBack = () => {
        // console.log("fdsfsd")
        if (navigation.canGoBack()) {
            navigation.dispatch(StackActions.pop(1));
        } else {
            BackHandler.exitApp();
        }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScreenWrapper scroll useBackground={false}>
                <View
                    style={styles.container}
                >

                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={handleBack}
                    >
                        <Image source={BackIcon} style={styles.backIcon} />
                    </TouchableOpacity>

                    {/* Illustration */}
                    <Image source={OtpIcon} style={styles.otpImage} />

                    {/* Title */}
                    <Text style={styles.title}>Verify Phone / Email</Text>

                    {/* Subtitle */}
                    <Text style={styles.subtitle}>
                        A Five digit code has been sent to the{'\n'}
                        <Text style={styles.bold}>+91 {phone}</Text>
                    </Text>

                    {!!email && (
                        <Text style={styles.subtitle}>
                            and to{' '}
                            <Text style={styles.bold}>{email}</Text>
                        </Text>
                    )}

                    <Text style={styles.helper}>
                        Kindly enter the code to continue.
                    </Text>

                    {/* OTP Input */}
                    <OTPTextInput
                        ref={otpRef}
                        handleTextChange={(text) => setOtp(text)}
                        inputCount={5}
                        keyboardType="numeric"
                        tintColor="#6a1b9a"
                        offTintColor="#ccc"
                        textInputStyle={styles.otpBox}
                    />

                    {/* Didn't receive OTP on phone? */}
                    {!!email && (
                        <Text style={styles.helper}>
                            Didn't receive the code on your phone? Please check your
                            email ({email}) as well.
                        </Text>
                    )}

                    {/* Resend OTP */}
                    <View style={styles.resendRow}>
                        <TouchableOpacity
                            disabled={!canResend}
                            onPress={handleResendOtp}
                        >
                            <Text
                                style={[
                                    styles.resendText,
                                    { opacity: canResend ? 1 : 0.5 }
                                ]}
                            >
                                Resend OTP
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.timerText}>
                            {formattedTime}
                        </Text>
                    </View>

                    {/* Verify Button */}
                    <GradientButton
                        title={loading ? "Verifying..." : "Next"}
                        onPress={handleVerify}
                        disabled={loading}
                        style={{
                            marginTop: 40,
                            width: moderateScale(300),
                        }}
                    />

                    {loading && (
                        <ActivityIndicator style={{ marginTop: 10 }} />
                    )}

                </View>
            </ScreenWrapper>
        </SafeAreaView>
    );
};

export default OtpScreen;

// import React, { useRef, useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     ActivityIndicator,
//     Alert,
//     BackHandler,
//     Platform
// } from 'react-native';
// import OTPTextInput from 'react-native-otp-textinput';
// import moment from 'moment';
// import styles from './Otp.styles';
// import GradientButton from '../../../components/button/Button';
// import { BackIcon, OtpIcon } from '../../../assets/images';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { verifyOtp, sendOtp, saveFcmToken } from '../../../redux/slices/userSlice';
// import { handleUserNavigation } from '../../../utils/navigationHelper';
// import { moderateScale } from '../../../styles/responsive';
// import { StackActions } from '@react-navigation/native';
// // import {
// //     getHash,
// //     startOtpListener,
// //     removeListener,
// // } from 'react-native-otp-verify';

// import DeviceInfo from "react-native-device-info";

// // import {
// //     getApp,
// //     getApps,
// //     initializeApp,
// // } from "@react-native-firebase/app";

// import {
//     getMessaging,
//     getToken,
//     requestPermission,
//     AuthorizationStatus,
// } from "@react-native-firebase/messaging";
// import { getApp } from '@react-native-firebase/app';

// // const firebaseConfig = {
// //     apiKey: "YOUR_API_KEY",
// //     authDomain: "YOUR_AUTH_DOMAIN",
// //     projectId: "YOUR_PROJECT_ID",
// //     storageBucket: "YOUR_STORAGE_BUCKET",
// //     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
// //     appId: "YOUR_APP_ID",
// // };


// const OtpScreen: React.FC = ({ navigation, route }: any) => {
//     const { phone, full_name, gender } = route.params;

//     const otpRef = useRef<OTPTextInput>(null);
//     const [otp, setOtp] = useState<string>('');
//     const [timer, setTimer] = useState<number>(60);
//     const [canResend, setCanResend] = useState<boolean>(false);

//     const dispatch = useAppDispatch();
//     const { loading } = useAppSelector(state => state.user);


//     const saveDeviceFcmToken = async () => {

//         try {
//             const app = getApp();
//             // const app =
//             //     getApps().length === 0
//             //         ? await initializeApp(firebaseConfig)
//             //         : getApp();

//             const messaging = getMessaging(app);

//             const authStatus =
//                 await requestPermission(messaging);

//             const enabled =
//                 authStatus === AuthorizationStatus.AUTHORIZED ||
//                 authStatus === AuthorizationStatus.PROVISIONAL;

//             if (!enabled) {
//                 console.log(" Notification Permission Denied");
//                 return;
//             }

//             // Get FCM Token
//             const fcmToken = await getToken(messaging);

//             // Device Id
//             const deviceId = await DeviceInfo.getUniqueId();

//             //  Save API
//             await dispatch(
//                 saveFcmToken({
//                     deviceId,
//                     fcmToken,
//                     platform: Platform.OS,
//                 })
//             ).unwrap();

//             console.log(" FCM TOKEN SAVED");

//         } catch (error) {

//             console.log(" SAVE FCM ERROR:", error);

//         }
//     };

//     // useEffect(() => {
//     //     console.log(" OTP LISTENER INIT");

//     //     //  Get app hash (VERY IMPORTANT)
//     //     getHash()
//     //         .then(hash => {
//     //             console.log(" APP HASH:", hash);
//     //         })
//     //         .catch(error => {
//     //             console.log(" HASH ERROR:", error);
//     //         });

//     //     // 📲 Start listening SMS
//     //     startOtpListener(message => {
//     //         // console.log(" FULL SMS:", message);

//     //         try {
//     //             //  extract 4–6 digit OTP
//     //             const otpMatch = message.match(/\d{4,6}/);

//     //             if (otpMatch) {
//     //                 const otpCode = otpMatch[0];

//     //                 setOtp(otpCode);

//     //                 // fill UI
//     //                 otpRef.current?.setValue(otpCode);

//     //                 //AUTO VERIFY
//     //                 handleVerifyAuto(otpCode);
//     //             } else {
//     //                 console.log(" OTP NOT FOUND");
//     //             }

//     //         } catch (err) {
//     //             console.log(" PARSE ERROR:", err);
//     //         }
//     //     });

//     //     return () => {
//     //         console.log("🧹 OTP LISTENER REMOVED");
//     //         removeListener();
//     //     };
//     // }, []);
//     const handleVerifyAuto = async (autoOtp: string) => {

//         dispatch(
//             verifyOtp({
//                 phone,
//                 otp: autoOtp
//             })
//         )
//             .unwrap()
//             .then(async (res) => {

//                 const fcmSaved = await saveDeviceFcmToken();

//                 console.log("FCM SAVED STATUS:", fcmSaved);

//                 handleUserNavigation(
//                     navigation,
//                     res.user_status
//                 );
//             })
//             .catch(() => {
//                 console.log("AUTO VERIFY FAILED");
//                 Alert.alert("Invalid OTP");
//             });
//     };

//     // Countdown using moment
//     useEffect(() => {
//         if (timer <= 0) {
//             setCanResend(true);
//             return;
//         }

//         const interval = setInterval(() => {
//             setTimer(prev => prev - 1);
//         }, 1000);

//         return () => clearInterval(interval);
//     }, [timer]);

//     //  Verify OTP
//     const handleVerify = () => {
//         if (otp.length < 5) {
//             Alert.alert("Enter valid OTP");
//             return;
//         }
//         console.log("VERIFYING OTP:", otp);
//         console.log("PHONE:", phone);

//         dispatch(
//             verifyOtp({
//                 phone,
//                 otp
//             })
//         )
//             .unwrap()
//             .then(async (res) => {
//                 console.log("OTP VERIFIED, res:", res);
//                 try {
//                     await saveDeviceFcmToken();
//                 } catch (fcmErr) {
//                     console.log("FCM SAVE FAILED (non-blocking):", fcmErr);
//                     // don't let this block navigation
//                 }

//                 console.log("NAVIGATING with status:", res.user_status);
//                 handleUserNavigation(navigation, res.user_status);

//                 // console.log("FCM SAVED STATUS:", fcmSaved);
//                 // console.log("FCM res:", res);

//                 // handleUserNavigation(
//                 //     navigation,
//                 //     res.user_status
//                 // );
//             })
//             .catch(() => {
//                 Alert.alert("Invalid OTP");
//             });
//     };

//     // Resend OTP
//     const handleResendOtp = () => {
//         if (!canResend) return;

//         dispatch(
//             sendOtp({
//                 phone,
//                 full_name,
//                 gender
//             })
//         )
//             .unwrap()
//             .then(() => {
//                 Alert.alert("OTP Resent Successfully");

//                 setTimer(60);
//                 setCanResend(false);
//                 otpRef.current?.clear();
//                 setOtp('');
//             })
//             .catch(() => {
//                 Alert.alert("Failed to resend OTP");
//             });
//     };

//     //  Format using moment
//     const formattedTime = moment.utc(timer * 1000).format("mm:ss");


//     const handleBack = () => {
//         // console.log("fdsfsd")
//         if (navigation.canGoBack()) {
//             navigation.dispatch(StackActions.pop(1));
//         } else {
//             BackHandler.exitApp();
//         }
//     };
//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <View style={styles.container}>

//                 {/* Back Button */}
//                 <TouchableOpacity
//                     style={styles.backBtn}
//                     onPress={handleBack}
//                 >
//                     <Image source={BackIcon} style={styles.backIcon} />
//                 </TouchableOpacity>

//                 {/* Illustration */}
//                 <Image source={OtpIcon} style={styles.otpImage} />

//                 {/* Title */}
//                 <Text style={styles.title}>Verify Phone Number</Text>

//                 {/* Subtitle */}
//                 <Text style={styles.subtitle}>
//                     A Four digit code has been sent to the{'\n'}
//                     <Text style={styles.bold}>+91 {phone}</Text>
//                 </Text>

//                 <Text style={styles.helper}>
//                     Kindly enter the code to continue.
//                 </Text>

//                 {/* OTP Input */}
//                 <OTPTextInput
//                     ref={otpRef}
//                     handleTextChange={(text) => setOtp(text)}
//                     inputCount={5}
//                     keyboardType="numeric"
//                     tintColor="#6a1b9a"
//                     offTintColor="#ccc"
//                     textInputStyle={styles.otpBox}
//                 />

//                 {/* Resend OTP */}
//                 <View style={styles.resendRow}>
//                     <TouchableOpacity
//                         disabled={!canResend}
//                         onPress={handleResendOtp}
//                     >
//                         <Text
//                             style={[
//                                 styles.resendText,
//                                 { opacity: canResend ? 1 : 0.5 }
//                             ]}
//                         >
//                             Resend OTP
//                         </Text>
//                     </TouchableOpacity>

//                     <Text style={styles.timerText}>
//                         {formattedTime}
//                     </Text>
//                 </View>

//                 {/* Verify Button */}
//                 <GradientButton
//                     title={loading ? "Verifying..." : "Next"}
//                     onPress={handleVerify}
//                     disabled={loading}
//                     style={{
//                         marginTop: 40,
//                         width: moderateScale(300),
//                     }}
//                 />

//                 {loading && (
//                     <ActivityIndicator style={{ marginTop: 10 }} />
//                 )}

//             </View>
//         </SafeAreaView>
//     );
// };

// export default OtpScreen;
