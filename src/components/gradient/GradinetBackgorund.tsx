import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../styles/colors";

interface Props {
    children: React.ReactNode;
    style?: ViewStyle;
}

const GradientBackground: React.FC<Props> = ({ children, style }) => {
    return (
        <LinearGradient
            colors={[Colors.crimson, Colors.magenta, Colors.violetShade]}
            start={{ x: 1, y: 0.5 }}
            end={{ x: 0.5, y: 1 }}
            style={style ? style : styles.container}
        >
            {children}
        </LinearGradient>
    );
};

export default GradientBackground;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});