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
} from 'react-native';
import Header from '../../components/Header/Header';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const MyLoan = props => {
  const [activeTab, setActiveTab] = useState('Current');

  const renderCard = () => {
    return (
      <View style={styles.container}>
      <View style={styles.loanCard}>
        <View style={styles.AppliedCard}>
          <Text style={{color: '#DC2430', fontSize: 12}}>APPLIED</Text>
        </View>

        <View
          style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 16, marginLeft: 50}}>Loan Amount</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                alignItems: 'flex-end',
                marginLeft: 20,
              }}>
              ₹10,000
            </Text>
          </View>
          <Text style={{color: '#949494'}}> Applied on 22-09-2021 </Text>
        </View>
      </View>
      <View style={[styles.loanCard, {marginTop: 12}]}>
        <View style={styles.AppliedCard}>
          <Text style={{color: '#DC2430', fontSize: 12}}>APPLIED</Text>
        </View>

        <View
          style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text style={{fontSize: 16, marginLeft: 50}}>Loan Amount</Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                alignItems: 'flex-end',
                marginLeft: 20,
              }}>
              ₹10,000
            </Text>
          </View>

          <Text style={{color: '#949494'}}> Applied on 22-09-2021 </Text>
        </View>
      </View>
    </View>
    )
  }
   
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0.2}}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{flex: 1}}>
      <Header title={'My Loan'} navigation={props.navigation} />

      <View style={styles.tab}>
        <TouchableOpacity onPress={() => setActiveTab('Current')}>
          <Text style={styles.text}>Current</Text>
          {activeTab === 'Current' && (
            <View
              style={{
                height: 3,
                width: '100%',
                backgroundColor: 'white',
              }}/>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('Completed')}>
          <Text style={styles.text}>Completed</Text>
          {activeTab === 'Completed' && (
            <View
              style={{
                height: 3,
                width: '100%',
                backgroundColor: 'white',
              }}></View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('Rejected')}>
          <Text style={styles.text}>Rejected</Text>
          {activeTab === 'Rejected' && (
            <View
              style={{
                height: 3,
                width: '100%',
                backgroundColor: 'white',
              }}></View>
          )}
        </TouchableOpacity>
      </View>
      {activeTab === 'Current' && renderCard()}
      {activeTab === 'Completed' && renderCard()}
      {activeTab === 'Rejected' && renderCard()}
    </LinearGradient>
  );
};

export default MyLoan;
