import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { wp, hp } from "../../styles/responsive";

export default StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        padding: wp(6),
        backgroundColor: Colors.white
    },

    title: {
        fontSize: wp(7),
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: hp(5)
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: hp(2),
        marginBottom: hp(2)
    },

    otpLabel: {
        textAlign: "center",
        marginTop: hp(3),
        marginBottom: hp(2),
        fontSize: wp(4.5)
    },

    button: {
        backgroundColor: Colors.primary,
        padding: hp(2),
        borderRadius: 8,
        alignItems: "center",
        marginTop: hp(2)
    },

    buttonText: {
        color: Colors.white,
        fontSize: wp(4.2),
        fontWeight: "600"
    }

});