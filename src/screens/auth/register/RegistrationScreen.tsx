import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import styles from './Login.styles';
import GradientBackground from '../../../components/gradient/GradinetBackgorund';
import { EmtyCheckCox, FillCheckBox, Phone, UserIcon, Experian, Equifax, Cibil, CIBILX, Email } from '../../../assets/images';
import CustomCheckbox from '../../../components/checkbox/CustomCheckbox';
import { Colors } from '../../../styles/colors';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { checkUserApi, sendOtp } from '../../../redux/slices/userSlice';
import Captcha from '../../../components/captcha/Captcha';
import ScreenWrapper from '../../../components/screenWrapper/ScreenWrapper';
import { moderateScale } from '../../../styles/responsive';
import { getApp } from '@react-native-firebase/app';

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// simple RFC-5322-ish check, good enough for client-side validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegistrationScreen: React.FC = ({ navigation }: any) => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<string>('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
    const [checkingUser, setCheckingUser] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaCode, setCaptchaCode] = useState('');
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);

    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.user);
    const handleSendOtp = () => {
        const app = getApp();
        console.log("🔥 Firebase Ready:", app.name);

        // Only mobile validation
        if (mobileNumber.length !== 10) {
            Alert.alert("Error", "Enter valid mobile number");
            return;
        }

        if (!captchaInput.trim()) {
            Alert.alert("Error", "Please enter captcha");
            return;
        }

        if (!isCaptchaValid) {
            Alert.alert("Error", "Captcha does not match");
            return;
        }

        if (!email.trim()) {
            Alert.alert("Error", "Please enter your email address");
            return;
        }
        if (!EMAIL_REGEX.test(email.trim())) {
            Alert.alert("Error", "Enter a valid email address");
            return;
        }
        if (isNewUser && !fullName.trim()) {
            Alert.alert("Error", "Please enter your full name");
            return;
        }

        // TERMS VALIDATION FOR NEW USER
        if (isNewUser && !acceptedTerms) {
            Alert.alert(
                "Permission Required",
                "Please accept Terms & Conditions"
            );
            return;
        }

        // API CALL
        dispatch(
            sendOtp({
                phone: mobileNumber,
                email: email.trim(),
                full_name: isNewUser ? fullName.trim() : undefined,
                gender: isNewUser
                    ? (gender === "male" ? "Male" : "Female")
                    : undefined,
            })
        )
            .unwrap()
            .then(() => {
                navigation.replace("OtpScreen", { phone: mobileNumber, full_name: fullName, email, gender });
            })
            .catch(() => {
                Alert.alert("Error", "Something went wrong");
            });
    };
    // const handleSendOtp = () => {
    //     const app = getApp();
    //     console.log("🔥 Firebase Ready:", app.name);

    //     // Only mobile validation
    //     if (mobileNumber.length !== 10) {
    //         Alert.alert("Error", "Enter valid mobile number");
    //         return;
    //     }

    //     if (!captchaInput.trim()) {
    //         Alert.alert("Error", "Please enter captcha");
    //         return;
    //     }

    //     if (!isCaptchaValid) {
    //         Alert.alert("Error", "Captcha does not match");
    //         return;
    //     }

    //     // EMAIL VALIDATION FOR NEW USER (only if they typed something, unless you want to force it)
    //     if (isNewUser && email.trim() && !EMAIL_REGEX.test(email.trim())) {
    //         Alert.alert("Error", "Enter a valid email address");
    //         return;
    //     }

    //     // TERMS VALIDATION FOR NEW USER
    //     if (isNewUser && !acceptedTerms) {
    //         Alert.alert(
    //             "Permission Required",
    //             "Please accept Terms & Conditions"
    //         );
    //         return;
    //     }

    //     // API CALL (everything optional)
    //     dispatch(
    //         sendOtp({
    //             phone: mobileNumber,
    //             full_name: email || "",   // sending email through the full_name field
    //             gender: gender ? (gender === "male" ? "Male" : "Female") : ""
    //         })
    //         // sendOtp({
    //         //     phone: mobileNumber,
    //         //     full_name: email || "",
    //         //     // email: email || "",
    //         //     gender: gender ? (gender === "male" ? "Male" : "Female") : ""
    //         // })
    //     )
    //         .unwrap()
    //         .then(() => {
    //             navigation.replace("OtpScreen", { phone: mobileNumber, full_name: fullName, email, gender });
    //         })
    //         .catch(() => {
    //             Alert.alert("Error", "Something went wrong");
    //         });
    // };

    const checkUserExist = async (phone: string) => {
        try {
            setCheckingUser(true);
            const res = await dispatch(
                checkUserApi({ phone })
            ).unwrap();
            // console.log("CHECK USER:", res);
            if (res?.exists) {
                setIsNewUser(false);
            } else {
                setIsNewUser(true);
            }
        } catch (err) {
            console.log("CHECK ERROR:", err);
        } finally {
            setCheckingUser(false);
        }
    };

    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMobileChange = (text: string) => {
        const formatted = text.replace(/[^0-9]/g, '');
        setMobileNumber(formatted);
        setIsNewUser(false);

        if (formatted.length === 10) {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
                checkUserExist(formatted);
            }, 500);
        }
    };

    return (
        <GradientBackground>
            <ScreenWrapper scroll useBackground={false}>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.title}>Registration / Login</Text>
                        <Text style={styles.subtitle}>
                            we sent a verification code to your mobile number.
                        </Text>

                        {/* Mobile */}
                        <View style={styles.inputWrapper}>
                            <Image source={Phone} style={styles.whiteShape} resizeMode="contain" />
                            <TextInput
                                style={styles.input}
                                placeholder="Mobile Number"
                                placeholderTextColor={Colors.gray6e}
                                keyboardType="phone-pad"
                                value={mobileNumber}
                                maxLength={10}
                                onChangeText={handleMobileChange}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <Image source={Email} style={[styles.whiteShape]} />
                            <TextInput
                                style={styles.input}
                                placeholder="Email Address"
                                value={email}
                                placeholderTextColor={Colors.gray6e}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={setEmail}
                            />
                        </View>

                        {isNewUser && (
                            <>
                                {/* Full Name */}
                                <View style={styles.inputWrapper}>
                                    <Image source={UserIcon} style={styles.whiteShape} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Full Name"
                                        value={fullName}
                                        placeholderTextColor={Colors.gray6e}
                                        onChangeText={setFullName}
                                    />
                                </View>

                                {/* Email */}


                                {/* Gender */}
                                <View style={styles.genderContainer}>
                                    <Text style={styles.genderLabel}>Gender :</Text>
                                    <TouchableOpacity
                                        style={styles.genderOption}
                                        onPress={() => setGender('male')}
                                    >
                                        <View style={styles.radioOuter}>
                                            {gender === 'male' && <View style={styles.radioInner} />}
                                        </View>
                                        <Text style={styles.genderText}>Male</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.genderOption}
                                        onPress={() => setGender('female')}
                                    >
                                        <View style={styles.radioOuter}>
                                            {gender === 'female' && <View style={styles.radioInner} />}
                                        </View>
                                        <Text style={styles.genderText}>Female</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}

                        <View style={{ marginTop: moderateScale(5) }}>
                            <Captcha
                                onValueChange={(
                                    value: string,
                                    captcha: string,
                                    valid: boolean
                                ) => {
                                    setCaptchaInput(value);
                                    setCaptchaCode(captcha);
                                    setIsCaptchaValid(valid);
                                }}
                            />
                        </View>

                        {isNewUser && (
                            <>
                                {/* Terms */}
                                <View style={styles.termsContainer}>
                                    <CustomCheckbox
                                        value={acceptedTerms}
                                        onChange={setAcceptedTerms}
                                        checkedImage={FillCheckBox}
                                        uncheckedImage={EmtyCheckCox}
                                        enableTintColor={true}
                                    />
                                    <Text style={styles.termsText}>
                                        I hereby consent to Chintamani Finlease Ltd being appointed as
                                        authorised representative to receive my Credit Information
                                        from Experian and other bureau for the purpose of offering
                                        loan offers.{' '}
                                        <Text
                                            style={styles.linkText}
                                            onPress={() =>
                                                navigation.navigate('WebViewScreen', {
                                                    url: 'https://www.instantmudra.com/terms_and_conditions.php',
                                                    title: 'Terms & Conditions',
                                                })
                                            }
                                        >
                                            T & C apply
                                        </Text>
                                    </Text>
                                </View>
                            </>
                        )}

                        {checkingUser && (
                            <ActivityIndicator
                                size="small"
                                color={Colors.primary}
                                style={{ marginTop: moderateScale(10) }}
                            />
                        )}

                        {/* Button */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleSendOtp}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={Colors.white} />
                            ) : (
                                <Text style={styles.loginButtonText}>
                                    {isNewUser ? "Register" : "Continue"}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.containerCibil}>
                    <Text style={styles.footer1}>Powered By</Text>
                    <View style={styles.containerCibilRow}>
                        <Image source={Experian} style={styles.experianLogo} />
                        <Image source={Equifax} style={styles.experianLogo} />
                        <Image source={Cibil} style={styles.experianLogo} />
                        <Image source={CIBILX} style={styles.experianLogo} />
                    </View>
                </View>
            </ScreenWrapper>
        </GradientBackground>
    );
};

