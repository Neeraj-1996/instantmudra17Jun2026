import { StyleSheet } from "react-native";
import { moderateScale } from "../../styles/responsive";

const threeStyles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },

    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },

    subText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 4,
    },

    cardWrapper: {
        marginTop: 16,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        borderColor: "#ddd",
        borderWidth: 1,
        overflow: "hidden",
    },

    cardRow: {
        flexDirection: "row",
        width: "100%",
    },

    statusLineWrapper: {
        width: 5,
        backgroundColor: "transparent",
    },

    statusIndicator: {
        width: 5,
        flex: 1,
    },

    cardContentWrapper: {
        flex: 1,
    },

    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
    },

    cardContent: {
        paddingHorizontal: 16,
        paddingBottom: 12,
    },

    dateText: {
        fontSize: 16,
        flex: 1,
        marginLeft: 12,
    },

    statusText: {
        fontWeight: "bold",
        fontSize: 14,
    },

    total: {
        fontWeight: "bold",
        marginTop: 4,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    rowText: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    labelTextFooter: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },

    labelText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
        marginRight: 8
    },

    valueText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },

    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    cardFooterWrapper: {
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 20,
        marginHorizontal: 16,
    },

    field: {
        height: 40,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    fieldText: {
        fontWeight: "500",
        fontSize: 14,
        color: "green"
    },
    fieldText1: {
        fontWeight: "500",
        fontSize: 14,
        color: "green"
    },
    paymentText: {
        fontWeight: "500",
        fontSize: 22,
        color: "#000"
    },


    singleLoanCard: {
        width: "100%",
        borderColor: "green",
        borderWidth: 2,
        borderRadius: 8,
        padding: moderateScale(10),
        marginTop: moderateScale(20),
        marginBottom: moderateScale(30),
        backgroundColor: "#fff",
    },

    separator: {
        width: "100%",
        borderWidth: 0.3,
        opacity: 0.2,
        marginVertical: moderateScale(8),
    },

    highlightLabel: {
        color: "#596FB7",
    },

    highlightValue: {
        color: "#596FB7",
    },

    totalLabel: {
        fontWeight: "700",
    },

    totalValue: {
        fontWeight: "700",
        color: "red",
    },

    payButtonContainer: {
        marginTop: moderateScale(20),
    },

});

export default threeStyles;