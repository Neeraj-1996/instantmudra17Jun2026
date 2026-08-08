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
    registerDeviceForRemoteMessages,
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
        console.log("1. initializeFirebaseApp called");

        try {
            console.log("2. Before getApp");

            const app =
                getApps().length === 0
                    ? initializeApp(firebaseConfig)
                    : getApp();

            console.log("3. Firebase app ready");

            const messaging = getMessaging(app);

            console.log("4. Messaging instance created");

            if (Platform.OS === "ios") {
                console.log("5. Registering device...");
                await registerDeviceForRemoteMessages(messaging);
                console.log("6. Device registered");
            }

            console.log("7. Requesting permission...");

            const authStatus = await requestPermission(messaging);

            console.log("8. Permission:", authStatus);

            console.log("9. Getting token...");

            const token = await getToken(messaging);

            console.log("10. FCM Token:", token);
        } catch (err) {
            console.log("ERROR:", JSON.stringify(err));
            console.error(err);
        }
    };

    // const initializeFirebaseApp = async () => {
    //     try {
    //         const app =
    //             getApps().length === 0
    //                 ? initializeApp(firebaseConfig)
    //                 : getApp();

    //         const messaging = getMessaging(app);

    //         // Required on iOS
    //         if (Platform.OS === "ios") {
    //             await registerDeviceForRemoteMessages(messaging);
    //         }

    //         const authStatus = await requestPermission(messaging);

    //         const enabled =
    //             authStatus === AuthorizationStatus.AUTHORIZED ||
    //             authStatus === AuthorizationStatus.PROVISIONAL;

    //         if (!enabled) {
    //             console.log("Notification permission denied");
    //             return;
    //         }

    //         console.log("Notification Permission Granted");

    //         const token = await getToken(messaging);

    //         console.log("FCM Token:", token);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    const checkForUpdate = async () => {
        try {
            const app_version = DeviceInfo.getVersion();
            const deviceId = await DeviceInfo.getUniqueId();
            const platform = Platform.OS;
            console.log("DEVICE INFO:", { app_version, deviceId, platform });

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

        if (Platform.OS === "ios") {
            await init();
            return;
        }

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