export default RegistrationScreen;

// import React, { useRef, useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     Image,
//     ActivityIndicator,
//     Alert
// } from 'react-native';

// import styles from './Login.styles';
// import GradientBackground from '../../../components/gradient/GradinetBackgorund';
// import {
//     EmtyCheckCox, FillCheckBox, Phone, UserIcon,
//     Experian,
//     Equifax,
//     Cibil,
//     CIBILX
// } from '../../../assets/images';
// import CustomCheckbox from '../../../components/checkbox/CustomCheckbox';
// import { Colors } from '../../../styles/colors';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { checkUserApi, sendOtp } from '../../../redux/slices/userSlice';
// import Captcha from '../../../components/captcha/Captcha';
// import ScreenWrapper from '../../../components/screenWrapper/ScreenWrapper';
// import { moderateScale } from '../../../styles/responsive';
// import { getApp } from '@react-native-firebase/app';


// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID",
// };


// const RegistrationScreen: React.FC = ({ navigation }: any) => {

//     const [fullName, setFullName] = useState<string>('');
//     const [mobileNumber, setMobileNumber] = useState<string>('');
//     const [gender, setGender] = useState<'male' | 'female'>('male');
//     const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);


//     const [checkingUser, setCheckingUser] = useState(false);
//     const [isNewUser, setIsNewUser] = useState(false);


