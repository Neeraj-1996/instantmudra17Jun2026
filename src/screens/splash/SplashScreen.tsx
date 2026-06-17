import React, { useEffect, useState } from "react";
import { Image, View, Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

import {
    getApp,
    getApps,
    initializeApp,
} from "@react-native-firebase/app";

import {
    getMessaging,
    getToken,
    requestPermission,
    AuthorizationStatus,
} from "@react-native-firebase/messaging";

import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
import styles from "./Splash.style";
import { Colors } from "../../styles/colors";

import {
    LogoWithName,
    Splash1,
    Splash2,
    Splash3,
    Splash4,
    Splash5,
} from "../../assets/images";

import GradientBackground from "../../components/gradient/GradinetBackgorund";
import { useAppDispatch } from "../../redux/hooks";
import { checkAppUpdate, getUserStatus } from "../../redux/slices/userSlice";
import { handleUserNavigation } from "../../utils/navigationHelper";

// import { checkAppUpdate } from "../../redux/slices/UpdateSlice";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

const icons = [Splash1, Splash2, Splash3, Splash4, Splash5];

const SplashScreen = ({ navigation }: any) => {
    const [step, setStep] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        initializeApplication();
    }, []);

    const initializeFirebaseApp = async () => {
        try {
            const app =
                getApps().length === 0
                    ? await initializeApp(firebaseConfig)
                    : getApp();

            const messaging = getMessaging(app);

            const authStatus = await requestPermission(messaging);

            const enabled =
                authStatus === AuthorizationStatus.AUTHORIZED ||
                authStatus === AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log("Notification Permission Granted");
            }

            await getToken(messaging);
        } catch (error) {
            console.log("Firebase Init Error:", error);
        }
    };

    const checkForUpdate = async () => {
        try {
            const app_version = DeviceInfo.getVersion();
            const deviceId = await DeviceInfo.getUniqueId();
            const platform = Platform.OS;

            const apiResponse = await dispatch(
                checkAppUpdate({
                    app_version,
                    platform,
                    deviceId,
                })
            ).unwrap();

            const updateData = apiResponse?.version;

            // If backend says update required
            if (updateData?.status === false) {
                navigation.replace("UpdateScreen", {
                    currentVersion: app_version,
                    latestVersion:
                        updateData?.new_version ||
                        updateData?.latest_version ||
                        app_version,
                    message: updateData?.message,
                    forceUpgrade: true,
                    deviceId,
                    platform,
                });

                return false;
            }

            return true;
        } catch (error) {
            console.log("CHECK UPDATE ERROR:", error);
            return true;
        }
    };

    const initializeApplication = async () => {
        await initializeFirebaseApp();

        const canProceed = await checkForUpdate();

        if (canProceed) {
            await init();
        }
    };

    const init = async () => {
        try {
            const res = await dispatch(getUserStatus()).unwrap();

            handleUserNavigation(navigation, res.user_status);
        } catch (error) {
            navigation.replace("OnboardingScreen");
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => {
                if (prev === 5) {
                    clearInterval(timer);
                    return prev;
                }

                return prev + 1;
            });
        }, 600);

        return () => clearInterval(timer);
    }, []);

    const getIconStyle = () => {
        if (step <= 2) return styles.centerIcon;
        if (step === 3) return styles.topIcon;
        if (step === 4) return styles.bottomIcon;

        return styles.centerIcon;
    };

    if (step === 5) {
        return (
            <GradientBackground>
                <View style={styles.centerIcon}>
                    <Image
                        source={LogoWithName}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </GradientBackground>
        );
    }

    return (
        <ScreenWrapper
            backgroundColor={Colors.crimson}
            barStyle="light-content"
        >
            <View style={styles.container}>
                <Image
                    source={icons[step]}
                    style={[styles.icon, getIconStyle()]}
                    resizeMode="contain"
                />
            </View>
        </ScreenWrapper>
    );
};

export default SplashScreen;
