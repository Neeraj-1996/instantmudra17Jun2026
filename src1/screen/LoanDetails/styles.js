import { ColorPropType, StyleSheet } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import colors from "../../common"
const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: "white"
    },
    card:{
        height:70,
         width:"100%",
         flexDirection:"row",
        //  backgroundColor:"red",
         marginBottom:6
        
    },
    smallCard:{
        height:"100%",
        width:50,
        marginTop:10,
    
    },
    image:{
        width:20,
        height:20
    },
    lineImage:{
        width:2,
        height:37,
        marginTop:6,
        marginLeft: 10
    },
    bigCard:{
        height:"40%",
        width:"100%",
        marginTop:10
       
    },
    text:{
        fontSize:16,
        fontWeight:"600"
    },
    smallText:{
        fontSize:14,
        color:colors.lightGrey
    },
    fieldText:{
        fontSize:14,
        fontWeight:"500",width:"50%"
    },
    line:{
        marginTop:20,
        width:"100%", 
        flexDirection:"row",
        
    }



})
export default styles
