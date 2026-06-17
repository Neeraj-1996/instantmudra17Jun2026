import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import HomeFooter from '../../components/HomeFooter/HomeFooter';
import LinearButton from '../../components/LinearButton/LinearButton';
// import Slider from 'react-native-slider';
import Slider from "@react-native-community/slider";
import CustomSlider from '../../components/Slider/CustomSlider';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import { API_BASE_URL } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import SlidMain from '../../ImageSlider/SlidMain';
import InAppUpdate from '../../InAppUpdate'

// import dynamicLinks from '@react-native-firebase/dynamic-links';


const LoanListArray = [
  {
    title: 'Loan Applied',
    subTitle: 'Your Application is received',
    key: 'loan_applied',
    completed: true,
    completedKey: [
      'Verify',
      'Pending',
      'Hold',
      'Processing',
      'Approved',
      'Sanction',
      'Payment',
    ],
  },
  {
    title: 'On Process',
    subTitle: 'Your Application is in process',
    key: 'loan_inprocess',
    completed: true,
    completedKey: [],
    completedKey: ['Processing', 'Approved', 'Sanction', 'Payment'],
  },
  {
    title: 'Approved',
    subTitle: 'Loan Approved',
    key: 'loan_approved',
    completed: false,
    completedKey: [],
    completedKey: ['Approved', 'Sanction', 'Payment'],
  },
  {
    title: 'Sanctioned',
    subTitle: 'Loan Sanctioned',
    key: 'loan_sanctioned',
    completed: false,
    completedKey: [],
    completedKey: ['Sanction', 'Payment'],
  },
];

