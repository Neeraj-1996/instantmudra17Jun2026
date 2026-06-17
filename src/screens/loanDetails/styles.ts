import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },

    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 10,
        backgroundColor: "#fff",
    },

    tabItem: {
        alignItems: "center",
    },

    tabText: {
        fontSize: 14,
        color: "#6C757D",
    },

    activeTabText: {
        color: "#DC2430",
        fontWeight: "600",
    },

    activeLine: {
        marginTop: 4,
        height: 3,
        width: 60,
        backgroundColor: "#DC2430",
        borderRadius: 2,
    },

    statusBadge: {
        backgroundColor: "#FFEAEA",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: "flex-start",
        marginBottom: 10,
    },
    cardContent: {},
    emptyText: {
        textAlign: "center",
        marginTop: 40,
        color: "#999",
    },
    loanCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        elevation: 3,
        alignItems: "center",
    },

    leftBox: {
        width: 90,
        height: 70,
        backgroundColor: "#FDECEC",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    statusText: {
        color: "#DC2430",
        fontSize: 12,
        fontWeight: "700",
        textAlign: "center",
    },

    rightContent: {
        flex: 1,
    },

    label: {
        fontSize: 13,
        color: "#6C757D",
    },

    amount: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1B263B",
        marginTop: 2,
    },

    date: {
        fontSize: 12,
        color: "#999",
        marginTop: 4,
    },
});