
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
    // Called when user starts sliding
    onSlidingStart,
    // Called with final value when sliding ends
    onSlidingComplete,
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
            // Only become responder for predominantly horizontal moves.
            onStartShouldSetPanResponder: () => false,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: (_, gesture) => {
                const { dx, dy } = gesture;
                // Require horizontal movement to be larger than vertical and pass a small threshold
                return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6;
            },
            onMoveShouldSetPanResponderCapture: (_, gesture) => {
                const { dx, dy } = gesture;
                return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6;
            },
            onPanResponderGrant: () => {
                // Capture current animated value as the base offset
                animatedX.stopAnimation((v) => {
                    positionRef.current.offsetX = typeof v === 'number' ? v : 0;
                });
                onSlidingStart && onSlidingStart();
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
            onPanResponderRelease: (_, gesture) => {
                // Update stored offset to the final position
                const finalX = Math.max(0, Math.min(positionRef.current.offsetX + gesture.dx, sliderWidth));
                positionRef.current.offsetX = finalX;
                animatedX.setValue(finalX);

                const rawValue = minimumValue + (finalX / sliderWidth) * (maximumValue - minimumValue);
                const finalValue = Math.round(rawValue / step) * step;
                onSlidingComplete && onSlidingComplete(finalValue);
            },
            onPanResponderTerminate: (_, gesture) => {
                const finalX = Math.max(0, Math.min(positionRef.current.offsetX + gesture.dx, sliderWidth));
                positionRef.current.offsetX = finalX;
                animatedX.setValue(finalX);

                const rawValue = minimumValue + (finalX / sliderWidth) * (maximumValue - minimumValue);
                const finalValue = Math.round(rawValue / step) * step;
                onSlidingComplete && onSlidingComplete(finalValue);
            },
            onPanResponderTerminationRequest: () => false,
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
