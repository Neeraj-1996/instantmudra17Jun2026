import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator, Pressable } from 'react-native';
import Header from '../../components/Header/Header';
// import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import Modal from "react-native-modal";
import axios from 'axios'
import { check } from 'react-native-permissions';
import Dropdown from '../../components/CustomDropDown/DropDown';
import Loader from '../../components/Loader/Loader';
import { API_BASE_URL, dropDownArrFromObj } from '../../utils';
import { isEmpty } from 'lodash';
import DatePicker from 'react-native-datepicker';
import LinearButton from '../../components/LinearButton/LinearButton';
import LoginButton from '../../components/LoginButton/LoginButton';








const Form1 = (props) => {
    const [checkBoxTickThree, setCheckBoxTickThree] = useState(false);
    const [isModalVisiblebeneficial, setModalVisiblebeneficial] = useState(false);
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedModeOfPayment, setSelectedModeOfPayment] = useState('NetBanking');
    const [otherBank, setOtherBank] = useState('');
    const [bankList, setBankList] = useState([])
    const [bankListDebitCard, setBankListDebitCard] = useState([])
    const [date, setDate] = useState(new Date())


    // ///////
    // hooks>>>>>>>
    const [customerBank, setCustomerBank] = useState(store1?.data?.bank_name);
    const [customerName, setCustomerName] = useState(store1?.data?.first_name);
    const [mobile, setMobile] = useState(store1?.data?.phone_no);
    const [email, setEmail] = useState(store1?.data?.official_mail);
    const [accountType, setAccountType] = useState(store1?.data?.account_type);
    const [debitAcno, setDebitAcno] = useState(store1?.data?.account_number);
    const [maxAmount, setMaxAmount] = useState(store1?.data?.loan_amount);
    // const [debitFrequency, setDebitFrequency] = useState('');
    const [mandatestartdate, setMandateStartDate] = useState('');
    const [ifscCode, setIfscCode] = useState(store1?.data?.ifsc_code);
    const [pan, setPan] = useState(store1?.data?.pan_card_no);
    const [aadhar, setAadhar] = useState(store1?.data?.aadhar_card_no)
    const [showLoader, setShowLoader] = useState(false)
    const [store1, setStore1] = useState('')


    useEffect(() => {
        savecalled()
        getBankList()
        getBankListDebitCard()
    }, [])


    // const handleValidated = () => {
    //     return (
    //         debitFrequency?.length > 0

    //     );
    // }

