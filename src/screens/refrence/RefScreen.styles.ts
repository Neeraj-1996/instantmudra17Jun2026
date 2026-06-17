import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        textAlign: "center",
        marginBottom: 20,
    },

    card: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 15,
        marginBottom: 20,
        elevation: 3,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
        color: Colors.pinkA2,
    },

    input: {
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        paddingHorizontal: 12,
        marginBottom: 12,
        color: Colors.black,
    },

    dropdown: {
        borderRadius: 10,
        borderColor: Colors.light,
        marginBottom: 12,
    },

    dropdownContainer: {
        borderRadius: 10,
        borderColor: Colors.light,
    },

    button: {
        height: 55,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        backgroundColor: Colors.white,
    },

    buttonText: {
        color: Colors.pinkA2,
        fontSize: 16,
        fontWeight: "600",
    },
});

export default styles;