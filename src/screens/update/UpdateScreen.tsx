import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Platform,
    Linking
} from "react-native";
import UpdateStyles from "./Update.styles";
import { Update } from "../../assets/images";
// import { Colors, Fonts } from "../../styles";
import { useDispatch } from "react-redux";
import GradientButton from "../../components/button/Button";
// import { skipAppUpdate } from "../../redux/slices/UpdateSlice";
// import CustomButton from "../../components/button/CustomButton";
// import AsyncStorageService from "../../services/AsyncStorageService";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";
import { moderateScale } from "../../styles/responsive";

const UpdateScreen = ({ route, navigation }: any) => {
    const dispatch = useDispatch<any>();

    const { currentVersion, deviceId, latestVersion, forceUpgrade } = route.params;

    //  MOVE STATE HERE (at top level)
    const [hasToken, setHasToken] = useState<boolean | null>(null);

    // const checkToken = async () => {
    //     const storedToken = await AsyncStorageService.getItem("token");
    //     setHasToken(!!storedToken); // true if token exists
    // };
    // Check token ONCE on screen load
    // useEffect(() => {
    //     checkToken();
    // }, []);

    // const handleSkip = async () => {
    //     const payload = {
    //         version: latestVersion,
    //         platform: Platform.OS,
    //         deviceId: deviceId,
    //     };

    //     await dispatch(skipAppUpdate(payload));

    //     const token = await AsyncStorageService.getItem("token");
    //     if (token) {
    //         navigation.replace("DrawerRoute");
    //     } else {
    //         navigation.replace("RootRoutes");
    //     }
    // };

    const handleUpdate = async () => {
        const iosUrl = "https://apps.apple.com/ca/app/teemlio/id6755470324";
        const androidUrl = "https://play.google.com/store/apps/details?id=com.instantmudra";

        const url = Platform.OS === "ios" ? iosUrl : androidUrl;

        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log("Don't know how to open this URL:", url);
        }
    };

    return (
        <ScrollView
            style={UpdateStyles.container}
        // contentContainerStyle={{ paddingBottom: 20 }}
        >
            <StatusBar backgroundColor={Colors.crimson} barStyle="light-content" />

            <View style={UpdateStyles.headerBar} />

            <View style={{ gap: 20, alignItems: "center" }}>
                <Image source={Update} style={UpdateStyles.image} resizeMode="contain" />

                <Text style={UpdateStyles.title}>A NEW UPDATE IS AVAILABLE!</Text>

                <Text style={UpdateStyles.currentVersion}>Current Version: {currentVersion}</Text>
                <Text style={UpdateStyles.latestVersion}>Latest Version: {latestVersion}</Text>

                <Text style={UpdateStyles.subTitle}>
                    Update Your Application to the Latest Version
                </Text>

                <Text style={UpdateStyles.description}>
                    Exciting New Features and Important Fixes are Here - All to Give You a
                    Smoother, Better Experience!
                </Text>

                <GradientButton
                    title="Update Now"
                    onPress={handleUpdate}
                    style={{
                        marginTop: 10,
                        width: moderateScale(300),
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default UpdateScreen;


