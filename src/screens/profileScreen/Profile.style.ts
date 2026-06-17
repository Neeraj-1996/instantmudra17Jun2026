import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#F5F5F5",
        flexGrow: 1,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
        elevation: 3,
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginBottom: 10,
    },

    name: {
        fontSize: 18,
        fontWeight: "700",
    },

    phone: {
        fontSize: 14,
        color: "#666",
    },

    detailCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        elevation: 2,
    },
});