const Home = props => {
  const [LoanAmount, setLoanAmount] = useState(3000);
  const [loanList, setLoanList] = useState([]);
  const [loginUserData, setLoginUserData] = useState({});
  const [selectedBottomTab, setSelectedBottomTab] = useState('Home');
  const [loanDetailsData, setLoanDetailsData] = useState({});
  const [currentStateCode, setCurrentStateCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLoanStatus, setCurrentLoanStatus] = useState('');
  const [activeLoanData, setActiveLoanData] = useState({});
  const [currentLoanOrderId, setCurrentLoanOrderId] = useState('');
  const [storeNam, setStoreNam] = useState('');
  const [cal, setCal] = useState('');
  const isFocused = useIsFocused();
  const [showLoader, setShowLoader] = useState(false)
  const [notificationCount, setNotificationCount] = useState(1);

  // const [token, setToken] = useState("");
  // React.useEffect(() => {
  //   // const requestPermission = async () => {
  //   //   const authStatus = await messaging().requestPermission();
  //   //   const enabled =
  //   //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   //   if (enabled) {
  //   //     console.log('Notification permission granted.');
  //   //   }
  //   // };

  //   // requestPermission();

  //   // Function to get the token
  //   const getToken = async () => {
  //     try {
  //       const token = await messaging().getToken();
  //       console.log('FCM Token:', token);
  //       // fetchUserNotificationToken(token)
  //       setToken(token);
  //       return token;
  //     } catch (error) {
  //       console.error('Error getting token:', error);
  //     }
  //   };
  //   getToken();

  //   // Listen for foreground messages
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe; // Unsubscribe on unmount
  // }, []);





  // const fetchUserNotificationToken = async(token) => {
  //   const usersData = await JSON.parse(await AsyncStorage.getItem('USER_DATA'));
  //   console.log("toekn",token);
  //   axios.post(
  //     'https://instantmudra.com/admin/API/TokenUserNotification',
  //     { user_id: usersData?.user_id,
  //       token_id:token
  //    },{headers: {'Content-Type': 'application/json'}}
  //   )
  //   .then(response => {
  //       console.log("messsage Token",response.data);

  //   })
  //   .catch(error => console.error(error));
  // };


  // useEffect(() => {
  //   const handleDynamicLink = async () => {
  //     try {
  //       const initialLink = await dynamicLinks().getInitialLink();
  //       console.log('Initial Link:', initialLink);

  //       handleLink(initialLink);

  //       const unsubscribe = dynamicLinks().onLink(handleLink);

  //       // Clean up listeners when the component is unmounted
  //       return () => unsubscribe();
  //     } catch (error) {
  //       console.error('Error handling dynamic link:', error);
  //     }
  //   };

  //   handleDynamicLink();
  // }, []);



  const handleLink = (link) => {
    try {
      console.log('Received Dynamic Link:', link);

      if (link.url) {
        // Parse and extract campaign parameters
        const url = new URL(link.url);
        const campaignParams = url.searchParams;

        console.log('Campaign Parameters:', {
          source: campaignParams.get('utm_source'),
          medium: campaignParams.get('utm_medium'),
          campaign: campaignParams.get('utm_campaign'),
        });

        // Log the campaign details to Google Analytics
        if (campaignParams.has('utm_source')) {
          analytics().logEvent('campaign_measurement', {
            source: campaignParams.get('utm_source'),
            medium: campaignParams.get('utm_medium'),
            campaign: campaignParams.get('utm_campaign'),
          });
        }
      }
    } catch (error) {
      console.error('Error handling dynamic link:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getActiveLoan();
      getCurrentStateOfUser();
    }
  }, [isFocused]);

  useEffect(() => {
    calculation();
  }, [LoanAmount])



  useEffect(() => {
    if (InAppUpdate) {
      // Ensure that InAppUpdate is available before calling checkUpdate
      InAppUpdate.checkUpdate();
    } else {
      console.warn('InAppUpdate module is not available.');
    }
  }, [])

  useFocusEffect(() => {
    // getCurrentStateOfUser();
    // getActiveLoan();
  });


  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "Exit App",
          "Are you sure you want to exit the app?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Exit", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  // const getCurrentStateOfUser = async () => {
  //   const user_data = await AsyncStorage.getItem('USER_DATA');
  //   const userdata = JSON.parse(user_data);
  //   const body = {
  //     user_id: userdata?.user_id,
  //     // user_id: 38242 
  //   };
  //   console.log("user___data>>>>>", userdata)
  //   axios
  //     .post(API_BASE_URL + 'getCurrentStateOfUser', body)
  //     .then(res => {
  //       if (res?.status === 200 && res?.data?.status === true) {
  //         setCurrentStateCode(res?.data?.code);
  //         setCurrentLoanStatus(res?.data?.laon_status);
  //         setCurrentLoanOrderId(res?.data?.order_id)
  //       }
  //       console.log('Home.js getCurrentStateOfUser response 142:', res.data);
  //     })
  //     .catch(err => {
  //       console.log('getCurrentStateOfUser145 error', err);
  //       alert('We are facing some techical issue. Team is looking into it.')
  //     });
  // };

  const getCurrentStateOfUser = async () => {
    try {
      const user_data = await AsyncStorage.getItem('USER_DATA');
      const userdata = JSON.parse(user_data);
      const body = {
        user_id: userdata?.user_id,
      };

      const res = await axios.post(API_BASE_URL + 'getCurrentStateOfUser', body);
      // console.log("res fdsfds",res)
      console.log("get user data ", res.data);
      if (res?.status === 200 && res?.data?.status === true) {
        setCurrentStateCode(res?.data?.code);
        setCurrentLoanStatus(res?.data?.laon_status);
        setCurrentLoanOrderId(res?.data?.order_id);
        AsyncStorage.setItem('impl', res?.data?.order_id);
      }
    } catch (error) {
      console.log('Error fetching currentStateCode:', error);
      // alert('We are facing some technical issue. Team is looking into it.');
    } finally {
      // After currentStateCode is fetched, set isLoading to false
      setIsLoading(false);
    }
  };


  // calculate loan

  // const getActiveLoan = async () => {
  //   const user_data = await AsyncStorage.getItem('USER_DATA');
  //   const Names = await AsyncStorage.getItem("Name")

  //   //console.log('>>?????????', Names)

  //   setStoreNam(Names)


  //   const userdata = JSON.parse(user_data);
  //   setLoginUserData(userdata);
  //   const formData = new FormData();
  //   formData.append("user_id", userdata?.user_id);
  //   console.log("formData",formData);
  //   // formData.append('user_id', 38242);
  //   axios
  //     .post(API_BASE_URL + 'getActiveLoan', formData)
  //     .then(res => {
  //       console.log('Home.js getActiveLoan response', res.data);
  //       if (res.status == 200) {
  //         if (Array.isArray(res?.data)) {
  //           setActiveLoanData(res?.data);
  //         } else {
  //           // alert(res?.errorMessage);
  //         }
  //       }
  //     })
  //     .catch(err => {
  //       console.log('getActiveLoan error', err);
  //       // Alert.alert('We are facing some techical issue. Team is looking into it.')
  //     });
  // };

  const getActiveLoan = async () => {
    try {
      const user_data = await AsyncStorage.getItem('USER_DATA');
      const Names = await AsyncStorage.getItem("Name");
      setStoreNam(Names);
      const userdata = JSON.parse(user_data);
      setLoginUserData(userdata);
      if (!userdata?.user_id) {
        console.log("User ID is missing.");
        return;
      }

      const requestBody = {
        user_id: userdata.user_id,
      };

      // console.log("Request Body:", requestBody);
      const response = await axios.post(
        API_BASE_URL + 'getActiveLoan_one',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Home.js getActiveLoan response', response.data);
      if (response.status === 200 && Array.isArray(response.data)) {
        setActiveLoanData(response.data);
      } else {
        console.log("Unexpected response format:", response);
      }

    } catch (err) {
      console.log('getActiveLoan error', err.message, err.response?.data || '');
      Alert.alert('We are facing some technical issue. Team is looking into it.');
    }
  };



  // calculation data start>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const calculation = () => {
    setShowLoader(true)
    const body = {
      loan_amount: LoanAmount
    }

    console.log("body dfsdfsdf", body);
    axios.post(API_BASE_URL + 'getLoanCalculation', body)
      .then(res => {
        console.log('Home.js getLoanCalculation', res.data);
        if (res.status === 200) {
          setCal(res?.data?.data)
          setShowLoader(false)

          // alert('hello')

        }
      })
      .catch(err => {
        console.log('getActiveLoan error', err);
        Alert.alert('We are facing some techical issue. Team is looking into it.')
      });
  };
  // calculation data end >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  const Calculationcard = () => {
    return (
      <View style={styles.card}>
        <Text
          style={[
            styles.helloText,
            { color: 'black', fontSize: 18, fontWeight: '600' },
          ]}>
          How much loan amount you need?
        </Text>
        {
          showLoader && (
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center'


              }}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  //  backgroundColor: "#fff",
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 100,
                  alignSelf: 'center',
                  elevation: 4

                }}>
                <ActivityIndicator color={'red'} size={'large'} />
              </View>
            </View>
          )
        }
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#E3E5E5',
            marginTop: 12,
          }}></View>
        <View style={styles.field}>
          <Text style={[styles.fieldText, { color: '#213555' }]}>Total Interest</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#213555' }}>
            {cal?.InterestAmount}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={[styles.fieldText, { color: '#213555' }]}>Processing Fee</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#213555' }}>
            {cal?.processingFee}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={[styles.fieldText, { color: '#213555' }]}>GST (18%)</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#213555' }}>
            {cal?.GstAmount}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={[styles.fieldText, { color: '#213555' }]}>Disburse amount</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#213555' }}>
            {cal?.disbursedAmount}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={[styles.fieldText, { color: '#213555' }]}>Repay amount</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#213555' }}>
            {cal?.repaymentAmount}
          </Text>
        </View>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#E3E5E5',
            // marginTop: 8,
          }}
        />

        <View style={styles.field}>
          <Text style={[styles.fieldText, { color: '#000' }]}>Loan Amount</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>₹{LoanAmount}</Text>
        </View>
        <View style={{ width: '94%', margin: 10 }}>
          {renderSlider()}
        </View>

        <Text style={{ color: '#27374D', alignSelf: 'center' }}>
          slide to choose the amount
        </Text>
        <LinearButton
          onPress={() => {
            if (LoanAmount > 0) {
              props.navigation.navigate('Mandate', {
                LoanAmount: LoanAmount,
              });
            } else {
              alert('Please select loan amount to apply loan');
            }
          }}
          title={'Take Loan Now'}
          width={160}
          marginTop={12}
        />
      </View>
    );
  };

  const loanDetailsCard = (item, index) => {
    // console.log(
    //   'loanDetailsCard item',
    //   item?.completedKey?.includes(currentLoanStatus),
    // );
    return (
      <View style={[styles.cardLoanDetails, { paddingHorizontal: 14 }]}>


        <View style={styles.smallCard}>
          {item?.item?.completedKey?.includes(currentLoanStatus) ? (
            <Image
              source={require('../../assests/tickCircle.png')}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../assests/circle.png')}
              style={styles.image}
            />
          )}
          {item.index !== LoanListArray.length - 1 && (
            <Image
              source={require('../../assests/line.png')}
              style={styles.lineImage}
            />
          )}
        </View>
        <View style={styles.bigCard}>
          <Text style={[styles.text, { color: '#000000' }]}>{item.item?.title}</Text>
          <Text style={[styles.smallText, { color: '#213555' }]}>{item.item.subTitle}</Text>
        </View>
      </View>

    );
  };

  const LoanCard = item => {
    // console.log('LoanCard item', item);
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('LoanDetails', { loanId: item.item?.id })
        }
        style={styles.loanCard}>
        <View style={styles.AppliedCard}>
          <Text style={{ color: '#DC2430', fontSize: 12 }}>APPLIED</Text>
        </View>
        <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 16, color: '#213555' }}>Loan Amount</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                alignItems: 'flex-end',
                marginLeft: 20,
                color: '#213555'
              }}>
              ₹ {item?.item?.apply_amount}
            </Text>
          </View>

          <Text style={{ color: '#949494' }}>
            {' '}
            Applied on {moment(item?.item?.apply_date).format('DD-MM-YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // const renderSlider = () => {
  //   return (
  //     <Slider
  //       style={{ width: '100%' }}
  //       trackStyle={{ height: 8, borderRadius: 4 }}
  //       minimumValue={3000}
  //       maximumValue={30000}
  //       step={1000}
  //       minimumTrackTintColor={'#DC2430'}
  //       maximumTrackTintColor={'#EFEFEF'}
  //       thumbTintColor={'#DC2430'}
  //       value={LoanAmount}
  //       onValueChange={amount => setLoanAmount(amount) || calculation()}
  //     // onSlidingComplete={amount => setLoanAmount(amount)}
  //     />
  //   );
  // };

  const renderSlider = () => {
    return (
      <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', padding: 5 }}>
        <CustomSlider
          value={LoanAmount}
          minimumValue={3000}
          maximumValue={30000}
          step={1000}
          // onValueChange={amount => setLoanAmount(amount) || calculation()}
          onValueChange={amount => setLoanAmount(amount)}
          trackHeight={13}
          thumbSize={40}
          renderThumb={() => (
            <View
              style={{
                width: 33,
                height: 33,
                borderRadius: 20,
                backgroundColor: '#DC2430',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.4,
                shadowRadius: 3,
                elevation: 5,
              }}>
              <Text style={{ color: '#fff', fontSize: 20 }}>₹</Text>
            </View>
          )} />
      </View>
    )
  };
  console.log("LoanAmount", LoanAmount)

  const navigateToMandate = async () => {
    const userData = await AsyncStorage.getItem("USER_DATA")
    const user_data = JSON.parse(userData);
    props.navigation.navigate("EMandatePaymentPage", {
      userId: user_data?.user_id,
      refId: currentLoanOrderId,
      emiAmount: 2000
    })
  }

  const loanStatus = () => {
    return (
      <View style={{ backgroundColor: 'white', padding: 20, marginTop: 80 }}>
        {currentLoanStatus === "Approved" &&
          <LinearButton
            onPress={() => navigateToMandate()}
            title={"Register For Enach"}
            width={170}
          />
        }
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20, color: '#000' }}>
          LOAN REFERENCE ID : {currentLoanOrderId}
        </Text>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: 'black',
            marginTop: 10,
          }}></View>
        <FlatList
          data={LoanListArray}
          renderItem={(item, index) => loanDetailsCard(item, index)}
        />
      </View>
    );
  };

  const renderActiveLoan = () => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingVertical: 30,
          paddingHorizontal: 20,
          marginTop: 100
        }}>
        <View
          style={{
            borderWidth: 0.5,
            // padding: 20,
            borderColor: 'grey',
            marginTop: 40,
            paddingTop: 20
          }}>
          <View
            style={{
              //   flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: -10
            }}>
            <View>

            </View>
            <Text style={[styles.activeLoanText, { color: '#04364A' }]}>Active Loan</Text>
            <View style={{ width: "100%", borderColor: "#000", borderWidth: 0.3, margin: 10 }}>

            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.dueDateText, { color: '#213555' }]}>
                Due Date : {moment(activeLoanData?.[0]?.repayment_date).format('DD-MM-YYYY')}
              </Text>
              <Text style={[styles.dueDateText1, { marginTop: 10, color: '#213555' }]}>
                Rs. {activeLoanData?.[0]?.collection_amount}{' '}
              </Text>
            </View>
          </View>

          <Text style={[styles.payingText, { padding: 10, color: '#27374D' }]}>
            Paying EMI on time is the best way to improve your credit score.
            Don't miss your loan repayment.{' '}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              //   marginTop: 10,
              padding: 20
            }}>
            <LinearButton
              onPress={() => {
                props.navigation.navigate('MyLoanDetails', {
                  activeLoanData: activeLoanData?.[0],
                });
              }}
              title={'Loan Details'}
              width={120}
              marginTop={12}
            />
            {/* <LinearButton
              onPress={() => {}}
              title={'Pay Now'}
              width={120}
              marginTop={12}
            /> */}
          </View>
        </View>
      </View>
    );
  };





  // const fetchUserNotificationData = async() => {
  //   const usersData = await JSON.parse(await AsyncStorage.getItem('USER_DATA'));
  //   console.log("usersData :",usersData);
  //   axios.post(
  //     'https://instantmudra.com/admin/API/getNotificationCount',
  //     {user_id: usersData?.user_id,
  //       token_id: token},
  //     {headers: {'Content-Type': 'application/json',}}
  //   )
  //   .then(response => {
  //       console.log("messsage noti count",response.data.data);
  //       setNotificationCount(response.data.data);  
  //   })
  //   .catch(error => console.error(error));
  // };

  // useEffect(() => {
  //   fetchUserNotificationData();
  // }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.2 }}
        locations={[0, 0.6, 1]}
        colors={['#7B4397', '#B53059', '#DC2430']}
        style={styles.topView}>
        <SafeAreaView
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: loanList.length > 0 ? 0 : 60,
          }}>
          <Text style={[styles.nametext, { color: '#DDE6ED' }]}>
            Hello, {storeNam || loginUserData?.full_name}!
          </Text>

        </SafeAreaView>
        <TouchableOpacity onPress={() => props.navigation.navigate('Notifications')}>
          {/* <View style={styles.container}> */}
          <Image
            source={require('../../assests/bell.png')}
            style={{ alignSelf: "flex-end", marginTop: -50, marginRight: 20, width: 30, height: 40 }}
          />
          {notificationCount > 0 && (
            <View style={{
              alignSelf: "flex-end",
              position: 'absolute',
              top: -50,
              right: 3,
              // marginTop: -50,
              // marginRight: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderWidth: 1,
              borderColor: 'black',
            }}>
              <Text style={{
                color: 'black',
                fontSize: 12,
                fontWeight: 'bold',
              }}>{notificationCount}</Text>
            </View>
          )}
          {/* </View> */}
        </TouchableOpacity>
        {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('Notifications')}
        >
          <Image source={require('../../assests/bellImage.png')}
            style={{ alignSelf: "flex-end", marginTop: -50, marginRight: 20, width: 30, height: 50 }}
          />
        </TouchableOpacity> */}

        <SlidMain />


      </LinearGradient>
      <View style={{ marginTop: loanList.length > 0 ? -200 : -140 }}>
        {loanList.length > 0 && (
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Text
              style={{
                color: '#526D82',
                fontSize: 16,
                fontWeight: '500',
              }}>
              Current Loans
            </Text>
            <FlatList
              data={loanList}
              horizontal
              renderItem={item => LoanCard(item)}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        {/* {currentStateCode === 1
          ? loanStatus()
          : currentStateCode === 2
            ? renderActiveLoan()
            : Calculationcard()} */}
        {/* 
{currentStateCode === 1 ? (
        loanStatus()
      ) : currentStateCode === 2 ? (
        renderActiveLoan()
      ) : null}
     
      {currentStateCode !== 1 && currentStateCode !== 2 && Calculationcard()} */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : currentStateCode === 1 ? (
          loanStatus()
        ) : currentStateCode === 2 ? (
          renderActiveLoan()
        ) : (
          Calculationcard()
        )}

      </View>
      <View style={{ flexDirection: 'row' }}></View>

      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <HomeFooter
          selectedBottomTab={selectedBottomTab}
          setSelectedBottomTab={() => { }}
          onHomePress={() => { }}
          onProfilePress={() => props.navigation.navigate('Profile')}
        />
      </View>
    </View>
  );
};
export default Home;