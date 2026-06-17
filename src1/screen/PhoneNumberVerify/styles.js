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


    canvas: {
        width: 150,
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 20,
      },
      input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
      },
      checkboxContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 20,
        marginTop:20
      },
      footer1: {
        // marginTop: 40,
        fontSize: 17,
        color: "#000",
        marginRight:20
    },
      experianLogo: {
        width: 50,
        height: 50,
        resizeMode: "contain",
        marginTop: 10,
        margin:5
      },
      Image: {
        width: 250,
        height: '15%',
        marginTop:30
      },
   
      LogoImage: {
        width: 250,
        height: '20%',
        marginTop:30,
        alignSelf:'center'
      },
      LogoImage1: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
      },

})
export default styles