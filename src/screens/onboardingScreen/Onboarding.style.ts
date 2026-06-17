import { StyleSheet } from "react-native";
import { wp, hp } from "../../styles/responsive";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },

    imageContainer: {
        flex: 0.7,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },

    whiteShape: {
        width: wp(100),
        height: hp(57),
        position: "absolute",
        top: hp(2),
    },
    imageView: {
        position: "absolute",
        top: hp(0),
        alignItems: "center",
    },

    girlImage: {
        width: wp(100),
        height: hp(70),
    },
    girlImage2: {
        width: wp(100),
        height: hp(74),
    },
    girlImage3: {
        width: wp(100),
        height: hp(68),
    },
    bottomContainer: {
        height: 200
        // bottom: 100
    },
    dotsContainer: {
        flexDirection: "row",
        alignSelf: 'center',
        marginBottom: 10
    },

    dot: {
        width: wp(2),
        height: wp(2),
        borderRadius: wp(1),
        backgroundColor: Colors.white,
        marginHorizontal: wp(1),
        opacity: 0.7,
    },

    onboardingImage: {
        width: wp(100),
        height: hp(70),
    },

    title: {
        color: Colors.white,
        fontSize: wp(5),
        textAlign: "center",
        fontFamily: Fonts.BOLD,
        lineHeight: wp(8),
    },

    nextButton: {
        top: hp(3),
        width: wp(20),
        height: wp(20),
        left: 290
    },

    arrowIcon: {
        width: wp(20),
        height: hp(9),
    },
    bottomSection: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp(4),
    },

});

export default styles;