import { StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';
import { Fonts, FontSize } from '../../../styles/fonts';
import { moderateScale } from '../../../styles/responsive';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        width: '100%',
        maxWidth: moderateScale(400),
        paddingHorizontal: moderateScale(25),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: moderateScale(25),
    },

    title: {
        fontSize: moderateScale(FontSize.FONT_24),
        color: Colors.white,
        fontFamily: Fonts.BOLD,
        textAlign: 'center',
        marginBottom: moderateScale(5),
    },

    subtitle: {
        fontSize: moderateScale(FontSize.FONT_16),
        color: Colors.white,
        fontFamily: Fonts.REGULAR,
        textAlign: 'center',
        lineHeight: moderateScale(22),
        marginBottom: moderateScale(20),
        paddingHorizontal: moderateScale(10),
    },

    inputWrapper: {
        width: '100%',
        height: moderateScale(55),
        backgroundColor: Colors.white,
        borderRadius: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(14),
        marginBottom: moderateScale(10),
    },

    input: {
        flex: 1,
        fontSize: moderateScale(FontSize.FONT_16),
        color: '#333',
        marginLeft: moderateScale(10),
        fontFamily: Fonts.REGULAR,
    },

    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(10),
        marginBottom: moderateScale(5),
        flexWrap: 'wrap',
    },

    genderLabel: {
        fontSize: moderateScale(FontSize.FONT_16),
        fontFamily: Fonts.MEDIUM,
        color: Colors.white,
        marginRight: moderateScale(12),
    },

    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: moderateScale(20),
    },

    radioOuter: {
        width: moderateScale(20),
        height: moderateScale(20),
        borderRadius: moderateScale(10),
        borderWidth: moderateScale(2),
        borderColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: moderateScale(8),
    },

    radioInner: {
        width: moderateScale(10),
        height: moderateScale(10),
        borderRadius: moderateScale(5),
        backgroundColor: Colors.white,
    },

    genderText: {
        fontSize: moderateScale(FontSize.FONT_14),
        color: Colors.white,
        fontFamily: Fonts.REGULAR,
    },

    termsContainer: {
        flexDirection: 'row',
        marginTop: moderateScale(15),
    },

    termsText: {
        flex: 1,
        fontSize: moderateScale(FontSize.FONT_12),
        lineHeight: moderateScale(18),
        color: Colors.white,
        fontFamily: Fonts.REGULAR,
    },

    linkText: {
        textDecorationLine: 'underline',
        color: Colors.yellow00,
        fontFamily: Fonts.BOLD,
        fontSize: FontSize.FONT_14,
    },

    loginButton: {
        width: '100%',
        height: moderateScale(58),
        backgroundColor: Colors.black,
        borderRadius: moderateScale(12),
        borderWidth: moderateScale(1.5),
        borderColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: moderateScale(20),
    },

    loginButtonText: {
        fontSize: moderateScale(FontSize.FONT_18),
        color: Colors.white,
        fontFamily: Fonts.BOLD,
    },

    whiteShape: {
        width: moderateScale(22),
        height: moderateScale(22),
        marginRight: moderateScale(12),
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    footer1: {
        fontSize: FontSize.FONT_16,
        color: Colors.white,
        fontFamily: Fonts.BOLD,
        textAlign: 'center',
        marginRight: moderateScale(20)
    },
    experianLogo: {
        width: moderateScale(50),
        height: moderateScale(50),
        resizeMode: "contain",
        marginTop: moderateScale(10),
        margin: moderateScale(5)
    },
    containerCibil: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(40),
    },
    containerCibilRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.white,
        marginTop: moderateScale(20),
        paddingHorizontal: moderateScale(30),

    },
});

export default styles;