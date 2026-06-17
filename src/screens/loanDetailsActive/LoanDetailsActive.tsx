import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import Header from "../../components/header/Header";
import GradientButton from "../../components/button/Button";
import styles from "./LoanDetailActive.style";
import threeStyles from "./ThreeMonth.style";
import { getCurrentEmiOne, getUserDetail } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ENDPOINTS } from "../../api/endpoints";
import { formatDateDMY } from "../../utils/globalFuntion";
import { moderateScale } from "../../styles/responsive";
import RenderEmiItem from "./RenderEmiItem";

const LoanDetailsActive = ({ route, navigation }: any) => {
    const { loanData, showPayButton } = route.params;
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();
    const { userDetail, emiPaymentDetails } = useAppSelector(
        (state) => state.user
    );

    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const toggleAccordion = (index: number) => {
        setExpandedIndex((prev) => (prev === index ? null : index));
    };


    const toggleSelect = (index: number) => {
        const isOverdue =
            emiList[index]?.emi_status?.trim()?.toLowerCase() === "overdue";

        if (isOverdue) return;

        setSelectedIndexes(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };



    useEffect(() => {
        const overdueIndexes = emiList
            .map((item, index) =>
                item?.emi_status?.trim()?.toLowerCase() === "overdue"
                    ? index
                    : -1
            )
            .filter(index => index !== -1);

        if (overdueIndexes.length > 0) {
            setSelectedIndexes(overdueIndexes);
        }
    }, [emiPaymentDetails]);

    //  Normalize EMI list (handles emi_data & data)
    const emiList =
        emiPaymentDetails?.emi_data?.length > 0
            ? emiPaymentDetails.emi_data
            : emiPaymentDetails?.data
                ? [emiPaymentDetails.data]
                : [];


    const totalSelectedEmi = emiList
        .filter((_, index) => selectedIndexes.includes(index))
        .reduce((sum, item) => {
            const amount = Number(
                item?.balance ?? item?.emi_amount ?? 0
            );

            return sum + (isNaN(amount) ? 0 : amount);
        }, 0);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            await dispatch(getUserDetail());

            const orderId = loanData?.order_id;

            if (orderId) {
                await dispatch(getCurrentEmiOne(orderId));
            }

            setLoading(false);
        };

        loadData();
    }, []);


    // useEffect(() => {
    //     dispatch(getUserDetail());

    //     const orderId = loanData?.order_id;
    //     if (orderId) {
    //         dispatch(getCurrentEmiOne(orderId));
    //     }
    // }, []);

    // Payment handler
    const handlePayNow = (emiItem?: any) => {
        const user_id = userDetail?.user_id;
        const order_id = loanData?.order_id?.split("-")?.[2];

        const amount =
            emiItem?.balance ||
            emiItem?.emi_amount ||
            emiPaymentDetails?.total_payable_amount;

        if (!user_id || !order_id || !amount) {
            console.log("Missing payment data");
            return;
        }

        const url =
            ENDPOINTS.PAY_URL +
            `icici-upi-form/user_id/${user_id}/loan_id/${order_id}/amount/${amount}`;

        navigation.navigate("WebViewScreen", {
            url,
            title: "Pay EMI",
        });
    };



    const formatCurrency = (amount: number) => {
        return amount.toLocaleString("en-IN"); // ₹12,426 format
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Loan Active" />

            {emiList.length > 0 ? (
                <ScrollView style={threeStyles.container}>

                    {/* TOP INFO */}
                    {emiPaymentDetails?.emi_data?.length > 0 && (
                        <>
                            <View style={threeStyles.rowText}>
                                <Text style={threeStyles.labelText}>Loan Amount:</Text>
                                <Text style={threeStyles.valueText}>
                                    ₹{loanData?.loan_amount}
                                </Text>
                            </View>

                            <View style={threeStyles.rowText}>
                                <Text style={threeStyles.labelText}>
                                    Loan Disbursed Date:
                                </Text>
                                <Text style={threeStyles.valueText}>
                                    {formatDateDMY(emiList[0]?.disbursed_date)}
                                </Text>
                            </View>

                            <View style={threeStyles.rowText}>
                                <Text style={threeStyles.labelText}>Tenure:</Text>
                                <Text style={threeStyles.valueText}>
                                    {emiList.length} Months
                                </Text>
                            </View>
                        </>
                    )}




                    {/* EMI LIST */}
                    {/* {emiList.map(renderEmiItem)}
                     */}
                    {emiList.map((item: any, index: number) => (
                        <RenderEmiItem
                            key={index}
                            item={item}
                            index={index}
                            expandedIndex={expandedIndex}
                            selectedIndexes={selectedIndexes}
                            emiPaymentDetails={emiPaymentDetails}
                            showPayButton={showPayButton}
                            toggleAccordion={toggleAccordion}
                            toggleSelect={toggleSelect}
                            handlePayNow={handlePayNow}
                        />
                    ))}


                    {showPayButton && selectedIndexes.length > 0 && (
                        <TouchableOpacity style={{ marginTop: moderateScale(15), marginBottom: moderateScale(30) }}>
                            <GradientButton
                                title={`Pay ₹${formatCurrency(totalSelectedEmi)}`}
                                onPress={() =>
                                    handlePayNow({
                                        balance: totalSelectedEmi,
                                    })
                                }
                            />
                        </TouchableOpacity>
                    )}

                </ScrollView>
            ) : (
                <View style={{ alignItems: "center", marginTop: 40 }}>
                    <Text>No EMI Data Found</Text>
                </View>
            )}
        </View>
    );
};

export default LoanDetailsActive;
