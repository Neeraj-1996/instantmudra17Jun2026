import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    Linking,
    TouchableOpacity,
    Alert,
} from "react-native";
import HomeStyle from "./Home.style";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import HomeFooter from "../../components/footer/HomeFooter";
import SlidMain from "../../components/slideMain/SlidMain";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../../components/gradient/GradinetBackgorund";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BankAccountVerify, getAccountDetail, getCurrentActiveLoan, getLoanStatus, getNotifications, getUserDetail, getZoopESignUrl } from "../../redux/slices/userSlice";
import { BellIcon, Rejected, HeadsetIcon } from "../../assets/images";
import { getDigiLockerUrl } from "../../redux/slices/userSlice";
import GradientButton from "../../components/button/Button";
import moment from "moment";
import { Colors } from "../../styles/colors";
import BankVerificationModal from "./verifyBankDetail/BankVerificationModal";
const STEPS = [
    "Loan Applied",
    "On Process",
    "Approved",
    "Disbursed",
];



const LoanListArray = [
    {
        title: "Loan Applied",
        subTitle: "Your Application is received",
        completedKey: STEPS,
    },
    {
        title: "On Process",
        subTitle: "Your Application is in process",
        completedKey: ["Processing", "Approved", "Sanction", "Payment"],
    },
    {
        title: "Approved",
        subTitle: "Loan Approved",
        completedKey: ["Approved", "Sanction", "Payment"],
    },
    {
        title: "Disbursed",
        subTitle: "Loan Disbursed Successfully",
        completedKey: ["Disbursed", "Payment"],
    },
];

