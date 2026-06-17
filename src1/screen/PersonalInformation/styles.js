import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({

text:{
    fontSize:16,
    fontWeight:"500",
    color:"white",
    marginLeft:30
},

    container:{
        // height:"100%",
        // backgroundColor:"yellow",
        padding:20
    },
    textField:{
        fontSize:16,
        fontWeight:"500",
        marginTop:8,
        color:'#212A3E'
    },
    textInput:{
        height: 44, 
        width:"100%",
        borderColor:"grey",
        borderRadius:6,
        borderWidth:1,
        paddingHorizontal:16,
        marginTop:12,
        color:"#000",
        fontWeight:"400"
    },
    middleContainer:{
        flexDirection:"row",
      
    },
    dropDownContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'grey',
        marginTop: 8,
        height: 44, 
        width:"100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        
      },
      textInputContainer: {
        marginTop: 20,
        marginBottom: 30,
        // paddingVertical: 7,
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