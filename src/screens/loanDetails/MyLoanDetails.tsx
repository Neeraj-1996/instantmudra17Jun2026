import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ListRenderItem,
    ActivityIndicator,
} from "react-native";
import Header from "../../components/header/Header";
import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAppliedLoans } from "../../redux/slices/userSlice";

interface LoanItem {
    order_id: string;
    loan_amount: number;
    application_status: string;
    date_created: string;

    repayment_date?: string;
    balance_amount?: number;
    total_interest?: number;
    return_amount?: number;
    rebate_data?: number;

    user_id?: string;
    disbursed_date?: string;
    processing_fee?: string;
    days_returning?: string;
    cheque_bounce_count?: number;
    fine_amount?: number;

    emi_data?: any[];
}

const MyLoanDetails: React.FC<any> = ({ navigation }) => {

    const [selectedTab, setSelectedTab] = useState<number>(0);
    const dispatch = useAppDispatch();
    const { appliedLoans, appliedLoansLoading } = useAppSelector(state => state.user);
    console.log("Applied Loans in Component:", appliedLoans);
    console.log("appliedLoansLoading Loans in Component:", appliedLoansLoading);
    useEffect(() => {
        dispatch(getAppliedLoans());
    }, []);


    const formattedLoans: LoanItem[] = (appliedLoans || []).map((item: any) => ({
        // Basic
        order_id: item.order_id,
        loan_amount: Number(item.loan_amount),
        application_status: item.application_status,
        date_created: item.date_created,

        // Important for Details Screen
        repayment_date: item.repayment_date,
        balance_amount: Number(item.balance_amount || 0),
        total_interest: Number(item.total_interest || 0),
        return_amount: Number(item.return_amount || 0),
        rebate_data: Number(item.rebate_data || 0),

        // Payment Required
        user_id: item.user_id,

        // Extra useful fields
        disbursed_date: item.disbursed_date,
        processing_fee: item.processing_fee,
        days_returning: item.days_returning,
        cheque_bounce_count: item.cheque_bounce_count,
        fine_amount: item.fine_amount,

        // EMI (optional)
        emi_data: item.emi_data || [],
    }));


    const completedList = formattedLoans.filter(
        item => item.application_status?.trim().toLowerCase() === "completed"
    );

    const activeList = formattedLoans.filter(
        item => item.application_status?.trim().toLowerCase() !== "completed"
    );

    const payNowList = formattedLoans.filter(item =>
        ["disbursed", "settled"].includes(
            item.application_status?.trim().toLowerCase()
        )
    );

    // const activeList = formattedLoans.filter(
    //     (item) =>
    //         item.application_status !== "Completed"
    // );

    // const payNowList = formattedLoans.filter(
    //     (item) =>
    //         item.application_status === "Disbursed" ||
    //         item.application_status === "Settled"
    // );

    // const completedList = formattedLoans.filter(
    //     (item) => item.application_status === "Completed"
    // );


    // CARD
    const renderLoanCard: ListRenderItem<LoanItem> = ({ item }) => {
        // const threeMonthEmi =
        //     item.emi_date1 && item.emi_date2 && item.emi_date3;

        return (
            <TouchableOpacity
                style={styles.loanCard}
                onPress={() => {
                    //  ACTIVE TAB
                    if (selectedTab === 0) {
                        navigation.navigate("LoanDetailsActive", {
                            loanData: item,
                            showPayButton: false,
                        });
                    }

                    //  PAY NOW TAB
                    else if (selectedTab === 1) {
                        navigation.navigate("LoanDetailsActive", {
                            loanData: item,
                            showPayButton: true,
                        });
                    }

                    //  COMPLETED TAB (NO ACTION)
                }}
            >
                {/* LEFT STATUS BOX */}
                <View style={styles.leftBox}>
                    <Text style={styles.statusText}>
                        {item.application_status.toUpperCase()}
                    </Text>
                </View>

                {/* RIGHT CONTENT */}
                <View style={styles.rightContent}>
                    <Text style={styles.label}>Loan Amount</Text>

                    <Text style={styles.amount}>
                        ₹ {item.loan_amount}
                    </Text>

                    <Text style={styles.date}>
                        Applied on {item.date_created}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    //  TAB DATA
    const getData = () => {
        if (selectedTab === 0) return activeList;
        if (selectedTab === 1) return payNowList;
        if (selectedTab === 2) return completedList;
        return [];
    };
    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="My Loan Details" />

            {/* TABS */}
            <View style={styles.tabContainer}>
                {["Active", "Pay Now", "Completed"].map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedTab(index)}
                        style={styles.tabItem}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedTab === index && styles.activeTabText,
                            ]}
                        >
                            {tab}
                        </Text>

                        {selectedTab === index && <View style={styles.activeLine} />}
                    </TouchableOpacity>
                ))}
            </View>

            {/* LIST */}
            <FlatList
                data={getData()}
                renderItem={renderLoanCard}
                keyExtractor={(item) => item.order_id}
                contentContainerStyle={{ padding: 16 }}
                ListEmptyComponent={
                    appliedLoansLoading ? (
                        <ActivityIndicator size="large" color="#7B4397" />
                    ) : (
                        <Text style={styles.emptyText}>No Data Found</Text>
                    )
                }
            />
        </View>
    );
};

export default MyLoanDetails;