import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const EmploymentStatusScreen = () => {
  const [status, setStatus] = useState('0'); // '0' for salerid, '1' for self-employed
  const navigation = useNavigation();

  const handleSubmit = () => {
    const myHeaders = {
      "Content-Type": "application/json",
      "Cookie": "ci_session=302860cvuk88fufugntciugb9as4tpr3"
    };

    const data = {
      "phone_no": 7011851125,
      "status": parseInt(status)
    };

    axios.post("https://instantmudra.com/admin/API/checkEmploymentStatus", data, { headers: myHeaders })
      .then(response => {
        const result = response.data;
        if (result.data === "true") {
          navigation.navigate('PersonalInformation');
        } else {
          Alert.alert("Error", "Employment status not verified.");
        }
      })
      .catch(error => {
        console.error(error);
        Alert.alert("Error", "An error occurred. Please try again.");
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Select Employment Status</Text>
      <RadioButton.Group
        onValueChange={value => setStatus(value)}
        value={status}
      >
        <View>
          <Text>Salerid</Text>
          <RadioButton value="0" />
        </View>
        <View>
          <Text>Self Employed</Text>
          <RadioButton value="1" />
        </View>
      </RadioButton.Group>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default EmploymentStatusScreen;
