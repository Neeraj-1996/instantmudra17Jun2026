import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles';
import Header from '../../components/Header/Header';
import LinearButton from '../../components/LinearButton/LinearButton';
import LoginButton from '../../components/LoginButton/LoginButton';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { API_BASE_URL, dropDownArrFromObj, ERROR_MESSAGE } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from '../../components/CustomDropDown/DropDown';
import { isEmpty, valuesIn } from 'lodash';


const CompanyDetails = props => {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [workingYears, setWorkingYears] = useState('');
  const [workingYearsArr, setWorkingYearsArr] = useState('');
  const [Reference1, setReference1] = useState({});
  const [Reference2, setReference2] = useState({});
  const [isContactListVisible, setContactListVisible] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [referenceSelected, setRefereneSelected] = useState("");

  const handleValidation = () => {
    return (
      companyName?.length > 2 &&
      companyAddress?.length > 0 &&
      parseInt(salary) >= 10000 &&
      workingYears?.length > 0
      // Reference1?.name?.length > 0 &&
      // Reference2?.name?.length > 0

    );
  };


  // console.log('CompanyDetails.js line-42:', props?.route?.params?.data)

  const newUserDetails = async () => {
    const userdata = await AsyncStorage.getItem("USER_DATA")
    const user_data = JSON.parse(userdata)
    const personalData = props?.route?.params?.data

    // console.log('CompanyDetails:', personalData)

    const body = {
      "user_id": user_data?.user_id,
      "first_name": personalData?.first_name,
      "last_name": personalData?.last_name,
      "alt_phone_no": personalData?.alternet_phone,
      "phone_no": user_data?.phone_no,
      "gender": personalData?.gender,
      "d_o_b": personalData?.d_o_b,
      "official_mail": personalData?.official_mail,
      "take_home_salary": salary,
      "address_state": personalData?.address_state,
      "address_city": personalData?.user_city,
      "local_address": personalData?.local_address,
      "profile_completed": "1",
      "pin_code": personalData?.pin_code,
      "aadhar_card_no": personalData?.aadhar_card_no,
      "pan_card_no": personalData?.pan_card_no,
      "social_media_type": '',
      "emp_type": "0",
      "marital_status": "0",
      "staying_years": "10",
      "current_loan_emi": "0",
      "salary_mode": "1",
      "existing_loan": "0",
      "latitude": "0",
      "longitude": "0",
      "current_loan": "0",
      "house_type": personalData?.house_type,
      "working_years": workingYears,
      "company_name": companyName,
      "company_address": companyAddress,

    }
    AsyncStorage.setItem("Name", personalData?.first_name)

    AsyncStorage.setItem("PanCardNumber", personalData?.pan_card_no) // Saving Temporary to just navigate to spefic screen if needed 22-12-2023
    AsyncStorage.setItem("AdharCardNumber", personalData?.aadhar_card_no)  // Saving Temporary to just navigate to spefic screen if needed 22-12-2023


    console.log('fetch body', body)

    // console.log("newUserDetails body", JSON.stringify(body))

    axios
      .post("https://instantmudra.com/admin/API/newUserDetailsupdate", body)
      .then(res => {
        console.log("CompanyDetails.js line-95:", res.data)
        alert(res?.data?.msg)
        if (res.status === 200 && res?.data?.status === true) {

          props.navigation.replace("Ref", {
            aadharNumber: personalData?.aadhar_card_no,
            panNumber: personalData?.pan_card_no,
            aadharimgs: personalData?.aadharimgs // no need but old developer added i don't know 

          })
        }
      })
      .catch(err => {
        console.log("newUserDetails error", err?.message)
        alert(err?.message)
      })
  }


  useEffect(() => {
    fetchWorkingYearsDropDown()
    // request(PERMISSIONS.IOS.CONTACTS)
    // accessContacts()
  }, [])

  // const accessContacts = () => {
  //   Contacts.getAll()
  //     .then((contacts) => {
  //       // work with contacts
  //       console.log("contacts res", contacts)
  //       setContactList(contacts)
  //     }).catch((e) => {
  //       console.log("contacts res", e)
  //     })
  // }


  const fetchWorkingYearsDropDown = () => {
    axios
      .get(API_BASE_URL + "get_working_years")
      .then(res => {
        console.log("fetchWorkingYearsDropDown response", res)
        if (res.status === 200) {
          const newArr = dropDownArrFromObj(res?.data?.data)
          setWorkingYearsArr(newArr)
          console.log("res?.data?.data", res?.data?.data)
          console.log("hrllo", newArr)
        }

      })
      .catch(err => {
        console.log("fetchWorkingYearsDropDown error", err)
      })

  }

  const renderContactList = (item) => {
    return (
      <SafeAreaView style={{ height: "100%", width: "100%", backgroundColor: "white", position: 'absolute', }}>
        <View style={{ padding: 14, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.4 }}>
          <Text style={{ fontSize: 24, color: '#212A3E' }}>Contact List</Text>
          <TouchableOpacity onPress={() => setContactListVisible(false)}>
            <Text style={{ fontSize: 24, color: '#212A3E' }}>X</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={contactList}
          renderItem={(item) => {
            return (
              <TouchableOpacity onPress={() => {
                setContactListVisible(false)
                if (referenceSelected === "one") {
                  setReference1({
                    name: item?.item?.givenName + " " + item?.item?.familyName,
                    phone: item?.item?.phoneNumbers
                  })
                } else {
                  setReference2({
                    name: item?.item?.givenName + " " + item?.item?.familyName,
                    phone: item?.item?.phoneNumbers
                  })
                }
              }} style={{ paddingTop: 20, paddingBottom: 10, borderBottomWidth: 0.4, paddingHorizontal: 14 }}>
                <Text>{item?.item?.givenName + " " + item?.item?.familyName}</Text>
                <Text>{item?.item?.phoneNumbers?.[0]?.number}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
    )
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.2 }}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{ flex: 1 }}>
      <Header title={'Company Details'}
        navigation={props.navigation}
      />
      <View style={styles.container}>
        <Text style={styles.textField}>Company Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setCompanyName(text)}
          placeholder="Company Name"
          value={companyName}
          placeholderTextColor={'#394867'}
        />
        <Text style={styles.textField}>Company Address</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setCompanyAddress(text)}
          placeholder="Company Address"
          value={companyAddress}
          placeholderTextColor={'#394867'}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.textField, { width: "50%" }]}>Salary</Text>
          <Text style={[styles.textField, { width: "50%" }]}>working Years</Text>
        </View>
        <View style={{ height: 44, width: '100%', flexDirection: 'row' }}>
          <TextInput
            style={[styles.textInput, { width: '48%' }]}
            onChangeText={text => setSalary(text)}
            placeholder="Monthly Income"
            value={salary}
            keyboardType='number-pad'
            placeholderTextColor={'#394867'}
          />

          <View style={{ height: 44, width: "50%", position: "absolute", right: 0 }}>
            <Dropdown
              options={workingYearsArr}
              onSelect={text => setWorkingYears(text.id)}
              headerTilte={'Working Years'}
              placeholderText={
                isEmpty(workingYears) ? 'Please Select' : workingYears
              }
              placeHolderTextStyle={
                isEmpty(workingYears) ? { color: '#D3D3D3' } : { color: 'black' }
              }
            />
          </View>
        </View>

        {handleValidation() ? (
          <LinearButton
            onPress={() => newUserDetails()}
            width={170}
            marginTop={40}
            title={'Company Details'}
          />
        ) : (
          <LoginButton
            style={{ alignSelf: 'center', width: 170, marginTop: 40 }}
            title={'Save Information'}
            disabled={true}
          />
        )
        }

      </View>
      {isContactListVisible && renderContactList()}
    </LinearGradient>
  );
};
export default CompanyDetails;
