import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

import { navigate } from "./navigationService";

PushNotification.createChannel(
    {
        channelId: "default-channel-id",
        channelName: "Default Channel",
        playSound: true,
        soundName: "default",
        importance: 4, // Importance.HIGH
        vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`)
);

export const setupNotificationNavigation = () => {

    // App is in foreground and a message arrives
    messaging().onMessage(async remoteMessage => {

        console.log(
            "🔥 Foreground FCM message received:",
            remoteMessage
        );

        PushNotification.localNotification({
            channelId: "default-channel-id",
            title: remoteMessage.notification?.title,
            message: remoteMessage.notification?.body || "",
            playSound: true,
            soundName: "default",
            userInfo: remoteMessage.data,
        });
    });

    // Tap on the local notification shown above (foreground)
    PushNotification.configure({
        onNotification: function (notification) {
            console.log("Local notification tapped:", notification);
            navigate("NotificationScreen");
        },
        requestPermissions: false,
    });

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