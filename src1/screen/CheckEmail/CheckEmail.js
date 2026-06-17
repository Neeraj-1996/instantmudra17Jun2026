import React, { Component, useState, useEffect } from "react"
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, TouchableOpacityBase } from "react-native"
import styles from "./styles"
import LinearGradient from 'react-native-linear-gradient';
import colors from "../../common";
import OTPTextInput from 'react-native-otp-textinput';
const CheckEmail = (props) => {

    const [otpText, setOTP] = React.useState(null);



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
                <Text style={styles.loginTextTwo}>Please enter the verification code sent to your email,nfsdmnksanlk </Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>

                    <OTPTextInput
                        containerStyle={[
                            styles.textInputContainer,
                        ]}
                        textInputStyle={[
                            styles.squareTextInput,
                        ]}
                        inputCount={6}
                        tintColor="dimgrey"
                        offTintColor="gray"
                        handleTextChange={otpText => setOTP(otpText)}
                        returnKeyType={'done'}
                        autoCompleteType='off'
                        autoCorrect={false}
                        selectionColor={'red'}
                    />
                </View>
                <TouchableOpacity onPress= {()=>props.navigation.navigate("NewPassword")} 
                disabled={otpText?.length !== 6}>

                    {otpText?.length === 6 ?
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
export default CheckEmail

































































// import React, { useEffect, Component, useState } from "react"
// import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from "react-native"
// import styles from "./styles"
// import LinearGradient from 'react-native-linear-gradient';
// import colors from "../../common";




// const Verify = () => {

    

//     const [text, onChangeText] = React.useState(null);
//     const [checked, setChecked] = React.useState('first');
//     const [name, setname] = React.useState("");
//     const [name1, setname1] = React.useState("");
//     const [name2, setname2] = React.useState("");
//     const [name3, setname3] = React.useState("");
//     const [name4, setname4] = React.useState("");
//     const [name5, setname5] = React.useState("");
//     const [name6, setname6] = React.useState("");


//     return (
//         <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
//             locations={[0, 0.6, 1]}
//             colors={['#7B4397', "#B53059", '#DC2430']} style={{ flex: 1, backgroundColor: "white" }}>
//             <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
//                 locations={[0, 0.6, 1]}
//                 colors={['#7B4397', "#B53059", '#DC2430']} style={{ height: "40%", width: "100%", backgroundColor: "white" }}>
//                 <SafeAreaView>
//                     <Image style={styles.arrowImage} source={require("../../assests/arrowBack.png")} />
//                     <Image style={styles.otpImage} source={require("../../assests/OtpImage.png")} />
//                 </SafeAreaView>
//             </LinearGradient>
//             <View style={styles.footer}>
//                 <Text style={styles.loginText}>Check Your Email</Text>
//                 <Text style={styles.loginTextTwo}>Please  the verification code sent to your email, </Text>
//                 <View style={{ flexDirection: "row", marginTop: 20 }}>
//                     <View style={{ height: 44, width: 44, marginTop: 16, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
//                         <TextInput
//                             onChangeText={(e) => {
//                                 setname1(e)}}
//                             value={name1}
//                             placeholder=""
//                             style={{ textAlign: "center",width:'100%'}}
//                             maxLength={1}
//                             keyboardType='numeric'
//                         />
//                     </View>
//                     <View style={{ height: 44, width: 44, marginLeft: 15, marginTop: 16, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
//                         <TextInput
//                             onChangeText={(e) => setname2(e)}
//                             value={name2}
//                             placeholder=""
//                             style={{ textAlign: "center",width:'100%' }}
//                             maxLength={1}
//                             keyboardType='numeric'
//                         />

//                     </View>
//                     <View style={{ height: 44, width: 44, marginLeft: 15, marginTop: 16, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
//                         <TextInput
//                             onChangeText={(e) => setname3(e)}
//                             value={name3}
//                             placeholder=""
//                             style={{ textAlign: "center",width:'100%' }}
//                             maxLength={1}
//                             keyboardType='numeric'
//                         />

//                     </View>
//                     <View style={{ height: 44, width: 44, marginLeft: 15, marginTop: 16, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>

//                         <TextInput
//                             onChangeText={(e) => setname4(e)}
//                             value={name4}
//                             placeholder=""
//                             style={{ textAlign: "center",width:'100%' }}
//                             maxLength={1}
//                             keyboardType='numeric'
//                         />

//                     </View>
//                     <View style={{ height: 44, width: 44, marginLeft: 15, marginTop: 16, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>

//                         <TextInput
//                             onChangeText={(e) => setname5(e)}
//                             value={name5}
//                             placeholder=""
//                             style={{ textAlign: "center",width:'100%' }}
//                             maxLength={1}
//                             keyboardType='numeric'
//                         />

//                     </View>
//                     <View style={{ height: 44, width: 44, marginLeft: 15, marginTop: 16, borderWidth: 1, borderColor: colors.lightGrey, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
//                         <TextInput
//                             onChangeText={(e) => setname6(e)}
//                             value={name6}
//                             placeholder=""
//                             style={{ textAlign: "center",width:'100%' }}
//                             maxLength={1}
//                             keyboardType='numeric'
//                         />

//                     </View>
//                 </View>





              

//                 <TouchableOpacity style={styles.button}>
//                     <Text style={styles.buttonText}>Confirm OTP</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ alignSelf: "center", position: "absolute", bottom: 44 }}>
//                     <Text style={{ fontSize: 14, fontWeight: "400", color: colors.red }}>RESEND OTP</Text>
//                 </TouchableOpacity>
//             </View>

//         </LinearGradient>
//     )
// }
// export default Verify
