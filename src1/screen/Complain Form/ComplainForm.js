import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, useColorScheme } from 'react-native';
import Header from '../../components/Header/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'


const ComplainForm = (props) => {
    const colorScheme = useColorScheme();

    const [desc, setDesc] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState(null);
    const [showLoader, setShowLoader] = useState(false)

    const data = [
        { label: 'Paypal payment staying incomplete', value: '1' },
        { label: 'Document Verification Issues', value: '2' },
        { label: 'Incorrect: Re-registration form', value: '3' },

    ];

    const Onhandle = () => {
        setShowLoader(true)

        if (value == null) {
            alert('Please choose your complain type ')
            setShowLoader(false)

            return;
        }
        if (desc == '') {
            alert('Please Describe your problems. ')
            setShowLoader(false)

            return;
        }

        const body = {

            complaint_id: value,
            description: desc,

        }
        console.log("ComplaintForm>>>>>>", body)

        axios
            .post('https://instantmudra.com/admin/API/saveComplaints', body)
            .then(res => {
                setShowLoader(false)
                if (res?.data?.status == true) {
                    props.navigation.navigate('Home')
                    setShowLoader(false)
                    alert(res?.data?.msg)
                    // alert('Form Submitted Successfully Connect You shortly !')

                }

            })

    }

    return (
        <View style={{ flex: 1, }}>
            <Header navigation={props.navigation} title={'Complained Form'} />
            <ScrollView>

                <View style={{ marginLeft: 45 }}>
                    <Text style={{ fontSize: 15, fontWeight: "500", marginTop: 30, color: '#000' }}>Choose Your Complain Type</Text>
                </View>
                <View style={{ width: '90%', alignSelf: "center", padding: 10, margin: 20, marginTop: 5, borderWidth: 1, borderRadius: 10, }}>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={[styles.placeholderStyle, { color: '#000' }]}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={{ color: 'red' }}
                        containerStyle={{ backgroundColor: colorScheme == 'dark' ? '#000' : 'white' }}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Complain Type' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}

                    />



                </View>
                <View>
                    <Text style={{ marginLeft: 40, fontWeight: "500", color: "#000", marginTop: 60 }}>
                        Describe your Problem
                    </Text>
                </View>
                <TextInput
                    value={desc}
                    onChangeText={desc => setDesc(desc)}
                    mode="outlined"
                    multiline={true}
                    placeholder='write here your project details...'
                    style={{ width: '80%', alignSelf: 'center', height: 130, borderRadius: 10 }}
                />

                <TouchableOpacity onPress={() => Onhandle()}>
                    <View style={{ width: 140, height: 45, backgroundColor: "#7B4397", justifyContent: "center", alignSelf: "center", margin: 50, borderRadius: 5 }}>
                        <Text style={{ color: '#fff', alignSelf: "center", fontSize: 16 }}>
                            SUBMIT
                        </Text>

                    </View>

                </TouchableOpacity>
                {
                    showLoader && (
                        <View
                            style={{
                                position: 'absolute',
                                justifyContent: 'center',
                                alignSelf: 'center'


                            }}>
                            <View
                                style={{
                                    height: 100,
                                    width: 100,
                                    backgroundColor: "#d9d9d9",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 100,
                                    alignSelf: 'center'

                                }}>
                                <ActivityIndicator color={'white'} size={'large'} />
                            </View>
                        </View>
                    )
                }

            </ScrollView>
        </View>
    )
}

export default ComplainForm

const styles = StyleSheet.create({
    placeholderStyle: {
        fontSize: 20,
    },
    selectedTextStyle: {
        fontSize: 15,
        color: '#000',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },


})
