import { StyleSheet } from "react-native"
import colors from "../../common"

const styles = StyleSheet.create({
    image:{
        height:80,
        width:80,
        alignSelf:"center",
        marginTop:100
    },
  
    title:{
        fontSize:28,
        fontWeight:"400",
        color:"#86B6F6",
        marginTop:16,
        alignSelf:"center"

    },
    subTitle:{
        fontSize:20,
        fontWeight:"400",
        alignSelf:"center",
        // marginTop:12,
        width: '80%',
        textAlign: 'center',
        // marginTop:28
        color:'#000'
    },
    loanDetailsCard:{
        height:100,
        width:"90%",
        marginTop:24,
        borderRadius:8,
        borderColor:"white",
        borderWidth:1,
        padding:16,
       
      
    },
    text:{
        fontSize:20,
        fontWeight:"400",
        color:'#27374D'
    },
    textTwo:{
        fontSize:20,
        fontWeight:"400",
        marginTop:8,
        alignSelf:"center"
        
    },
    lastText:{
        fontSize:20,
        fontWeight:"300",
        alignSelf:"center",
        marginTop:24,
       

    },
    line:{
        marginTop:20,
        width:"100%", 
        flexDirection:"row",
       
       
        
    },
    fieldText:{
        fontSize:14,
        fontWeight:"500",width:"50%"
    },


})
export default styles