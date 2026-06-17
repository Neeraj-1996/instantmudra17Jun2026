import { StyleSheet } from "react-native";
import { Fonts, FontSize } from "../../styles/fonts";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },

    scroll: {
        padding: 16,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        borderWidth: 2,
        borderColor: "green",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderColor: "#E0E0E0",
    },

    label: {
        color: "#1B5E20",
        fontFamily: Fonts.MEDIUM,
        fontSize: FontSize.FONT_14,
    },

    value: {
        color: "#1B5E20",
        fontFamily: Fonts.MEDIUM,
        fontSize: FontSize.FONT_14,
    },

    payBtnWrapper: {
        marginTop: 30,
        alignItems: "center",
    },

    loanDetailBtn: {
        width: 180,
        height: 50,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
});

export default styles



