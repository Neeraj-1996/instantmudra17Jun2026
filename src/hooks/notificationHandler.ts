import messaging from
    "@react-native-firebase/messaging";

import { navigate } from "./navigationService";

export const setupNotificationNavigation = () => {

    // App opened from background
    messaging().onNotificationOpenedApp(
        remoteMessage => {

            console.log(
                "Notification caused app to open from background:",
                remoteMessage
            );

            navigate("NotificationScreen");
        }
    );

    // App opened from quit state
    messaging()
        .getInitialNotification()
        .then(remoteMessage => {

            if (remoteMessage) {

                console.log(
                    "Notification caused app to open from quit state:",
                    remoteMessage
                );

                navigate("NotificationScreen");
            }
        });
};