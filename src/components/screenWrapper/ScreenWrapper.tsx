import React, { useEffect, useState } from "react";
import {
    View,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    Text, Image,
    Keyboard,
    BackHandler
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./ScreenWrapper.style";
import { Colors } from "../../styles/colors";
import { BackIcon } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import ReviewModal from "../reviewModal/ReviewModal";

interface Props {
    children: React.ReactNode;
    backgroundColor?: string;
    barStyle?: "light-content" | "dark-content";
    scroll?: boolean;

    headerTitle?: string;
    showBack?: boolean;
    onBackPress?: () => void;
    useBackground?: boolean;
    enableReviewModal?: boolean;
    disableTopSafeArea?: boolean;
}

const ScreenWrapper: React.FC<Props> = ({
    children,
    backgroundColor = Colors.white,
    barStyle = "dark-content",
    scroll = false,

    headerTitle,
    showBack = false,
    onBackPress,
    useBackground = true,
    enableReviewModal = false,
    disableTopSafeArea = false,
}) => {
    const navigation = useNavigation();

    const [keyboardHeight, setKeyboardHeight] = useState(120);
    const Wrapper: any = scroll ? ScrollView : View;
    const [showReviewModal, setShowReviewModal] =
        useState(false);

    const handleBack = () => {
        // CUSTOM BACK
        if (onBackPress) {
            onBackPress();
            return true;
        }

        // SHOW REVIEW MODAL
        if (enableReviewModal) {
            setShowReviewModal(true);
            return true;
        }

        // NORMAL BACK
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            BackHandler.exitApp();
        }

        return true;
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBack
        );

        return () => backHandler.remove();
    }, [enableReviewModal]);

    useEffect(() => {
        const showEvent =
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";

        const hideEvent =
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const showSub = Keyboard.addListener(showEvent, (e) => {
            const height = e?.endCoordinates?.height ?? 0;
            setKeyboardHeight(height + 20); // small buffer
        });

        const hideSub = Keyboard.addListener(hideEvent, () => {
            setKeyboardHeight(120); // initial default
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);


    return (
        <>
            <SafeAreaView
                edges={disableTopSafeArea ? ["left", "right", "bottom"] : ["top", "left", "right", "bottom"]}
                style={[
                    styles.safeArea,
                    useBackground ? { backgroundColor } : null,
                ]}
            >

                <StatusBar
                    backgroundColor={useBackground ? backgroundColor : "transparent"}
                    barStyle={barStyle}
                />

                {(headerTitle || showBack) && (
                    <View style={styles.header}>

                        {showBack && (
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={handleBack}
                            >
                                <Image source={BackIcon} style={styles.backIcon} />
                            </TouchableOpacity>
                        )}

                        {headerTitle && (
                            <Text style={styles.headerTitle}>
                                {headerTitle}
                            </Text>
                        )}

                    </View>
                )}

                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >

                    <Wrapper
                        style={styles.container}
                        // contentContainerStyle={scroll ? { flexGrow: 1 } : undefined}
                        contentContainerStyle={
                            scroll
                                ? {
                                    flexGrow: 1,
                                    paddingBottom: keyboardHeight,//  important
                                }
                                : undefined
                        }
                        keyboardShouldPersistTaps="handled"
                    >
                        {children}
                    </Wrapper>

                </KeyboardAvoidingView>

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

export default ScreenWrapper;