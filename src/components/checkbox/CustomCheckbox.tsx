import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ViewStyle } from 'react-native';
import { moderateScale } from '../../styles/responsive';
interface Props {
    value: boolean;
    onChange: (val: boolean) => void;
    style?: ViewStyle;
    checkedImage: any;
    uncheckedImage: any;
    checkedColor?: string;
    uncheckedColor?: string;
    enableTintColor?: boolean;
}

const CustomCheckbox: React.FC<Props> = ({
    value,
    onChange,
    style,
    checkedImage,
    uncheckedImage,
    checkedColor = '#fff',
    uncheckedColor = '#fff',
    enableTintColor = false,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChange(!value)}
            style={[styles.container, style]}
        >
            <Image
                source={value ? checkedImage : uncheckedImage}
                style={styles.image}
                tintColor={
                    enableTintColor
                        ? (value ? checkedColor : uncheckedColor)
                        : undefined
                }
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
    container: {
        marginRight: moderateScale(8),
    },
    image: {
        width: moderateScale(20),
        height: moderateScale(20),
    },
});