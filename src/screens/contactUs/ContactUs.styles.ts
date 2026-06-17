import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { moderateScale } from "../../styles/responsive";
import { Fonts, FontSize } from "../../styles/fonts";

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.background,
        padding: moderateScale(15),
        borderRadius: moderateScale(16),
        marginBottom: moderateScale(15),
    },

    iconCircle: {
        width: moderateScale(45),
        height: moderateScale(45),
        borderRadius: moderateScale(25),
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
        marginRight: moderateScale(12),
    },

    icon: {
        fontSize: FontSize.FONT_20,
    },

    cardContent: {
        flex: 1,
    },

    cardLabel: {
        color: Colors.grayDD,
        fontSize: FontSize.FONT_13,
    },

    cardValue: {
        color: Colors.white,
        fontSize: FontSize.FONT_16,
        fontFamily: Fonts.REGULAR,
        marginTop: moderateScale(2),
    },

    inputContainer: {
        marginTop: moderateScale(10),
        marginBottom: moderateScale(20),
    },

    label: {
        color: Colors.white,
        marginBottom: moderateScale(8),
        fontSize: FontSize.FONT_14,
    },

    textArea: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        padding: moderateScale(12),
        height: moderateScale(120),
        textAlignVertical: "top",
        fontSize: FontSize.FONT_14,
    },

    button: {
        backgroundColor: "#111",
        padding: moderateScale(14),
        borderRadius: moderateScale(12),
        alignItems: "center",
    },

    buttonText: {
        color: Colors.white,
        fontSize: FontSize.FONT_16,
        fontFamily: Fonts.REGULAR,
    },
});

export default styles;