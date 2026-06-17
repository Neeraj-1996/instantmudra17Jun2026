import { Platform, StyleSheet } from "react-native";
import { moderateScale } from "../../styles/responsive";
import { Colors } from "../../styles/colors";
import { Fonts, FontSize } from "../../styles/fonts";
// import { Colors, Fonts, FontSize, moderateScale } from "../../styles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        paddingHorizontal: 20,
    },

    card: {
        width: moderateScale(320),
        height: moderateScale(256),
        marginTop: moderateScale(20),
        marginBottom: moderateScale(20),
        alignSelf: "center",
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
            },
            android: {
                elevation: 8,
            },
        }),
    },

    image: {
        width: moderateScale(320),
        height: moderateScale(256),
    },

    title: {
        fontSize: FontSize.FONT_20,
        fontFamily: Fonts.BOLD,
        color: Colors.black,
        textAlign: "center",
        marginBottom: moderateScale(24),
    },

    subtitle: {
        fontSize: FontSize.FONT_13,
        fontFamily: Fonts.MEDIUM,
        color: Colors.gray,
        textAlign: "center",
        lineHeight: moderateScale(20),

    },
    textSubTitle: {
        flexDirection: "column",
        marginRight: moderateScale(40),
        marginLeft: moderateScale(40),
        marginBottom: moderateScale(24),
    },

    retryBtn: {
        backgroundColor: Colors.crimson,
        paddingVertical: moderateScale(14),
        paddingHorizontal: moderateScale(40),
        borderRadius: moderateScale(30),
        marginBottom: moderateScale(15),
    },

    retryText: {
        color: Colors.white,
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.REGULAR
    },

    settings: {
        fontSize: FontSize.FONT_14,
        fontFamily: Fonts.REGULAR,
        marginTop: moderateScale(15),
        color: Colors.grayDD,
        marginBottom: moderateScale(30),
    },

    tipBox: {
        width: "100%",
        backgroundColor: Colors.grayDD,
        borderRadius: moderateScale(32),
        padding: moderateScale(15),
        alignItems: 'center',
        justifyContent: 'center'
    },

    tipTitle: {
        fontSize: FontSize.FONT_12,
        fontFamily: Fonts.REGULAR,
        marginBottom: moderateScale(5),
    },

    tipText: {
        fontSize: FontSize.FONT_11,
        fontFamily: Fonts.REGULAR,
        color: Colors.black,
        lineHeight: moderateScale(16)
    },
    tipRow: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconWrapper: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        justifyContent: "center",
        alignItems: "center",
        marginRight: moderateScale(10),
    },

    infoIcon: {
        width: moderateScale(36),
        height: moderateScale(36),
    },

});

export default styles;