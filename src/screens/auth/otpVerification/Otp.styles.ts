import { StyleSheet, Dimensions } from 'react-native';
import { moderateScale } from '../../../styles/responsive';
import { Colors } from '../../../styles/colors';
import { Fonts, FontSize } from '../../../styles/fonts';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
        paddingTop: moderateScale(20),
    },

    backBtn: {
        alignSelf: 'flex-start',
        marginBottom: moderateScale(20),
    },

    backIcon: {
        width: moderateScale(40),
        height: moderateScale(40),
    },

    otpImage: {
        width: moderateScale(229),
        height: moderateScale(170),
        marginBottom: moderateScale(20),
    },

    title: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.BOLD,
        color: Colors.black,
        marginBottom: moderateScale(10),
    },

    subtitle: {
        fontSize: moderateScale(14),
        color: Colors.gray,
        textAlign: 'center',
        marginBottom: moderateScale(10),
    },

    bold: {
        fontFamily: Fonts.REGULAR,
        color: Colors.black,
    },

    helper: {
        fontSize: FontSize.FONT_13,
        color: Colors.gray,
        marginBottom: moderateScale(25),
    },

    otpBox: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderWidth: 1,
        borderRadius: moderateScale(8),
        borderColor: Colors.gray,
        color: Colors.black,
    },

    resendRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width * 0.7,
        marginTop: moderateScale(20),
    },

    resendText: {
        color: Colors.black,
        fontSize: moderateScale(14),
    },

    timerText: {
        color: '#ff4d4f',
        fontSize: moderateScale(14),
    },

    nextBtn: {
        marginTop: moderateScale(40),
        width: '100%',
        height: moderateScale(55),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7b1fa2',
    },

    nextText: {
        color: Colors.white,
        fontSize: moderateScale(16),
        fontFamily: Fonts.REGULAR,
    },
});

export default styles;