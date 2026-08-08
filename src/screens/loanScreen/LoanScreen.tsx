import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./LoanScreen.styles";
import CustomSlider from "../../components/customSlider/Slider"
import { loanAmount, ProfileTwoColor } from "../../assets/images";
import GradientBackground from "../../components/gradient/GradinetBackgorund";
import { getLoanCalculation, loanApplyResponse } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const LoanScreen: React.FC = ({ navigation }: any) => {

    const [LoanAmount, setLoanAmount] = useState(3000);

    const dispatch = useAppDispatch();
    const { calculation, loading } = useAppSelector((state) => state.user);

    // Fetch initial calculation once on mount
    useEffect(() => {
        dispatch(getLoanCalculation(LoanAmount));
    }, []);

    // Debounced/manual fetch: we'll call getLoanCalculation when sliding completes


    const handleNext = async () => {
        if (!LoanAmount) {
            Alert.alert("Please select loan amount");
            return;
        }

        try {
            const response = await dispatch(loanApplyResponse({ loan_apply: 1 })).unwrap();
            console.log("Loan Apply Response:", response);

            // Navigate to the next screen after a successful API call
            navigation.replace("DocumentScreen", {
                loanAmount: LoanAmount,
            });
        } catch (error) {
            console.error("Error submitting loan apply response:", error);
            Alert.alert("Error", "Failed to submit loan application. Please try again.");
        }
    };



    return (
        <GradientBackground>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* Top Illustration */}
                    <View style={{ height: 260, justifyContent: 'center' }}>
                        <Image source={ProfileTwoColor} style={styles.topImage} resizeMode="contain" />
                    </View>

                    {/* Main Card */}
                    <View style={styles.container}>

                        <Text style={styles.title}>Hello, Name</Text>

                        {/* Loan Progress */}
                        <View style={styles.progressCard}>
                            <Text style={styles.loanText}>Loan Amount Active</Text>

                            <CustomSlider
                                value={LoanAmount}
                                minimumValue={3000}
                                maximumValue={30000}
                                step={1000}
                                onValueChange={(amount: number) => setLoanAmount(amount)}
                                // Only fetch calculation when sliding ends to avoid excessive API calls
                                onSlidingComplete={(amount: number) => dispatch(getLoanCalculation(amount))}
                                trackHeight={13}
                                thumbSize={40}
                                renderThumb={() => (
                                    <View
                                        style={{
                                            width: 33,
                                            height: 33,
                                            borderRadius: 20,
                                            backgroundColor: '#DC2430',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderWidth: 2,
                                            borderColor: '#fff',
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.4,
                                            shadowRadius: 3,
                                            elevation: 5,
                                        }}>
                                        <Text style={{ color: '#fff', fontSize: 20 }}>₹</Text>
                                    </View>
                                )} />
                        </View>

                        {/* Details Card */}
                        <View style={styles.detailsCard}>
                            <Image
                                source={loanAmount}
                                style={styles.bgImage}
                                resizeMode="contain"
                            />
                            <View style={styles.overlay}>
                                <View style={styles.row}>
                                    <View>
                                        <Text style={styles.label}>Amount</Text>
                                        <Text style={styles.value}>₹{LoanAmount}</Text>
                                    </View>

                                    <View>
                                        <Text style={styles.label}>Total Interest</Text>
                                        <Text style={styles.value}>{calculation?.InterestAmount}</Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View>
                                        <Text style={styles.label}>Processing Fee</Text>
                                        <Text style={styles.value}>₹{calculation?.processingFee}</Text>
                                    </View>

                                    <View>
                                        <Text style={styles.label}>GST (18%)     </Text>
                                        <Text style={styles.value}>{calculation?.GstAmount}</Text>
                                    </View>
                                </View>

                                <View style={styles.row}>
                                    <View>
                                        <Text style={styles.label}>Disburse amount</Text>
                                        <Text style={styles.value}>{calculation?.disbursedAmount}</Text>
                                    </View>

                                    <View>
                                        <Text style={styles.label}>Repay amount</Text>
                                        <Text style={styles.value}>₹{calculation?.repaymentAmount}</Text>
                                    </View>
                                </View>
                            </View>
                            {/* </ImageBackground> */}
                        </View>

                        {/* Button */}
                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>Take a Loan</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </GradientBackground>
    );
};

export default LoanScreen;