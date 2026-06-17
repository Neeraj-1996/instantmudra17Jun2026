import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../components/Header/Header';
import colors from '../../common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API_BASE_URL} from '../../utils';

const LoanListArray = [
  {
    title: 'Loan Applied',
    subTitle: 'Your Application is received',
    key: 'loan_applied',
    completed: true,
  },
  {
    title: 'On Process',
    subTitle: 'Your Application is in process',
    key: 'loan_inprocess',
    completed: true,
  },
  {
    title: 'Approved',
    subTitle: 'Loan Approved',
    key: 'loan_approved',
    completed: false,
  },
  {
    title: 'Sanctioned',
    subTitle: 'Loan Sanctioned',
    key: 'loan_sanctioned',
    completed: false,
  },
];

const LoanDetails = props => {
  const [loanDetailsData, setLoanDetailsData] = useState({});

  const loanDetailsCard = (item, index) => {
    console.log('loanDetailsCard item', item);
    return (
      <View style={[styles.card, {paddingHorizontal: 14}]}>
        <View style={styles.smallCard}>
          {loanDetailsData?.loan_status?.[item.item.key] ? (
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
          <Text style={styles.text}>{item.item?.title}</Text>
          <Text style={styles.smallText}>{item.item.subTitle}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title={'Loan Details'} />

      <ScrollView style={{backgroundColor: 'white', padding: 20}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color:'#000'}}>
          {' '}
          LOAN REFERENCE ID :
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
      </ScrollView>
    </View>
  );
};

export default LoanDetails;
