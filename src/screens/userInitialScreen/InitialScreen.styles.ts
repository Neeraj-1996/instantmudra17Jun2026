import { StyleSheet } from "react-native";
import { Fonts, FontSize } from "../../styles/fonts";
import { Colors } from "../../styles/colors";
import { moderateScale } from "../../styles/responsive";


export default StyleSheet.create({
    headerCard: {
        padding: 24,
        minHeight: 220,
        justifyContent: "center",
        borderBottomLeftRadius: moderateScale(24),
        borderBottomRightRadius: moderateScale(24)
    },

    welcome: {
        color: Colors.white,
        fontSize: FontSize.FONT_12,
        fontFamily: Fonts.REGULAR,
    },

    title: {
        color: Colors.white,
        fontSize: FontSize.FONT_24,
        fontFamily: Fonts.REGULAR,
        marginTop: 10,
    },
    subtitle1: {
        color: Colors.white,
        fontSize: FontSize.FONT_12,
        fontFamily: Fonts.REGULAR,

    },
    subtitle: {
        color: Colors.white,
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.REGULAR,
        // textAlign: 'center'
    },
    highlight: {
        fontSize: FontSize.FONT_18,
        fontFamily: Fonts.BOLD,
        color: Colors.white, // change to your theme color
    },

    headerIcon: {
        width: 200,
        height: 200,
        position: "absolute",
        right: -30,
        top: 30,
        resizeMode: "contain",
    },

    loanCard: {
        backgroundColor: "#fff",
        borderRadius: 24,
        marginHorizontal: 16,
        marginTop: -40,
        padding: 10,
        elevation: 8,
        alignItems: "center",
    },

    loanLabel: {
        textAlign: "center",
        color: Colors.gray6E,
        fontSize: FontSize.FONT_12,
    },

    amount: {
        textAlign: "center",
        fontSize: FontSize.FONT_20,
        fontFamily: Fonts.REGULAR,
        color: "#1B1464",
        marginVertical: 2,
    },
    amount1: {
        textAlign: "center",
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.REGULAR,
    },

    sliderThumb: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#7B2FF7",
        justifyContent: "center",
        alignItems: "center",
    },

    thumbText: {
        color: "#fff",
        fontWeight: "700",
    },

    rangeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 2,
        width: "90%",
    },

    featureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: moderateScale(10),
        height: moderateScale(120),
        width: "90%",
    },

    featureCard: {
        width: "30%",
        height: 110,
        borderWidth: 1,
        borderColor: "#F8F5FF",
        borderRadius: moderateScale(20),
        padding: 8,
        alignItems: "center",
    },

    featureIcon: {
        width: "100%",
        height: 50,
        marginBottom: 10,
        resizeMode: "contain",
    },

    featureText: {
        color: Colors.black,
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.REGULAR,
        textAlign: "center",
    },

    applyBtn: {
        marginTop: 24,
        width: moderateScale(270),
    },

    whyCard: {
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 24,
        padding: 10,
    },

    sectionTitle: {
        fontSize: FontSize.FONT_18,
        fontFamily: Fonts.BOLD,
        marginBottom: 10,
    },

    benefitRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    benefitCard: {
        width: "31%",
        height: 110,
        borderWidth: 1,
        borderColor: "#F8F5FF",
        borderRadius: moderateScale(20),
        padding: 8,
        alignItems: "center",
    },

    benefitIcon: {
        width: "100%",
        height: 50,
        marginBottom: 10,
        resizeMode: "contain",
    },

    benefitText: {
        color: Colors.black,
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.REGULAR,
        textAlign: "center",
    },


    compareCard: {
        width: "100%",
        marginTop: moderateScale(16),
        borderWidth: 1,
        borderColor: "#E8D8FF",
        borderRadius: moderateScale(20),
        padding: moderateScale(16),
        backgroundColor: "#FFFFFF",
        shadowColor: "#7B2FF7",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },

    compareTitle: {
        textAlign: "center",
        fontSize: FontSize.FONT_18,
        fontFamily: Fonts.BOLD,
        color: "#1E1E1E",
        lineHeight: moderateScale(28),
        marginBottom: moderateScale(16),
    },

    redText: {
        color: "#FF3B5C",
        fontFamily: Fonts.BOLD,
    },

    greenText: {
        color: "#22B455",
        fontFamily: Fonts.BOLD,
    },

    brandText: {
        color: "#6A00FF",
        fontFamily: Fonts.BOLD,
    },

    compareRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: moderateScale(14),
    },

    compareBoxRed: {
        flex: 1,
        minWidth: moderateScale(100),
        borderWidth: 1,
        borderColor: "#FFD4DC",
        borderRadius: moderateScale(16),
        paddingVertical: moderateScale(16),
        alignItems: "center",
        justifyContent: "center",
        marginRight: moderateScale(8),
        backgroundColor: "#FFF7F9",
    },

    compareBoxGreen: {
        flex: 1,
        minWidth: moderateScale(100),
        borderWidth: 1,
        borderColor: "#CFF3D9",
        borderRadius: moderateScale(16),
        paddingVertical: moderateScale(16),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: moderateScale(8),
        backgroundColor: "#F6FFF8",
    },

    boxLabel: {
        fontSize: FontSize.FONT_11,
        fontFamily: Fonts.MEDIUM,
        color: "#555",
        textAlign: "center",
        marginBottom: moderateScale(6),
    },
    redPercent: {
        fontSize: moderateScale(28),
        fontFamily: Fonts.BOLD,
        color: "#FF3B5C",
    },

    greenPercent: {
        fontSize: moderateScale(28),
        fontFamily: Fonts.BOLD,
        color: "#22B455",
    },

    perMonth: {
        fontSize: FontSize.FONT_11,
        fontFamily: Fonts.MEDIUM,
        color: "#666",
        marginTop: moderateScale(2),
    },

    vsCircle: {
        width: moderateScale(56),
        height: moderateScale(56),
        borderRadius: moderateScale(28),
        backgroundColor: "#6A00FF",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: moderateScale(10),
        shadowColor: "#6A00FF",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 5,
    },

    vsText: {
        color: "#FFF",
        fontSize: FontSize.FONT_16,
        fontFamily: Fonts.BOLD,
    },

    saveBanner: {
        borderRadius: moderateScale(12),
        paddingVertical: moderateScale(12),
        alignItems: "center",
        justifyContent: "center",
    },

    saveText: {
        color: "#FFF",
        fontSize: FontSize.FONT_13,
        fontFamily: Fonts.REGULAR,
        textAlign: "center",
    },

    supportCard: {
        width: "90%",
        backgroundColor: Colors.white,
        marginTop: moderateScale(8),
        borderRadius: moderateScale(30),
        padding: moderateScale(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 2,
        margin: moderateScale(20),
    },

    supportLeft: {
        flexDirection: "row",
        alignItems: "center",
    },

    supportIcon: {
        width: moderateScale(34),
        height: moderateScale(34),
        alignItems: "center",
        justifyContent: "center",
    },

    supportTextBox: {
        marginLeft: moderateScale(7),
    },

    supportTitle: {
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.BOLD,
    },

    supportDesc: {
        marginTop: moderateScale(1),
        fontSize: FontSize.FONT_12,
        color: "#777",
        fontWeight: "500",
        flexDirection: 'column'

    },

    chatBtn: {
        borderWidth: moderateScale(1),
        borderColor: "#F2C4D8",
        paddingHorizontal: moderateScale(22),
        paddingVertical: moderateScale(12),
        borderRadius: moderateScale(30),
    },

    chatText: {
        color: "#D00078",
        fontWeight: "700",
    },

    smallIcon: {
        width: moderateScale(42),
        height: moderateScale(42),
        resizeMode: "contain",
    },
});

