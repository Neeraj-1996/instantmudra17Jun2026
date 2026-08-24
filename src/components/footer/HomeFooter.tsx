import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";
import HomeFooterStyles from "./HomeFooter.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const HomeFooter = (props: any) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { selectedBottomTab, setSelectedBottomTab, loanStatus } = props;

    const handleHomePress = () => {
        setSelectedBottomTab("Home");
        props.onHomePress && props.onHomePress();
    };

    const handleLoansPress = () => {
        setSelectedBottomTab("Loans");
        navigation.navigate("MyLoanDetails");
    };

    const handleMandatePress = () => {
        const status = loanStatus?.trim();

        console.log("Loan Status:", status);

        const blockedStatuses = [
            "Verify",
            "Pending",
            "Processing",
            "Hold",
            "Decline",
        ];

        const successStatuses = [
            "Sanction",
            "Payment",
            "Disbursed",
            "Quality Rejected",
            "Completed",
            "To Completed",
            "Settled",
        ];

        if (status === "Approved") {
            setSelectedBottomTab("Mandate");
            navigation.navigate("EMandate");
            return;
        }

        if (blockedStatuses.includes(status)) {
            Alert.alert(
                "Not Available",
                "Mandate will be enabled after loan approval."
            );
            return;
        }

        if (successStatuses.includes(status)) {
            Alert.alert(
                "Mandate Status",
                "ECS Successfully registered"
            );
            return;
        }

        Alert.alert(
            "Not Available",
            "Mandate will be enabled after loan approval."
        );
    };
    // const handleMandatePress = () => {
    //     const blockedStatuses = [
    //         "Verify",
    //         "Pending",
    //         "Processing",
    //         "Hold",
    //         "Decline",
    //     ];

    //     if (loanStatus === "Approved") {
    //         setSelectedBottomTab("Mandate");
    //         navigation.navigate("EMandate");
    //         return;
    //     }

    //     if (blockedStatuses.includes(loanStatus)) {
    //         Alert.alert(
    //             "Not Available",
    //             "Mandate will be enabled after loan approval."
    //         );
    //         return;
    //     }

    //     Alert.alert(
    //         "Not Available",
    //         "Mandate will be enabled after loan approval."
    //     );
    // };

    const handleProfilePress = () => {
        setSelectedBottomTab("Profile");
        props.onProfilePress && props.onProfilePress();
    };

    const tabs = [
        { label: "Home", isActive: selectedBottomTab === "Home", onPress: handleHomePress },
        { label: "Loans", isActive: selectedBottomTab === "Loans", onPress: handleLoansPress },
        { label: "Mandate", isActive: selectedBottomTab === "Mandate", onPress: handleMandatePress },
        { label: "Profile", isActive: selectedBottomTab === "Profile", onPress: handleProfilePress },
    ];

    const TabItem = ({ label, isActive, onPress }: any) => (
        <TouchableOpacity onPress={onPress} style={HomeFooterStyles.tabItem}>

            {/* ICON CIRCLE */}
            <View style={[HomeFooterStyles.iconWrapper, isActive && HomeFooterStyles.activeIconWrapper]}>
                <Text style={[HomeFooterStyles.iconText, isActive && HomeFooterStyles.activeIconText]}>
                    {label === "Home" ? "🏠" :
                        label === "Loans" ? "📄" :
                            label === "Mandate" ? "🏦" :
                                "👤"}
                </Text>
            </View>

            {/* LABEL */}
            <Text style={[HomeFooterStyles.label, isActive && HomeFooterStyles.activeLabel]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={HomeFooterStyles.safeArea}>
            <View style={HomeFooterStyles.container}>
                {tabs.map((tab) => (
                    <TabItem
                        key={tab.label}
                        label={tab.label}
                        isActive={tab.isActive}
                        onPress={tab.onPress}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
};

export default HomeFooter;