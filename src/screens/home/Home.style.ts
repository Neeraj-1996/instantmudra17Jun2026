import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";
import { Fonts, FontSize } from "../../styles/fonts";
import { moderateScale } from "../../styles/responsive";

const PRIMARY = "#7B4397";
const SECONDARY = "#DC2430";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F5FB",
    },

    header: {
        paddingTop: 10,
        paddingBottom: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        minHeight: 260,
    },

    greeting: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
        marginLeft: 10
    },

    sliderWrapper: {
        justifyContent: 'center',
        alignContent: 'center'
        // marginTop: 10,
    },

    body: {
        padding: 16,
    },

    card: {
        backgroundColor: Colors.white,
        padding: 18,
        borderRadius: 16,
        marginBottom: 20,
        elevation: 3,
    },

    statusTitle: {
        fontSize: 18,
        fontFamily: Fonts.MEDIUM,
        color: PRIMARY,
    },
    statusTitleRejected: {
        fontSize: 18,
        fontFamily: Fonts.MEDIUM,
        color: SECONDARY,
    },

    statusSub1: {
        // marginTop: 5,
        fontSize: FontSize.FONT_13,
        fontFamily: Fonts.BOLD,
        color: Colors.black,
        // textAlign: 'center'
    },


    statusSub: {
        marginTop: 5,
        fontSize: FontSize.FONT_13,
        fontFamily: Fonts.BOLD,
        color: Colors.black,
        textAlign: 'center'
    },

    timelineContainer: {
        marginTop: 10,
    },

    stepRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    timeline: {
        width: 30,
        alignItems: "center",
    },

    circle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: "#D9D9D9",
    },

    completedCircle: {
        backgroundColor: "#4CAF50",
    },

    currentCircle: {
        backgroundColor: PRIMARY,
        transform: [{ scale: 1.3 }],
    },

    line: {
        width: 2,
        height: 40,
        backgroundColor: "#D9D9D9",
    },

    completedLine: {
        backgroundColor: "#4CAF50",
    },

    stepTextBox: {
        marginLeft: 10,
        paddingBottom: 25,
    },

    stepText: {
        fontSize: 14,
        color: "#999",
    },

    completedText: {
        color: Colors.black,
        fontWeight: "600",
    },

    activeBadge: {
        marginTop: 6,
        backgroundColor: PRIMARY,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
    },

    activeText: {
        color: Colors.white,
        fontSize: 12,
    },
    rejectedImage: {
        width: 120,
        height: 120,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 15,
    },
    digiBtnInline: {
        backgroundColor: "#4CAF50",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    digiBtnText: {
        fontSize: 12
    },
    badgeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
        width: moderateScale(150)
    },

    loanDetailCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        marginBottom: 20,
        elevation: 4,
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },

    loanDetailTitle: {
        fontSize: 18,
        fontFamily: Fonts.BOLD,
        color: Colors.black,
        textAlign: "center",
        marginBottom: 12,
    },

    loanDetailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E5E5E5",
        paddingVertical: 10,
        marginBottom: 12,
    },

    loanDetailDue: {
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.MEDIUM,
        color: Colors.black,
    },

    loanDetailAmount: {
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.BOLD,
        color: Colors.black,
    },

    loanDetailMsg: {
        fontSize: FontSize.FONT_13,
        fontFamily: Fonts.MEDIUM,
        color: "#666",
        textAlign: "center",
        marginBottom: 15,
        lineHeight: 20,
    },

    loanDetailBtn: {
        alignSelf: "center",
        width: 160,
        height: 45,
        borderRadius: 30,
    },


    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    bellWrapper: {
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",


    },

    bellIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        tintColor: Colors.white,
    },

    notificationBadge: {
        position: "absolute",
        top: 4,
        right: 4,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },

    notificationCount: {
        color: Colors.crimson,
        fontSize: 10,
        fontWeight: "700",
    },

    supportCard: {
        width: "100%",
        backgroundColor: Colors.white,
        marginTop: moderateScale(2),
        borderRadius: moderateScale(30),
        padding: moderateScale(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        elevation: 2,
        marginBottom: moderateScale(40),
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