import { StyleSheet } from "react-native"
import colors from "../../common"
const styles = StyleSheet.create({
arrowImage:{
    height:26, 
    width:38,
    marginLeft:23,
    marginTop:12
},
loginText:{
    fontSize:18,
    fontWeight:"700",
    marginTop:30
},
card:{
    height:"50%",
    width:"100%",
    backgroundColor:"white", 
    marginTop:24,
},
cardOne:{
    height:"38%",
    width:"100%",
    backgroundColor:"white",
    flexDirection:"row",
},
cardTwo:{
    height:"38%",
    width:"100%",
    backgroundColor:"white",
    flexDirection:"row",
    marginTop:26

},
cardThree:{
    height:"100%",
    width:"46%",
    backgroundColor:"#FBE9EA",
    borderRadius: 8,
    alignItems:"center" ,
    justifyContent: 'center'
},
image:{
    // marginTop:22,
},
imageTick:{
    height: 28, 
    width: 28,
    position: 'absolute', 
    right: -10,
    top: -10
},
cardText:{
    fontSize:14,
    fontWeight:"500",
    marginTop:22
},
button:{
    height:40, 
    width:"46%",
    backgroundColor:"#E3E5E5",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:16,
   position:"absolute",
   bottom:80,
    alignSelf:"center"
    
},
buttonText:{
    fontSize:14, 
    fontWeight:"400",
    color:colors.lightGrey
},

})

export default styles