//     const [captchaInput, setCaptchaInput] = useState('');
//     const [captchaCode, setCaptchaCode] = useState('');
//     const [isCaptchaValid, setIsCaptchaValid] = useState(false);

//     const dispatch = useAppDispatch();
//     const { loading } = useAppSelector(state => state.user);


//     const handleSendOtp = () => {
//         const app = getApp();

//         console.log("🔥 Firebase Ready:", app.name);

//         // Only mobile validation
//         if (mobileNumber.length !== 10) {
//             Alert.alert("Error", "Enter valid mobile number");
//             return;
//         }

//         if (!captchaInput.trim()) {
//             Alert.alert("Error", "Please enter captcha");
//             return;
//         }

//         if (!isCaptchaValid) {
//             Alert.alert("Error", "Captcha does not match");
//             return;
//         }

//         // TERMS VALIDATION FOR NEW USER
//         if (isNewUser && !acceptedTerms) {
//             Alert.alert(
//                 "Permission Required",
//                 "Please accept Terms & Conditions"
//             );
//             return;
//         }


//         //  API CALL (everything optional)
//         dispatch(
//             sendOtp({
//                 phone: mobileNumber,
//                 full_name: fullName || "",
//                 gender: gender ? (gender === "male" ? "Male" : "Female") : ""
//             })
//         )
//             .unwrap()
//             .then(() => {
//                 navigation.replace("OtpScreen", {
//                     phone: mobileNumber,
//                     full_name: fullName,
//                     gender
//                 });
//             })
//             .catch(() => {
//                 Alert.alert("Error", "Something went wrong");
//             });
//     };

//     const checkUserExist = async (phone: string) => {

//         try {

//             setCheckingUser(true);

//             const res = await dispatch(
//                 checkUserApi({ phone })
//             ).unwrap();

