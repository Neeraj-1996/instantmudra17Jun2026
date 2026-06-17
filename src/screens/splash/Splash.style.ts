import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export default StyleSheet.create({

    // container: {
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center"
    // },

    gif: {
        width: 200,
        height: 200
    },
    animation: {
        width: "100%",
        height: "100%"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },

    icon: {
        width: 238,
        height: 238,
        position: "absolute",
        alignSelf: "center"
    },

    centerIcon: {
        top: "40%"
    },

    topIcon: {
        position: "absolute",
        top: -2,
        width: "100%",
        height: '53%', // adjust based on design
    },

    bottomIcon: {
        position: "absolute",
        bottom: -2,
        width: "100%",
        height: '49%',// adjust
    },

    gradientContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    viewLogo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        width: 220,
        height: 220,
        alignSelf: "center"
    }



});