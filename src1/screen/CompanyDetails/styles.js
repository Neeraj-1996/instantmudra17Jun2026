import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        padding: 20
    },
    textField: {
        fontSize: 16,
        fontWeight: "500",
        marginTop: 8,
        // backgroundColor:"red"
        color: '#212A3E'
    },
    textInput: {
        height: 44,
        width: "100%",
        borderColor: "grey",
        borderRadius: 6,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginTop: 12,
        color:'#000'
    },
})
export default styles