const Home: React.FC<any> = ({ navigation }: any) => {

    const mapApiToUIStatus = (status: string) => {
        switch (status) {
            case "Processing":
                return "On Process";

            case "Approved":
            case "Sanction":
            case "Payment":
                return "Approved";

            case "Disbursed":
                return "Disbursed";

            case "Decline":
                return "Loan Applied";

            default:
                return "Loan Applied";
        }
    };

    const dispatch = useAppDispatch();
    const { loanStatus, loading, notificationCount } = useAppSelector(state => state.user);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            dispatch(getLoanStatus());
            dispatch(getNotifications());
            dispatch(getUserDetail());

        }
    }, [isFocused]);
    useEffect(() => {
        if (loanStatus?.order_id) {
            handleActiveLoan();
        }
    }, [loanStatus]);
    const { userDetail } = useAppSelector(state => state.user);

    const currentLoanStatus = mapApiToUIStatus(
        loanStatus?.loan_status || "Processing"
    );
    const [isLoading, setIsLoading] = useState(false);
    const [selectedBottomTab, setSelectedBottomTab] = useState("Home");
    const [activeLoan, setActiveLoan] = useState<any>(null);


    const isLoanLoaded = !!loanStatus;
    const isDisbursed = ["Disbursed", "Settled"].includes(loanStatus?.loan_status);
    const isActiveLoanLoaded = !!activeLoan;

    const [showBankModal, setShowBankModal] = useState(false);
    const [isBankVerifying, setIsBankVerifying] = useState(false);

    const [bankForm, setBankForm] = useState({
        accountHolder: "",
        accountNumber: "",
        ifsc: "",
        bankName: "",
    });

    const takeAccountDetail = async () => {
        const res = await dispatch(getAccountDetail());

        // console.log("res account detail", res);

        if (getAccountDetail.fulfilled.match(res)) {
            const account = res.payload?.data;

            setBankForm({
                accountHolder: account?.account_holder_name || "",
                accountNumber: account?.account_number || "",
                ifsc: account?.ifsc_code || "",
                bankName: account?.bank_name || "",
            });
        }
    };


    const shouldShowBankVerificationModal =
        currentLoanStatus === "Approved" &&
        loanStatus?.zoopesign_complete === "0" &&
        loanStatus?.zoopesign_url !== "0" &&
        loanStatus?.bank_status === "0";

    useFocusEffect(
        React.useCallback(() => {
            if (shouldShowBankVerificationModal) {
                setShowBankModal(true);
                takeAccountDetail();

                setBankForm({
                    accountHolder:
                        loanStatus?.bank_details?.account_holder || "",
                    accountNumber:
                        loanStatus?.bank_details?.account_number || "",
                    ifsc:
                        loanStatus?.bank_details?.ifsc || "",
                    bankName:
                        loanStatus?.bank_details?.bank_name || "",
                });
            } else {
                setShowBankModal(false);
            }
        }, [loanStatus, currentLoanStatus, shouldShowBankVerificationModal])
    );

    const handleVerifyBank = async (verification_id: "1" | "2") => {
        setIsBankVerifying(true);

        try {
            const res = await dispatch(
                BankAccountVerify({
                    account_number: bankForm.accountNumber,
                    order_id: loanStatus?.order_id,
                    verification_id,
                })
            );

            const response = res.payload as {
                status?: boolean;
                bank_status?: string;
                message?: string;
            };

            // console.log("Bank verification response:", response);

            // Only status 0 keeps modal open
            setShowBankModal(response?.bank_status === "0");

            if (response?.bank_status === "3") {
                // Alert.alert(
                //     "Verification Failed",
                //     response?.message || "Bank account verification failed"
                // );
            }

            dispatch(getLoanStatus());
        } catch (error) {
            console.log("Bank verification error:", error);

            // Alert.alert(
            //     "Verification Failed",
            //     "Something went wrong. Please try again."
            // );
        } finally {
            setIsBankVerifying(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    const getCurrentStage = () => {
        return (
            LoanListArray.find(item =>
                item.completedKey.includes(currentLoanStatus)
            ) || LoanListArray[0]
        );
    };
    const isCompleted = (step: string) => {
        if (currentLoanStatus === "Disbursed") {
            return true;
        }

        return STEPS.indexOf(step) <= STEPS.indexOf(currentLoanStatus);
    };

    const handleOpenDigiLocker = async () => {
        const res = await dispatch(getDigiLockerUrl());
        if (getDigiLockerUrl.fulfilled.match(res)) {
            const url = res.payload?.digilocker_url;
            if (url && url !== "0") {
                navigation.navigate("WebViewScreen", {
                    url: url,
                    title: "DigiLocker",
                });
            } else {
                console.log(" URL not found or invalid");
            }
        }
    };


    const handleActiveLoan = async () => {
        const orderId = loanStatus?.order_id;

        if (!orderId) {
            console.log("Order ID missing");
            return;
        }

        const res = await dispatch(getCurrentActiveLoan(orderId));
        console.log("res", res);

        if (getCurrentActiveLoan.fulfilled.match(res)) {
            const { data, emi_data } = res.payload;

            const activeLoanData =
                data && Object.keys(data).length > 0
                    ? data
                    : emi_data;

            setActiveLoan(activeLoanData);
        }
    };



    const handleOpenESign = async () => {
        const orderId = loanStatus?.order_id;

        if (!orderId) {
            console.log(" Order ID missing");
            return;
        }

        const res = await dispatch(getZoopESignUrl(orderId));

        if (getZoopESignUrl.fulfilled.match(res)) {

            const url = res.payload?.zoop_url;

            if (url && url !== "0") {
                try {
                    const supported = await Linking.canOpenURL(url);

                    if (supported) {
                        await Linking.openURL(url); // opens in Chrome / default browser
                    } else {
                        console.log("Can't open URL:", url);
                    }
                } catch (error) {
                    console.log("Error opening URL:", error);
                }
            } else {
                console.log("E-Sign URL not found");
            }
        }
    };

    const currentStage = getCurrentStage();
    const isDeclined = loanStatus?.loan_status === "Decline";
    return (
        <View style={HomeStyle.container}>

            {/* HEADER */}
            <GradientBackground style={HomeStyle.header}>
                <View style={HomeStyle.headerTop}>
                    <SafeAreaView>
                        <Text style={HomeStyle.greeting}>
                            Hello, {userDetail?.full_name || "User"}
                        </Text>
                    </SafeAreaView>

                    <View style={HomeStyle.bellWrapper}>
                        <Image
                            source={BellIcon}
                            style={HomeStyle.bellIcon}
                        />

                        {/* Notification Count */}
                        {notificationCount > 0 && (

                            <TouchableOpacity
                                style={HomeStyle.notificationBadge}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate("NotificationScreen")}
                            >
                                <Text style={HomeStyle.notificationCount}>
                                    {notificationCount}
                                </Text>
                            </TouchableOpacity>

                        )}
                    </View>
                </View>


                {/* SLIDER */}
                <View style={HomeStyle.sliderWrapper}>
                    <SlidMain />
                </View>
            </GradientBackground>

            {/* BODY */}
            <ScrollView style={HomeStyle.body} showsVerticalScrollIndicator={false}>
                {loading || !isLoanLoaded || (isDisbursed && !isActiveLoanLoaded) ? (
                    <ActivityIndicator size="large" style={{ marginTop: 50 }} color={Colors.crimson} />
                ) : (
                    <>
                        {isDeclined ? (
                            //  REJECTED UI
                            <>
                                {/* CARD 1 → ORDER ID */}
                                <View style={[HomeStyle.card, { flexDirection: "row", justifyContent: 'space-around', alignItems: 'center' }]}>
                                    <Text style={HomeStyle.statusTitleRejected}>
                                        Loan Rejected
                                    </Text>
                                    {loanStatus?.order_id ? (
                                        <Text style={HomeStyle.statusSub1}>
                                            Order ID: {loanStatus?.order_id}
                                        </Text>
                                    ) : null}
                                </View>

                                {/* CARD 2 → MESSAGE */}
                                <View style={HomeStyle.card}>
                                    <Image source={Rejected} style={HomeStyle.rejectedImage} />
                                    <Text style={HomeStyle.statusSub}>
                                        {loanStatus?.message}
                                    </Text>
                                </View>
                                <View style={HomeStyle.supportCard}>
                                    <View style={HomeStyle.supportLeft}>
                                        <View style={HomeStyle.supportIcon}>
                                            <Image
                                                source={HeadsetIcon}
                                                style={HomeStyle.smallIcon}
                                            />
                                        </View>

                                        <View style={HomeStyle.supportTextBox}>
                                            <Text
                                                style={HomeStyle.supportTitle}
                                            >
                                                Need Assistance?
                                            </Text>

                                            <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                                                <Text
                                                    style={HomeStyle.supportDesc}
                                                >

                                                    Our support team is available

                                                </Text>
                                                <Text style={HomeStyle.supportDesc}> for
                                                    help</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <TouchableOpacity
                                        style={HomeStyle.chatBtn}

                                        onPress={() =>
                                            navigation.navigate("ContactUsScreen")}
                                    >
                                        <Text style={HomeStyle.chatText}>
                                            Chat
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (loanStatus?.loan_status === "Disbursed" ||
                            loanStatus?.loan_status === "Settled") ? (

                            //  DISBURSED / SETTLED UI (LOAN DETAIL CARD)
                            <View style={HomeStyle.loanDetailCard}>
                                <Text style={HomeStyle.loanDetailTitle}>
                                    Active Loan
                                </Text>

                                <View style={HomeStyle.loanDetailRow}>
                                    <Text style={HomeStyle.loanDetailDue}>
                                        Due Date : {activeLoan?.due_date
                                            ? moment(activeLoan.due_date).format("DD-MM-YYYY")
                                            : "N/A"}
                                    </Text>
                                    <Text style={HomeStyle.loanDetailAmount}>
                                        ₹ {activeLoan?.total_payable_amount || 0}
                                    </Text>

                                </View>

                                <Text style={HomeStyle.loanDetailMsg}>
                                    {/* {loanStatus?.message} */}
                                    Paying EMI on time is the best way to improve your credit score.
                                    Don't miss your loan repayment.{' '}
                                </Text>

                                <GradientButton
                                    title="Loan Details"
                                    onPress={() => navigation.navigate("MyLoanDetails")}
                                    style={HomeStyle.loanDetailBtn}
                                />
                            </View>

                        ) : (
                            // NORMAL TIMELINE FLOW
                            <>
                                {/* STATUS CARD */}
                                <View style={[HomeStyle.card, { flexDirection: "row", justifyContent: 'space-around', alignItems: 'center' }]}>
                                    <Text style={HomeStyle.statusTitle}>
                                        {currentStage?.title}
                                    </Text>
                                    <Text style={HomeStyle.statusSub}>
                                        Order ID: {loanStatus?.order_id}
                                    </Text>
                                </View>

                                {/* TIMELINE */}
                                <View style={HomeStyle.timelineContainer}>
                                    {STEPS.map((step, index) => {
                                        const completed = isCompleted(step);
                                        const isCurrent = step === currentLoanStatus;

                                        return (
                                            <View key={index} style={HomeStyle.stepRow}>
                                                <View style={HomeStyle.timeline}>
                                                    <View
                                                        style={[
                                                            HomeStyle.circle,
                                                            completed && HomeStyle.completedCircle,
                                                            isCurrent && HomeStyle.currentCircle,
                                                        ]}
                                                    />

                                                    {index !== STEPS.length - 1 && (
                                                        <View
                                                            style={[
                                                                HomeStyle.line,
                                                                completed && HomeStyle.completedLine,
                                                            ]}
                                                        />
                                                    )}
                                                </View>

                                                <View style={HomeStyle.stepTextBox}>
                                                    <Text
                                                        style={[
                                                            HomeStyle.stepText,
                                                            completed && HomeStyle.completedText,
                                                        ]}
                                                    >
                                                        {step}
                                                    </Text>

                                                    {isCurrent && (
                                                        <View style={HomeStyle.badgeRow}>

                                                            <View style={HomeStyle.badgeRow}>
                                                                {step === "On Process" &&
                                                                    currentLoanStatus === "On Process" &&
                                                                    loanStatus?.digilocker_complete === "0" &&
                                                                    loanStatus?.digilocker_url !== "0" ? (
                                                                    <GradientButton
                                                                        title="Go To DigiLocker"
                                                                        onPress={handleOpenDigiLocker}
                                                                        textStyle={HomeStyle.digiBtnText}
                                                                        style={{ width: 130, height: 40, borderRadius: 30 }}
                                                                    />
                                                                ) : step === "Approved" &&
                                                                    currentLoanStatus === "Approved" &&
                                                                    loanStatus?.zoopesign_complete === "0" &&
                                                                    loanStatus?.zoopesign_url !== "0" ? (
                                                                    <GradientButton
                                                                        title="Go To E-Sign"
                                                                        onPress={handleOpenESign}
                                                                        textStyle={HomeStyle.digiBtnText}
                                                                        style={{ width: 100, height: 40, borderRadius: 30 }}
                                                                    />
                                                                ) : (
                                                                    <View style={HomeStyle.activeBadge}>
                                                                        <Text style={HomeStyle.activeText}>Processing</Text>
                                                                    </View>
                                                                )}
                                                            </View>


                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </>
                        )}
                    </>
                )}
            </ScrollView>

            {/* FOOTER */}
            <HomeFooter
                selectedBottomTab={selectedBottomTab}
                setSelectedBottomTab={setSelectedBottomTab}
                onProfilePress={() => navigation.openDrawer()}
                onHomePress={() => navigation.navigate("Home")}
                loanStatus={loanStatus?.loan_status}
            />


            <BankVerificationModal
                visible={showBankModal}
                onClose={() => handleVerifyBank("2")}
                bankForm={bankForm}
                setBankForm={setBankForm}
                onVerify={() => handleVerifyBank("1")}
                loading={isBankVerifying}
            />
        </View>
    );
};

export default Home;


{/* LEFT: PROCESSING BADGE */ }
{/* <View style={HomeStyle.activeBadge}>
                                                                <Text style={HomeStyle.activeText}>
                                                                    Processing
                                                                </Text>
                                                            </View> */}

{/* DIGILOCKER BUTTON */ }
{/* {step === "On Process" &&
                                                                currentLoanStatus === "On Process" &&
                                                                loanStatus?.digilocker_complete === "0" &&
                                                                loanStatus?.digilocker_url !== "0" && (

                                                                    <GradientButton
                                                                        title="Go To DigiLocker"
                                                                        onPress={handleOpenDigiLocker}
                                                                        textStyle={HomeStyle.digiBtnText}
                                                                        style={{ width: 130, height: 40, borderRadius: 30 }}
                                                                    />
                                                                )}

                                                     
                                                            {step === "Approved" &&
                                                                currentLoanStatus === "Approved" &&
                                                                loanStatus?.zoopesign_complete === "0" &&
                                                                loanStatus?.zoopesign_url !== "0" && (

                                                                    <GradientButton
                                                                        title="Go To E-Sign"
                                                                        onPress={handleOpenESign}
                                                                        textStyle={HomeStyle.digiBtnText}
                                                                        style={{ width: 100, height: 40, borderRadius: 30 }}
                                                                    />
                                                                )} */}