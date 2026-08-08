import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { hp, moderateScale } from "../../styles/responsive";

const styles = StyleSheet.create({
    topImage: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },

    container: {
        backgroundColor: "#f2f2f2",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        marginTop: -30,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#4b0082",
        textAlign: "center",
        marginBottom: 20,
    },

    progressCard: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 20,
        padding: moderateScale(15),
        marginBottom: moderateScale(25),
        alignItems: 'center',
        justifyContent: 'center',

    },

    loanText: {
        fontSize: 18,
        fontWeight: "700",
    },

    activeText: {
        fontSize: 16,
        marginBottom: moderateScale(10),
    },
    detailsCard: {
        width: '100%',
        marginTop: moderateScale(50),
        marginBottom: moderateScale(70),

        justifyContent: 'center'

    },
    bgImage: {
        position: 'absolute',
        aspectRatio: 1,
        width: '100%',
        height: hp(40),
    },
    overlay: {
        padding: hp(1)

    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    label: {
        color: Colors.white,
        fontSize: 14,
    },

    value: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: "700",
        marginTop: 5,
    },

    button: {
        height: 60,
        backgroundColor: "#2e1a78",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: "600",
    },
    rsIndicator: {
        width: 33,
        height: 33,
        borderRadius: 20,
        backgroundColor: '#DC2430',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    textRsIndicator: { color: Colors.white, fontSize: 20 }
});

export default styles;