// import { StyleSheet } from "react-native";
// import { hp, moderateScale } from "../../styles/responsive";
// import { Colors } from "../../styles/colors";
// import { Fonts, FontSize } from "../../styles/fonts";

// const styles = StyleSheet.create({
//     container: {
//     },
//     topCard: {
//         height: moderateScale(100),
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: Colors.white,
//     },

//     heading: {
//         fontSize: FontSize.FONT_18,
//         fontFamily: Fonts.BOLD,
//         color: Colors.black,
//     },

//     subHeading: {
//         marginTop: moderateScale(10),
//         color: Colors.gray6E,
//         fontSize: FontSize.FONT_12,
//         fontFamily: Fonts.REGULAR,
//         textAlign: "center",
//         padding: moderateScale(5),
//         paddingLeft: moderateScale(20),
//         paddingRight: moderateScale(20)
//     },
//     highlightOne: {
//         color: Colors.crimson,
//         fontFamily: Fonts.BOLD,
//         fontSize: moderateScale(16),
//     },

//     highlightTwo: {
//         color: "#16A34A",
//         fontFamily: Fonts.BOLD,
//         fontSize: moderateScale(16),
//     },

//     amountCard: {
//         margin: moderateScale(10),
//         alignItems: 'center',

//     },
//     amountIcon: {
//         alignItems: "center",
//         justifyContent: "center",
//         alignSelf: "center",
//     },

