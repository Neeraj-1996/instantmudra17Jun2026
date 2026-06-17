import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import ProgressWheel from 'react-native-progress-wheel';
import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../utils';
import axios from 'axios';
const CreditScoreScreen = ({ route }) => {
  const { progress } = route.params;

  const [animatedProgress, setAnimatedProgress] = useState(0); // Initial progress is 0
  const [currentColor, setCurrentColor] = useState('red'); // Start with red color
  const [loginUserData, setLoginUserData] = useState({});
  useEffect(() => {
    // Animate the progress from 0 to the actual progress value
    const interval = setInterval(() => {
      if (animatedProgress < progress) {
        setAnimatedProgress((prev) => prev + 5); // Increment progress
      } else {
        clearInterval(interval); // Stop the animation when the progress reaches the target value
      }
    }, 1); // Update progress every 10 milliseconds (adjust for speed)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [animatedProgress, progress]);

  // Function to determine the color based on the current animated progress
  const getProgressColor = (currentProgress) => {
    if (currentProgress < 300) return 'red'; // Red for < 300
    if (currentProgress >= 300 && currentProgress < 500) return 'orange'; // Orange for 300-499
    if (currentProgress >= 500 && currentProgress < 700) return 'yellow'; // Yellow for 500-699
    if (currentProgress >= 700 && currentProgress < 850) return 'blue'; // Blue for 700-849
    return 'green'; // Green for 850 and above
  };

  useEffect(() => {
    // Update color based on animated progress
    setCurrentColor(getProgressColor(animatedProgress));
  }, [animatedProgress]);

  useEffect(() => {
    fetchUserDetails()
  }, []);

  const fetchUserDetails = async () => {
    const userData = await AsyncStorage.getItem("USER_DATA")
    const user_data = JSON.parse(userData)
    const formData = new FormData();
    formData.append("user_id", user_data?.user_id);
    axios.post(API_BASE_URL + "getUserDetails", formData)
      .then(res => {
        console.log("fetchUserDetails response", res?.data)
        if (res.status === 200) {
          setLoginUserData(res?.data)
        }
      })
      .catch(err => {
        console.log("fetchUserDetails error", err)
        alert('We are facing some techical issue. Team is looking into it.')
      })
  }

  const scaledProgress = (animatedProgress / 900) * 100; // Scale progress to percentage

  const handleOpenLink = () => {
    Linking.openURL('https://consumer.experian.in/ECSINDIA-DCE/');
  };
  return (
    <View style={styles.container}>
      <Header navigation={route?.navigation} title={'Credit Score'} />
      <View style={styles.otpImage}>
        <Image
          style={styles.otpImage1}
          source={require('../../assest/logo.png')}
          resizeMode="contain"
        />
      </View>

      <View style={styles.progressContainer}>
        <ProgressWheel
          size={140}
          width={20}
          progress={scaledProgress}
          color={currentColor}  // Dynamically change color based on progress
          backgroundColor="#e0e0e0"
          duration={3000}
        />
        <Text style={styles.progressText}>{Math.round(animatedProgress)}</Text>
      </View>

      <Text style={styles.heading}>Your Credit Score</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>PDF version of the report has been sent</Text>
        <Text style={styles.infoText}>to your mobile number</Text>
      </View>

      <Text style={styles.phoneNumber}>{loginUserData?.phone_no}</Text>

      <View style={styles.disputeContainer}>
        <Text style={styles.disputeText}>For any dispute-related concerns, please</Text>
        <Text style={styles.disputeText}>reach out to
          <Text style={styles.portalText} onPress={handleOpenLink}>  Experian Customer Dispute Portal</Text>


        </Text>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Powered By</Text>
        <Image source={require("../../assest/exprain/experian.png")} style={styles.experianLogo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  progressText: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  disputeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  disputeText: {
    fontSize: 14,
    color: '#777',
  },
  portalText: {
    color: 'blue',
    fontWeight: 'bold',
    marginRight: 10
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 18,
    color: '#000',
    marginRight: 10,
  },
  experianLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  otpImage: {
    width: 250,
    height: '15%',
    marginTop: 30
  },
  otpImage1: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});

export default CreditScoreScreen;

