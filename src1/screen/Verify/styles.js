import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    arrowImage:{
        height:24, 
        width:24,
        marginLeft:23,
    },
    otpImage:{
        height:"70%", 
        width:"40%",
        alignSelf:"center",
        marginTop:30
    },
    footer:{
        backgroundColor:colors.white,
        height:"60%",
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
        fontSize:15,
        fontWeight:"400",
        marginTop:14,
        color:"#595959",
        width:"80%"
       
    },
    button:{
        height:40, 
        width:"46%",
        backgroundColor:"#E3E5E5",
        // justifyContent:"center",
        // alignItems:"center",
        borderRadius:16,
        // marginTop: 80
    },
    buttonText:{
        fontSize:14, 
        fontWeight:"400",
        color:colors.lightGrey
    },
    textInputContainer: {
        marginTop: 20,
        marginBottom: 30,
        paddingVertical: 7,
      },
      squareTextInput: {
        width: 41,
        height: 47,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderBottomWidth: 1,
      },

})
export default styles