//             // console.log("CHECK USER:", res);

//             if (res?.exists) {

//                 setIsNewUser(false);

//             } else {

//                 setIsNewUser(true);

//             }

//         } catch (err) {

//             console.log("CHECK ERROR:", err);

//         } finally {

//             setCheckingUser(false);

//         }
//     };



//     const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);


//     const handleMobileChange = (text: string) => {

//         const formatted = text.replace(/[^0-9]/g, '');

//         setMobileNumber(formatted);

//         setIsNewUser(false);

//         if (formatted.length === 10) {

//             if (debounceTimer.current) {
//                 clearTimeout(debounceTimer.current);
//             }

//             debounceTimer.current = setTimeout(() => {

//                 checkUserExist(formatted);

//             }, 500);

//         }
//     };


//     return (
//         <GradientBackground>
//             <ScreenWrapper scroll useBackground={false}>

//                 <View style={styles.container}>

//                     <View style={styles.card}>
//                         <Text style={styles.title}>Registration / Login</Text>

//                         <Text style={styles.subtitle}>
//                             we sent a verification code to your mobile number.
//                         </Text>

//                         {/* Mobile */}
//                         <View style={styles.inputWrapper}>
//                             <Image source={Phone} style={styles.whiteShape} resizeMode="contain" />
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Mobile Number"
//                                 placeholderTextColor={Colors.gray6e}
//                                 keyboardType="phone-pad"
//                                 value={mobileNumber}
//                                 maxLength={10}
//                                 onChangeText={handleMobileChange}
//                             // onChangeText={setMobileNumber}
//                             />
//                         </View>


//                         {/* Full Name */}
//                         {isNewUser && (
//                             <>
//                                 {/* Full Name */}
//                                 <View style={styles.inputWrapper}>
//                                     <Image source={UserIcon} style={styles.whiteShape} />
//                                     <TextInput
//                                         style={styles.input}
//                                         placeholder="Full Name"
//                                         value={fullName}
//                                         placeholderTextColor={Colors.gray6e}
//                                         onChangeText={setFullName}
//                                     />
//                                 </View>

//                                 {/* Gender */}
//                                 <View style={styles.genderContainer}>
//                                     <Text style={styles.genderLabel}>Gender :</Text>

//                                     <TouchableOpacity
//                                         style={styles.genderOption}
//                                         onPress={() => setGender('male')}
//                                     >
//                                         <View style={styles.radioOuter}>
//                                             {gender === 'male' && <View style={styles.radioInner} />}
//                                         </View>
//                                         <Text style={styles.genderText}>Male</Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity
//                                         style={styles.genderOption}
//                                         onPress={() => setGender('female')}
//                                     >
//                                         <View style={styles.radioOuter}>
//                                             {gender === 'female' && <View style={styles.radioInner} />}
//                                         </View>
//                                         <Text style={styles.genderText}>Female</Text>
//                                     </TouchableOpacity>
//                                 </View>    </>)}

//                         <View style={{ marginTop: moderateScale(5) }}>

//                             <Captcha
//                                 onValueChange={(
//                                     value: string,
//                                     captcha: string,
//                                     valid: boolean
//                                 ) => {

//                                     setCaptchaInput(value);
//                                     setCaptchaCode(captcha);
//                                     setIsCaptchaValid(valid);

//                                 }}
//                             />

//                         </View>
//                         {isNewUser && (<>
//                             {/* Terms */}
//                             <View style={styles.termsContainer}>
//                                 <CustomCheckbox
//                                     value={acceptedTerms}
//                                     onChange={setAcceptedTerms}
//                                     checkedImage={FillCheckBox}
//                                     uncheckedImage={EmtyCheckCox}
//                                     enableTintColor={true}
//                                 />

//                                 <Text style={styles.termsText}>
//                                     I hereby consent to Chintamani Finlease Ltd being appointed as authorised representative to receive my Credit Information from Experian and other bureau for the purpose of offering loan offers.{' '}
//                                     <Text
//                                         style={styles.linkText}
//                                         onPress={() =>
//                                             navigation.navigate('WebViewScreen', {
//                                                 url: 'https://www.instantmudra.com/terms_and_conditions.php',
//                                                 title: 'Terms & Conditions',
//                                             })
//                                         }
//                                     >
//                                         T & C apply
//                                     </Text>
//                                 </Text>
//                             </View>

