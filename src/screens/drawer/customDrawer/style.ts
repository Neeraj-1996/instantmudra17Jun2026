import { StyleSheet } from "react-native";
import { moderateScale } from "../../../styles/responsive";
import { Colors } from "../../../styles/colors";
import { Fonts, FontSize } from "../../../styles/fonts";

const styles = StyleSheet.create({
    header: {
        height: moderateScale(180),
        padding: moderateScale(20),
        justifyContent: "center",
    },

    backBtn: {
        position: "absolute",
        top: moderateScale(40),
        left: moderateScale(15),
    },

    profileRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: moderateScale(40),
    },

    avatar: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(30),
        marginRight: moderateScale(15),
    },

    name: {
        color: Colors.white,
        fontSize: FontSize.FONT_18,
        fontFamily: Fonts.BOLD,
    },

    subName: {
        color: Colors.white,
        opacity: 0.8,
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.REGULAR,
    },

    editBtn: {
        position: "absolute",
        right: moderateScale(20),
        top: moderateScale(80),
        backgroundColor: "rgba(255,255,255,0.2)",
        padding: moderateScale(10),
        borderRadius: moderateScale(20),
    },

    menuContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopLeftRadius: moderateScale(25),
        borderTopRightRadius: moderateScale(25),
        marginTop: moderateScale(-20),
        paddingTop: moderateScale(20),
        paddingHorizontal: moderateScale(20),
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: moderateScale(15),
    },

    menuText: {
        fontSize: FontSize.FONT_16,
        color: "#2D3748",
        fontFamily: Fonts.MEDIUM,
    },

    versionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: moderateScale(30),
    },

    versionText: {
        marginLeft: moderateScale(8),
        color: "#666",
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.REGULAR,
    },

    menuIcon: {
        width: moderateScale(24),
        height: moderateScale(24),
        marginRight: moderateScale(15),
        resizeMode: "contain",
    },
});

export default styles;