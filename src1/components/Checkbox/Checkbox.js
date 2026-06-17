import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const CustomCheckBox = ({ isChecked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
      <Image
        source={
          isChecked
            ? require("../../assests/checked.png") 
            : require("../../assests/unchecked.png") 
        }
        style={styles.checkboxImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 20,
    height: 20,
   
  },
  checkboxImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default CustomCheckBox;
