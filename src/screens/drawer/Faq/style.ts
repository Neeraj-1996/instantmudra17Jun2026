import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";

export default StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: Colors.white,
        height: '100%'
    },

    card: {
        backgroundColor: Colors.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 2,
    },

    activeCard: {
        borderColor: Colors.crimson,
        borderWidth: 1,
    },

    question: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1B263B",
        flex: 1,
    },

    icon: {
        fontSize: 14,
        color: Colors.crimson,
        marginLeft: 10,
    },

    answerBox: {
        backgroundColor: "#fff",
        padding: 14,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 1,
    },

    answer: {
        fontSize: 13,
        color: "#6C757D",
        lineHeight: 18,
    },
});