//                         </>)}


//                         {checkingUser && (
//                             <ActivityIndicator
//                                 size="small"
//                                 color={Colors.primary}
//                                 style={{ marginTop: moderateScale(10) }}
//                             />
//                         )}



//                         {/* Button */}
//                         <TouchableOpacity
//                             style={styles.loginButton}
//                             onPress={handleSendOtp}
//                             disabled={loading}
//                         >
//                             {loading ? (
//                                 <ActivityIndicator color={Colors.white} />
//                             ) : (
//                                 <Text style={styles.loginButtonText}>
//                                     {isNewUser ? "Register" : "Continue"}
//                                 </Text>
//                             )}
//                         </TouchableOpacity>

//                     </View>



//                 </View>
//                 <View style={styles.containerCibil}>
//                     <Text style={styles.footer1}>Powered By</Text>
//                     <View style={styles.containerCibilRow}>

//                         <Image source={Experian} style={styles.experianLogo} />
//                         <Image source={Equifax} style={styles.experianLogo} />
//                         <Image source={Cibil} style={styles.experianLogo} />
//                         <Image source={CIBILX} style={styles.experianLogo} />

//                     </View>
//                 </View>
//             </ScreenWrapper>
//         </GradientBackground>
//     );
// };

// export default RegistrationScreen;




// const handleSendOtp = () => {
//     //  Name + Phone validation
//     if (!fullName.trim() || !mobileNumber.trim()) {
//         Alert.alert("Error", "Please fill all fields");
//         return;
//     }

//     //  Phone length validation (important)
//     if (mobileNumber.length !== 10) {
//         Alert.alert("Error", "Enter valid mobile number");
//         return;
//     }

//     //  TERMS VALIDATION (MAIN POINT)
//     if (!acceptedTerms) {
//         Alert.alert(
//             "Permission Required",
//             "Please accept Terms & Conditions to continue"
//         );
//         return; //  STOP API CALL
//     }

//     //  API CALL ONLY IF CHECKED
//     dispatch(
//         sendOtp({
//             phone: mobileNumber,
//             full_name: fullName,
//             gender: gender === "male" ? "Male" : "Female"
//         })
//     )
//         .unwrap()
//         .then((res) => {
//             console.log("SUCCESS:", res);

//             navigation.replace("OtpScreen", {
//                 phone: mobileNumber,
//                 full_name: fullName,
//                 gender: gender === "male" ? "Male" : "Female"
//             });

//             // navigation.replace("OtpScreen", {
//             //     phone: mobileNumber
//             // });

//         })
//         .catch((err) => {
//             console.log("ERROR:", err);
//             Alert.alert("Error", "Something went wrong");
//         });
// };


// const checkUserExist = async (phone: string) => {
//     try {
//         setCheckingUser(true);

//         const res = await dispatch(checkUserApi({ phone })).unwrap();

//         console.log("CHECK USER:", res);

//         if (res?.exists) {
//             dispatch(sendOtp({ phone }))
//                 .unwrap()
//                 .then(() => {
//                     navigation.replace("OtpScreen", { phone });
//                 });
//         } else {
//             // 🆕 NEW USER → SHOW REGISTER FIELDS
//             setIsNewUser(true);
//         }

//     } catch (err) {
//         console.log("CHECK ERROR:", err);
//         Alert.alert("Error", "Failed to check number");
//     } finally {
//         setCheckingUser(false);
//     }
// };


// const checkUserExist = async (phone: string) => {
//     try {
//         setCheckingUser(true);

//         // 👉 CALL YOUR API HERE
//         const res = await dispatch(checkUserApi({ phone })).unwrap();

//         console.log("CHECK USER:", res);

//         if (res?.exists) {
//             // 🔥 EXISTING USER → LOGIN FLOW
//             navigation.replace("OtpScreen", { phone });
//         } else {
//             // 🆕 NEW USER → SHOW EXTRA FIELDS
//             setIsNewUser(true);
//         }

//     } catch (err) {
//         console.log(err);
//     } finally {
//         setCheckingUser(false);
//     }
// };
