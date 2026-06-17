import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    arrowImage:{
        height:24, 
        width:24,
        marginLeft:23,
        
    },
    otpImage:{
        height:"80%", 
        width:"30%",
        alignSelf:"center",
        
    },
    footer:{
        backgroundColor:colors.white,
        height:"100%",
        width:"100%",
        borderTopLeftRadius:28,
        borderTopRightRadius:28,
        padding:20
        
    },
    loginText:{
        fontSize:18,
        fontWeight:"700",
        marginTop:30
    },
    loginTextTwo:{
        fontSize:14,
        fontWeight:"400",
        marginTop:14,
        color:"#595959",
        width:"100%"
       
    },
    button:{
        height:40, 
        width:"46%",
        backgroundColor:"#E3E5E5",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:16,
        marginTop:24
        
    },
    buttonText:{
        fontSize:14, 
        fontWeight:"400",
        color:colors.lightGrey
    },
    textField:{
        fontSize:16,
        fontWeight:"500",
        marginTop:22,
      
    },
    textInput:{
        height:44, 
        width:"100%",
        borderColor:"grey",
        borderRadius:6,
        borderWidth:1,
        padding:14,
        marginTop:12
    },

})
export default styles