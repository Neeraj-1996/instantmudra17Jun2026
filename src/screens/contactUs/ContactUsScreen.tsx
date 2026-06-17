import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Linking,
    Alert,
} from "react-native";

import GradientBackground from "../../components/gradient/GradinetBackgorund";
import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
import styles from "./ContactUs.styles";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { trackAppMessage } from "../../redux/slices/userSlice";
import Loader from "../../components/loader/Loader";

const ContactUsScreen: React.FC = ({ navigation }: any) => {
    const [message, setMessage] = useState<string>("");

    const phoneNumber = "7290077011";
    const email1 = "hello@instantmudra.com";
    const email2 = "sales@instantmudra.com";

    const handleCall = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleEmail = (email: string) => {
        Linking.openURL(`mailto:${email}`);
    };

    // const handleSubmit = () => {
    //     if (!message.trim()) {
    //         Alert.alert("Error", "Please enter your message");
    //         return;
    //     }

    //     Alert.alert("Success", "Message sent!");
    //     setMessage("");
    // };

    const dispatch = useDispatch<any>();

    const loading = useSelector(
        (state: any) => state.user.loading
    );

    const handleSubmit = async () => {
        if (!message.trim()) {
            Alert.alert("Error", "Please enter your message");
            return;
        }

        try {
            const response = await dispatch(
                trackAppMessage({
                    message: message,
                })
            ).unwrap();

            Alert.alert(
                "Success",
                response?.message || "Message sent successfully"
            );

            setMessage("");
        } catch (error: any) {
            Alert.alert(
                "Error",
                error?.message || "Failed to send message"
            );
        }
    };


    return (
        <GradientBackground>
            <Header title="Contact Us" navigation={navigation} showBack={true} showNotification={false} />
            <ScreenWrapper showBack={false} scroll useBackground={false} >
                <View style={{ margin: 30 }}>
                    <Loader showLoader={loading} />
                    {/* 📞 PHONE CARD */}
                    <TouchableOpacity style={styles.card} onPress={handleCall}>
                        <View style={styles.iconCircle}>
                            <Text style={styles.icon}>📞</Text>
                        </View>

                        <View style={styles.cardContent}>
                            <Text style={styles.cardLabel}>Call Us</Text>
                            <Text style={styles.cardValue}>{phoneNumber}</Text>
                        </View>
                    </TouchableOpacity>

                    {/*  EMAIL CARD 1 */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handleEmail(email1)}
                    >
                        <View style={styles.iconCircle}>
                            <Text style={styles.icon}>✉️</Text>
                        </View>

                        <View style={styles.cardContent}>
                            <Text style={styles.cardLabel}>Email Support</Text>
                            <Text style={styles.cardValue}>{email1}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* EMAIL CARD 2 */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handleEmail(email2)}
                    >
                        <View style={styles.iconCircle}>
                            <Text style={styles.icon}>📩</Text>
                        </View>

                        <View style={styles.cardContent}>
                            <Text style={styles.cardLabel}>Sales</Text>
                            <Text style={styles.cardValue}>{email2}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* ✍️ MESSAGE BOX */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Your Message</Text>

                        <TextInput
                            style={styles.textArea}
                            placeholder="Write your message here..."
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={6}
                            value={message}
                            onChangeText={setMessage}
                        />
                    </View>

                    {/*  SUBMIT */}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Send Message</Text>
                    </TouchableOpacity>
                </View>
            </ScreenWrapper>
        </GradientBackground>
    );
};

export default ContactUsScreen;