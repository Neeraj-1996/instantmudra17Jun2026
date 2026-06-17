import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,

  Alert
} from 'react-native';
import Header from '../../components/Header/Header';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MyLoanDetails = props => {
  const [loanList, setLoanList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [payNowList, setPayNowList] = useState([])
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    fetchAppliedLoan();
  }, []);

  const fetchAppliedLoan = async () => {
    try {
      const userData = await AsyncStorage.getItem('USER_DATA');
      const user_data = JSON.parse(userData);

      if (!user_data?.user_id) {
        console.log('User ID is missing');
        return;
      }

      const formData = new FormData();
      formData.append('user_id', user_data.user_id);

      const response = await axios.post(
        'https://instantmudra.com/admin/API/getAplliedLoans',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;

        if (data?.status === false) {
          Alert.alert('You have not applied for any loan!');
        } else if (Array.isArray(data)) {
          //  Determine three_month_emi flag
          const enrichedData = data.map(item => {
            const { emi_date1, emi_date2, emi_date3 } = item;
            const threeMonthEmi =
              emi_date1 !== null && emi_date2 !== null && emi_date3 !== null;

            return {
              ...item,
              three_month_emi: threeMonthEmi,
            };
          });

          setLoanList(enrichedData);

          const _payNowList = enrichedData.filter(item =>
            item?.application_status === 'Disbursed' || item?.application_status === 'Settled'
          );
          setPayNowList(_payNowList);

          const _completedList = enrichedData.filter(item =>
            item?.application_status === 'Completed'
          );
          setCompletedList(_completedList);
        } else {
          console.log('Unexpected data format:', data);
        }
      }

    } catch (err) {
      console.log('fetchAppliedLoan error:', err.message, err.response?.data || '');
      Alert.alert('We are facing some technical issue. Team is looking into it.');
    }
  };


  const LoanCard = item => {
    AsyncStorage.setItem('impl', JSON.stringify(item.item.order_id));
    return (
      <TouchableOpacity

        onPress={() => {
          const loan = item.item;
          const { emi_date1, emi_date2, emi_date3 } = loan;
          const threeMonthEmi = emi_date1 && emi_date2 && emi_date3 ? true : false;

          if (selectedTab === 0) {
            props.navigation.navigate('LoanDetailsNew', { loanId: loan, three_month_emi: threeMonthEmi });
          } else if (selectedTab === 1) {
            props.navigation.navigate('LoanDetailsActive', { loanId: loan, three_month_emi: threeMonthEmi });
          }
        }}

        style={styles.loanCard}>
        <View style={styles.AppliedCard}>
          <Text style={{ color: '#DC2430', fontSize: 14 }}>
            {item?.item?.application_status?.toUpperCase()}
          </Text>
        </View>
        <View style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 16, color: "#000" }}>Loan Amount</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                alignItems: 'flex-end',
                marginLeft: 20,
                color: '#526D82'
              }}>
              ₹ {item?.item?.loan_amount}
            </Text>
          </View>

          <Text style={{ color: '#949494' }}>
            {' '}
            Applied on {item?.item?.date_created}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={props.navigation} title={'My Loan Details'} />
      <View style={{ padding: 20 }}>
        <View
          style={{
            height: 50,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}>
          <TouchableOpacity onPress={() => setSelectedTab(0)}>
            <Text style={styles.loanText}>Active Loans</Text>
            <View style={{ backgroundColor: "red", height: selectedTab === 0 ? 4 : 0, width: 100, borderRadius: 2 }}></View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedTab(1)}>
            <Text style={styles.loanText}> Pay Now</Text>
            <View style={{ backgroundColor: "red", height: selectedTab === 1 ? 4 : 0, width: 100, borderRadius: 2 }}></View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelectedTab(2)}>
            <Text style={styles.loanText}> Completed</Text>
            <View style={{ backgroundColor: "red", height: selectedTab === 2 ? 4 : 0, width: 100, borderRadius: 2 }}></View>
          </TouchableOpacity>

        </View>

        <FlatList
          // data={selectedTab === 0 ? loanList : selectedTab === 1 ? payNowList : completedList}
          data={
            selectedTab === 0 ? payNowList
              : selectedTab === 1 ? payNowList
                : selectedTab === 2 ? completedList
                  : []
          }
          renderItem={item => LoanCard(item)}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => <Text style={{ color: '#526D82' }}>No Data found</Text>}
        />
        <View style={{ height: 40, width: '100%' }}></View>
      </View>
    </View>
  );
};

export default MyLoanDetails;
