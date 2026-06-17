import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    textField: {
        fontSize: 16,
        fontWeight: "500",
    },
    fieldName: {
        fontSize: 14,
        fontWeight: "700",
        marginTop: 1
    },
    textInput: {
        height: 44,
        width: "100%",
        borderColor: "grey",
        borderRadius: 6,
        borderWidth: 1,
        padding: 10,
        marginTop: 12,
        flexDirection: "row",
        color:'#001C30'
    },
    uploadTouchable: {
        height: 44,
        width: "100%",
        borderColor: "grey",
        borderRadius: 6,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 12,
        flexDirection: "row",
        alignItems: 'center'
    },
    text: {
        color: 'grey',
        marginLeft: 12,
        width: '75%',alignSelf:'center'
    },
      text1: {
        color: 'grey',
        marginLeft: 12,
        width: '75%',alignSelf:'center',
        textAlign:'center'
    },
    input: {
        marginLeft: 20
    },
    deleteImage: {
        position: 'absolute',
        right: 12,
        backgroundColor: '#FF90BC',
        padding: 4,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    dropDownContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'grey',
        marginTop: 8,
        height: 44,
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",

    },
    image: {
        width: 20, height: 20
    },

     field:{
        width: "100%",
         height:90,
         marginTop:12,
  
         justifyContent:"center",
         alignItems:"center",
        
        borderColor: "grey",
        borderRadius: 6,
        borderWidth: 1,

        color:'#001C30'
     },
     redCross:{
         height: 22, 
         width: 22,
         borderRadius:9,
     },

})
export default styles