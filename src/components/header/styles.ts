import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { moderateScale } from "../../styles/responsive";
import { Fonts, FontSize } from "../../styles/fonts";

export default StyleSheet.create({
    safeArea: {
        width: "100%",
    },
    button: {
        height: moderateScale(60),
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        height: moderateScale(100),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: moderateScale(20),
    },

    title: {
        flex: 1,
        textAlign: "center",
        fontSize: FontSize.FONT_18,
        fontFamily: Fonts.MEDIUM,
        color: Colors.white,
    },

    iconBtn: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        backgroundColor: "rgba(255,255,255,0.2)",
        // justifyContent: "center",
        // alignItems: "center",
        // alignSelf: 'center',
    },

    icon: {
        width: moderateScale(40),
        height: moderateScale(40),
        resizeMode: "contain",
        tintColor: Colors.white,
    },
    icon1: {
        width: moderateScale(40),
        height: moderateScale(40),
        resizeMode: "contain",
        tintColor: Colors.white,
    },
    iconPlaceholder: {
        width: moderateScale(36),
    },

    badge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: Colors.white,
        borderRadius: moderateScale(10),
        paddingHorizontal: moderateScale(5),
        paddingVertical: moderateScale(1),
    },

    badgeText: {
        fontSize: FontSize.FONT_10,
        color: Colors.crimson,
        fontWeight: "700",
    },
});