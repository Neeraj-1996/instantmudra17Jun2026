import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { Fonts, FontSize } from "../../styles/fonts";
import { moderateScale } from "../../styles/responsive";

export default StyleSheet.create({

    safeArea: {
        flex: 1,
    },

    flex: {
        flex: 1,
    },

    container: {
        flex: 1,
        // margin: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    backBtn: {
        padding: moderateScale(5),
        marginRight: moderateScale(20),
    },

    backIcon: {
        width: moderateScale(30),
        height: moderateScale(30),
        resizeMode: "contain",
    },

    headerTitle: {
        fontSize: FontSize.FONT_18,
        fontFamily: Fonts.MEDIUM,
        color: Colors.black,
    },
});