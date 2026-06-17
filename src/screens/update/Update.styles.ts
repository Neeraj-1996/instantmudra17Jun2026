import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { Fonts, FontSize } from "../../styles/fonts";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    headerBar: {
        // height: 65,
        backgroundColor: Colors.crimson,
    },
    image: {
        width: "100%",
        height: 239,
        marginTop: 40,
    },
    title: {
        textAlign: "center",
        fontFamily: Fonts.MEDIUM,
        fontSize: FontSize.FONT_13,
    },
    currentVersion: {
        fontFamily: Fonts.MEDIUM,
        textAlign: "center",
        fontSize: FontSize.FONT_12,
        color: Colors.gray6E,
    },
    latestVersion: {
        textAlign: "center",
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.MEDIUM,
        color: Colors.crimson,
    },
    subTitle: {
        textAlign: "center",
        fontSize: FontSize.FONT_16,
        fontFamily: Fonts.REGULAR,
        paddingHorizontal: 20,
        lineHeight: 20
    },
    description: {
        textAlign: "center",
        fontSize: FontSize.FONT_12,
        color: Colors.black,
        fontFamily: Fonts.MEDIUM,
        paddingHorizontal: 30,
        lineHeight: 24,
    },
    skipText: {
        textAlign: "center",
        fontSize: FontSize.FONT_13,
        fontFamily: Fonts.REGULAR,
        color: Colors.crimson,

    },
});

