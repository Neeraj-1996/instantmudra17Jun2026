import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

const Captcha = ({ onValueChange }) => {
  const [captcha, setCaptcha] = useState("");
  const [stylesArray, setStylesArray] = useState([]);
  const [input, setInput] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomText = "";
    const newStyles: any[] = [];

    for (let i = 0; i < 6; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      randomText += char;
      newStyles.push({
        color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 50%)`,
        transform: [{ rotate: `${Math.floor(Math.random() * 20 - 10)}deg` }],
      });
    }

    setCaptcha(randomText);
    setStylesArray(newStyles);
    onValueChange(randomText); // Pass CAPTCHA back to screen
  };

  useEffect(() => {
    generateCaptcha();

    const interval = setInterval(() => {
      setStylesArray((prev) =>
        prev.map((item) => ({
          ...item,
          color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 50%)`,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
        <View style={{flexDirection:'row'}}>
      <View style={styles.captchaBox}>
        <View style={styles.captchaRow}>
          {captcha.split("").map((char, index) => (
            <Text key={index} style={[styles.charStyle, stylesArray[index]]}>
              {char}
            </Text>
          ))}
        </View>
      </View>

      <TouchableOpacity onPress={generateCaptcha} style={{ flexDirection: "row", justifyContent: "flex-end", width: "50%", alignSelf: "center" }}>
        <Text style={styles.refresh}>↻ Refresh CAPTCHA</Text>
      </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Enter CAPTCHA"
        style={styles.input}
        value={input}
        onChangeText={(val) => {
          setInput(val);
          onValueChange(val, captcha);
        }}
      />

    </View>
  );
};

export default Captcha;

const styles = StyleSheet.create({
  captchaBox: {
    width: "49%",
    height: 50,
    borderWidth: 1,
     borderColor: 'gray',
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  captchaRow: { flexDirection: "row" },
  charStyle: {
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 2,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    height: 45,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginTop: 10,
    // alignSelf: "center",
  },
  refresh: {
    color: "red",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
  },
});
