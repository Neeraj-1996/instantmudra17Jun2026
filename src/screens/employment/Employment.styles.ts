import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { moderateScale } from "../../styles/responsive";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    container: {
        padding: 20,
        alignItems: "center",
    },

    backBtn: {
        alignSelf: "flex-start",
        marginBottom: 10,
    },

    backIcon: {
        width: 22,
        height: 22,
    },

    topImage: {
        width: 140,
        height: 140,
        marginBottom: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#000",
        textAlign: "center",
        marginBottom: 6,
    },

    subtitle: {
        textAlign: "center",
        color: "#7A869A",
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 5,
        color: "#000",
    },

    dropdown: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        // padding: 14,
        marginBottom: 15,
        justifyContent: "center",
    },

    dropdownText: {
        color: "#555",
    },

    row: {
        flexDirection: "row",
        gap: 10,
        width: "100%",
    },

    button: {
        width: moderateScale(300),
        marginTop: 20,

    },
});