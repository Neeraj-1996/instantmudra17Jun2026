import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 40
    },
    skipText:{
        width :32,   
        height :16,
        marginTop:14,
        position: "absolute",
        right: 32,
        color: colors.white

    },
    slide: {
        flex: 1,
        alignItems: 'center',
        marginTop: 120
    }
})
export default styles