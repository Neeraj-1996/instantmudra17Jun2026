import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
   container:{
       height:"100%",
       width:"100%",
       backgroundColor:"white",
       padding:20
   },
   tab:{
       width:"100%",
       height:"10%",
       flexDirection:"row",
       justifyContent:"space-between",
       paddingHorizontal:20,
       alignItems:"flex-end"
   },
   text:{
       fontSize:16,
       fontWeight:"500",
       color:"white",
       marginBottom: 12
   },
   loanCard:{
    height:90,
    width:"100%",
    borderWidth:1,
    borderRadius:10,
    padding: 8,
    flexDirection:"row",
    borderColor:"#E3E5E5"
   },
   AppliedCard:{
    height:"100%",
    width:"24%",
    backgroundColor:"#FBE9EA",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:4,
    paddingHorizontal: 10
},
})
export default styles