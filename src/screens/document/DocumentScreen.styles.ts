import { StyleSheet } from "react-native";
import { moderateScale } from "../../styles/responsive";
import { Colors } from "../../styles/colors";
import { Fonts, FontSize } from "../../styles/fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        height: moderateScale(80),
        justifyContent: "flex-end",
        padding: moderateScale(20),
        backgroundColor: Colors.crimson,
    },

    headerText: {
        color: Colors.white,
        fontSize: FontSize.FONT_20,
        fontFamily: Fonts.BOLD,
    },

    content: {
        padding: moderateScale(20),
    },

    sectionTitle: {
        fontSize: FontSize.FONT_16,
        fontFamily: Fonts.REGULAR,
        color: Colors.gray33,
        marginTop: moderateScale(10),
    },

    divider: {
        height: moderateScale(1),
        backgroundColor: Colors.grayCC,
        marginVertical: moderateScale(10),
    },

    centerBox: {
        height: moderateScale(120),
        borderWidth: moderateScale(1),
        borderStyle: "dashed",
        borderColor: Colors.grayCC,
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
        marginVertical: moderateScale(10),
    },

    pdfIcon: {
        width: moderateScale(60),
        height: moderateScale(60),
        resizeMode: "contain",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: moderateScale(10),
    },

    smallBox: {
        width: "100%",
        height: moderateScale(110),
        borderWidth: moderateScale(1),
        borderStyle: "dashed",
        borderColor: Colors.grayCC,
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
    },

    centerBoxSmall: {
        height: moderateScale(110),
        marginTop: moderateScale(10),
        borderWidth: moderateScale(1),
        borderStyle: "dashed",
        borderColor: Colors.grayCC,
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
    },

    pdfIconSmall: {
        width: moderateScale(50),
        height: moderateScale(50),
    },

    label: {
        marginTop: moderateScale(5),
        fontSize: FontSize.FONT_13,
        fontFamily: Fonts.MEDIUM,
    },

    /* SELFIE */

    selfieText: {
        fontSize: FontSize.FONT_16,
        fontFamily: Fonts.REGULAR,
        marginTop: moderateScale(25),
        marginBottom: moderateScale(10),
    },

    selfieContainer: {
        width: moderateScale(160),
        height: moderateScale(160),
        borderRadius: moderateScale(12),
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: Colors.grayCC,
        marginBottom: moderateScale(20),
    },

    selfie: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.transparent,
    },

    cameraIcon: {
        width: moderateScale(40),
        height: moderateScale(40),
        zIndex: 2,
    },

    errorBorder: {
        borderColor: "red",
        borderWidth: moderateScale(2),
    },

    /* BUTTON */

    button: {
        height: moderateScale(55),
        borderRadius: moderateScale(30),
        justifyContent: "center",
        alignItems: "center",
        marginTop: moderateScale(20),
        backgroundColor: Colors.crimson,
    },

    buttonText: {
        color: Colors.white,
        fontSize: FontSize.FONT_16,
        fontFamily: Fonts.REGULAR,
    },
});

export default styles;
