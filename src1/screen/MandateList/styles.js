import {StyleSheet} from 'react-native';
import colors from '../../common';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
   
  },
  loanCard:{
    height:95,
    width:"100%",
    borderWidth:1,
    borderRadius:10,
    padding: 8,
    borderColor:"#E3E5E5",
    flexDirection:"row",
    marginTop:20,
    // backgroundColor:"blue"
   },
  
   text:{
      fontWeight:"500",
      fontSize:16,
   },
   subText:{
    fontWeight:"500",
    fontSize:14,
    color: colors.lightGrey
 },
  
});
export default styles;
