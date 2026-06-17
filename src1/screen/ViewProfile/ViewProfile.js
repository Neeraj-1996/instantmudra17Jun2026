import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableOpacityBase,
  Alert,

} from 'react-native';
import colors from '../../common';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../../components/Header/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../../utils';
const ViewProfile = (props) => {

    const [loginUserData, setLoginUserData] = useState({});

    function handleBackButtonClick() {
      props.navigation.goBack();
      return true;
    }


    useEffect(() => {
      fetchUserDetails()
    }, []);

    const fetchUserDetails = async()=>{
      const userData = await AsyncStorage.getItem("USER_DATA")
      const user_data = JSON.parse(userData)
      const formData = new FormData();
      formData.append("user_id", user_data?.user_id);
     axios
     .post(API_BASE_URL+"getUserDetails", formData)
     .then(res=>{
        console.log("fetchUserDetails response", res?.data)
        if(res.status === 200){
          setLoginUserData(res?.data)
        }
     })
     .catch(err=>{
      console.log("fetchUserDetails error", err)
      alert('We are facing some techical issue. Team is looking into it.')
     })
    }

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0.2}}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity style={{marginTop: 60, marginLeft: 20}} onPress={()=> props.navigation.goBack()}>
        <Image style= {styles.image}source= {require("../../assests/arrowBack.png")}/>
     </TouchableOpacity>
      <View
        style={{
          height: 80,
          width: '100%',
          paddingHorizontal: 20,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          // marginTop:"25%"
        }}>
        <Image
          style={styles.profileImage}
          source={require('../../assests/ProfilePicture.png')}
        />
        <View>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 18,
                  marginLeft: 14,
                  color: 'white',
                }}>
                {loginUserData?.first_name + ' ' }
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  marginLeft: 14,
                  color: 'white',
                }}>
                {loginUserData?.first_name + ' ' }
              </Text>
            </View>
        <View>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 18,
              marginLeft: 14,
              color: 'white',
            }}></Text>
        </View>

       
      </View>
            <View style = {styles.container}>
                  <View style= {styles.field}>
                 
                     <Image style= {styles.image} source={require('../../assest/gmail.png')}/>
                
                     <Text style= {styles.text}>{loginUserData?.official_mail}</Text>
                      
                 </View>  

                 <View style= {[styles.field,{marginTop:20,}]}>
                  
                     <Image style= {styles.image} source={require('../../assest/calender.png')}/>
                     
                     <Text style= {styles.text}>{loginUserData?.d_o_b}</Text>
                      
                 </View> 

                 <View style= {[styles.field,{marginTop:20}]}>
                   
                     <Image style= {styles.image} source={require('../../assest/phone.png')}/>
                   
                     <Text style= {styles.text}>{loginUserData?.phone_no}</Text>
                      
                 </View> 

                 <View style= {[styles.field,{marginTop:20}]}>
                   
                     <Image style= {styles.image} source={require('../../assest/location.png')}/> 
                   
                     <Text style= {styles.text}>{loginUserData?.local_address + ' ' + loginUserData?.address_city}</Text>
                      
                 </View> 
            
            
            
            
            </View>





    </LinearGradient>
  );
};

export default ViewProfile;
