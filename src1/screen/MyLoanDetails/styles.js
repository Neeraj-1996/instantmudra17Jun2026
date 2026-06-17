import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
   container:{
       height:"100%",
       width:"100%",
       backgroundColor:"white",
       padding:20
   },
//   
   loanCard:{
    height:86,
    // width:"100%",
    borderWidth:1,
    borderRadius:10,
    padding: 8,
    // margin: 20,
    marginBottom: 0,
    flexDirection:"row",
    borderColor:"#E3E5E5",
    justifyContent:"space-between"
   },

   AppliedCard:{
    height:"100%",
    width:"24%",
    backgroundColor:"#FBE9EA",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:4,
    // 
},
loanText:{
    fontSize:18,
    fontWeight:"500",
    color:'#27374D'
}
})
export default styles