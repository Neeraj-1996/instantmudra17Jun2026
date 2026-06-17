import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';
import WebView from 'react-native-webview';

const AccountAggregator = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const { redirectUrl } = props.route.params;
  console.log("redirectUrl",redirectUrl)
  const LoanAmount = 15000;
  // const { LoanAmount } = props.route.LoanAmount;

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const user_data = await AsyncStorage.getItem('USER_DATA');
      const userdata = JSON.parse(user_data);

      const phone_no = userdata?.mobileNo || '9643073742';

      const statusRes = await axios.post('https://instantmudra.com/admin/API/status', { phone_no });

      if (statusRes?.data?.status) {
        console.log("(statusRes?.data",statusRes?.data)
        setStatus(statusRes.data.status);

        if (statusRes.data.status === 'APPROVED') {
          const pdfRes = await axios.post('https://instantmudra.com/admin/API/GetCirfPdf', { phone_no });
          console.log('PDF Response:', pdfRes.data);
        }
      } else {
        // alert('Failed to check status. Please try again.');
      }
    } catch (error) {
      console.log('Error:', error);
    //   alert('We are facing some technical issue.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleProceed = () => {
    navigation.navigate('Mandate', {
      LoanAmount: LoanAmount,
    });
  };

useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus();
    }, 10000); 
  
    return () => clearInterval(interval); 
  }, []);
  

  useEffect(() => {
    if (status === 'REJECTED' || status === 'ACTIVE') {
      // Stop polling if status is no longer pending
      clearInterval(statusCheckInterval);
    }
  }, [status]);

  let statusCheckInterval;

  const shouldShowButton = status === 'REJECTED' || status === 'ACTIVE';

// console.log("shouldShowButton",shouldShowButton)
  return (
    <>
      <Header
        navigation={props.navigation}
        title={'Account Aggregator'}
        fontWeight={100}
      />

      <WebView source={{ uri: redirectUrl }} style={{ flex: 1 }} />


       
      {shouldShowButton && (  <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.2 }}
            locations={[0, 0.6, 1]}
            colors={['#7B4397', "#B53059", '#DC2430']}
            style={styles.bottomButtonContainer}
          > 
  <View style={{ alignItems: 'center', paddingVertical: 10 }}>
  {loading && (
    <ActivityIndicator size="small" color="#ffffff" style={{ marginBottom: 10 }} />
  )}


    <TouchableOpacity onPress={handleProceed} style={styles.button}>
      <Text style={styles.buttonText}>Proceed</Text>
    </TouchableOpacity>

</View>
          </LinearGradient>  )}

    </>
  );
};


const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomButtonContainer: {
      position: 'absolute',
      height:"10%",
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent:'center'
    },
    button: {
      width: 160,
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 5,
      justifyContent: 'center',
      elevation: 4,
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
    },
  
    linear: {
      height: 60,
      width: "100%",
      flexDirection: "row",
      paddingHorizontal:20,
      alignItems: 'center',
  },
  });

export default AccountAggregator;


  

// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import LinearGradient from 'react-native-linear-gradient';
// import Header from '../../components/Header/Header';
// import WebView from 'react-native-webview';
// const AccountAggregator = (props) => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(null);


//     const { redirectUrl } = props.route.params;
//   const { LoanAmount } = props.route.LoanAmount;
// //   const LoanAmount = 15000;

//   const fetchStatus = async () => {
//     setLoading(true);
//     try {
//       const user_data = await AsyncStorage.getItem('USER_DATA');
//       const userdata = JSON.parse(user_data);
  
//       const phone_no = userdata?.mobileNo || '9643073742';
  
//       const statusRes = await axios.post('https://instantmudra.com/admin/API/status', { phone_no });
  
//       if (statusRes?.data?.status) {
//         setStatus(statusRes.data.status);
  
//         if (statusRes.data.status === 'APPROVED') {
//           // 🔥 Call GetCirfPdf API using axios (no cookies)
//           const pdfRes = await axios.post('https://instantmudra.com/admin/API/GetCirfPdf', { phone_no });
  
