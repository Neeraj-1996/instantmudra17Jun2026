
import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    PanResponder,
    Animated,
    StyleSheet,
    Text,
} from 'react-native';
import { Colors } from '../../styles/colors';

const CustomSlider = ({
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
    const [sliderValue, setSliderValue] = useState(value);
    const animatedX = useRef(new Animated.Value(0)).current;
    const sliderRef = useRef(null);
    const positionRef = useRef({ offsetX: 0 });

    useEffect(() => {
        // Initialize thumb position based on value
        const initial = ((value - minimumValue) / (maximumValue - minimumValue)) * sliderWidth;
        animatedX.setValue(initial);
    }, [value]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                animatedX.stopAnimation();
            },
            onPanResponderMove: (_, gesture) => {
                const dx = gesture.dx;
                let newX = positionRef.current.offsetX + dx;
                newX = Math.max(0, Math.min(newX, sliderWidth));
                animatedX.setValue(newX);

                const rawValue = minimumValue + (newX / sliderWidth) * (maximumValue - minimumValue);
                const steppedValue = Math.round(rawValue / step) * step;

                setSliderValue(steppedValue);
                onValueChange && onValueChange(steppedValue);
            },
            onPanResponderRelease: () => {
                animatedX.stopAnimation(value => {
                    positionRef.current.offsetX = value;
                });
            },
        })
    ).current;

    return (
        <View
            style={[styles.container, { width: sliderWidth, height: thumbSize * 1.5 }]}
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
                    transform: [{ translateX: Animated.subtract(animatedX, thumbSize / 2) }],
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
                            backgroundColor: '#DC2430',
                            borderWidth: 3,
                            borderColor: '#fff',
                            elevation: 4,
                            shadowColor: '#000',
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
