import { StyleSheet } from "react-native";
import { moderateScale } from '../../styles/responsive';
import { Colors } from "../../styles/colors";
import { Fonts, FontSize } from "../../styles/fonts";

const styles = StyleSheet.create({
    container: {
        padding: moderateScale(20),
        paddingBottom: moderateScale(40),
    },

    /* TOP CARD */

    topCard: {
        borderRadius: moderateScale(25),
        padding: moderateScale(20),
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        marginBottom: moderateScale(10),
    },

    icon: {
        width: moderateScale(80),
        height: moderateScale(80),
        marginBottom: moderateScale(15),
    },

    title: {
        color: Colors.white,
        fontSize: FontSize.FONT_18,
        fontFamily: Fonts.BOLD,
        textAlign: "center",
    },

    subtitle: {
        color: "#eee",
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.REGULAR,
        textAlign: "center",
        marginTop: moderateScale(10),
    },

    highlight: {
        color: Colors.yellow00,
        fontSize: FontSize.FONT_16,
        fontFamily: Fonts.BOLD,
        marginTop: moderateScale(5),
    },

    lender: {
        marginTop: moderateScale(15),
        color: Colors.gray6E,
        fontFamily: Fonts.REGULAR,
    },

    company: {
        color: Colors.yellow00,
        fontFamily: Fonts.BOLD,
        marginTop: moderateScale(5),
    },

    rbi: {
        color: Colors.gray6E,
        marginTop: moderateScale(5),
    },

    /* FEEDBACK */

    feedbackCard: {
        // borderRadius: 20,
        padding: moderateScale(20),
        marginBottom: moderateScale(20),
        // overflow: "hidden",
    },

    feedbackTitle: {
        color: Colors.yellow00,
        fontSize: moderateScale(16),
        fontFamily: Fonts.BOLD,
        // fontWeight: "700",
        marginBottom: moderateScale(10),
    },

    feedbackText: {
        color: Colors.black,
        fontSize: moderateScale(14),
        marginBottom: moderateScale(5),
    },

    emojiRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: moderateScale(15),
    },

    emoji: {
        fontSize: moderateScale(28),
    },

    /* REFER */

    referCard: {
        padding: moderateScale(20),
        marginBottom: moderateScale(20),
    },


    referTitle: {
        fontSize: moderateScale(16),
        fontFamily: Fonts.BOLD,
        color: Colors.black,
    },

    referBtn: {
        marginTop: moderateScale(10),
        backgroundColor: "#ff3b30",
        paddingHorizontal: moderateScale(15),
        paddingVertical: moderateScale(8),
        borderRadius: moderateScale(8),
    },

    referBtnText: {
        color: Colors.white,
        fontWeight: "600",
    },

    referImage: {
        width: moderateScale(150),
        height: moderateScale(130),
        resizeMode: "contain",
    },

    cardImage: {
        resizeMode: "contain",
    },

    /* DONE */

    doneBtn: {
        height: moderateScale(55),
        borderRadius: moderateScale(30),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
    },

    doneText: {
        color: Colors.pinkA2,
        fontSize: FontSize.FONT_16,
        fontFamily: Fonts.BOLD
    },
    rateButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(20),
        borderRadius: moderateScale(8),
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',

    },

    rateButtonText: {
        color: '#fff',
        fontSize: moderateScale(16),
        fontWeight: '600',
    },
});

export default styles;