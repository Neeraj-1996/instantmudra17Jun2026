import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    PanResponder,
    Animated,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../styles/colors';

interface CustomSliderProps {
    minimumValue?: number;
    maximumValue?: number;
    value?: number;
    step?: number;
    onValueChange?: (value: number) => void;
    sliderWidth?: number;
    trackHeight?: number;
    thumbSize?: number;
    trackColor?: string;
    minimumTrackColor?: string;
    renderThumb?: () => React.ReactNode;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
    minimumValue = 0,
    maximumValue = 100,
    value = 0,
    step = 1,
    onValueChange,
    sliderWidth = 280,
    trackHeight = 10,
    thumbSize = 30,
    trackColor = Colors.gray6E,
    minimumTrackColor = Colors.crimson,
    renderThumb = null,
}) => {
    const [sliderValue, setSliderValue] = useState<number>(value);
    const animatedX = useRef(new Animated.Value(0)).current;
    const sliderRef = useRef<View>(null);
    const positionRef = useRef<{ offsetX: number }>({ offsetX: 0 });

    useEffect(() => {
        const initial =
            ((value - minimumValue) / (maximumValue - minimumValue)) *
            sliderWidth;

        animatedX.setValue(initial);
        positionRef.current.offsetX = initial;
    }, [value, minimumValue, maximumValue, sliderWidth]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: () => {
                animatedX.stopAnimation();
            },

            onPanResponderMove: (_, gestureState) => {
                let newX = positionRef.current.offsetX + gestureState.dx;

                newX = Math.max(0, Math.min(newX, sliderWidth));
                animatedX.setValue(newX);

                const rawValue =
                    minimumValue +
                    (newX / sliderWidth) * (maximumValue - minimumValue);

                const steppedValue = Math.round(rawValue / step) * step;

                setSliderValue(steppedValue);
                onValueChange?.(steppedValue);
            },

            onPanResponderRelease: () => {
                animatedX.stopAnimation((val: number) => {
                    positionRef.current.offsetX = val;
                });
            },
        })
    ).current;

    return (
        <View
            style={[
                styles.container,
                { width: sliderWidth, height: thumbSize * 1.5 },
            ]}
            ref={sliderRef}
        >
            {/* Track */}
            <View
                style={{
                    backgroundColor: trackColor,
                    height: trackHeight,
                    borderRadius: trackHeight / 2,
                    width: '100%',
                }}
            >
                <Animated.View
                    style={{
                        backgroundColor: minimumTrackColor,
                        height: trackHeight,
                        borderRadius: trackHeight / 2,
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: animatedX,
                    }}
                />
            </View>

            {/* Thumb */}
            <Animated.View
                {...panResponder.panHandlers}
                style={{
                    position: 'absolute',
                    top: (thumbSize - trackHeight) / 2 - thumbSize * 0.25,
                    transform: [
                        {
                            translateX: Animated.subtract(animatedX, thumbSize / 2),
                        },
                    ],
                }}
            >
                {renderThumb ? (
                    renderThumb()
                ) : (
                    <View
                        style={{
                            width: thumbSize,
                            height: thumbSize,
                            borderRadius: thumbSize / 2,
                            backgroundColor: Colors.crimson,
                            borderWidth: 3,
                            borderColor: Colors.white,
                            elevation: 4,
                            shadowColor: Colors.black,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                        }}
                    />
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
});

export default CustomSlider;