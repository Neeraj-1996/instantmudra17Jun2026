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

                <TabItem
                    label="Home"
                    isActive={selectedBottomTab === "Home"}
                    onPress={() => {
                        setSelectedBottomTab("Home");
                        props.onHomePress && props.onHomePress();
                    }}
                />

                <TabItem
                    label="Loans"
                    isActive={selectedBottomTab === "Loans"}
                    onPress={() => {
                        setSelectedBottomTab("Loans");
                        navigation.navigate("MyLoanDetails");
                    }}
                />
                <TabItem
                    label="Mandate"
                    isActive={selectedBottomTab === "Mandate"}
                    onPress={() => {
                        if (loanStatus === "Approved") {
                            setSelectedBottomTab("Mandate");
                            navigation.navigate("EMandate");
                        } else {
                            Alert.alert(
                                "Not Available",
                                "Mandate will be enabled after loan approval."
                            );
                        }
                    }}
                />

                <TabItem
                    label="Profile"
                    isActive={selectedBottomTab === "Profile"}
                    onPress={() => {
                        setSelectedBottomTab("Profile");
                        props.onProfilePress && props.onProfilePress();
                    }}
                />

            </View>
        </SafeAreaView>
    );
};

export default HomeFooter;