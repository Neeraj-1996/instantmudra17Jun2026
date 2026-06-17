import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: "red"
    },
    arrowImage:{
        height: 24,
        width: 24,
    },
    create:{
        fontSize:20,
        fontWeight:"500",
        color: colors.white,
    },
    footer:{
        backgroundColor: colors.white,
        height:"75%",
        width:"100%",
        borderTopRightRadius:28,
        borderTopLeftRadius:28,
        padding:16,
        // backgroundColor:"red"
    },
    textField:{
        fontSize:16,
        fontWeight:"500",
        marginTop:8,
      
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
    button:{
        height:44, 
        width: 170,
        backgroundColor:"#E3E5E5",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:22
    },
    buttonText:{
        fontSize:14, 
        fontWeight:"400",
        color:colors.lightGrey
    },
    image:
    {
        marginLeft:20,
        height:40, width:40,
        borderRadius:20,
       
       
    }
   

})
export default styles