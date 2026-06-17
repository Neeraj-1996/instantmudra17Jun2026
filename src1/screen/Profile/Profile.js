import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TouchableOpacityBase,
  Alert,
  
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import HomeFooter from '../../components/HomeFooter/HomeFooter';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetScreen } from '../../common';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const Profile = props => {
  const [selectedBottomTab, setSelectedBottomTab] = useState('Profile');
  const [loginUserData, setLoginUserData] = useState({});
  const [storeNam, setStoreNam] = useState('');
  const [progress, setProgress] = useState('');
    const [activeLoanData, setActiveLoanData] = useState({});

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

    useEffect(() => {
      if (isFocused) {
        getActiveLoan();
     
      }
    }, [isFocused]);




  useEffect(() => {
    fetchAsyncData();
    fetchDashboardData();
  }, []);

  const fetchAsyncData = async () => {
    const userData = await AsyncStorage.getItem('USER_DATA');
    setLoginUserData(JSON.parse(userData));
    const Names = await AsyncStorage.getItem("Name")
    setStoreNam(Names);
  };

  const getActiveLoan = async () => {
    const user_data = await AsyncStorage.getItem('USER_DATA');
    const Names = await AsyncStorage.getItem("Name")

    //console.log('>>?????????', Names)

    // setStoreNam(Names)


    const userdata = JSON.parse(user_data);
    // setLoginUserData(userdata);
    const formData = new FormData();
    formData.append("user_id", userdata?.user_id)
    // formData.append('user_id', 38242);
    axios
      .post(API_BASE_URL + 'getActiveLoan', formData)
      .then(res => {
        console.log('Home.js getActiveLoan response', res.data);
        if (res.status == 200) {
          if (Array.isArray(res?.data)) {
            console.log("res?.data  hkjl;jghvjklkjljr",res?.data);
            setActiveLoanData(res?.data);
          } else {
            // alert(res?.errorMessage);
          }
        }
      })
      .catch(err => {
        console.log('getActiveLoan error', err);
        alert('We are facing some techical issue. Team is looking into it.')
      });
  };
 



  const fetchDashboardData = async () => {
    try {
      const implRaw = await AsyncStorage.getItem('impl');
      const phone = await AsyncStorage.getItem('phone');
      const impl = implRaw?.startsWith('"') ? JSON.parse(implRaw) : implRaw;

  // console.log("Impl",impl);s
  console.log("Imp dfdsl",implRaw);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'ci_session=dshkrcap32tob89dd3v29bo6hcahor5p; ci_session=o47g64lmaqtk1mcrvo03b1fjkhe6sur5',
        },
      };
  
      const body = {
        phone_no: phone,
        order_id: impl,
      };
  console.log("body",body);
      const response = await axios.post('https://instantmudra.com/admin/API/BureauScore', body, config);
      
      console.log("response.data   dffd",response.data);
  
      if (response?.data?.status === 200) {
        setProgress(response?.data?.bureau_score);
      }
    } catch (error) {
      console.error(error);
      // alert('We are facing some technical issues. The team is looking into it.');
    }
  };


  // console.log("fdssd",progress)
  const logout = () => {
    AsyncStorage.clear()
    props.navigation.replace('PhoneNumberVerify');

  };
