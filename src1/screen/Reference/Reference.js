/* eslint-disable prettier/prettier */
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  TouchableOpacityBase,
  TouchableOpacityComponent,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import LoginButton from '../../components/LoginButton/LoginButton';
import LinearButton from '../../components/LinearButton/LinearButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL, ERROR_MESSAGE } from '../../utils';
import Loader from '../../components/Loader/Loader';

const Reference = props => {
  console.log("🚀 ~ file: Reference.js ~ line 20 ~ props", props)
  const [showLoader, setShowLoader] = useState(false);
  const [Name, setName] = useState(props?.referenceData?.name);
  const [MobileNumber, setMobileNumber] = useState(props?.referenceData?.mobile);
  const [EmailAddress, setEmailAddress] = useState(props?.referenceData?.email);
  const [Occupation, setOccupation] = useState(props?.referenceData?.occupation);

  const handleValidated = () => {
      const MobileNumberRegex = /^\d{10}$/;
      const EmailAddressRegex = /\S+@\S+\.\S+/;

      return (
        Name?.length > 2 &&
        Occupation?.length > 2 &&
        MobileNumberRegex.test(MobileNumber) &&
        EmailAddressRegex.test(EmailAddress) &&
        !props?.referenceData?.id
      );
    };

    const updateReferenceDetails = async () => {
      setShowLoader(true)
      const token = await AsyncStorage.getItem('TOKEN')
      const userData = await AsyncStorage.getItem('USER_DATA')
      const user_data = JSON.parse(userData);
      const config = {
        headers: {
          'Authorization': 'Bearer '+token
        // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUaGVfY2xhaW0iLCJhdWQiOiJUaGVfQXVkIiwiaWF0IjoxNjM2NjU5NjkwLCJuYmYiOjE2MzY2NTk3MDAsImV4cCI6MTYzOTI1MTY5MCwiZGF0YSI6eyJpZCI6IjEyIiwidXNlcl9uYW1lIjoiZGVlcGFuc2hpMTQiLCJwYXNzd29yZCI6IjM2NzI1MWVhODJhNDY4ZTI0MjI1MzIwN2UyYzk4ZjI3IiwiZmlyc3RfbmFtZSI6InRlc3QgdXNlciIsImxhc3RfbmFtZSI6Imxhc3QiLCJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsInBob25lIjoiODk2NTMyNjU4OSJ9fQ.oaU_k4vjmBO0DsPRboDXdqrELHCBL-kWE98NMdUHWhI'
        }
    }
    axios.post(API_BASE_URL+'update-reference-details', {
      "reference_id": props?.referenceData?.id,
      "name": Name,
      "mobile": MobileNumber,
      "email": EmailAddress,
      "occupation": Occupation,
      "updated_by": user_data?.id
      }, config)
      .then(res => {
        setShowLoader(false)
        if (res?.data.status === 200) {
          alert('Success')
          props.onPress(res?.data?.data?.reference_details)
        }
          console.log("MMMMMMMMMMMM Resresres fetchPersonalDetails", res)
      }).catch(err => {
          setShowLoader(false)
          alert(ERROR_MESSAGE)
          console.log("MMMMMMMMMMMM ErrErrErr fetchDocument", err)
      })
    }

    const insertReferenceDetails = async () => {
      setShowLoader(true)
      const token = await AsyncStorage.getItem('TOKEN')
      console.log("JKJKJKJ TOKEN", token)
      const userData = await AsyncStorage.getItem('USER_DATA')
      const user_data = JSON.parse(userData);
      const config = {
        headers: {
        'Authorization': 'Bearer '+token
        // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJUaGVfY2xhaW0iLCJhdWQiOiJUaGVfQXVkIiwiaWF0IjoxNjM2NjU5NjkwLCJuYmYiOjE2MzY2NTk3MDAsImV4cCI6MTYzOTI1MTY5MCwiZGF0YSI6eyJpZCI6IjEyIiwidXNlcl9uYW1lIjoiZGVlcGFuc2hpMTQiLCJwYXNzd29yZCI6IjM2NzI1MWVhODJhNDY4ZTI0MjI1MzIwN2UyYzk4ZjI3IiwiZmlyc3RfbmFtZSI6InRlc3QgdXNlciIsImxhc3RfbmFtZSI6Imxhc3QiLCJlbWFpbCI6InRlc3R1c2VyQGdtYWlsLmNvbSIsInBob25lIjoiODk2NTMyNjU4OSJ9fQ.oaU_k4vjmBO0DsPRboDXdqrELHCBL-kWE98NMdUHWhI'
        }
    }
    console.log("JKJKJKJ userID refreneBody", {
      "user_id": Number(user_data?.id),
      "name": Name,
      "mobile": MobileNumber,
      "email": EmailAddress,
      "occupation": Occupation,
      "updated_by": Number(user_data?.id) // yeh wala
    })
    axios.post(API_BASE_URL+'insert-reference-details', {
        "user_id": Number(user_data?.id),
        "name": Name,
        "mobile": MobileNumber,
        "email": EmailAddress,
        "occupation": Occupation,
        "updated_by": Number(user_data?.id) // yeh wala
      }, config)
      .then(res => {
        setShowLoader(false)
        if (res?.data.status === 200) {
          alert('Success')
          props.onPress(res?.data?.data?.reference_details)
        }
          console.log("MMMMMMMMMMMM Resresres fetchPersonalDetails", res)
      }).catch(err => {
          setShowLoader(false)
          alert(ERROR_MESSAGE)
          console.log("MMMMMMMMMMMM ErrErrErr fetchDocument", err?.response)
      })
    }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Loader showLoader={showLoader}/>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: '700', fontSize: 18}}>Reference 1</Text>
          <TouchableOpacity onPress={() => props.onCrossPress()}>
            <Image source={require('../../assests/crossImage.png')} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.textField, {marginTop: 12}]}> Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setName(text)}
          placeholder="Enter Name"
          value={Name}
          editable={!props?.referenceData?.id}
        />
        <Text style={styles.textField}> Mobile Number</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setMobileNumber(text)}
          placeholder="Enter Mobile Number"
          keyboardType={'numeric'}
          maxLength={10}
          value={MobileNumber}
          editable={!props?.referenceData?.id}
        />
        <Text style={styles.textField}> Email Address</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setEmailAddress(text)}
          placeholder="Enter Email Address"
          value={EmailAddress}
          editable={!props?.referenceData?.id}
        />

        <Text style={styles.textField}> Occupation</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setOccupation(text)}
          placeholder="Enter Occupation"
          value={Occupation}
          editable={!props?.referenceData?.id}
        />

        { handleValidated() ? (
          <LinearButton 
            onPress={() => {
              props?.referenceData?.id
              if (props?.referenceData?.id) {
                updateReferenceDetails();
              } else {
                insertReferenceDetails();
              }
            }}
            title={'Save Information'} width={150} marginTop={40} />
          ) : (
          <LoginButton
          
            title={'Save Information'}
            style={{alignSelf: 'center', marginTop: 40}}
          />
        )} 
      </SafeAreaView>
    </View>
  );
};
export default Reference;
