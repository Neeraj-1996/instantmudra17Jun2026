import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    ImageBackground,
    Share,
    Linking,
    Platform,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./SuccessScreen.styles";
import GradientBackground from "../../components/gradient/GradinetBackgorund";


import {
    SuccessIcon,
    ReferImage,
    PinkVector,
    WhiteVector,
} from "../../assets/images";
import GradientButton from "../../components/button/Button";

const SuccessScreen: React.FC = ({ navigation, route }: any) => {

    // Home
    const { orderId } = route.params || {};

    const handleNext = () => {
        navigation.replace("Home");
    };

    const handleReferShare = async () => {
        try {
            await Share.share({
                message: `Hey! 👋

I recently got a loan through Instant Mudra at just a 5.5% interest rate per month, and the process is quick and hassle-free.

If you also need an urgent loan or funds in an emergency, download the app now:

https://play.google.com/store/apps/details?id=com.instantmudra&pcampaignid=web_share`,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const openPlayStoreReview = () => {
        if (Platform.OS === 'android') {
            Linking.openURL('market://details?id=com.instantmudra').catch(() => {
                Linking.openURL('https://play.google.com/store/apps/details?id=com.instantmudra');
            });
        } else {
            // iOS app not available - inform the user
            Alert.alert(
                'Not available',
                "The Instant Mudra app isn't available on the iOS App Store yet."
            );
        }
    };

    return (
        <GradientBackground>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>

                    {/* TOP SUCCESS CARD */}
                    <View style={styles.topCard}>
                        <Image source={SuccessIcon} style={styles.icon} />

                        <Text style={styles.title}>
                            Congratulations, you have successfully submitted
                        </Text>
                        <Text style={styles.title}>your application.</Text>

                        <Text style={styles.subtitle}>
                            Please save your loan application ID:
                        </Text>

                        <Text style={styles.highlight}>
                            {orderId || "N/A"}
                        </Text>

                        <Text style={styles.subtitle}>
                            You may receive a call from our customer care team
                        </Text>
                        <Text style={styles.subtitle}>
                            to verify the details.
                        </Text>

                        <Text style={styles.lender}>LENDER</Text>
                        <Text style={styles.company}>
                            CHINTAMANI FINLEASE LTD
                        </Text>
                        <Text style={styles.rbi}>
                            (RBI Approved NBFC)
                        </Text>
                    </View>

                    {/*  FEEDBACK CARD (IMAGE BACKGROUND) */}
                    <ImageBackground
                        source={WhiteVector}
                        style={styles.feedbackCard}
                        imageStyle={styles.cardImage}
                    >
                        <Text style={styles.feedbackTitle}>
                            Rate your loan application experience?
                        </Text>

                        <Text style={styles.feedbackText}>
                            We’d love to know your feedback.
                        </Text>
                        <Text style={styles.feedbackText}>
                            Tell us, did your loan process smooth and hassle-free?
                        </Text>

                        {Platform.OS === 'ios' ? (
                            <GradientButton
                                title={'⭐ Write a Review'}
                                onPress={() => Alert.alert('Not available', "The Instant Mudra app isn't available on the iOS App Store yet.")}
                                style={styles.rateButton}
                                textStyle={styles.rateButtonText}
                                disabled={true}
                            />
                        ) : (
                            <GradientButton
                                title={'⭐ Write a Review'}
                                onPress={openPlayStoreReview}
                                style={styles.rateButton}
                                textStyle={styles.rateButtonText}
                            />
                        )}

                    </ImageBackground>

                    {/* REFER CARD (IMAGE BACKGROUND) */}
                    <ImageBackground
                        source={WhiteVector}
                        style={styles.referCard}
                        imageStyle={styles.cardImage}

                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.referTitle}>
                                Refer your friends & earn
                            </Text>
                            <Text style={styles.referTitle}>
                                Exciting Rewards!
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: "50%" }}>
                                    <TouchableOpacity
                                        style={styles.referBtn}
                                        onPress={handleReferShare}
                                    >
                                        <Text style={styles.referBtnText}>
                                            Refer Now
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "50%" }}>
                                    <Image source={ReferImage} style={styles.referImage} />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>

                    {/* DONE BUTTON */}
                    <TouchableOpacity style={styles.doneBtn} onPress={handleNext}>
                        <Text style={styles.doneText}>Done</Text>
                    </TouchableOpacity>

                </ScrollView>
            </SafeAreaView>
        </GradientBackground>
    );
};

export default SuccessScreen;