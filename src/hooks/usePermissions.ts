import { useCallback } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";

import {
    check,
    request,
    RESULTS,
    PERMISSIONS,
    openSettings,
    requestNotifications,
} from "react-native-permissions";

import {
    launchCamera,
    CameraOptions,
    Asset,
} from "react-native-image-picker";

interface CameraResponse {
    success: boolean;
    asset?: Asset;
}

const usePermissions = () => {

    // =========================
    // CAMERA PERMISSION
    // =========================

    const requestCameraPermission = useCallback(async () => {

        try {

            if (Platform.OS === "android") {

                const permission =
                    PermissionsAndroid.PERMISSIONS.CAMERA;

                const alreadyGranted =
                    await PermissionsAndroid.check(permission);

                if (alreadyGranted) {
                    return true;
                }

                const granted =
                    await PermissionsAndroid.request(permission, {
                        title: "Camera Permission",
                        message:
                            "App needs camera access to capture photos",
                        buttonPositive: "Allow",
                        buttonNegative: "Deny",
                    });

                if (
                    granted ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    return true;
                }

                Alert.alert(
                    "Permission Denied",
                    "Camera permission is required"
                );

                return false;

            } else {

                const result = await check(
                    PERMISSIONS.IOS.CAMERA
                );

                if (result === RESULTS.GRANTED) {
                    return true;
                }

                const requestResult = await request(
                    PERMISSIONS.IOS.CAMERA
                );

                if (requestResult === RESULTS.GRANTED) {
                    return true;
                }

                if (requestResult === RESULTS.BLOCKED) {

                    Alert.alert(
                        "Permission Blocked",
                        "Enable camera permission from settings",
                        [
                            {
                                text: "Cancel",
                                style: "cancel",
                            },
                            {
                                text: "Open Settings",
                                onPress: () => {
                                    openSettings();
                                },
                            },
                        ]
                    );
                }

                return false;
            }

        } catch (error) {

            console.log("CAMERA PERMISSION ERROR:", error);

            return false;
        }

    }, []);

    // =========================
    // NOTIFICATION PERMISSION
    // =========================

    const requestNotificationPermission =
        useCallback(async () => {

            try {

                if (Platform.OS === "android") {

                    if (Platform.Version < 33) {
                        return true;
                    }

                    const granted =
                        await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS
                                .POST_NOTIFICATIONS
                        );

                    return (
                        granted ===
                        PermissionsAndroid.RESULTS.GRANTED
                    );

                } else {

                    const { status } =
                        await requestNotifications([
                            "alert",
                            "sound",
                            "badge",
                        ]);

                    return status === RESULTS.GRANTED;
                }

            } catch (error) {

                console.log(
                    "NOTIFICATION PERMISSION ERROR:",
                    error
                );

                return false;
            }

        }, []);

    // =========================
    // OPEN CAMERA
    // =========================

    const takePhoto = useCallback(
        async (
            options?: CameraOptions
        ): Promise<CameraResponse> => {

            try {

                const hasPermission =
                    await requestCameraPermission();

                if (!hasPermission) {
                    return {
                        success: false,
                    };
                }

                const result = await launchCamera({
                    mediaType: "photo",
                    quality: 0.5,
                    saveToPhotos: true,
                    cameraType: "front",
                    ...options,
                });

                if (
                    result.didCancel ||
                    !result.assets?.length
                ) {
                    return {
                        success: false,
                    };
                }

                return {
                    success: true,
                    asset: result.assets[0],
                };

            } catch (error) {

                console.log("CAMERA ERROR:", error);

                return {
                    success: false,
                };
            }
        },
        [requestCameraPermission]
    );

    return {
        requestCameraPermission,
        requestNotificationPermission,
        takePhoto,
    };
};

export default usePermissions;