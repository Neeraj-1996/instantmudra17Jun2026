import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../common';
const styles = StyleSheet.create({
   container: {
    height:"60%",
    width:"100%",
    padding:20
  },
  field:{
      height:50,
      width:"100%",
      flexDirection:"row",
     alignItems:"center",
     backgroundColor:"#212F3D",
     borderRadius:5
  
  },
  text:{
      fontSize:12,
      fontWeight:"600",
      color: "white",
      marginLeft:50
  },
  image:{
      height:30,
      width:30,
      marginLeft:10
  }
})
export default styles