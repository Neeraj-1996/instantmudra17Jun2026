import React, { FC, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "./InitialScreen.styles";
import CustomSlider from "../../components/customSlider/Slider";
import {
    CashIcon,
    FileIcon,
    FlashIcon,
    ShieldIcon,
    WalletIcon,
    HeadsetIcon,
    loanAmount
} from "../../assets/images";
// import HeadsetIcon from '../../assets/images';
// import HeadsetIcon from "../../assets/images/HeadsetIcon.png";
import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
import GradientButton from "../../components/button/Button";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getLoanCalculation } from "../../redux/slices/userSlice";
import { DigitalProcess, LowInterest, MinimalDocumentation, PaperLessProcess, QuickDisbursal, Transparent, WalletIcon1 } from "../../assets/images";

const InitialScreen: FC = ({ navigation, route }: any) => {
    const [loanAmount, setLoanAmount] = useState(30000);
    const { email = "" } = route?.params || {};
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getLoanCalculation(loanAmount));
    }, [loanAmount]);

    const features = [
        { title: "Low Interest", icon: LowInterest },
        { title: "Quick Disbursal", icon: QuickDisbursal },
        { title: "Paperless", icon: PaperLessProcess },
    ];

    const benefits = [
        { title: "100% Digital", icon: DigitalProcess },
        { title: "Minimal Docs", icon: MinimalDocumentation },
        { title: "Transparent Process", icon: Transparent },
    ];

    return (
        <ScreenWrapper useBackground scroll disableTopSafeArea barStyle="light-content">
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            {/* TOP PURPLE HEADER */}
            <LinearGradient
                colors={["#7B2FF7", "#F107A3"]}
                style={styles.headerCard}
            >
                {/* <Text style={styles.welcome}>Hi, Welcome!</Text> */}
                <Text style={styles.title}>Get Instant Loan</Text>
                <Text style={styles.subtitle}>
                    Simple. Fast. Hassle-free.
                </Text>

                <Image source={WalletIcon1} style={styles.headerIcon} />
            </LinearGradient>

            {/* LOAN CARD */}
            <View style={styles.loanCard}>
                <Text style={styles.loanLabel}>Loan Amount</Text>

                <Text style={styles.amount}>
                    ₹{loanAmount.toLocaleString()}
                </Text>

                <CustomSlider
                    value={loanAmount}
                    minimumValue={3000}
                    maximumValue={30000}
                    step={1000}
                    onValueChange={(amount: number) =>
                        setLoanAmount(amount)
                    }
                    trackHeight={8}
                    thumbSize={34}
                    renderThumb={() => (
                        <View style={styles.sliderThumb}>
                            <Text style={styles.thumbText}>₹</Text>
                        </View>
                    )}
                />

                <View style={styles.rangeRow}>
                    <Text style={styles.amount1}>₹3,000</Text>
                    <Text style={styles.amount1}>₹30,000</Text>
                </View>

                {/* FEATURES */}
                <View style={styles.featureRow}>
                    {features.map((item, index) => (
                        <View key={index} style={styles.featureCard}>
                            <Image
                                source={item.icon}
                                // style={styles.featureIcon}
                                style={[
                                    styles.featureIcon,

                                    index === 2 && {
                                        width: 60,
                                        height: 60,
                                    },
                                ]}
                                resizeMode="cover"
                            />
                            <Text style={styles.featureText}>
                                {item.title}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.compareCard}>
                    <Text style={styles.compareTitle}>
                        Why pay <Text style={styles.redText}>30% interest</Text> per month{"\n"}
                        when u get <Text style={styles.greenText}>5.5% interest</Text> per month{"\n"}
                        with <Text style={styles.brandText}>Instant Mudra</Text>
                    </Text>

                    <View style={styles.compareRow}>
                        {/* Other Lenders */}
                        <View style={styles.compareBoxRed}>
                            <Text style={styles.boxLabel}>Other Lenders</Text>
                            <Text style={styles.redPercent}>30%</Text>
                            <Text style={styles.perMonth}>per month</Text>
                        </View>

                        <View style={styles.vsCircle}>
                            <Text style={styles.vsText}>VS</Text>
                        </View>

                        {/* Instant Mudra */}
                        <View style={styles.compareBoxGreen}>
                            <Text style={styles.boxLabel}>Instant Mudra</Text>
                            <Text style={styles.greenPercent}>5.5%</Text>
                            <Text style={styles.perMonth}>per month</Text>
                        </View>
                    </View>

                    <LinearGradient
                        colors={["#8A2BE2", "#5B00FF"]}
                        style={styles.saveBanner}
                    >
                        <Text style={styles.saveText}>
                            ✓ Save more. Pay less. Grow better.
                        </Text>
                    </LinearGradient>
                </View>





                <GradientButton
                    title="Apply Now"
                    onPress={() =>
                        navigation.navigate(
                            "KycScreen",
                            email ? { email } : undefined
                        )
                    }
                    style={styles.applyBtn}
                />
            </View>

            {/* SUPPORT */}
            <View style={styles.supportCard}>
                <View style={styles.supportLeft}>
                    <View style={styles.supportIcon}>
                        <Image
                            source={HeadsetIcon}
                            style={styles.smallIcon}
                        />
                    </View>

                    <View style={styles.supportTextBox}>
                        <Text
                            style={styles.supportTitle}
                        >
                            Need Assistance?
                        </Text>

                        <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
                            <Text
                                style={styles.supportDesc}
                            >

                                Our support team is available

                            </Text>
                            <Text style={styles.supportDesc}> for
                                help</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.chatBtn}

                    onPress={() =>
                        navigation.navigate("ContactUsScreen")}
                >
                    <Text style={styles.chatText}>
                        Chat
                    </Text>
                </TouchableOpacity>
            </View>


            {/* WHY CHOOSE US */}
            <View style={styles.whyCard}>
                <Text style={styles.sectionTitle}>
                    Why Choose Us?
                </Text>

                <View style={styles.benefitRow}>
                    {benefits.map((item, index) => (
                        <View key={index} style={styles.benefitCard}>
                            <Image
                                source={item.icon}
                                style={styles.benefitIcon}
                            />
                            <Text style={styles.benefitText}>
                                {item.title}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            {/* </ScrollView> */}
        </ScreenWrapper>
    );
};

export default InitialScreen;

// import React, { FC, useEffect, useState } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     ScrollView,
// } from "react-native";

// import LinearGradient from "react-native-linear-gradient";
// import styles from "./InitialScreen.styles";
// import CustomSlider from "../../components/customSlider/Slider";
// import { CashIcon, FileIcon, FlashIcon, HeadsetIcon, loanAmount, ShieldIcon, WalletIcon } from "../../assets/images";
// import Header from "../../components/header/Header";
// import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { getLoanCalculation } from "../../redux/slices/userSlice";
// import GradientButton from "../../components/button/Button";

// interface FeatureItem {
//     title: string;
//     icon: any;
//     bg: string;
// }

// interface TabItemProps {
//     icon: any;
//     label: string;
//     active?: boolean;
// }

// const features: FeatureItem[] = [
//     {
//         title: "Instant Approval",
//         icon: FlashIcon,
//         bg: "#6FD3D0",
//     },
//     {
//         title: "Minimal Documentation",
//         icon: FileIcon,
//         bg: "#F57AA7",
//     },
//     {
//         title: "Secure Verification",
//         icon: ShieldIcon,
//         bg: "#C89BFF",
//     },
//     {
//         title: "Fast Disbursal",
//         icon: CashIcon,
//         bg: "#6FD3D0",
//     },
// ];


// const InitialScreen: FC = ({ navigation }: any) => {
//     const [LoanAmount, setLoanAmount] = useState(3000);


//     const dispatch = useAppDispatch();
//     const { calculation, loading } = useAppSelector((state) => state.user);


//     useEffect(() => {
//         dispatch(getLoanCalculation(LoanAmount));
//     }, [LoanAmount]);


//     return (
//         <ScreenWrapper showBack={true} scroll useBackground={true} enableReviewModal>
//             {/* HEADER */}
//             <View style={styles.topCard}>
//                 <Text style={styles.heading}>
//                     Apply for Personal Loan
//                 </Text>
//                 <Text style={styles.subHeading}>
//                     why Pay{" "}
//                     <Text style={styles.highlightOne}>
//                         1 %
//                     </Text>{" "}
//                     per day when you got a loan at{" "}
//                     <Text style={styles.highlightTwo}>
//                         0.18%
//                     </Text>{" "}
//                     per day with Instant Mudra
//                 </Text>
//             </View>

//             {/* AMOUNT CARD */}
//             <View style={styles.amountCard}>
//                 <View style={styles.amountIcon}>
//                     <Image
//                         source={WalletIcon}
//                         style={styles.smallIcon}
//                     />
//                 </View>

//                 <Text style={styles.requestLabel}>
//                     REQUESTED AMOUNT
//                 </Text>

//                 <Text style={styles.amount}>
//                     ₹{LoanAmount.toLocaleString()}
//                 </Text>


//                 <CustomSlider
//                     value={LoanAmount}
//                     minimumValue={3000}
//                     maximumValue={30000}
//                     step={1000}
//                     onValueChange={(amount: number) => setLoanAmount(amount)}
//                     trackHeight={13}
//                     thumbSize={40}
//                     renderThumb={() => (
//                         <View
//                             style={{
//                                 width: 33,
//                                 height: 33,
//                                 borderRadius: 20,
//                                 backgroundColor: '#DC2430',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 borderWidth: 2,
//                                 borderColor: '#fff',
//                                 shadowColor: '#000',
//                                 shadowOffset: { width: 0, height: 2 },
//                                 shadowOpacity: 0.4,
//                                 shadowRadius: 3,
//                                 elevation: 5,
//                             }}>
//                             <Text style={{ color: '#fff', fontSize: 20 }}>₹</Text>
//                         </View>
//                     )} />

//             </View>

//             {/* FEATURES */}
//             <View style={styles.featureContainer}>
//                 {features.map(
//                     (
//                         item: FeatureItem,
//                         index: number
//                     ) => (
//                         <View
//                             style={styles.featureCard}
//                             key={index}
//                         >
//                             <View style={styles.featureIcon}>
//                                 <Image
//                                     source={item.icon}
//                                     style={
//                                         styles.featureImage
//                                     }
//                                 />
//                             </View>

//                             <Text style={styles.featureText}>{item.title}</Text>
//                         </View>
//                     )
//                 )}
//             </View>

//             {/* SUPPORT */}
//             <View style={styles.supportCard}>
//                 <View style={styles.supportLeft}>
//                     <View style={styles.supportIcon}>
//                         <Image
//                             source={HeadsetIcon}
//                             style={styles.smallIcon}
//                         />
//                     </View>

//                     <View style={styles.supportTextBox}>
//                         <Text
//                             style={styles.supportTitle}
//                         >
//                             Need Assistance?
//                         </Text>

//                         <Text
//                             style={styles.supportDesc}
//                         >
//                             Our support team is available for
//                             help
//                         </Text>
//                     </View>
//                 </View>

//                 <TouchableOpacity
//                     style={styles.chatBtn}

//                     onPress={() =>
//                         navigation.navigate("ContactUsScreen")}
//                 >
//                     <Text style={styles.chatText}>
//                         Chat
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             <GradientButton
//                 title="Apply Now"
//                 onPress={() =>
//                     navigation.navigate("KycScreen")}
//                 style={styles.button}
//             />


//         </ScreenWrapper>
//     );
// };

// export default InitialScreen;