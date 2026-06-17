import { Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

export const wp = (percentage: number) => {
    return (width * percentage) / 100;
};

export const hp = (percentage: number) => {
    return (height * percentage) / 100;
};

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number): number => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
    (height / guidelineBaseHeight) * size; // use maringTop. marginBottom
const moderateScale = (size: number, factor: number = 0.5): number =>
    size + (scale(size) - size) * factor; //use for height, width and borderRadius
const moderateScaleVertical = (size: number, factor: number = 0.5): number =>
    size + (verticalScale(size) - size) * factor; // for use top or bottom
//textScale use for text
const textScale = (percent: number): number => {
    const screenHeight = Dimensions.get('window').height;
    const ratio = Dimensions.get('window').height / Dimensions.get('window').width;

    // -----------------------------------------
    //   Android part remains EXACTLY the same
    // -----------------------------------------
    let deviceHeight =
        guidelineBaseWidth
            ? screenHeight * (ratio > 1.8 ? 0.126 : 0.15)
            : Platform.OS === 'android'
                ? screenHeight - (StatusBar.currentHeight || 0)
                : screenHeight;

    // -----------------------------------------
    //   Add iOS adjustment only (as requested)
    // -----------------------------------------
    if (Platform.OS === 'ios') {
        // You can customize this if needed
        deviceHeight = screenHeight * (ratio > 1.8 ? 0.14 : 0.14);
    }

    const heightPercent = (percent * deviceHeight) / 100;
    return Math.round(heightPercent);
};



export {
    scale,
    verticalScale,
    textScale,
    moderateScale,
    moderateScaleVertical,
    width,
    height,
};