// console.log('selectedBank>>>>>', selectedBank)



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
                            title: item.bank_name,
                            bank_code: item.bank_code
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

    // console.log('', bankListDebitCard)


    const savecalled = () => {
        setShowLoader(true)

        const body = {
            order_id: props?.route?.params?.get

        }
        // await
        axios
            .post('https://instantmudra.com/admin/API/getdetailsforMandate', body)
            .then(res => {
                setShowLoader(false)

                if (res?.data?.status == true) {

                    setStore1(res?.data)
                    console.log("store fdsfsjn",res?.data)
                } else {
                    alert('Please enter valid IM-PL Number')
                    props.navigation.navigate('Mobilelogin')
                }
            })
    }

    // console.log('hello>>>>>>>>>>', store1)


    const savedetails = () => {

        const body = {

            user_id: store1?.data?.user_id,
            order_id: store1?.data?.order_id,
            account_holder_name: store1?.data?.account_holder_name,
            phone_no: store1?.data?.phone_no,
            email: store1?.data?.official_mail,
            // bank_code: store1?.data?.bank_code,
            bank_code: '9540',
            bank_account_number: store1?.data?.account_number,
            ifsc_code: store1?.data?.ifsc_code,
            account_type: store1?.data?.account_type,
            maximum_amount: store1?.data?.max_amount,
            start_date: date,
            end_date: "2022-12-30",
            frequency: "1",
            mandate_type: selectedModeOfPayment

        }
        // console.warn(body)


        axios
            .post('https://instantmudra.com/admin/API/saveMandateDetails', body)
            .then(res => {
                if (res?.status == 200) {
                    console.log('impk', res?.data)
                    alert(res?.data?.msg)
                    props.navigation.navigate('Emandateweb',{
                        user_id: store1?.data?.user_id,
                        order_id: store1?.data?.order_id,
                    })
                    return;
                }
                // if(res?.data?.status == false){
                //     alert(res?.data?.msg)
                // }
            })
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>


            <View>
                <Modal isVisible={isModalVisiblebeneficial}
                    animationType="slide"
                >

                    <View>
                        <ScrollView>
                            <View style={{ width: '100%', height: 250, backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
                                <Text style={{ fontSize: 25, fontWeight: "500", color: "#7B4397", alignSelf: "center", textAlign: "center" }}>Customer Account No. and IFSC Code</Text>
                                <Text style={{ fontSize: 18, fontWeight: "500", color: "#7B4397", alignSelf: "center", textAlign: "center" }}>Are you sure wants to continue with this Account No. & IFSC code ?</Text>


                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <TouchableOpacity onPress={() => savedetails() }>

                                        <View style={{ width: 100, height: 40, backgroundColor: "#7B4397", justifyContent: "center", borderRadius: 5, marginTop: 40 }}>
                                            <Text style={{ color: "#fff", alignSelf: "center", fontSize: 20 }}>YES</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => setModalVisiblebeneficial(!isModalVisiblebeneficial)}>
                                        <View style={{ width: 100, height: 40, backgroundColor: "#DC2430", justifyContent: "center", borderRadius: 5, marginLeft: 50, marginTop: 40 }}>
                                            <Text style={{ color: "#fff", alignSelf: "center", fontSize: 20 }}>NO</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </ScrollView>
                    </View>
                </Modal>
            </View>
            {/*  modal  end for Beneficial ////////////////////////////////// */}

            <Header navigation={props.navigation} title={'E-Mandate Form'} />
            <View style={{ width: "100%", height: 50, backgroundColor: "#fff", elevation: 1 }}>
                <Text style={{ fontSize: 25, fontWeight: '500', padding: 10, borderRadius: 5, alignSelf: "center" }}>Customer Details</Text>
            </View>
            <ScrollView>
                {/* con tainer>>>>>>>>>>>> */}

                <View style={styles.container}>
                    <Loader showLoader={showLoader} />
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
                            >
                                {selectedModeOfPayment === 'NetBanking' ? (
                                    <Image
                                        style={{}}
                                        source={require('../../assests/smallTick.png')}
                                    />
                                ) : (
                                    <Image
                                        style={{}}
                                        source={require('../../assests/Ellipse.png')}
                                    />
                                )}
                            </TouchableOpacity>

                            <Text style={{ width: '70%', marginLeft: 4 }}>Net Banking</Text>
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
                                }}>
                                {selectedModeOfPayment === 'DebitCard' ? (
                                    <Image
                                        style={{}}
                                        source={require('../../assests/smallTick.png')}
                                    />
                                ) : (
                                    <Image
                                        style={{}}
                                        source={require('../../assests/Ellipse.png')}
                                    />
                                )}
                            </TouchableOpacity>
                            <Text style={{ width: '70%', marginLeft: 4 }}>Debit Card</Text>
                        </View>

                        <Dropdown
                            options={selectedModeOfPayment === "NetBanking" ? bankList : bankListDebitCard}
                            onSelect={text => {
                                setOtherBank(text.id)
                                setSelectedBank('')
                            }}
                            headerTilte={'Bank List'}
                            placeholderText={
                                isEmpty(store1?.data?.bank_name) ? 'Other' : store1?.data?.bank_name
                            }
                            placeHolderTextStyle={
                                isEmpty(otherBank) ? { color: 'black' } : { color: 'black' }
                            }
                            enabled={props.route?.params === "Document"}
                        />
                    </ScrollView>
                </View>


                <View style={{ marginTop: 20 }}>

                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600" }}>Customer Bank</Text>
                        </View>
                        <TextInput
                            onChangeText={setCustomerBank}
                            value={customerBank}
                            placeholder="Enter Customer Bank"
                            defaultValue={store1?.data?.bank_name}
                            // keyboardType="numeric"
                            placeholderTextColor="#000"
                            //  maxLength={10}
                            editable={false}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />


                    </View>
                    {/* input>>>>>>>>> */}
                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>Customer Name</Text>
                        </View>
                        <TextInput
                            onChangeText={setCustomerName}
                            value={customerName}
                            placeholder="Enter Customer Name"
                            defaultValue={store1?.data?.first_name}
                            //  keyboardType="numeric"
                            placeholderTextColor="#000"
                            //maxLength={10}
                            editable={false}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />
                    </View>
                    {/* input>>>>>>>>> */}
                    {/* input>>>>>>>>> */}
                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>Mobile Number</Text>
                        </View>
                        <TextInput
                            onChangeText={setMobile}
                            value={mobile}
                            placeholder="Enter Mobile Number"
                            defaultValue={store1?.data?.phone_no}
                            keyboardType="numeric"
                            placeholderTextColor="#000"
                            maxLength={10}
                            editable={false}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />
                    </View>
                    {/* input>>>>>>>>> */}
                    {/* input>>>>>>>>> */}
                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>Email - ID</Text>
                        </View>
                        <TextInput
                            onChangeText={setEmail}
                            value={email}
                            placeholder="Enter Enter Email-ID"
                            keyboardType='email-address'
                            placeholderTextColor="#000"
                            defaultValue={store1?.data?.official_mail}
                            // maxLength={10}
                            editable={false}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />
                    </View>




                    {/* input>>>>>>>>> */}
                    {/* input>>>>>>>>> */}
                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>Type of Account</Text>
                        </View>
                        <TextInput
                            onChangeText={setAccountType}
                            value={accountType}
                            placeholder="Account Type"
                            // keyboardType="numeric"
                            editable={false}
                            defaultValue={store1?.data?.account_type}
                            placeholderTextColor="#000"

                            maxLength={16}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />
                    </View>
                    {/* input>>>>>>>>> */}
                    {/* input>>>>>>>>> */}
                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>Debit Account Number</Text>
                        </View>
                        <TextInput
                            onChangeText={setDebitAcno}
                            value={debitAcno}
                            placeholder="Enter Account Number"
                            keyboardType="numeric"
                            editable={false}
                            placeholderTextColor="#000"
                            defaultValue={store1?.data?.account_number}
                            maxLength={20}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />
                    </View>
                    {/* input>>>>>>>>> */}
                    {/* input>>>>>>>>> */}
                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>Loan Amount</Text>
                        </View>
                        <TextInput
                            onChangeText={setMaxAmount}
                            value={maxAmount}
                            defaultValue={store1?.data?.loan_amount}
                            placeholder="Enter Amount"
                            keyboardType="numeric"
                            placeholderTextColor="#000"
                            editable={false}
                            maxLength={5}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />
                    </View>
                    {/* input>>>>>>>>> */}
                    {/* input>>>>>>>>> */}
                    {/* <View>

                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>Debit Frequency</Text>
                        </View>

                        <TextInput
                            onChangeText={setDebitFrequency}
                            value={debitFrequency}
                            maxAmount={debitFrequency}
                            placeholder="Enter debit frequency"
                            //  keyboardType="numeric"
                            // placeholderTextColor="#000"
                            //  maxLength={10}
                            // editable={false}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, fontWeight: 'bold' }}
                        />
                    </View> */}

                    <View style={styles.container}>
                        <DatePicker
                            style={styles.datePickerStyle}
                            date={date}
                            mode="date"
                            placeholder="select date"
                            format="DD/MM/YYYY"
                            minDate="01-01-1900"
                            maxDate="01-01-2000"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            editable={false}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    right: -5,
                                    top: 4,
                                    marginLeft: 20,
                                    display: 'none'
                                },
                                dateInput: {
                                    borderColor: "gray",
                                    alignItems: "flex-start",
                                    borderWidth: 0,
                                    borderBottomWidth: 1,
                                },
                                placeholderText: {
                                    fontSize: 17,
                                    color: "gray"
                                },
                                dateText: {
                                    fontSize: 17,
                                }
                            }}
                            onDateChange={(date) => {
                                setDate(date);
                            }}
                        />
                    </View>


                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>IFSC Code</Text>
                        </View>
                        <TextInput
                            onChangeText={setIfscCode}
                            value={ifscCode}
                            defaultValue={store1?.data?.ifsc_code}
                            placeholder="Enter IFSC Code"
                            // keyboardType="numeric"
                            placeholderTextColor="#000"
                            maxLength={12}
                            editable={false}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />
                    </View>

                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>Pan Number</Text>
                        </View>
                        <TextInput
                            onChangeText={setPan}
                            value={pan}
                            defaultValue={store1?.data?.pan_card_no}
                            placeholder="Enter Pan"
                            //  keyboardType="numeric"
                            placeholderTextColor="#000"
                            //maxLength={10}
                            editable={false}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />
                    </View>

                    <View>
                        <View>
                            <Text style={{ marginLeft: 20, fontSize: 18, color: "#7B4397", fontWeight: "600", marginTop: 20 }}>Aadhar Number</Text>
                        </View>
                        <TextInput
                            onChangeText={setAadhar}
                            value={aadhar}
                            defaultValue={store1?.data?.aadhar_card_no}
                            placeholder="Enter Aadhar"
                            keyboardType="numeric"
                            placeholderTextColor="#000"
                            //   maxLength={10}
                            editable={false}
                            underlineColorAndroid='red'
                            style={{ width: '70%', height: 60, marginLeft: 20, color: "#000", fontWeight: 'bold' }}
                        />
                    </View>
                    {/* input>>>>>>>>> */}

                    {/* <TouchableOpacity onPress={() => setModalVisiblebeneficial(!isModalVisiblebeneficial)}>

                        <View style={{ width: 160, height: 50, backgroundColor: "#DC2430", alignSelf: "center", justifyContent: "center", borderRadius: 5, margin: 20 }}>
                            <Text style={{ color: "#FFF", alignSelf: "center", fontSize: 20, fontWeight: "500" }}>SUBMIT</Text>

                        </View>
                    </TouchableOpacity> */}
                    {/* {handleValidated() ? (
                        <LinearButton
                            onPress={() => setModalVisiblebeneficial(!isModalVisiblebeneficial)}
                            width={170}
                            title={'Save Information'}
                        />
                    ) : (
                        <LoginButton
                            style={{ alignSelf: 'center', width: 200 }}
                            title={'Save Information'}
                            disabled={true}
                        />
                    )} */}

<LinearButton
                            onPress={() => setModalVisiblebeneficial(!isModalVisiblebeneficial)}
                            width={170}
                            title={'Save Information'}
                        />
                </View>
            </ScrollView>
        </View>
    )
}
export default Form1
const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        alignSelf: 'center',
    },
    checkbox: {
        alignSelf: 'center',
    },
    checkBox: {
        height: 25,
        width: 25,
        // backgroundColor:"red",
        borderColor: '#000',
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginLeft: 20

    },
    tickImage: {
        height: 26,
        width: 26
    },

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    datePickerStyle: {
        width: 230,
        marginLeft: 20,
        margin: 10
    },
    text: {
        textAlign: 'left',
        width: 230,
        fontSize: 16,
        color: "#000"
    }

})
