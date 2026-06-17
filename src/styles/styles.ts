import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { Fonts } from './fonts';
import { Dropdown } from 'react-native-element-dropdown';

const globalStyles = StyleSheet.create({
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.grayC4,
        borderRadius: 10,
        padding: 12,
        fontFamily: Fonts.REGULAR,
        fontSize: 14
    },
    dropdown: {
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.grayC4,
        borderRadius: 10,
        padding: 10,
        fontFamily: Fonts.REGULAR,
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
        fontFamily: Fonts.REGULAR,
    },
});

export default globalStyles;