import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
    },
    text:{
        fontSize:14,
        fontWeight:"500",
        color:'#000'
    },
    fieldName:{
       fontSize:14,
       fontWeight:"700",
       marginHorizontal: 20
    },
    field:{
        height:90,
        marginTop:12,
        marginHorizontal: 20,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:8,
        borderWidth:1,
        borderColor:"#E5E5E5"
    },
    redCross:{
        height: 22, 
        width: 22,
        borderRadius:9,
    },
    textInput:{
        height: 44, 
        width:"100%",
        borderColor:"grey",
        borderRadius:6,
        borderWidth:1,
        paddingHorizontal:16,
        marginTop:12
    },





    // input:{
    //     height: 44, 
    //     width:"100%",
    //     borderColor:"grey",
    //     borderRadius:6,
    //     borderWidth:1,
    //     padding:10,
    //     marginTop:12,
    // },
    // textInput:{
    //     height: 44, 
    //     width:"100%",
    //     borderColor:"grey",
    //     borderRadius:6,
    //     borderWidth:1,
    //     alignItems:"center",
    //     marginTop:12,
    //     flexDirection:"row",
    //     paddingHorizontal:12
    // },

    // textField:{
    //     fontSize:16,
    //     fontWeight:"500",
    //     marginTop:8,
      
    // },

})
export default styles