import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styles/colors';
import { moderateScale } from '../../styles/responsive';
import { FontSize } from '../../styles/fonts';
interface Props {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    loading?: boolean;
}

const GradientButton: React.FC<Props> = ({
    title,
    onPress,
    style,
    textStyle,
    disabled = false,
    loading = false,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={disabled || loading}
            style={[disabled && { opacity: 0.6 }]}
        >
            <LinearGradient
                colors={
                    disabled || loading
                        ? [Colors.gray6e, Colors.gray6e]
                        : [Colors.pinkCB, Colors.pink73]
                }
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.button, style]}
            >
                {loading ? (
                    <ActivityIndicator color={Colors.white} />
                ) : (
                    <Text style={[styles.text, textStyle]}>
                        {title}
                    </Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default GradientButton;

const styles = StyleSheet.create({
    button: {
        height: moderateScale(55),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    text: {
        color: Colors.white,
        fontSize: FontSize.FONT_16,
        textAlign: 'center',
    },
});