// console.log("fdskflksd",progress)

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.2 }}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.2 }}
        locations={[0, 0.6, 1]}
        colors={['#7B4397', '#B53059', '#DC2430']}
        style={{ height: '25%', width: '100%' }}>
        <SafeAreaView>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ height: 25, width: 25, tintColor: "#fff", margin: 20 }}
              source={require('../../assest/ar.png')}
            />

          </TouchableOpacity>

          <View
            style={{
              height: 80,
              width: '100%',
              paddingHorizontal: 20,
              marginTop: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={styles.profileImage}
              source={require('../../assests/ProfilePicture.png')}
            />
            <View style={{ width: '60%' }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 18,
                  marginLeft: 14,
                  color: 'white',
                  // width: '60%'
                }}
                numberOfLines={1}
              >
                {storeNam || loginUserData?.full_name}
              </Text>
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  marginLeft: 14,
                  color: 'white',
                  // width: '60%'
                }}
                numberOfLines={1}>
                {storeNam || loginUserData?.full_name}
              </Text>
            </View>

            {/* <TouchableOpacity
              onPress={() => {
                AsyncStorage.setItem('IS_LOGGEDIN', 'false');
                resetScreen(props.navigation, 'PhoneNumberVerify');
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                height: 40,
                width: 40,
                borderRadius: 20,
                position: 'absolute',
                right: 70,
              }}>
              <Image
                style={{ height: 18, width: 18, tintColor: "#fff" }}
                source={require('../../assest/power-switch.png')}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                height: 40,
                width: 40,
                borderRadius: 20,
                position: 'absolute',
                right: 70,
              }} onPress={() => props.navigation.navigate("ViewProfile")}>
              {/* // }} onPress={() => props.navigation.navigate("Aadhar")}>  */}
              {/* //  }} onPress={() => props.navigation.navigate("Pan")}>   */}
              {/* // }} onPress={() => props.navigation.navigate("PersonalInformation")}> */}
              {/* }} onPress={() => props.navigation.navigate("Salarystatus1")}>  */}
              <Image
                style={{ height: 18, width: 18, tintColor: "#fff" }}
                source={require('../../assest/pen.png')}
              />
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </LinearGradient>
      <View style={styles.card}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
             <View style={[styles.field, {}]}>
              <Image
                style={styles.image}
                source={require('../../assest/1.png')}
              />
              <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 , color:"#394867"}}>
                {' '}
                Active Loans
              </Text>
            </View>
          </TouchableOpacity>
          {Number(progress) > 0 && (
  <TouchableOpacity onPress={() => props.navigation.navigate("CreditScoreScreen", { progress: progress })}>
    <View style={[styles.field]}>
      <Image
        style={styles.image}
        source={require('../../assest/creditscore.png')}
      />
      <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20, color: "#394867" }}>
        Credit Score
      </Text>
    </View>
  </TouchableOpacity>
)}

          {/* <TouchableOpacity onPress={() => props.navigation.navigate("CreditScoreScreen", { progress: progress })}>
             <View style={[styles.field, {}]}>
              <Image
                  style={styles.image}
                  // source={require('../../assest/1.png')}
                  source={require('../../assest/creditscore.png')}
                />
                <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 , color:"#394867"}}>
                  {' '}
                 Credit Score
                </Text>
              </View>
              </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => props.navigation.navigate('MyLoanDetails')}
            style={[styles.field, { marginTop: 20 }]}>
            <Image
              style={styles.image}
              source={require('../../assest/2.png')}
            />
            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20, color:"#394867" }}>
              {' '}
              Applied Loans
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ComplainForm')}
            style={[styles.field, { marginTop: 20 }]}>
            <Image
              style={styles.image}
              source={require('../../assest/complain.png')}
            />
            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 , color:"#394867"}}>
              {' '}
              Complain Form
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('SalariesWorkDetails', { from: "Profile" })}
            style={[styles.field, { marginTop: 20 }]}>
            <Image
              style={styles.image}
              source={require('../../assest/3.png')}
            />
            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 , color:"#394867"}}>
              {' '}
              Update Bank Details
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => props.navigation.navigate('Notifications')}>
            <View style={[styles.field, { marginTop: 20 }]}>
              <Image
                style={styles.image}
                source={require('../../assest/4.png')}
              />
              <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 , color:"#394867"}}>
                {' '}
                Notification
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <View style={[styles.field, { marginTop: 20 }]}>
              <Image
                style={styles.image}
                source={require('../../assest/8.png')}
              />
              <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 }}>
                {' '}
                Cancellation & Refund Policy
              </Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => props.navigation.navigate('PrivacyPolicy')}>

            <View style={[styles.field, { marginTop: 20 }]}>
              <Image
                style={styles.image}
                source={require('../../assest/9.png')}
              />
              <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20, color:"#394867" }}>
                {' '}
                Privacy Policy
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Term')}>

            <View style={[styles.field, { marginTop: 20 }]}>
              <Image
                style={styles.image}
                source={require('../../assest/5.png')}
              />
              <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 , color:"#394867"}}>
                {' '}
                Terms & Condition
              </Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity

            style={[styles.field, { marginTop: 20 }]}
            onPress={() => props.navigation.navigate('Faq')} >
            <Image
              style={styles.image}
              source={require('../../assest/6.png')}
            />
            <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20, color:"#394867" }}>
              {' '}
              FAQ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Contact')}>
            <View style={[styles.field, { marginTop: 20 }]}>
              <Image
                style={styles.image}
                source={require('../../assest/7.png')}
              />
              <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 , color:"#394867"}}>
                {' '}
                Contact Us
              </Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => props.navigation.navigate("Aadhar")}>
            <View style={[styles.field, { marginTop: 20 }]}>
              <Image
                style={styles.image}
                source={require('../../assest/11.png')}
              />
              <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 20 }}>
                {' '}
                Due Payment History
              </Text>
            </View>

          </TouchableOpacity> */}

          <TouchableOpacity onPress={logout}>
            <View style={[styles.field, { marginTop: 20 }]}>
              <Image
                style={styles.image}
                source={require('../../assest/log.png')}
              />
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 20, color:"#394867" }}>
                {' '}
                Logout
              </Text>
            </View>

          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Image
              style={{ width: 20, height: 20, marginLeft: 6, borderWidth: 1, borderColor: '#000', borderRadius: 20 }}
              source={require('../../assest/logo.png')}
            />
            <Text style={{ marginLeft: 20, fontWeight: "bold", color:'#9BA4B5' }}>App Version: <Text style={{ color: "green" }}>67.8.6</Text></Text>

          </View>
        </ScrollView>

      </View>
    </LinearGradient>
  );
};

export default Profile;