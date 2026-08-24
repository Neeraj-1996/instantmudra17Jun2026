import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    BackHandler,
    StatusBar,
} from "react-native";
import styles from "./styles";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BackIcon, BellIcon } from "../../assets/images";
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from "../../styles/colors";
import { StackActions } from '@react-navigation/native';
import ReviewModal from "../reviewModal/ReviewModal";

interface HeaderProps {
    title?: string;
    navigation: any;
    showBack?: boolean;
    showNotification?: boolean;
    notificationCount?: number;
    notificationScreen?: string; // optional custom screen
    enableReviewModal?: boolean;// optional custom screen
}

const Header: React.FC<HeaderProps> = ({
    title = "Title",
    navigation,
    showBack = true,
    enableReviewModal = false,
    showNotification = true,
    notificationCount = 0,
    notificationScreen = "Notifications",
}) => {

    const [showReviewModal, setShowReviewModal] =
        useState<boolean>(false);
    const insets = useSafeAreaInsets();

    const onBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.dispatch(StackActions.pop(1));
        } else {
            if (enableReviewModal) {
                setShowReviewModal(true);
            } else {
                BackHandler.exitApp();
            }
        }

        return true;
    };
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onBackPress
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const backAction = () => {
            if (navigation.canGoBack()) {
                navigation.dispatch(StackActions.pop(1));
            } else {
                BackHandler.exitApp();
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
            />

            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0.2 }}
                locations={[0, 0.6, 1]}
                colors={[Colors.pinkCB, Colors.magenta, Colors.crimson]}
                style={[styles.statusGradient, { height: insets.top + 60 }]}
            />

            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
                    locations={[0, 0.6, 1]}
                    colors={[Colors.pinkCB, Colors.magenta, Colors.crimson]} style={styles.button}>

                    {/* BACK BUTTON */}
                    <View style={styles.container}>
                        {/* LEFT: BACK BUTTON */}
                        {showBack ? (
                            <TouchableOpacity onPress={onBackPress} style={styles.iconBtn}>
                                <Image source={BackIcon} style={styles.icon1} />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.iconPlaceholder} />
                        )}

                        {/* TITLE (NOW IN SAME ROW) */}
                        <Text style={styles.title}>{title}</Text>

                        {/* RIGHT SPACE (to balance layout) */}
                        <View style={styles.iconPlaceholder} />
                    </View>
                </LinearGradient>
            </SafeAreaView>

            <ReviewModal
                visible={showReviewModal}
                onClose={() =>
                    setShowReviewModal(false)
                }
            />
        </>
    );
};

export default Header;