import { ColorPropType, StyleSheet } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import colors from "../../common"
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"red"
    },
    card:{
        width:"90%",
        backgroundColor:"yellow",
        marginHorizontal:20,
        borderRadius:8,
        borderWidth:1,
        borderColor:"#E3E5E5",
        padding:18,
    },
    field:{
        height:40,
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    fieldText:{
        fontWeight:"500",
        fontSize:14,
        color:"green"
    },
    fieldText1:{
        fontWeight:"500",
        fontSize:14,
        color:"green"
    },
    paymentText:{
        fontWeight:"500",
        fontSize:22,
        color:"#000"
    },


})
export default styles