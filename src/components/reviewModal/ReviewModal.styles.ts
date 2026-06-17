import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: Colors.transparent,
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        width: "80%",
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 16,
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
        color: Colors.black
    },

    reasonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    reasonText: {
        marginLeft: 10,
        fontSize: 15,
        color: Colors.grayC4
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});

export default styles;