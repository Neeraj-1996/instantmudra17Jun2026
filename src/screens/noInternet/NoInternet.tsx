import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import styles from "./NoInternet.styles";
import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
import { InfoIconInternet, NoInternet, RoundArrow } from "../../assets/images";
// import CustomButton from "../../components/button/CustomButton";
import { Colors } from "../../styles/colors";
import { Fonts, FontSize } from "../../styles/fonts";
import { moderateScale } from "../../styles/responsive";
import LinearGradient from "react-native-linear-gradient";
// import { Colors, Fonts, FontSize, moderateScale } from "../../styles";

const NoInternetScreen = ({ onRetry, onOpenSettings }: any) => {
    return (
        <ScreenWrapper
        // showHeader={false}
        // showFooter={false}
        // disableScroll={true}
        // noSafeArea={false}
        >
            <View style={styles.container}>
                {/* Top Illustration */}
                <View style={styles.card}>
                    <Image
                        source={NoInternet}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Title */}
                <View style={styles.textSubTitle}>
                    <Text style={styles.title}>No Connection</Text>
                    <Text style={styles.subtitle}>You’re currently offline.</Text>
                    <Text style={styles.subtitle}>Please check your connection and try </Text>
                    <Text style={styles.subtitle}>again.</Text>
                </View>

                <TouchableOpacity onPress={onRetry} activeOpacity={0.8}>
                    <LinearGradient
                        colors={[Colors.pinkCB, Colors.pink73]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            height: moderateScale(44),
                            width: moderateScale(180),
                            borderRadius: moderateScale(24),
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: moderateScale(25),
                        }}
                    >
                        <Image
                            source={RoundArrow}
                            style={{
                                width: moderateScale(14),
                                height: moderateScale(14),
                                marginRight: moderateScale(8),
                                tintColor: Colors.white,
                            }}
                            resizeMode="contain"
                        />
                        <Text
                            style={{
                                color: Colors.white,
                                fontSize: FontSize.FONT_13,
                                fontFamily: Fonts.REGULAR,
                            }}
                        >
                            Try Again
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>

                {/* Try Again Button */}
                {/* <CustomButton
                    title="Try Again"
                    height={moderateScale(34)}
                    size={moderateScale(165)}
                    fontSize={FontSize.FONT_11}
                    onPress={onRetry}
                    icon={RoundArrow}
                    iconStyle={{ width: moderateScale(13), height: moderateScale(13), marginRight: moderateScale(8) }}
                    textStyle={{ fontFamily: Fonts.SEMIBOLD }}
                    color={Colors.PINK_74}
                    textColor={Colors.WHITE}
                /> */}


                {/* Settings */}
                <TouchableOpacity onPress={onOpenSettings}>
                    <Text style={styles.settings}>Settings</Text>
                </TouchableOpacity>

                {/* Tip Box */}
                <View style={styles.tipBox}>
                    <View style={styles.tipRow}>

                        {/* Icon */}
                        <View style={styles.iconWrapper}>
                            <Image source={InfoIconInternet} style={styles.infoIcon} />
                        </View>

                        {/* Text */}
                        <View style={{ flex: 1 }}>
                            <Text style={styles.tipTitle}>Connectivity Tip</Text>
                            <Text style={styles.tipText}>
                                Try turning Airplane Mode on and off to reset your connection.
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default NoInternetScreen;