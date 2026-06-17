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
import { first, isEmpty } from 'lodash';
import { API_BASE_URL, dropDownArrFromObj } from '../../utils';
import Loader from '../../components/Loader/Loader';
import { useRoute } from '@react-navigation/native';
import Modal from "react-native-modal";






const PersonalInformationPan = props => {
    const [showLoader, setShowLoader] = useState(false);
    const [FirstName, setFirstName] = useState('');
    const [EmailAddress, setEmailAddress] = useState('');
    const [Gender, setGender] = useState('');
    const [HouseType, setHouseType] = useState('');
    const [houseTypeName, setHouseTypeName] = useState('');
    const [PinCode, setPinCode] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState('');
    const [AddressLineOne, setAddressLineOne] = useState('');
    const [PanNumber, setPanNumber] = useState('')

    const [pan, setPan] = useState('');

    const [Aadhar, setAadhar] = useState('')
    const [showCalendar, setShowCalendar] = useState(false);
    const [HouseTypeArr, setHouseTypeArr] = useState([]);
    const [store, setStore] = useState([]);
    const [savePan, setSavePan] = useState('');
    const route = useRoute();
    const [isModalVisiblebeneficial, setModalVisiblebeneficial] = useState(false);


    // console.log('hello pan details', props?.route?.params?.PinCode)


    // console.log('hellopan',props?.route?.params?.datapan)
    // save pan>>>>>>>>


    const handlePress = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic NzAwOTU1MTE6TUttcEFHY0JCT2VSNDJnVnBBQzd6ZVNSRmFINkVXRnE=");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "client_ref_num": "test",
            "pan": pan
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://svc.digitap.ai/validation/kyc/v1/pan_details", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                // Handle the API response here
                Alert.alert('API Response', result);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', 'An error occurred while fetching data.');
            });
    };



    const savpan = async () => {
        const userIdZ = await AsyncStorage.getItem('userIdZ');
        const phone = await AsyncStorage.getItem('phone');

        setShowLoader(true)

        const body = {
            user_id: userIdZ,
            aadhaar: store?.verification_data?.data?.aadhaar,
            phone_no: phone,
            address: store?.verification_data?.data?.address,
            city: store?.verification_data?.data?.city,
            dob: store?.verification_data?.data?.dob,
            email: EmailAddress,
            first_name: store?.verification_data?.data?.first_name,
            gender: store?.verification_data?.data?.gender,
            last_name: store?.verification_data?.data?.last_name,
            middle_name: store?.verification_data?.data?.middle_name,
            pan: store?.verification_data?.data?.pan,
            pincode: store?.verification_data?.data?.pincode,
            state: store?.verification_data?.data?.state,
            pan_to_aadhar_response: JSON.stringify(store?.verification_data?.data?.aadhaar),
            pan_image_name: store?.pan_image_name

        }

        // console.log('>>>>>>>>>', body)


        axios
            .post('https://instantmudra.com/admin/API/savePanDetails', body)
            .then(res => {
                setShowLoader(false)
                console.log(res?.data)
                if (res?.data?.status == true) {
                    setSavePan(res?.data)
                    if (res?.data?.settings?.aadhar_enabled == "1") {
                        props.navigation.navigate("Aadhar")
                        setModalVisiblebeneficial(!isModalVisiblebeneficial)
                        return;
                    } else {
                        setModalVisiblebeneficial(!isModalVisiblebeneficial)
                    }

                } else {
                    alert(res?.data?.msg)
                    // console.log('>>>>>>', res?.data?.msg)
                    props.navigation.navigate("Pan")

                }


            })
            .catch(error => {
                //console.log('kjhasjkda', error);
                alert('We are facing some techical issue. please try after sometime')
            });
    }


    // console.log('1212',savePan?.settings)
    // save pan>>>>>>>>   

    const PanDetail = async () => {
        setShowLoader(true)
        const userIdZ = await AsyncStorage.getItem('userIdZ');


        const body = {
            user_id: userIdZ,
            pan_number: props?.route?.params?.datapan,
            pan_image: props?.route?.params?.ImgPan
        }
        // console.log(props?.route?.params?.datapan)

        axios
            .post('https://instantmudra.com/admin/API/verifyPanDetailsTest', body)
            .then(res => {
                setShowLoader(false)
                console.log('paNdetails>>>>', res?.data?.pan_image_name)
                if (res?.data?.verification_data.code == 200) {
                    setStore(res?.data)
                    return;
                }
                console.log('pan details find pan images>>>>>>>>>>>>>', res?.data?.verification_data.code)


                if (res?.data?.verification_data.code == 400) {
                    alert(res?.data?.status?.statusMessage)
                    props.navigation.navigate("Pan")
                    return;
                }

            })
            .catch(error => {
                //console.log('kjhasjkda', error);
                alert('We are facing some techical issue. please try after sometime')
            });
    }

    // alert(store?.data?.gender)

    useEffect(() => {
        fetchHouseTypeDropDown()
        PanDetail()
        setModalVisiblebeneficial(!isModalVisiblebeneficial)

    }, []);


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

    // const handleValidated = () => {

    //     return (

    //         HouseType?.length > 0 &&
    //          store?.data?.pincode?.length == 6  || savePan?.data?.pin_code?.length == 6 &&
    //          store?.verification_data?.data?.dob.length > 0 || savePan?.data?.d_o_b.length > 0 &&
    //          AddressLineOne?.length > 0 &&
    //          EmailAddress?.length > 3

    //     );
    // }

    const handleValidated = () => {

        return (
            HouseType?.length > 0 &&
            savePan?.data?.pin_code?.length == 6 &&
            savePan?.data?.d_o_b.length > 0 &&
            AddressLineOne?.length > 0 &&
            EmailAddress?.length > 3

        );
    }


    const navigateToNextPage = () => {
        // if (savePan?.settings?.aadhar_enabled == "1") {
        //     props.navigation.navigate("Aadhar")
        //     return;
        // }

        // else {
        let ob = {
            first_name: savePan?.data?.first_name + ' ' + savePan?.data?.last_name,
            official_mail: EmailAddress,
            gender: savePan?.data?.gender,
            d_o_b: savePan?.data?.d_o_b,
            address_state: AddressLineOne,
            pin_code: savePan?.data?.pin_code,
            aadhar_card_no: savePan?.data?.pan_to_aadhar_response,
            pan_card_no: savePan?.data?.pan_card_no,
            house_type: HouseType,
            //setting: savePan?.settings
        }
        console.log('jhgcjgcjgcjgcjgv', ob)

        props.navigation.navigate("CompanyDetails", { data: ob })
    }

    // }
    const name = store?.data?.first_name + store?.data?.last_name

    const cards = props => {
        return (
            <ScrollView>

                <View>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                        placeholder="Enter PAN"
                        onChangeText={text => setPan(text)}
                        value={pan}
                    />
                    <Button
                        title="Submit"
                        onPress={handlePress}
                    />

                </View>


                <View style={styles.container}>
                    <Text style={styles.textField}>Full Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setFirstName(text)}
                        value={savePan?.data?.first_name + ' ' + savePan?.data?.last_name}
                        editable={false}
                        placeholder="Full Name"
                    // placeholderTextColor='#000'
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
                                value={savePan?.data?.gender}
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
                                placeholder="Enter Pin Code"
                                keyboardType={'numeric'}
                                editable={false}
                                maxLength={6}
                                value={savePan?.data?.pin_code}
                            />
                        </View>
                        <View style={{ marginLeft: 10, width: '50%' }}>
                            <Text style={styles.textField}>Date of Birth</Text>
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    value={savePan?.data?.d_o_b}
                                    editable={false}
                                    onChangeText={text => setDateOfBirth(text)}
                                    placeholder="DD/MM/YYYY"
                                />
                                {/* <TouchableOpacity
                                    onPress={() => setShowCalendar(true)}
                                    style={{ position: 'absolute', right: 6 }}>
                                    <Image
                                        style={{ height: 20, width: 20, marginTop: 22 }}
                                        source={require('../../assests/calendar.png')}
                                    />
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '50%' }}></View>
                    <Text style={styles.textField}> Address Line 1</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setAddressLineOne(text)}
                        placeholder="Address Line 1 "
                        value={AddressLineOne}
                        defaultValue={AddressLineOne}
                    />

                    <Text style={styles.textField}>PAN Number.</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setPanNumber(text)}
                        placeholder="PAN Card number "
                        editable={false}
                        autoCapitalize='characters'
                        maxLength={10}
                        value={savePan?.data?.pan_card_no}
                    />

                    <Text style={styles.textField}> Aadhar Number</Text>
                    <TextInput
                        style={styles.textInput}
                        maxLength={16}
                        onChangeText={text => setAadhar(text)}
                        editable={false}
                        placeholder="Aadhar Number"
                        value={savePan?.data?.pan_to_aadhar_response}
                    />
                </View>
                <View style={{ height: 200, width: '100%' }}></View>
            </ScrollView>
        );
    };
    const Pupup = props => {
        return (
            <ScrollView>


                <View style={styles.container}>
                    <Text style={styles.textField}>Full Name</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setFirstName(text)}
                        value={store?.verification_data?.data?.first_name + store?.verification_data?.data?.last_name}
                        editable={false}
                        placeholder="Full Name"
                    // placeholderTextColor='#000'
                    />



                    <View style={styles.middleContainer}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textField}> Gender</Text>

                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setGender(text)}
                                placeholder="Gender"
                                editable={false}
                                value={store?.verification_data?.data?.gender}
                            />
                        </View>
                    </View>
                    <View style={styles.middleContainer}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textField}> Pin Code</Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={text => setPinCode(text)}
                                placeholder="Enter Pin Code"
                                keyboardType={'numeric'}
                                editable={false}
                                maxLength={6}
                                value={store?.verification_data?.data?.pincode}
                            />
                        </View>
                        <View style={{ marginLeft: 10, width: '50%' }}>
                            <Text style={styles.textField}>Date of Birth</Text>
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    value={store?.verification_data?.data?.dob}
                                    editable={false}
                                    onChangeText={text => setDateOfBirth(text)}
                                    placeholder="DD/MM/YYYY"
                                />
                            </View>
                        </View>
                    </View>

                    <Text style={styles.textField}>PAN Number.</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => setPanNumber(text)}
                        placeholder="PAN Card number "
                        editable={false}
                        autoCapitalize='characters'
                        maxLength={10}
                        value={store?.verification_data?.data?.pan}
                    />

                    <Text style={styles.textField}> Aadhar Number</Text>
                    <TextInput
                        style={styles.textInput}
                        maxLength={12}
                        onChangeText={text => setAadhar(text)}
                        editable={false}
                        placeholder="Aadhar Number"
                        value={JSON.stringify(store?.verification_data?.data?.aadhaar)}
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

                                    {Pupup()}
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

                                    <TouchableOpacity onPress={() => savpan()}>
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

export default PersonalInformationPan;