//     smallIcon: {
//         width: moderateScale(42),
//         height: moderateScale(42),
//         resizeMode: "contain",
//     },

//     requestLabel: {
//         textAlign: "center",
//         marginTop: moderateScale(10),
//         fontSize: FontSize.FONT_12,
//         fontFamily: Fonts.MEDIUM,
//         letterSpacing: 2,
//         color: "#9D8D96",
//     },
//     amount: {
//         textAlign: "center",
//         marginTop: moderateScale(10),
//         fontSize: FontSize.FONT_24,
//         fontFamily: Fonts.BOLD,
//         color: Colors.crimson,
//     },
//     featureContainer: {
//         paddingHorizontal: moderateScale(10),
//         flexDirection: "row",
//         flexWrap: "wrap",
//         justifyContent: "space-between",
//     },

//     featureCard: {
//         width: "49%",
//         backgroundColor: Colors.white,
//         borderRadius: moderateScale(22),
//         padding: moderateScale(10),
//         marginBottom: moderateScale(10),
//         elevation: 2,
//     },

//     featureIcon: {
//         alignItems: "center",
//         justifyContent: "center",

//     },

//     featureImage: {
//         width: moderateScale(42),
//         height: moderateScale(42),
//         resizeMode: "contain",
//     },

//     featureText: {
//         marginTop: moderateScale(10),
//         fontSize: FontSize.FONT_14,
//         fontFamily: Fonts.MEDIUM,
//         color: Colors.gray6E,
//         textAlign: "center",
//     },

//     supportCard: {
//         backgroundColor: Colors.white,
//         marginHorizontal: moderateScale(5),
//         marginTop: moderateScale(8),
//         borderRadius: moderateScale(30),
//         padding: moderateScale(10),
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         elevation: 2,
//     },

//     supportLeft: {
//         flexDirection: "row",
//         alignItems: "center",
//     },

//     supportIcon: {
//         width: moderateScale(34),
//         height: moderateScale(34),
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     supportTextBox: {
//         marginLeft: moderateScale(10),
//     },

//     supportTitle: {
//         fontSize: FontSize.FONT_14,
//         fontFamily: Fonts.BOLD,
//     },

//     supportDesc: {
//         marginTop: moderateScale(4),
//         fontSize: FontSize.FONT_12,
//         color: "#777",
//         fontWeight: "500",
//     },

//     chatBtn: {
//         borderWidth: moderateScale(1),
//         borderColor: "#F2C4D8",
//         paddingHorizontal: moderateScale(22),
//         paddingVertical: moderateScale(12),
//         borderRadius: moderateScale(30),
//     },

//     chatText: {
//         color: "#D00078",
//         fontWeight: "700",
//     },

//     footerTextContainer: {
//         alignItems: "center",
//         marginTop: moderateScale(18),
//         paddingHorizontal: moderateScale(25),
//     },

//     footerBold: {
//         fontSize: FontSize.FONT_12,
//         fontFamily: Fonts.BOLD,
//         color: "#6E6368",
//     },

//     footerText: {
//         marginTop: moderateScale(8),
//         textAlign: "center",
//         fontSize: FontSize.FONT_11,
//         color: "#9B8D96",
//         lineHeight: moderateScale(18),
//     },

//     footerLinks: {
//         flexDirection: "row",
//         marginTop: moderateScale(10),
//     },

//     footerLink: {
//         marginHorizontal: moderateScale(8),
//         fontSize: FontSize.FONT_12,
//         color: "#8B7A84",
//         textDecorationLine: "underline",
//     },
//     button: {
//         width: moderateScale(300),
//         alignSelf: "center",
//         marginTop: moderateScale(20),
//     },
//     detailsCard: {
//         width: '100%',
//         marginTop: moderateScale(10),
//         marginBottom: moderateScale(10),
//         justifyContent: 'center'
//     },
//     bgImage: {
//         position: 'absolute',
//         aspectRatio: 1,
//         width: '100%',
//         height: hp(40),
//     },
//     overlay: {
//         padding: hp(1)
//     },
//     row: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginBottom: moderateScale(10),
//     },
//     label: {
//         color: Colors.white,
//         fontSize: 14,
//     },
//     value: {
//         color: Colors.white,
//         fontSize: FontSize.FONT_12,
//         fontFamily: Fonts.BOLD,
//         marginTop: moderateScale(2),
//     },

// });

// export default styles;