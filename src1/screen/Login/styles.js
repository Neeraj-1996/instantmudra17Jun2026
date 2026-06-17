import { StyleSheet } from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import colors from "../../common"
const styles = StyleSheet.create({
    container:{
        
        height:"60%",
        width:"100%",
        backgroundColor:colors.white,
        position:"absolute",
        bottom:"20%",
        borderTopLeftRadius:28,
        borderTopRightRadius:28,
        padding:16,
        // backgroundColor:"red"
        
    },
    footer:{
        width:"100%",
        height:"25%",
        backgroundColor: "#F5F5F5",
        position:"absolute",
        bottom:"0%",
        padding:20
    },
    loginText:{
        fontSize:18,
        fontWeight:"700",
        // marginTop:30
    },
    loginTextTwo:{
        fontSize:14,
        fontWeight:"400",
        marginTop:10,
        // color:"#595959"
        // color:"red"
       
    },
    textField:{
        fontSize:16,
        fontWeight:"500",
        marginTop:12,
    },
    
    textInput:{
        height:44, 
        width:"100%",
        borderColor:"grey",
        borderRadius:6,
        borderWidth:1,
        paddingHorizontal:16,
        marginTop:12
    },
    
    buttonText:{
        fontSize:14, 
        fontWeight:"400",
        color:colors.lightGrey
    },
    
    image:
    {
        marginLeft:12,
        height:36, width:36,
        borderRadius:18,
    }




})
export default styles