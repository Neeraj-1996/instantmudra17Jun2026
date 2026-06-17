import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },

    listContainer: {
        padding: 16,
    },

    card: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        marginBottom: 10,
        elevation: 2,
        flexDirection: "row",
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#DC2430",
        marginRight: 10,
        marginTop: 5,
    },

    content: {
        flex: 1,
    },

    title: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1B263B",
    },

    message: {
        fontSize: 13,
        color: "#6C757D",
        marginTop: 4,
    },

    time: {
        fontSize: 11,
        color: "#999",
        marginTop: 6,
    },

    emptyText: {
        textAlign: "center",
        marginTop: 50,
        color: "#999",
    },
});