//           console.log('PDF Response:', pdfRes.data);
  
//           // Optional: Save or handle PDF data here
//         }
//       } else {
//         alert('Failed to check status. Please try again.');
//       }
//     } catch (error) {
//       console.log('Error:', error);
//       alert('We are facing some technical issue.');
//     } finally {
//       setLoading(false);
//     }
//   };

  


//   const handleProceed = () => {
//     navigation.navigate('Mandate', {
//       LoanAmount: LoanAmount,
//     });
//   };

//   useEffect(() => {
//     fetchStatus();
//   }, []);

//   const shouldShowButton = status === 'REJECTED' || status === 'APPROVED';

//   return (
//     <>
//       <Header
//         navigation={props.navigation}
//         title={'Account Aggregator'}
//         fontWeight={100}
//       />



// <WebView  source={{ uri: redirectUrl }}/> 
      
//  <SafeAreaView style={{ flex: 1 }}>
//         {loading ? (
//           <View style={styles.centered}>
//             <ActivityIndicator size="large" color="#00aa00" />
//           </View>
//         ) : (
//           <View style={styles.centered}>
//             <Text style={{ fontSize: 16, color: 'gray' }}>Status: {status}</Text>
//           </View>
//         )}

//         {shouldShowButton && (
//                 <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.2 }}
//                 locations={[0, 0.6, 1]}
//                 colors={['#7B4397', "#B53059", '#DC2430']}style={styles.bottomButtonContainer} >
//           {/* <View style={styles.bottomButtonContainer}> */}
//             <TouchableOpacity onPress={handleProceed} style={styles.button}>
//               <Text style={styles.buttonText}>Proceed</Text>
//             </TouchableOpacity>
//           {/* </View> */}
//           </LinearGradient>
//         )}
//       </SafeAreaView>

//     </>
//   );
// };

// export default AccountAggregator;





// import React, { useState } from 'react';
// import { SafeAreaView, StatusBar, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { useNavigation } from '@react-navigation/native';

// import Header from '../../components/Header/Header';

// const AccountAggregator = (props) => {
//     const navigation = useNavigation();
//     const [loading, setLoading] = useState(true);

// //   const { redirectUrl } = props.route.params;
// //   const { LoanAmout } = props.route.LoanAmount;
// const LoanAmout = 15000;
//     const handleLoadStart = () => {
//         setLoading(true);
//     };

//     const handleLoadEnd = () => {
//         setLoading(false);
//     };


//     const handleTakeLoan = async () => {
//         try {
//           const user_data = await AsyncStorage.getItem('USER_DATA');
//           const userdata = JSON.parse(user_data);
      
//           const body = {
//             phone_no: "9643073742",
//         };
      
//           const res = await axios.post('https://instantmudra.com/admin/API/status', body);
      
//           if (res?.data?.success) {
           
//           } else {
//             alert('Failed to initiate consent. Please try again.');
//           }
//         } catch (error) {
//           console.log('Error:', error);
//           alert('We are facing some technical issue. Team is looking into it.');
//         } finally {
//           setIsLoading(false);
//         }
//       };

      

//     return (
//         <>

//             <Header
//         navigation={props.navigation}
//         title={'Account Aggregator'}
//         fontWeight={100}
//       />

//             {/* <SafeAreaView style={{ flex: 1 }}> */}
//             {/* <WebView  source={{ uri: redirectUrl }}/> */}
//             {/* </SafeAreaView> */}
//             <View>

//                 <TouchableOpacity activeOpacity={1}  
//                      props.navigation.navigate('Mandate', {
//                 LoanAmount: LoanAmount,
//               })>

//                     <View style={{ width: 160, height: 50, elevation: 4, backgroundColor: '#fff', justifyContent: "center", borderRadius: 5, alignSelf: "center", margin: 20 }}>
//                         <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: 'bold', color: 'green' }}>
//                             Procced 
//                         </Text>
//                     </View>
//                 </TouchableOpacity>
                
        

//             </View>
//         </>
//     );
// };

// export default AccountAggregator;
