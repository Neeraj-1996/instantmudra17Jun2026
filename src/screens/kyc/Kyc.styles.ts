import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { Fonts, FontSize } from "../../styles/fonts";
import { moderateScale } from "../../styles/responsive";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    container: {
        padding: moderateScale(20),
        alignItems: "center",
    },

    backBtn: {
        alignSelf: "flex-start",
        marginBottom: moderateScale(20),
    },

    backIcon: {
        width: moderateScale(40),
        height: moderateScale(40),
    },

    topImage: {
        width: moderateScale(140),
        height: moderateScale(140),
        marginBottom: moderateScale(10),
    },

    IdImage: {
        width: moderateScale(60),
        height: moderateScale(40),
        marginBottom: moderateScale(10),
    },

    title: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.BOLD,
        color: Colors.black,
        marginBottom: moderateScale(6),
    },

    subtitle: {
        textAlign: "center",
        color: Colors.gray,
        marginBottom: moderateScale(20),
        fontSize: moderateScale(14),
    },

    uploadBox: {
        width: "100%",
        height: moderateScale(110),
        borderWidth: moderateScale(1),
        borderStyle: "dashed",
        borderColor: Colors.gray6E,
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
    },

    uploadText: {
        color: Colors.black,
        fontSize: moderateScale(14),
    },

    uploadImage: {
        width: "100%",
        height: "100%",
        borderRadius: moderateScale(10),
    },

    row: {
        marginBottom: moderateScale(15),
        flexDirection: "row",
        gap: moderateScale(10),
        width: "100%",
    },

    selfieText: {
        fontSize: moderateScale(FontSize.FONT_14),
        fontFamily: Fonts.REGULAR,
        alignSelf: "flex-start",
        marginBottom: moderateScale(10),
        color: Colors.gray6E,
    },

    selfieBox: {
        width: moderateScale(150),
        height: moderateScale(150),
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(20),
    },

    button: {
        width: moderateScale(300),
        marginTop: moderateScale(20),
    },

    selfieContainer: {
        width: moderateScale(160),
        height: moderateScale(160),
        borderRadius: moderateScale(12),
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
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
        tintColor: Colors.white,
        zIndex: 2,
    },
});