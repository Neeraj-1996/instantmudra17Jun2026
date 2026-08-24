import { StyleSheet } from "react-native";

const PRIMARY = "#7B4397";

export default StyleSheet.create({
    safeArea: {
        backgroundColor: "transparent",
    },

    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        marginHorizontal: 16,
        marginBottom: 10,
        paddingVertical: 12,

        backgroundColor: "#fff",
        borderRadius: 30,

        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    tabItem: {
        alignItems: "center",
    },

    iconWrapper: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#F1F1F1",
        justifyContent: "center",
        alignItems: "center",
    },

    activeIconWrapper: {
        backgroundColor: "#EFE7FF",
    },

    iconText: {
        fontSize: 18,
    },

    activeIconText: {
        color: PRIMARY,
    },

    label: {
        fontSize: 12,
        marginTop: 2,
        color: "#999",
    },

    activeLabel: {
        color: PRIMARY,
        fontWeight: "600",
    },
});