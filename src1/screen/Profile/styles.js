import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"red"
    },
    card:{
        height:"75%",
        width:"100%",
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        backgroundColor:"white",
        padding:20,
       
       
       
    },
    field:{
        height:50,
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        
    },
    fieldText:{
        fontWeight:"500",
        fontSize:14,
    },
    image:{
        height:25,
        width: 25,
    },
    profileImage:{
        height:60,
        width: 60,
    }

})
export default styles