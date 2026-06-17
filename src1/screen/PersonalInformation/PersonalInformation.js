/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Alert,
  BackHandler,
  Button,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header/Header';
import LinearButton from '../../components/LinearButton/LinearButton';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import LoginButton from '../../components/LoginButton/LoginButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Dropdown from '../../components/CustomDropDown/DropDown';
import { isEmpty } from 'lodash';
import { API_BASE_URL, dropDownArrFromObj } from '../../utils';
import Loader from '../../components/Loader/Loader';
import { useRoute } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import DatePicker from 'react-native-date-picker'
import { RadioButton } from 'react-native-paper';
import { Dropdown as ElementDropDown } from 'react-native-element-dropdown';
import Document from '../Document/Document';
import { useNavigation } from '@react-navigation/native';
const genderArr = [
  {
    title: 'Male',
  },
  {
    title: 'Female',
  },
  {
    label: 'Others',
  },
];


const PersonalInformation = props => {

  const [date, setDate] = useState(new Date()) // date of birth

  const [showLoader, setShowLoader] = useState(false);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [AlternetPhone, setAlternetPhone] = useState('');
  const [EmailAddress, setEmailAddress] = useState('');
  const [phone, setPhoneAddress] = useState('');
  const [Gender, setGender] = useState('');
  const [HouseType, setHouseType] = useState('');
  const [houseTypeName, setHouseTypeName] = useState('');
  const [PinCode, setPinCode] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');

  const [AddressLineOne, setAddressLineOne] = useState('');
  const [userCity, setUserCity] = useState(''); // new created
  const [userStateName, setUserStateName] = useState(''); // new created
  const [pan, setPan] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [PanNumber, setPanNumber] = useState("")
  const [AadharNumber, setAadharNumber] = useState("")
  const [showCalendar, setShowCalendar] = useState(false);
  const [HouseTypeArr, setHouseTypeArr] = useState([]);
  const [showSafeArea, setShowSafeArea] = useState(false);
  const [allowManualLocation, setAllowManualLocation] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingSecondApi, setLoadingSecondApi] = useState(false);

  //   const [PinCode, setPinCode] = useState('');
  // const [userCity, setUserCity] = useState(''); // District as City
  // const [userStateName, setUserStateName] = useState('');
  const [userDistrict, setUserDistrict] = useState('');
  const [userBlockDistrict, setUserBlockDistrict] = useState('');
  const [errors, setErrors] = useState({});

  const route = useRoute();
  const [documentData, setDocumentData] = useState([]);

  useEffect(() => {
    fetchHouseTypeDropDown();
    // fetchData();

    // if (documentData.every(document => document.status === false)) {
    //   setButtonPressed(true);
    // } else {
    //   setButtonPressed(false);
    // }

  }, [documentData]);


  const fetchData = async () => {
    try {
      const response = await fetch('https://instantmudra.com/admin/API/getdocumentActiveDeceptive');
      const data = await response.json();
      // setDocumentData(data);
      console.log("document", documentData)
    } catch (error) {
      console.error('Error fetching document data:', error);
    }
  };


  useEffect(() => {
    const backAction = () => {
      Alert.alert('Wait...', 'Are you sure to Exit the Applications ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  const validateForm = () => {
    let newErrors = {};

    const pinCodeRegex = /^\d{6}$/;
    const panCardRegex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    const aadharCardRegex = /^\d{12}$/;

    if (!FirstName || FirstName.trim().length < 3) {
      newErrors.FirstName = "Enter valid first name";
    }

    if (!LastName || LastName.trim().length < 2) {
      newErrors.LastName = "Enter valid last name";
    }

    if (!Gender) {
      newErrors.Gender = "Select gender";
    }

    if (!DateOfBirth) {
      newErrors.DateOfBirth = "Select date of birth";
    }

    if (!panCardRegex.test(PanNumber)) {
      newErrors.PanNumber = "Enter valid PAN number";
    }

    if (!aadharCardRegex.test(AadharNumber)) {
      newErrors.AadharNumber = "Enter valid Aadhar number";
    }

    if (!pinCodeRegex.test(PinCode)) {
      newErrors.PinCode = "Enter valid pin code";
    }

    if (!AddressLineOne || AddressLineOne.length < 3) {
      newErrors.AddressLineOne = "Enter address";
    }

    if (!HouseType) {
      newErrors.HouseType = "Select house type";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSaveInformation = () => {
    if (validateForm()) {
      // navigateToNextPage();
    }
  };



  const [userIdValue, setUserIdValue] = useState(null);
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        const phone = await AsyncStorage.getItem('phone');
        const userObject = JSON.parse(userId);
        const userIdValue = userObject.user_id;
        setUserIdValue(userIdValue);
        setPhoneAddress(phone);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
    // fetchPinCodeDetails();
  }, []);

  useEffect(() => {
    if (PinCode.length === 6) {
      fetchPinCodeDetails(PinCode);
    } else {
      // Clear data if pin code is incomplete
      setUserCity('');
      setUserStateName('');
      setUserDistrict('');

    }
  }, [PinCode]);



  const [transactionId, setTransactionId] = useState('');
  const [fwdp, setFwdp] = useState('');
  const [codeVerifier, setCodeVerifier] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const [otpText, setOTP] = React.useState(null);

  const handlePress = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic NzAwOTU1MTE6TUttcEFHY0JCT2VSNDJnVnBBQzd6ZVNSRmFINkVXRnE=");
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "client_ref_num": userIdValue,
      "pan": pan
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch("https://svc.digitap.ai/validation/kyc/v1/pan_details", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          const { pan, fullname, gender, last_name, dob } = data.result;
          if (pan && fullname && gender) {
            setPanNumber(pan);
            setFirstName(fullname);
            setLastName(last_name);
            setGender(gender);
            setDateOfBirth(dob);
          } else {
            console.error("Required fields are missing in the response.");
            Alert.alert('Error', 'Required fields are missing in the response.');
          }
        } else {
          console.error("Result object is missing in the response.");
          Alert.alert('Error', 'Result object is missing in the response.');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'An error occurred while fetching data.');
      });
    const myHeadersAdhar = new Headers();
    myHeadersAdhar.append("Authorization", "NzAwOTU1MTE6TUttcEFHY0JCT2VSNDJnVnBBQzd6ZVNSRmFINkVXRnE=");
    myHeadersAdhar.append("Content-Type", "application/json");
    const rawAdhar = JSON.stringify({
      "uniqueId": userIdValue,
      "uid": aadhar
    });

    const requestOptionsAdhar = {
      method: "POST",
      headers: myHeadersAdhar,
      body: rawAdhar,
      redirect: "follow"
    };

    fetch("https://svc.digitap.ai/ent/v3/kyc/intiate-kyc-auto", requestOptionsAdhar)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result)
        if (result.code === "200") {
          setTransactionId(result.model.transactionId);
          setFwdp(result.model.fwdp);
          setCodeVerifier(result.model.codeVerifier);
          // setStatus(result.model.uidaiResponse.status);
          setLoading(false);
          setOtpSent(true);
        } else {
          // Handle other status codes if needed
          console.error("Error:", result.msg);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleSubmitOtp = () => {
    setLoadingSecondApi(true);
    const myHeaders = new Headers();
    myHeaders.append("authorization", "NzAwOTU1MTE6TUttcEFHY0JCT2VSNDJnVnBBQzd6ZVNSRmFINkVXRnE=");
    myHeaders.append("content-type", "application/json");

    const raw = JSON.stringify({
      "shareCode": "3242",
      "otp": otpText,
      "transactionId": transactionId,
      "fwdp": fwdp,
      "codeVerifier": codeVerifier,
      "validateXml": true
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://svc.digitap.ai/ent/v3/kyc/submit-otp", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("otp result", result);
        if (result.code === "200") {
          // alert("OTP verification successful");

          // setButtonPressed(true)
          // setLoadingSecondApi(false);

          // setAadharNumber(result.model.maskedAdharNumber);
          // Additional actions if OTP verification is successful
          console.log("otp result", result)
        } else {
          alert("OTP verification failed. Please try again."); // Display alert for other status codes
        }

      }).catch((error) => console.error(error));
  };


  const indiaStateDate = [
    { "title": "Andhra Pradesh" },
    { "title": "Arunachal Pradesh" },
    { "title": "Assam" },
    { "title": "Bihar" },
    { "title": "Chhattisgarh" },
    { "title": "Delhi" },
    { "title": "Goa" },
    { "title": "Gujarat" },
    { "title": "Haryana" },
    { "title": "Himachal Pradesh" },
    { "title": "Jharkhand" },
    { "title": "Karnataka" },
    { "title": "Kerala" },
    { "title": "Madhya Pradesh" },
    { "title": "Maharashtra" },
    { "title": "Manipur" },
    { "title": "Meghalaya" },
    { "title": "Mizoram" },
    { "title": "Nagaland" },
    { "title": "Odisha" },
    { "title": "Punjab" },
    { "title": "Rajasthan" },
    { "title": "Sikkim" },
    { "title": "Tamil Nadu" },
    { "title": "Telangana" },
    { "title": "Tripura" },
    { "title": "Uttar Pradesh" },
    { "title": "Uttarakhand" },
    { "title": "West Bengal" }
  ];

  const fetchHouseTypeDropDown = () => {
    axios
      .get(API_BASE_URL + "get_house_type")
      .then(res => {
        //  console.log("fetchHouseTypeDropDown response", res)
        if (res.status === 200) {
          const newArr = dropDownArrFromObj(res?.data?.data)
          setHouseTypeArr(newArr)
          // console.log("fetchHouseType", res?.data?.data)
          // console.log("hello", newArr)
        }

      })
      .catch(err => {
        // console.log("fetchHouseTypeDropDown error", err)
      })

  }

  const handleValidated = () => {
    const pinCodeRegex = /^\d{6}$/;
    const panCardRegex = /^([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    const aadharCardRegex = /^\d{12}$/;


    return (
      FirstName?.trim().length > 2 &&
      LastName?.trim().length > 2 &&
      Gender?.trim().length > 0 &&
      HouseType?.trim().length > 0 &&
      pinCodeRegex.test(PinCode) &&
      DateOfBirth?.trim().length > 0 &&
      AddressLineOne?.trim().length > 2 &&
      userStateName?.trim().length > 0 &&
      userCity?.trim().length > 2 &&
      panCardRegex.test(PanNumber.trim()) &&
      aadharCardRegex.test(AadharNumber.trim())
    );
  };


  const navigateToNextPage = () => {
    let ob = {
      first_name: FirstName,
      last_name: LastName,
      alternet_phone: AlternetPhone,
      official_mail: EmailAddress,
      gender: Gender,
      d_o_b: DateOfBirth,
      address_state: userStateName,
      user_city: userCity,
      local_address: AddressLineOne,
      pin_code: PinCode,
      aadhar_card_no: AadharNumber,
      pan_card_no: PanNumber,
      house_type: HouseType,
    }
    props.navigation.navigate("CompanyDetails", { data: ob })
  }


  const fetchPinCodeDetails = async (pin) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
      const postOffices = response.data?.[0]?.PostOffice;

      if (response.data?.[0]?.Status === 'Success' && postOffices?.length > 0) {

        const firstOffice = postOffices[0];

        setUserCity(firstOffice.District);
        setUserStateName(firstOffice.State);

        setAllowManualLocation(false);

      } else {

        setUserCity('');
        setUserStateName('');
        setAllowManualLocation(true);

        Alert.alert(
          "Location not found",
          "Please enter State and City manually"
        );
      }

    } catch (error) {

      setUserCity('');
      setUserStateName('');
      setAllowManualLocation(true);

      Alert.alert(
        "Error",
        "Unable to fetch location. Please enter manually."
      );
    }
  };

  // const fetchPinCodeDetails = async (pin) => {
  //   try {
  //     const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
  //     const postOffices = response.data?.[0]?.PostOffice;

  //     if (response.data?.[0]?.Status === 'Success' && Array.isArray(postOffices) && postOffices.length > 0) {
  //       const firstOffice = postOffices[0];
  //       setUserCity(firstOffice.District);         // For City input
  //       setUserStateName(firstOffice.State);       // For Dropdown
  //       setUserDistrict(firstOffice.District);     // District
  //       // setUserBlockDistrict(firstOffice.Block);   // Block District
  //     } else {
  //       setUserCity('');
  //       setUserStateName('');
  //       setUserDistrict('');
  //       // setUserBlockDistrict('');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching pin code details:', error);
  //   }
  // };




  const handleSaveClick = () => {
    const valid = validateForm();

    if (valid) {
      navigateToNextPage();
    }
  };

  const cards = props => (
    <ScrollView>
      <View style={styles.container}>




        <View>
          <Text style={styles.textField}>Full  Name</Text>
          <TextInput
            style={[
              styles.textInput,
              errors.FirstName && { borderColor: 'red', borderWidth: 1 }
            ]}
            onChangeText={text => setFirstName(text)}
            value={FirstName}
            placeholder="Full Name"
            placeholderTextColor={'#394867'}
          />

          {/* <TextInput
            // style={styles.textInput}
            style={[
              styles.textInput,
              errors.FirstName && { borderColor: 'red', borderWidth: 1 }
            ]}
            onChangeText={text => setFirstName(text)}
            value={FirstName}
            placeholder="Full Name"
            placeholderTextColor={'#394867'} /> */}
          {errors.FirstName && (
            <Text style={{ color: 'red', fontSize: 12 }}>
              {errors.FirstName}
            </Text>
          )}
          <Text style={styles.textField}>Last Name</Text>
          <TextInput
            // style={styles.textInput}
            style={[styles.textInput, errors.LastName && { borderColor: 'red', borderWidth: 1 }]}
            // onChangeText={text => setLastName(text)}
            onChangeText={text => {
              setLastName(text)
              setErrors(prev => ({ ...prev, LastName: null }))
            }}
            value={LastName}
            placeholder="Last Name"
            placeholderTextColor={'#394867'} />
          {errors.LastName && <Text style={{ color: 'red' }}>{errors.LastName}</Text>}


          <View style={styles.middleContainer}>
            <View style={{ width: '50%' }}>
              <Text style={styles.textField}>Gender</Text>
              <Dropdown
                options={genderArr}
                onSelect={text => setGender(text.title)}
                // onSelect={text => {
                //   setGender(text.title)
                //   setErrors(prev => ({ ...prev, Gender: null }))
                // }}
                headerTilte={'Gender'}
                placeholderText={isEmpty(Gender) ? 'Please Select' : Gender}
                placeHolderTextStyle={isEmpty(Gender) ? { color: '#D3D3D3' } : { color: 'black' }} />
              {errors.Gender && <Text style={{ color: 'red' }}>{errors.Gender}</Text>}
            </View>



            <View style={{ marginLeft: 10, width: '50%' }}>
              <Text style={styles.textField}>Date of Birth</Text>
              <View>
                <TextInput
                  // style={styles.textInput}
                  style={[styles.textInput, errors.DateOfBirth && { borderColor: 'red', borderWidth: 1 }]}
                  value={DateOfBirth + ''}
                  onChangeText={text => setDateOfBirth(text)}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor={'#394867'} />
                <TouchableOpacity
                  onPress={() => setShowCalendar(true)}
                  style={{ position: 'absolute', right: 6 }}>
                  <Image
                    style={{ height: 20, width: 20, marginTop: 22 }}
                    source={require('../../assests/calendar.png')} />
                </TouchableOpacity>
              </View>
              {errors.DateOfBirth && <Text style={{ color: 'red' }}>{errors.DateOfBirth}</Text>}

            </View>
          </View>

          <Text style={styles.textField}>PAN Number.</Text>
          <TextInput
            // style={styles.textInput}
            style={[
              styles.textInput,
              errors.PanNumber && { borderColor: 'red', borderWidth: 1 }
            ]}
            onChangeText={text => setPanNumber(text)}
            placeholder="PAN Card number "
            maxLength={10}
            value={PanNumber}
            autoCapitalize='characters'
            placeholderTextColor={'#394867'}
            keyboardType={PanNumber.length >= 5 && PanNumber.length < 9 ? 'number-pad' : 'default'} />

          {errors.PanNumber && (
            <Text style={{ color: 'red', fontSize: 12 }}>
              {errors.PanNumber}
            </Text>
          )}

          <Text style={styles.textField}> Aadhar Number</Text>
          <TextInput
            // style={styles.textInput}
            style={[styles.textInput, errors.AadharNumber && { borderColor: 'red', borderWidth: 1 }]}
            maxLength={12}
            onChangeText={text => setAadharNumber(text)}
            placeholder="Aadhar Number"
            value={AadharNumber}
            placeholderTextColor={'#394867'}
            keyboardType='number-pad' />
          {errors.AadharNumber && <Text style={{ color: 'red' }}>{errors.AadharNumber}</Text>}

          <Text style={styles.textField}>Alternet Phone Number</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setAlternetPhone(text)}
            placeholder="Alternet Phone Number"
            value={AlternetPhone}
            keyboardType='number-pad'
            maxLength={10}
            // editable={false}
            placeholderTextColor={'#394867'} />



          <Text style={styles.textField}>Email address</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setEmailAddress(text)}
            placeholder="Your Email address"
            value={EmailAddress}
            // editable={false}
            placeholderTextColor={'#394867'} />



          <View style={styles.middleContainer}>
            <View style={{ width: '50%' }}>
              <Text style={styles.textField}> Pin Code</Text>
              <TextInput
                // style={styles.textInput}
                style={[styles.textInput, errors.PinCode && { borderColor: 'red', borderWidth: 1 }]}
                // onChangeText={text => setPinCode(text)}
                onChangeText={text => {
                  setPinCode(text)
                  setErrors(prev => ({ ...prev, PinCode: null }))
                }}
                placeholder="Enter Pin Code"
                keyboardType={'numeric'}
                maxLength={6}
                value={PinCode}
                placeholderTextColor={'#394867'} />
              {errors.PinCode && <Text style={{ color: 'red' }}>{errors.PinCode}</Text>}
            </View>
            <View style={{ marginLeft: 10, width: '50%' }}>
              <Text style={styles.textField}>House Type</Text>
              <Dropdown
                options={HouseTypeArr}
                // onSelect={text => setHouseType(text.id)}
                onSelect={text => {
                  setHouseType(text.id)
                  setErrors(prev => ({ ...prev, HouseType: null }))
                }}
                headerTilte={'House Type'}
                placeholderText={isEmpty(houseTypeName) ? 'Please Select' : houseTypeName}
                placeHolderTextStyle={isEmpty(houseTypeName) ? { color: '#D3D3D3' } : { color: 'black' }} />
              {errors.HouseType && <Text style={{ color: 'red' }}>{errors.HouseType}</Text>}

            </View>


          </View>
          <View style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: 8 }}>
            <View style={{ marginLeft: 6, width: '50%' }}>
              <Text style={styles.textField}>Select State:</Text>

              <TextInput
                style={[
                  styles.textInput,
                  errors.State && { borderColor: 'red', borderWidth: 1 }
                ]}
                value={userStateName}
                editable={allowManualLocation}
                onChangeText={(text) => {
                  setUserStateName(text)
                  setErrors(prev => ({ ...prev, State: null }))
                }}
                placeholder="Enter State"
              />

              {errors.State && <Text style={{ color: 'red' }}>{errors.State}</Text>}

              {/* <TextInput
                style={styles.textInput}
                value={userStateName}
                editable={false}
              /> */}
            </View>
            <View style={{ marginLeft: 10, width: '50%' }}>
              <Text style={styles.textField}>City:</Text>
              <TextInput
                style={[
                  styles.textInput,
                  errors.City && { borderColor: 'red', borderWidth: 1 }
                ]}
                value={userCity}
                editable={allowManualLocation}
                onChangeText={(text) => {
                  setUserCity(text)
                  setErrors(prev => ({ ...prev, City: null }))
                }}
                placeholder="Enter City"
              />

              {errors.City && <Text style={{ color: 'red' }}>{errors.City}</Text>}
              {/* <TextInput
                style={styles.textInput}
                value={userCity}
                editable={false}
              /> */}

            </View>
          </View>

          <View style={{ width: '50%' }}></View>
          <Text style={styles.textField}> Address Line 1</Text>
          <TextInput
            // style={styles.textInput}
            style={[styles.textInput, errors.AddressLineOne && { borderColor: 'red', borderWidth: 1 }]}
            // onChangeText={text => setAddressLineOne(text)}
            onChangeText={text => {
              setAddressLineOne(text)
              setErrors(prev => ({ ...prev, AddressLineOne: null }))
            }}
            placeholder="Address Line 1 "
            value={AddressLineOne}
            placeholderTextColor={'#394867'} />
        </View>

        {/* )} */}
      </View>
      <Text style={{ marginLeft: 15, color: 'orange', fontWeight: '600' }}> Don't Quit App While Submitting Form ?</Text>
      <View style={{ height: 200, width: '100%' }}></View>
    </ScrollView>
  );

  const onDateChange = date => {
    const age = getAge(date)
    if (age < 18) {
      alert("Age should be greater than 18")
      setShowCalendar(false);
      return;
    }
    setDateOfBirth(moment(date).format('DD/MM/YYYY'));
    setShowCalendar(false);
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }



  const [status, setStatus] = useState('0'); // '0' for salerid, '1' for self-employed
  const navigation = useNavigation();



  const handleSubmit = () => {
    setShowLoader(true);

    const myHeaders = {
      "Content-Type": "application/json",
      "Cookie": "ci_session=302860cvuk88fufugntciugb9as4tpr3"
    };

    const data = {
      "phone_no": phone,
      "status": parseInt(status)
    };

    axios.post("https://instantmudra.com/admin/API/checkEmploymentStatus", data, { headers: myHeaders })
      .then(response => {
        const result = response.data;
        console.log("result", result);
        setShowLoader(false);

        if (result.data === "true") {
          setShowSafeArea(true);
        } else {
          if (status === '0') {
            Alert.alert(
              "Error",
              "Sorry! Currently we are not dealing in self-employed. we will reach you in future",
              [
                {
                  text: "Exit",
                  onPress: () => BackHandler.exitApp(),
                  style: "destructive" // Makes the button red on iOS
                },
                {
                  text: "Back",
                  onPress: () => { setShowLoader(false); }, // The alert will close automatically
                  style: "cancel" // Adds a bold style to the button
                }
              ]
            );
            setShowSafeArea(false);
          }
        }
      })
      .catch(error => {
        console.error(error);
        setShowLoader(false);
        Alert.alert("Error", "An error occurred. Please try again.");
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 20 }}>
      <Loader showLoader={showLoader} />
      <Header hideLeftHeader title={'Personal Information'} navigation={props.navigation} />

      {!showSafeArea ? (
        // <View style={{ padding: 20,justifyContent:'center',alignItems:"center",marginTop:140 }}>
        //   <Text style={{color:"#000",alignSelf:'center',fontSize:20}}>Select Employment Status</Text>
        //   <RadioButton.Group
        //     onValueChange={value => setStatus(value)}
        //     value={status}
        //   >
        //     <View style={{marginTop:10, flexDirection:"column", justifyContent:'space-between',alignSelf:'center'}}>
        //       <View style={{flexDirection:'row'}}>
        //         <RadioButton value="1" color='#000'/>
        //         <Text style={{color:"#000",fontSize:16,marginTop:5}}>Saleri</Text>
        //       </View>
        //       <View style={{flexDirection:'row'}}>
        //         <RadioButton value="0" color='#000'/>
        //         <Text style={{color:"#000",fontSize:16,marginTop:5}}>Self Employed</Text>
        //       </View>
        //     </View>
        //   </RadioButton.Group>
        //   {/* <Button title="Submit" onPress={handleSubmit} /> */}
        //   <LinearButton
        //       onPress={handleSubmit}
        //       width={170}
        //       title={'Submit'}
        //     />
        // </View>
        <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <Text style={{ color: "#000", alignSelf: 'center', fontSize: 22, fontWeight: 'bold' }}>Select Employment Status</Text>
          <View style={{ marginTop: 10, flexDirection: "column", justifyContent: 'space-between', alignSelf: 'center', marginTop: 70, marginBottom: 50 }}>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 10,
                // backgroundColor: status === "1" ? 'green' : 'transparent',
                borderColor: status === "1" ? 'green' : 'transparent',
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
              }}
              onPress={() => setStatus("1")}
            >
              <Image source={require('../../assest/self/selerd.png')} style={{ width: 100, height: 100 }} />
              <Text style={{ color: "#000", fontSize: 20, marginLeft: 10 }}>Salaried Employee</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                borderColor: status === "0" ? 'green' : 'transparent',
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => setStatus("0")}
            >
              <Image source={require('../../assest/self/self.png')} style={{ width: 100, height: 100, }} />
              <Text style={{ color: "#000", fontSize: 20, marginLeft: 10 }}>Self-Employed</Text>
            </TouchableOpacity>
          </View>
          <LinearButton
            onPress={handleSubmit}
            width={170}
            title={'Submit'}
          />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          {cards()}
          <DatePicker
            modal
            mode='date'
            open={showCalendar}
            date={date}
            onConfirm={(date) => onDateChange(date)}
            onCancel={() => {
              setShowCalendar(false)
            }}
          />
          {/* {handleValidated() ? ( */}
          <LinearButton
            onPress={handleSaveClick}
            // onPress={navigateToNextPage}
            width={170}
            title={'Save Information'}
          />
          {/* ) : (
            <LoginButton
              // onPress={handleSaveInformation}
              onPress={handleSaveClick}
              style={{ alignSelf: 'center', width: 200 }}
              title={'Save Information'}
            // disabled={true}
            />
          )} */}
        </SafeAreaView>
      )}


    </View>
  );
};

export default PersonalInformation;




// const handleSubmit = () => {
//   const myHeaders = {
//     "Content-Type": "application/json",
//     "Cookie": "ci_session=302860cvuk88fufugntciugb9as4tpr3"
//   };

//   const data = {
//     "phone_no": 7011851125,
//     "status": parseInt(status)
//   };

//   axios.post("https://instantmudra.com/admin/API/checkEmploymentStatus", data, { headers: myHeaders })
//     .then(response => {
//       const result = response.data;
//       if (result.data === "true") {
//         // navigation.navigate('PersonalInformation');
//       } else {
//         Alert.alert("Error", "Employment status not verified.");
//       }
//     })
//     .catch(error => {
//       console.error(error);
//       Alert.alert("Error", "An error occurred. Please try again.");
//     });
// };