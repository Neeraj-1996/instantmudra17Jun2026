import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, Alert } from 'react-native'
import Header from '../../components/Header/Header'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import { API_BASE_URL } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import messaging from '@react-native-firebase/messaging';

const Notifications = (props) => {
    const [data, setData] = useState([]);
    function handleBackButtonClick() {
        props.navigation.goBack();
        return true;
    }



    async function loadNotificationData() {
        const usersData = await JSON.parse(await AsyncStorage.getItem('USER_DATA'));
        // console.log("usersData", usersData?.user_id);
        axios.get(API_BASE_URL + 'loadNotificationData/' + usersData?.user_id).then((res) => {
            console.log("loadNotificationData ", res.data.data)
            if (res?.data?.data !== null) {
                // setData(res?.data?.data)
            }
        }).catch((error) => {
            console.error(error.response)
            Alert.alert("Somethig Wrong:", error.message);
        })
    }

    useEffect(() => {
        loadNotificationData();
    }, [])



    const [notificationData, setNotificationData] = useState([]);

  // const fetchUserNotificationData = async() => {
  //   const usersData = await JSON.parse(await AsyncStorage.getItem('USER_DATA'));
  //   axios.post(
  //     'https://instantmudra.com/admin/API/getUserNotificationData',
  //     { 
  //       user_id: usersData?.user_id
  //       // "846634"
  //    },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Cookie': 'ci_session=q6ir47t8bntgr88suv0l3egkipkshpj8; ci_session=rc2ncn2aq04drmgcfl18qvjt11vi1kn3'
  //       }
  //     }
  //   )
  //   .then(response => {
  //       console.log("messsage noti",response.data.data);
  //     setNotificationData(response.data.data);  // Set the data in useState
  //   })
  //   .catch(error => console.error(error));
  // };
  // const [token, setToken] = useState("");

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      // console.log('FCM Token:', token);
      // fetchUserNotificationToken(token)
      // setToken(token);
      fetchUserData(token);
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };


  const fetchUserData = async(token) => {
    const usersData = await JSON.parse(await AsyncStorage.getItem('USER_DATA'));
    console.log("usersData :",usersData);
    axios.post(
      API_BASE_URL+'getNotification',
      {user_id: usersData?.user_id,token_id: token},
      {headers: {'Content-Type': 'application/json',}}
    )
    .then(response => {
        console.log("messsage noti count",response.data.data);

        setData(response.data.data);  
    })
    .catch(error => console.error(error));
  };

  useEffect(() => {
    
    getToken();
  }, []);



  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.messageText}>{item.message}</Text>
    </View>
  );

    return (
        <SafeAreaView style={styles.container}>
        <Header navigation={props.navigation} title={'Notifications'} />
        {/* <Text style={styles.title}>Notifications</Text> */}
        <View style={{marginTop:10}}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No notifications available.</Text>}
        />
        </View> 
      </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
      color: '#333',
    },
    listContainer: {
      paddingHorizontal: 20,
    },
    notificationItem: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    messageText: {
      fontSize: 16,
      color: '#000',
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: '#999',
      marginTop: 20,
    },
  });
  
export default Notifications

// const NotificationsView = (props) => {
//     // useEffect(() => {
//     //     getFCMToken();
//     //  }, []);
     
//     // const getFCMToken = async () => {
//     //     try {
//     //       const token = await messaging().getToken();
//     //       console.log('FCM Token:', token);
//     //       // You can store or use this token as needed.
//     //     } catch (error) {
//     //       console.log('Error fetching FCM token:', error);
//     //     }
//     //   };
      
//     const { data } = props;
//     // console.log("Notification Data", data)
//     return (
//         <View style={{ paddingHorizontal: '1.2%', marginTop: 3 }}>
//             <FlatList
//                 contentContainerStyle={{ paddingBottom: 120 }}
//                 showsVerticalScrollIndicator={false}
//                 data={data}
//                 renderItem={({ item }, index) => {
//                     return (
//                         <LinearGradient key={index} colors={['#FFC4C4', '#FFE6E6']} style={{ width: '100%', paddingHorizontal: 4, borderRadius: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
//                             <View style={{ borderRadius: 50, backgroundColor: 'hsl(161, 85%, 44%)', width: 30, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                                 <Image source={require('../../assests/icons/notification.png')} style={{ width: 20, height: 20 }} />
//                             </View>
//                             <View style={{ marginLeft: 5, width: '90%' }}>
//                                 <Text style={{ color: '#000', fontWeight: '500' }}>{item?.title}</Text>
//                                 <Text style={{ color: '#5D5D66' }}>{item?.message}</Text>
//                                 <Text style={{ color: '#5D5D66', textAlign: 'right', fontSize: 10 }}> {moment(item?.created_at).format('DD-MM-YYYY h:mm:ss a')}</Text>
//                             </View>
//                         </LinearGradient>
//                     )
//                 }}
//                 keyExtractor={(item) => item.id}
//             />


//         </View>
//     )
// }

 {/* <View> */}
                {/* {data.length > 0 ? <NotificationsView data={data} /> :
                    <View style={{ marginTop: 10 }}>
                        <Image source={require('../../assests/bellImage.png')}
                            style={{ alignSelf: "center", width: 40, height: 40 }}
                        />

                        <Text style={{ alignSelf: "center", fontSize: 16, fontWeight: "400", color: '#45474B' }}>Don't have notification</Text>
                    </View>} */}

            {/* </View> */}
