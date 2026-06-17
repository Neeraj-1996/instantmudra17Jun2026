import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import styles from "./styles"
import colors from "../../common";
import Header from "../../components/Header/Header"
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginButton from '../../components/LoginButton/LoginButton';
import LinearButton from '../../components/LinearButton/LinearButton';
import { useFocusEffect } from "@react-navigation/native";
import { API_BASE_URL } from "../../utils";

const PersonalDetails = (props) => {

    const [personalStaus, setPersonalStatus] = useState(false);
    const [docStaus, setDocStatus] = useState(false);
    const [workDetailsStaus, setWorkDetailsStatus] = useState(false);

    const loanAmount = props.route?.params?.loanAmount

    const fetchDashboardData = async () => {
        const token = await AsyncStorage.getItem('TOKEN')
        console.log("fetchDashboardData token", token)
        const userData = await AsyncStorage.getItem('USER_DATA')
        const user_data = JSON.parse(userData);
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        console.log("UserVerification body", {
            user_id: user_data?.id
        })
        axios.post(API_BASE_URL + 'user-verifications-dashboard', {
            user_id: user_data?.id
        }, config)
            .then(res => {
                console.log("UserVerification response", res)
                if (res?.data?.status === 200) {
                    setPersonalStatus(res?.data?.data?.personal_details_status)
                    setDocStatus(res?.data?.data?.documents_status)
                    setWorkDetailsStatus(res?.data?.data?.work_details_status)
                }
                console.log("MMMMMMMMMMMM Resresres fetchDashboardData", res)
            }).catch(err => {
                console.log("MMMMMMMMMMMM ErrErrErr fetchDashboardData", err)
                alert('We are facing some techical issue. Team is looking into it.')
            })
    }

    useFocusEffect(() => {
        fetchDashboardData();
    })

    const handleValidated = () => {
        return personalStaus && docStaus && workDetailsStaus
    };

    const applyLoan = async () => {
        const token = await AsyncStorage.getItem('TOKEN')
        const userData = await AsyncStorage.getItem('USER_DATA')
        const user_data = JSON.parse(userData);
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        console.log("loanAmount", loanAmount)
        console.log("ApplyLoanBody", {
            'user_id': user_data?.id,
            'loan_type': "Personal",
            "apply_amount": loanAmount,
            "emi_amount": "1500" // yeh
        })
        axios.post(API_BASE_URL + 'user-apply-loan', {
            'user_id': user_data?.id,
            'loan_type': "Personal",
            "apply_amount": loanAmount,
            "emi_amount": "1500" // yeh
        }, config)
            .then(res => {
                console.log("🚀 ~ file: PersonalDetails.js ~ line 72 ~ applyLoan ~ res", res)
                if (res?.data?.status === 200) {
                    props.navigation.navigate("LoanDetails", { loanNumber: res?.data?.data?.loan_details?.[0]?.loan_number, loanId: res?.data?.data?.loan_data?.[0]?.id })
                    // alert('Loan Applied Successfully')
                }
            }).catch(err => {
                alert('We are facing some techical issue. Team is looking into it.')
                console.log('applyLoan err', err)
            })
    }

    const cards = () => {
        return (
            <View style={styles.card}>
                <View style={styles.cardOne}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("PersonalInformation")
                    }} style={styles.cardThree}>

                        <Image style={styles.image} source={require("../../assests/ProfileImage.png")} />
                        <Text style={styles.cardText}>Personal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { props.navigation.navigate("Document") }} style={[styles.cardThree, { marginLeft: 28 }]}>
                        <Image style={styles.image} source={require("../../assests/documentImage.png")} />
                        <Text style={styles.cardText}>Documents/KYC</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.cardTwo}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("SalariesWorkDetails")
                    }} style={styles.cardThree}>

                        <Image style={styles.image} source={require("../../assests/Vector.png")} />
                        <Text style={styles.cardText}>Employement</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (

        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header
                navigation={props.navigation} />

            <View style={{ height: "85%", width: "100%", backgroundColor: colors.white, padding: 20 }}>
                <Text style={styles.loginText}>Hello, we need some information to provide you the loan</Text>
                {cards()}
                {handleValidated() ? (
                    <LinearButton
                        width={150}
                        onPress={() => applyLoan()}
                        title={'Apply Loan'}
                    />
                ) : (
                    <LoginButton style={{ alignSelf: 'center' }} title={'Apply Loan'} disabled={true} />
                )}

            </View>
        </View>

    )
}
export default PersonalDetails