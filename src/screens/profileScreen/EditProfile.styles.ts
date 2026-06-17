import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    container: {
        padding: 20,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    backIcon: {
        width: 22,
        height: 22,
        marginRight: 10,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
    },

    imageWrapper: {
        alignSelf: "center",
        marginBottom: 20,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },

    calendarIcon: {
        position: "absolute",
        right: 15,
        top: 18,
        width: 20,
        height: 20,
    },

    button: {
        marginTop: 20,
    },
});
