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
    ActivityIndicator,
    SafeAreaView,
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
import Modal from "react-native-modal";



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

const PersonalInformationAadhar = props => {
    const [showLoader, setShowLoader] = useState(false);
    const [FirstName, setFirstName] = useState('');
    const [EmailAddress, setEmailAddress] = useState('');
    const [Gender, setGender] = useState();
    const [HouseType, setHouseType] = useState('');
    const [houseTypeName, setHouseTypeName] = useState('');
    const [PinCode, setPinCode] = useState(saveAadhar?.data?.pin_code);
    const [DateOfBirth, setDateOfBirth] = useState();
    const [addres, setAddres] = useState('');
    const [PanNumber, setPanNumber] = useState(saveAadhar?.data?.pan_card_no)
    const [AadharNumber, setAadharNumber] = useState(resdata?.data?.document_details?.aadhaar_number)
    const [showCalendar, setShowCalendar] = useState(false);
    const [HouseTypeArr, setHouseTypeArr] = useState([]);
    const [resdata, setResdata] = useState('');
    const [state, setState] = useState('');
    const [saveAadhar, setSaveAadhar] = useState('');
    const [isModalVisiblebeneficial, setModalVisiblebeneficial] = useState(false);
    const [adback, setAdBack] = useState('');
    const [adfront, setAdFront] = useState('');

    const route = useRoute();


    useEffect(() => {
        fetchHouseTypeDropDown()
        getaadhar()
        setModalVisiblebeneficial(!isModalVisiblebeneficial)
    }, []);



    // fetch all user data 



    // fetch all user data 


    const saveaadhar = async () => {
        const userIdZ = await AsyncStorage.getItem('userIdZ');
        const phone = await AsyncStorage.getItem('phone');

        setShowLoader(true)


        const body = {
            user_id: userIdZ,
            full_name: resdata?.data?.document_details?.full_name,
            phone_no: phone,
            aadhaar_number: resdata?.data?.document_details?.aadhaar_number,
            State: resdata?.data?.verification_data?.State,
            dob: resdata?.data?.document_details?.dob,
            Gender: resdata?.data?.document_details?.gender,
            aadhar_verification_response: JSON.stringify(resdata?.data?.document_details),
            aadhar_front_image_name: adfront,
            aadhar_back_image_name: adback
        }

        console.log('??????', body)


        axios
            .post('https://instantmudra.com/admin/API/saveAadharDetails', body)
            .then(res => {
                setShowLoader(false)


                console.log('NEW IDEA>>>>>>>>>>>>>>', res)
                if (res?.data?.status == true) {
                    setSaveAadhar(res?.data)
                    //  alert(res?.data?.msg)
                    setModalVisiblebeneficial(!isModalVisiblebeneficial)
                    return;
                }
                if (res?.data?.status == false) {
                    alert(res?.data?.msg)
                    props.navigation.navigate("Aadhar")
                    return;
                }

            })
            .catch(error => {
                //console.log('kjhasjkda', error);
                alert('We are facing some techical issue. please try after sometime')
            });
    }

    // console.log('latest AAAAAAAAAA', saveAadhar)



    const getaadhar = async () => {
        setShowLoader(true)
        // const user_id = await AsyncStorage.getItem('user_id');
        const userIdZ = await AsyncStorage.getItem('userIdZ');

        const body = {
            user_id: userIdZ,
            aadhar_img: props?.route?.params?.item,
            aadharBack: props?.route?.params?.back
        }

        axios
            .post('https://instantmudra.com/admin/API/verifyAadharDetailsTest', body)
            .then(res => {
                console.log('new idea verifications >>>>>>>>>>>>', res?.data?.aadhar_front_image_name)
                setAdBack(res?.data?.aadhar_back_image_name)
                setAdFront(res?.data?.aadhar_front_image_name)
                
                setShowLoader(false)
                if (res?.data?.verification_data?.status?.statusMessage == "Processing is completed. Verification is completed.") {
                    setResdata(res?.data?.verification_data)
                    //  AsyncStorage.setItem('aadhatimg', res?.data?.document_link)
                    //  console.log('aadhatimg', res?.data?.data?.document_link)

                    alert('Aadhar Image successfully verified !')

                } else {
                    alert('Please Upload Valid Aadhar Image')
                    props.navigation.navigate("Aadhar")

                }
            })
            .catch(error => {
                //console.log('kjhasjkda', error);
                alert('We are facing some techical issue. please try after sometime')
            });
    }

    console.log('aadhar card data get todat', resdata?.aadhar_front_image_name)


    const fetchHouseTypeDropDown = () => {
        axios
            .get(API_BASE_URL + "get_house_type")
            .then(res => {
                //  console.log("fetchHouseTypeDropDown response", res)
                if (res.status === 200) {
                    const newArr = dropDownArrFromObj(res?.data?.data)
                    setHouseTypeArr(newArr)
                    // console.log("res?.data?.data", res?.data?.data)
                    // console.log("hello", newArr)
                }

            })
            .catch(err => {
                // console.log("fetchHouseTypeDropDown error", err)
            })

    }

    const handleValidated = () => {

        return (
            resdata?.data?.document_details?.full_name?.length > 2 &&
            EmailAddress.length > 3 &&
            resdata?.data?.document_details?.gender?.length > 0 &&
            HouseType?.length > 0 &&
            saveAadhar?.data?.pin_code || PinCode?.length === 6 &&
            resdata?.data?.document_details?.dob?.length > 0 &&
            saveAadhar?.data?.pan_card_no || PanNumber?.length == 10 &&
            resdata?.data?.document_details?.aadhaar_number?.length === 12 &&
            addres?.length > 2
        )

    }

    const navigateToNextPage = () => {
        if (EmailAddress == '') {
            alert('enter')
            return;

        }
        let ob = {
            first_name: resdata?.data?.document_details?.full_name,
            official_mail: EmailAddress,
            gender: resdata?.data?.document_details?.gender,
            d_o_b: resdata?.data?.document_details?.dob,
            address_state: addres,
            pin_code: PinCode || saveAadhar?.data?.pin_code,
            aadhar_card_no: resdata?.data?.document_details?.aadhaar_number,
            pan_card_no: PanNumber || saveAadhar?.data?.pan_card_no,
            house_type: HouseType,
            aadharimgs: resdata?.data?.document_link
        }
        props.navigation.navigate("CompanyDetails", {
            data: ob,
        })
    }

    const cards = props => {
        return (
            <ScrollView>

                <View style={styles.container}>
                    <Text style={styles.textField}>Full Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setFirstName(text)}
                        value={resdata?.data?.document_details?.full_name}
                        defaultValue={FirstName}
                        editable={false}
                        placeholder="Full Name"
                    />

                    <Text style={styles.textField}>Email address</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setEmailAddress(text)}
                        placeholder="Your Email address"
                        value={EmailAddress}
                    // editable={false}
                    />

                    <View style={styles.middleContainer}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textField}> Gender</Text>


                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setGender(text)}
                                placeholder="Gender"
                                editable={false}
                                value={Gender}
                                defaultValue={resdata?.data?.document_details?.gender}
                            />
                        </View>
                        <View style={{ marginLeft: 10, width: '50%' }}>
                            <Text style={styles.textField}>House Type</Text>
                            <Dropdown
                                options={HouseTypeArr}
                                onSelect={text => setHouseType(text.id)}
                                headerTilte={'House Type'}
                                placeholderText={
                                    isEmpty(houseTypeName) ? 'Please Select' : houseTypeName
                                }
                                placeHolderTextStyle={
                                    isEmpty(houseTypeName) ? { color: '#D3D3D3' } : { color: 'black' }
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.middleContainer}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textField}> Pin Code</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setPinCode(text)}
                                value={PinCode}
                                placeholder="Enter Pin Code"
                                keyboardType={'numeric'}
                                defaultValue={saveAadhar?.data?.pin_code}
                                maxLength={6}
                            />
                        </View>
                        <View style={{ marginLeft: 10, width: '50%' }}>
                            <Text style={styles.textField}>Date of Birth</Text>
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    value={DateOfBirth}
                                    defaultValue={resdata?.data?.document_details?.dob}
                                    editable={false}
                                    onChangeText={text => setDateOfBirth(text)}
                                    placeholder="DD/MM/YYYY"
                                />

                            </View>
                        </View>
                    </View>
                    <View style={{ width: '50%' }}></View>
                    <Text style={styles.textField}> Address Line 1</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setAddres(text)}
                        placeholder="Address Line 1"
                        value={addres}
                    />

                    <Text style={styles.textField}>PAN Number.</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setPanNumber(text)}
                        placeholder="PAN Card number "
                        autoCapitalize='characters'
                        maxLength={10}
                        defaultValue={saveAadhar?.data?.pan_card_no}
                        value={PanNumber}
                    />

                    <Text style={styles.textField}> Aadhar Number</Text>
                    <TextInput
                        style={styles.textInput}
                        maxLength={12}
                        onChangeText={text => setAadharNumber(text)}
                        placeholder="Aadhar Number"
                        defaultValue={resdata?.data?.document_details?.aadhaar_number}
                        editable={false}
                        value={AadharNumber}
                    />
                </View>
                <View style={{ height: 200, width: '100%' }}></View>
            </ScrollView>
        );
    };
    const pupup = props => {
        return (
            <ScrollView>

                <View style={styles.container}>
                    <Text style={styles.textField}>Full Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setFirstName(text)}
                        value={resdata?.data?.document_details?.full_name}
                        defaultValue={FirstName}
                        editable={false}
                        placeholder="Full Name"
                    />
                    <Text style={styles.textField}>Gender</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setGender(text)}
                        placeholder="Gender"
                        editable={false}
                        value={resdata?.data?.document_details?.gender}
                        defaultValue={Gender}
                    />
                    <Text style={styles.textField}>Date of Birth</Text>
                    <TextInput
                        style={styles.textInput}
                        value={DateOfBirth}
                        defaultValue={resdata?.data?.document_details?.dob}
                        editable={false}
                        onChangeText={text => setDateOfBirth(text)}
                        placeholder="DD/MM/YYYY"
                    />

                    <Text style={styles.textField}> Aadhar Number</Text>
                    <TextInput
                        style={styles.textInput}
                        maxLength={12}
                        onChangeText={text => setAadharNumber(text)}
                        placeholder="Aadhar Number"
                        defaultValue={resdata?.data?.document_details?.aadhaar_number}
                        editable={false}
                        value={AadharNumber}
                    />

                </View>
                <View style={{ height: 200, width: '100%' }}></View>
            </ScrollView>
        );
    };

    const onDateChange = date => {
        const age = getAge(date)
        if (age < 18) {
            alert("Age should be greater than 18")
            return;
        }
        setDateOfBirth(moment(date).format('DD/MM/YY'));
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
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 20 }}>
            <Loader showLoader={showLoader} />
            <Header hideLeftHeader title={'Personal Information'} navigation={props.navigation} />
            <SafeAreaView style={{ flex: 1 }}>
                {/* MODAL  */}
                <View>
                    <Modal isVisible={isModalVisiblebeneficial}
                        animationType="slide"
                    >

                        <View>
                            <ScrollView>

                                <View style={{ width: '100%', height: 500, backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>

                                    {pupup()}
                                    {/* <Loader showLoader={showLoader} /> */}
                                    {showLoader && (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    height: 100,
                                                    width: 100,
                                                    backgroundColor: "#d9d9d9",
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <ActivityIndicator color={'white'} size={'large'} />
                                            </View>
                                        </View>
                                    )}

                                    {/* <Loader showLoader={showLoader} /> */}

                                    <TouchableOpacity onPress={() => saveaadhar()}>
                                        <View style={{ width: 160, height: 40, backgroundColor: "#DC2430", justifyContent: "center", borderRadius: 10, alignSelf: "center", margin: 20 }}>
                                            <Text style={{ alignSelf: "center", fontWeight: "bold", color: "#fff" }}>SUBMIT</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>


                            </ScrollView>

                        </View>

                    </Modal>
                </View>
                {/* MODAL  */}

                {cards()}

                {showCalendar && (
                    <TouchableOpacity
                        onPress={() => setShowCalendar(false)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            height: Dimensions.get('window').height,
                            width: '100%',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                        }}>
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderWidth: 0.4,
                                marginLeft: 10,
                                marginRight: 10,
                                paddingVertical: 10,
                                paddingLeft: 4,
                                paddingRight: 4,
                            }}>
                            <CalendarPicker
                                onDateChange={onDateChange}
                            // maxDate={new Date(getEighteenYearsAgo())}
                            />
                        </View>
                    </TouchableOpacity>
                )}
                {handleValidated() ? (
                    <LinearButton
                        onPress={navigateToNextPage}
                        width={170}
                        title={'Save Information'}
                    />
                ) : (
                    <LoginButton
                        style={{ alignSelf: 'center', width: 200 }}
                        title={'Save Information'}
                        disabled={true}
                    />
                )}
            </SafeAreaView>
        </View>
    );
};

export default PersonalInformationAadhar;
