import { StyleSheet } from 'react-native';
import { moderateScale } from '../../styles/responsive';
import { Colors } from '../../styles/colors';
import { Fonts, FontSize } from '../../styles/fonts';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },

    innerContainer: {
        height: '100%',
        marginTop: 30,
    },

    loaderWrapper: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
    },

    label: {
        fontSize: FontSize.FONT_18,
        fontFamily: Fonts.REGULAR,
        color: Colors.black,
        textAlign: 'center',
        marginTop: moderateScale(20),
    },

    input: {
        height: 55,
        margin: 20,
        fontSize: FontSize.FONT_20,
        fontFamily: Fonts.REGULAR,
        borderRadius: 8,
        width: '70%',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        elevation: 5,
        padding: 5,
    },

    inputText: {
        color: Colors.black,
        width: 242,
        fontWeight: 'bold',
    },

    btnback: {
        width: 180,
        height: 45,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        elevation: 5,
        margin: 10,
    },

    sendotp: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black,
    },

    img: {
        width: 140,
        height: 140,
        alignSelf: 'center',
        marginTop: 20,
    },
});