import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },

    textField:{
        fontSize:16,
        fontWeight:"500",
        marginTop:8,
       color:'#000'
    },
    textInput:{
        height: 44, 
        width:"100%",
        borderRadius:6,
        borderWidth:1,
        paddingHorizontal:16,
        marginTop:12,
        color:'#000'
    },
    bankField:{
    fontSize:14,
    fontWeight:400
       
    },
    fieldName:{
        fontSize:14,
        fontWeight:"700",
        marginTop:16
     },
     textInput:{
        height: 44, 
        width:"100%",
        borderColor:"grey",
        borderRadius:6,
        borderWidth:1,
        marginTop:12,
        flexDirection:"row",
        color:'#000'
    },
    uploadTouchable: {
        height: 44, 
        width:"100%",
        borderColor:"grey",
        borderRadius:6,
        borderWidth:1,
        paddingHorizontal:10,
        marginTop:12,
        flexDirection:"row",
        alignItems: 'center'
    },
    text: {
        color: 'grey',
        marginLeft: 12,
        width: '75%'
    },
    input:{
        marginLeft:20
    },
    deleteImage: {
        position: 'absolute',
        right: 12
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
        
      }
})
export default styles