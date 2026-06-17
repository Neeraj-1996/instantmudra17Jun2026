import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,

} from 'react-native';
import styles from './styles';
import Header from '../../components/Header/Header';
import LinearButton from '../../components/LinearButton/LinearButton';
import LoginButton from '../../components/LoginButton/LoginButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, dropDownArrFromObj } from '../../utils';
import Loader from '../../components/Loader/Loader';
import Dropdown from '../../components/CustomDropDown/DropDown';

import { isEmpty } from 'lodash';


const SalariesWorkDetails = props => {

  


  const [showLoader, setShowLoader] = useState(false);
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountTypeArr, setAccountTypeArr] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedModeOfPayment, setSelectedModeOfPayment] = useState('NetBanking');
  const [otherBank, setOtherBank] = useState('');
  const [bankList, setBankList] = useState([])
  const [bankListDebitCard, setBankListDebitCard] = useState([])

  const [isEditable, setisEditable] = useState(true)

  // const formPage = props?.route?.params.from;

  console.log("otherBank SalariesWorkDetails.js 38:", otherBank);

  const handleValidation = () => {

    return (
      accountHolderName?.length > 2 &&
      accountType?.length > 0 &&
      (selectedBank?.length > 0 || otherBank > 0)
    );
  };

  const updateUserBankDetails = async () => {
    const user_data = await AsyncStorage.getItem('USER_DATA');
    const userdata = JSON.parse(user_data);
    console.log("🚀 ~ file: SalariesWorkDetails.js ~ line 47 ~ userBankDetails ~ userdata", userdata)
    const body = {
      user_id: userdata?.user_id,
      bank_name: otherBank !== '' ? otherBank : selectedBank,
      account_number: accountNumber,
      ifsc_code: ifsc,
      account_holder_name: accountHolderName,
      e_mandate: '1',
      account_type: '1',
    };
    axios
      .post(API_BASE_URL + 'updateUserBankDetails', body)
      .then(res => {
        console.log('updateUserBankDetails response', res);
        if (res?.status === 200) {
          alert(res?.data?.msg)
          props.navigation.navigate("Home")
        }
      })
      .catch(err => {
        alert('We are facing some techical issue. Team is looking into it.')
        console.log('updateUserBankDetails error', err);
      });
  };

  const saveUserBankDetails = async () => {
    const user_data = await AsyncStorage.getItem('USER_DATA');
    const userdata = JSON.parse(user_data);
    const body = {
      "user_id": userdata?.user_id,
      "bank_name": otherBank !== '' ? otherBank : selectedBank,
      "account_number": accountNumber,
      "ifsc_code": ifsc,
      "account_holder_name": accountHolderName,
      "account_type": accountType
    }
    axios
      .post(API_BASE_URL + "getUserBankDetails", body)
      .then(res => {
        console.log('saveUserBankDetails response', res);
        if (res?.status === 200 && res.data.status === true) {
          props.navigation.replace('Home')
        }
      })
      .catch(err => {
        alert('We are facing some techical issue. Team is looking into it.')
        console.log('saveUserBankDetails error', err);
      });
  };

  useEffect(() => {
    fetchAccountTypeDropDown()
    getBankList()
    if (props.route?.params?.from !== "Document") {
      getBankDetails()
    }
    getBankListDebitCard()
  }, []);

  const getBankDetails = async () => {
    const user_data = await AsyncStorage.getItem('USER_DATA');
    const userdata = JSON.parse(user_data);
    const body = {
      user_id: userdata?.user_id
    };
    axios
      .post(API_BASE_URL + 'UserBankDetails', body)
      .then(res => {
        console.log('getBankDetails response', res);
        if (res?.status === 200 && res?.data?.status === true) {
          const bankData = res?.data?.result;
          setisEditable(false)
          setAccountHolderName(bankData?.account_holder_name)
          setAccountNumber(bankData?.account_number)
          setIfsc(bankData?.ifsc_code)
          setAccountType(bankData?.account_type)
          setSelectedBank(bankData?.bank_name)
        }
      })
      .catch(err => {
        alert('We are facing some techical issue. Team is looking into it.')
        console.log('getBankDetails error', err);
      });
  }


  const fetchAccountTypeDropDown = () => {
    axios
      .get(API_BASE_URL + "get_account_type")
      .then(res => {
        console.log("fetchAccountTypeDropDown response", res)
        if (res.status === 200) {
          const newArr = dropDownArrFromObj(res?.data?.data)
          setAccountTypeArr(newArr)
          console.log("res?.data?.data", res?.data?.data)
          console.log("Deepa newArr", newArr)
        }

      })
      .catch(err => {
        console.log("fetchAccountTypeDropDown error", err)
      })

  }

  const getBankList = () => {
    axios
      .get(API_BASE_URL + "getbankbyType?type=NetBanking")
      .then(res => {
        console.log("getBankList response", res)
        if (res.status === 200) {
          const newArr = res?.data?.bank_list.map(item => {
            let ob = {
              id: item.bank_id,
              title: item.bank_name
            }
            return ob
          })
          console.log("🚀 ~ file: SalariesWorkDetails.js ~ line 163 ~ getBankList ~ newArr", newArr)
          setBankList(newArr)
        }
      })
      .catch(err => {
        console.log("getBankList error", err)
      })
  }


  const getBankListDebitCard = () => {
    axios
      .get(API_BASE_URL + "getbankbyType?type=DebitCard")
      .then(res => {
        console.log("getBankListDebitCard response", res)
        if (res.status === 200) {
          const newArr = res?.data?.bank_list.map(item => {
            let ob = {
              id: item.bank_id,
              title: item.bank_name
            }
            return ob
          })
          setBankListDebitCard(newArr)
        }
      })
      .catch(err => {
        console.log("getBankListDebitCard error", err)
      })
  }


  return (
    <View style={styles.container}>
      <Loader showLoader={showLoader} />
      <Header navigation={props.navigation} title={'Bank Details'} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ padding: 20 }}>
          <View
            style={{
              height: 50,
              width: '50%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setSelectedModeOfPayment('NetBanking')
                setOtherBank('')
              }}

              style={{
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              enabled={props.route?.params === "Document"}
              disabled={!isEditable}
            >
              {selectedModeOfPayment === 'NetBanking' ? (
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../../assests/smallTick.png')}
                />
              ) : (
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../../assests/Ellipse.png')}
                />
              )}
            </TouchableOpacity>
            <Text style={{ width: '70%', marginLeft: 4, color: '#000' }}>Net Banking</Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedModeOfPayment('DebitCard')
                setOtherBank('')
              }}
              enabled={props.route?.params === "Document"}
              style={{
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              disabled={!isEditable}
            >
              {selectedModeOfPayment === 'DebitCard' ? (
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../../assests/smallTick.png')}
                />
              ) : (
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../../assests/Ellipse.png')}

                />
              )}
            </TouchableOpacity>
            <Text style={{ width: '70%', marginLeft: 4, color: '#000' }}>Debit Card</Text>
          </View>
          <View style={[styles.textInput, { alignItems: 'center', flexDirection: "row", justifyContent: "space-between" }]}>
            <TouchableOpacity
              disabled={!isEditable}
              enabled={props.route?.params === "Document"}
              onPress={() => setSelectedBank("Axis Bank")}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', padding: 10, height: '100%', backgroundColor: selectedBank === "Axis Bank" ? '#C1F2B0' : '#fff', borderRadius: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>Axis Bank</Text>

              {
                selectedBank === "Axis Bank" ? (
                  <Image
                    style={{}}
                    source={require('../../assests/smallTick.png')}
                  />
                ) : (
                  <Image
                    style={{}}
                    source={require('../../assests/Ellipse.png')}
                  />
                )
              }
            </TouchableOpacity>
          </View>
          <View style={[styles.textInput, { alignItems: 'center', flexDirection: "row", justifyContent: "space-between" }]}>
            <TouchableOpacity
              disabled={!isEditable}
              enabled={props.route?.params === "Document"}
              onPress={() => setSelectedBank("HDFC Bank")}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', padding: 10, height: '100%', backgroundColor: selectedBank === "HDFC Bank" ? '#C1F2B0' : '#fff', borderRadius: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>HDFC Bank</Text>
              {
                selectedBank === "HDFC Bank" ? (
                  <Image
                    style={{}}
                    source={require('../../assests/smallTick.png')}
                  />
                ) : (
                  <Image
                    style={{}}
                    source={require('../../assests/Ellipse.png')}
                  />
                )
              }
            </TouchableOpacity>
          </View>
          <View style={[styles.textInput, { alignItems: 'center', flexDirection: "row", justifyContent: "space-between" }]}>
            <TouchableOpacity
              disabled={!isEditable}
              enabled={props.route?.params === "Document"}
              onPress={() => setSelectedBank("ICICI Bank")}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', padding: 10, height: '100%', backgroundColor: selectedBank === "ICICI Bank" ? '#C1F2B0' : '#fff', borderRadius: 5, padding: 10, height: '100%' }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>ICICI Bank</Text>
              {
                selectedBank === "ICICI Bank" ? (
                  <Image
                    style={{}}
                    source={require('../../assests/smallTick.png')}
                  />
                ) : (
                  <Image
                    style={{}}
                    source={require('../../assests/Ellipse.png')}
                  />
                )
              }
            </TouchableOpacity>
          </View>
          <View style={[styles.textInput, { alignItems: 'center', flexDirection: "row", justifyContent: "space-between" }]}>
            <TouchableOpacity
              disabled={!isEditable}
              enabled={props.route?.params === "Document"}
              onPress={() => setSelectedBank("SBI Bank")}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', height: '100%', backgroundColor: selectedBank === "SBI Bank" ? '#C1F2B0' : '#fff', borderRadius: 5, padding: 10, height: '100%' }}>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#000' }}>SBI Bank</Text>
              {
                selectedBank === "SBI Bank" ? (
                  <Image
                    style={{}}
                    source={require('../../assests/smallTick.png')}
                  />
                ) : (
                  <Image
                    style={{}}
                    source={require('../../assests/Ellipse.png')}
                  />
                )
              }
            </TouchableOpacity>
          </View>

          <Dropdown
          
            options={selectedModeOfPayment === "NetBanking" ? bankList : bankListDebitCard}
            onSelect={text => {
              setOtherBank(text.id)
              setSelectedBank('')
            }}
            headerTilte={'Bank List'}
            placeholderText={
              isEmpty(otherBank) ? 'Other' : otherBank
            }
            placeHolderTextStyle={
              isEmpty(otherBank) ? { color: 'black' } : { color: 'black' }
            }
            enabled={props.route?.params === "Document"}
          />

          <Text style={styles.textField}>Account Holder Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setAccountHolderName(text)}
            value={accountHolderName}
            editable={isEditable}
            placeholderTextColor={'#2E4374'}
            placeholder="Account Holder Name"
            disabled={props.route?.params?.from !== "Document"}
          />
          <Text style={styles.textField}>Account Number</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setAccountNumber(text)}
            value={accountNumber}
            editable={isEditable}
            placeholder="Account Number"
            placeholderTextColor={'#2E4374'}
            keyboardType='number-pad'
            maxLength={16}
            disabled={props.route?.params?.from !== "Document"}
          />
          <Text style={styles.textField}>IFSC</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setIfsc(text)}
            value={ifsc}
            placeholder="IFSC"
            editable={isEditable}
            maxLength={11}
            autoCapitalize={'characters'}
            disabled={props.route?.params?.from !== "Document"}
            placeholderTextColor={'#435585'}
          />
          <Text style={styles.textField}>Account Type</Text>
          <Dropdown
            options={accountTypeArr}
            enabled={props.route?.params === "Document"}
            onSelect={text => setAccountType(text.id)}
            headerTilte={'Account Type'}
            placeholderText={
              isEmpty(accountType) ? 'Please Select' : accountType
            }
            placeHolderTextStyle={
              isEmpty(accountType) ? { color: '#D3D3D3' } : { color: 'black' }
            }
          />

          <View style={{ height: 200, width: '100%' }}></View>
        </ScrollView>
        {props.route?.params?.from === "Document" &&
          (
            handleValidation() ? (
              <LinearButton
                onPress={() => {
                  if (props.route.params?.from === 'Document') {
                    saveUserBankDetails();
                  } else {
                    updateUserBankDetails();
                  }
                }}
                title={'Submit'}
                width={170}
              />
            ) : (
              <LoginButton
                style={{ alignSelf: 'center', width: 170, }}
                title={'Submit'}
                disabled={true}
              />
            )
          )}

      </SafeAreaView>
    </View>
  );
};
export default SalariesWorkDetails;
