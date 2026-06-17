
import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../components/Header/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginButton from '../../components/LoginButton/LoginButton';
import LinearButton from '../../components/LinearButton/LinearButton';



const Ref = (props) => {

 

    console.log("Ref Screen props::",  props?.route?.params)
    const [name1, setName1] = useState('')
    const [name2, setName2] = useState('')
    const [name3, setName3] = useState('')
    const [name4, setName4] = useState('')

    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);
    const [value4, setValue4] = useState(null);


    const [phone1, setPhone1] = useState('')
    const [phone2, setPhone2] = useState('')
    const [phone3, setPhone3] = useState('')
    const [phone4, setPhone4] = useState('')


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);

    const [isFocus, setIsFocus] = useState(false);

    const [items1, setItems1] = useState([
        { label: 'Father', value: 'Father' },
        { label: 'Mother', value: 'Mother' },
        { label: 'Brother', value: 'Brother' },
        { label: 'Sister', value: 'Sister' },
        { label: 'Others', value: 'Others' },
    ]);
    const [items2, setItems2] = useState([
        { label: 'Father', value: 'Father' },
        { label: 'Mother', value: 'Mother' },
        { label: 'Brother', value: 'Brother' },
        { label: 'Sister', value: 'Sister' },
        { label: 'Others', value: 'Others' },

    ]);
    const [items3, setItems3] = useState([
        { label: 'Father', value: 'Father' },
        { label: 'Mother', value: 'Mother' },
        { label: 'Brother', value: 'Brother' },
        { label: 'Sister', value: 'Sister' },
        { label: 'Others', value: 'Others' }
    ]);
    const [items4, setItems4] = useState([
        { label: 'Father', value: 'Father' },
        { label: 'Mother', value: 'Mother' },
        { label: 'Brother', value: 'Brother' },
        { label: 'Sister', value: 'Sister' },
        { label: 'Others', value: 'Others' }
    ]);

    const handleValidated = () => {
        const mobileRegex = /^\d{10}$/;


        return (
            name1 !== '' &&
            value1 !== null &&
            mobileRegex.test(phone1) &&
            name2 !== '' &&
            value2 !== null &&
            mobileRegex.test(phone2) 
            || name3 !== '' &&
            value3 !== null &&
            mobileRegex.test(phone3) &&
            name4 !== '' &&
            value4 !== null &&
            mobileRegex.test(phone1) 
        )


    }

    // api calling
    const onClick = async () => {
        const userdata = await AsyncStorage.getItem("USER_DATA")
        const user_data = JSON.parse(userdata)

        const body = {
            user_id: user_data?.user_id,
            primary_reference_name: name1,
            primary_reference_relation: value1,
            primary_reference_phone: phone1,

            secondary_reference_name: name2,
            secondary_reference_relation: value2,
            secondary_reference_phone: phone2,

            third_reference_name: name3,
            third_reference_relation: value3,
            third_reference_phone: phone3,

            fourth_reference_name: name4,
            fourth_reference_relation: value4,
            fourth_reference_phone: phone4

        }
        console.log('Ref.js Screen: ', body)


        axios
            .post("https://instantmudra.com/admin/API/updateReference", body)
            .then(res => {
                console.log("Ref>>>>>>>>>>>>>>>>>>>", res)
                if (res?.data?.status === true) {
                    alert(res?.data?.msg)
                    props.navigation.replace('Document', {
                        aadharNumber: props?.route?.params?.aadharNumber,
                        panNumber: props?.route?.params?.panNumber,
                        aadharimgs:props?.route?.params?.aadharimgs
                    })
                }
            })
            .catch(err => {
                console.log("newUserDetails error", err?.message)
                alert(ERROR_MESSAGE)
            })
    }
    // api calling ebd



    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header
            //  navigation={props.navigation} 
            title={'Upload Reference'} />


            <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10, color: "#B53059" }}>Please Upload your 4 references</Text>
            {/* Name 1 */}
            <ScrollView>

                {/* reference >>>>>>>>1 */}
                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assests/file.png')}
                        />
                        <Text style={{ fontWeight: "bold", color: "#000", marginTop: -5 }}>Reference</Text>
                    </View>
                    <Text style={{ fontWeight: "bold", color: "#000", marginLeft: 35, marginTop: -16 }}>Name 1</Text>
                    <View>
                        <TextInput
                            style={[styles.textInput, { width: '48%' }]}
                            onChangeText={text => setName1(text)}
                            placeholder="Name 1"
                            value={name1}
                            placeholderTextColor={'#394867'}
                        />
                    </View>
                </View>
                {/* Name 2>>>>>>>>>>>>*/}

                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assests/file.png')}
                        />
                        <Text style={{ fontWeight: "bold", color: "#000", marginTop: 5 }}>Relation 1</Text>
                    </View>
                    <View style={{
                        width: "48%", alignSelf: "flex-end", marginRight: 15, marginTop: -35,
                    }}>
                        <DropDownPicker
                            open={open}
                            value={value1}
                            items={items1}
                            setOpen={setOpen}
                            setValue={setValue1}
                            setItems={setItems1}
                            placeholder={!isFocus ? 'Select Relation' : '...'}
                            onChange={item => {
                                setValue1(item.value1);
                                setIsFocus(false);
                            }}

                        />
                    </View>

                    {/* nmame 2222 */}
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../../assests/file.png')}
                            />
                            <Text style={{ fontWeight: "bold", color: "#000", marginTop: -5 }}>Reference</Text>
                        </View>
                        <Text style={{ fontWeight: "bold", color: "#000", marginLeft: 35, marginTop: -16 }}>Phone 1</Text>
                        <View>
                            <TextInput
                                style={[styles.textInput, { width: '48%' }]}
                                onChangeText={text => setPhone1(text)}
                                placeholder="Phone 1"
                                maxLength={10}
                                keyboardType='number-pad'
                                value={phone1}
                                placeholderTextColor={'#394867'}
                            />
                        </View>
                    </View>
                    {/* nmame 2222>>>>>>>>>>>>> */}

                </View>
                <View style={{ width: '100%', borderColor: '#000', borderWidth: 0.2, marginTop: 60, alignSelf: "center", opacity: 0.5 }}>
                </View>

                {/* references 1 end */}



                {/* references 2 start */}
                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assests/file.png')}
                        />
                        <Text style={{ fontWeight: "bold", color: "#000", marginTop: -5 }}>Reference</Text>
                    </View>
                    <Text style={{ fontWeight: "bold", color: "#000", marginLeft: 35, marginTop: -16 }}>Name 2</Text>
                    <View>
                        <TextInput
                            style={[styles.textInput, { width: '48%' }]}
                            onChangeText={text => setName2(text)}
                            placeholder="Name 2"
                            value={name2}
                            placeholderTextColor={'#394867'}
                        />
                    </View>
                </View>
                {/* Name 2>>>>>>>>>>>>*/}


                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assests/file.png')}
                        />
                        <Text style={{ fontWeight: "bold", color: "#000", marginTop: 5 }}>Relation 2</Text>
                    </View>
                    <View style={{
                        width: "48%", alignSelf: "flex-end", marginRight: 15, marginTop: -35,
                    }}>
                        <DropDownPicker
                            open={open2}
                            value={value2}
                            items={items2}
                            setOpen={setOpen2}
                            setValue={setValue2}
                            setItems={setItems2}
                            placeholder={!isFocus ? 'Select Relation' : '...'}
                            onChange={item => {
                                setValue2(item.value2);
                                setIsFocus(false);
                            }}

                        />
                    </View>

                    {/* nmame 2222 */}
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../../assests/file.png')}
                            />
                            <Text style={{ fontWeight: "bold", color: "#000", marginTop: -5 }}>Reference</Text>
                        </View>
                        <Text style={{ fontWeight: "bold", color: "#000", marginLeft: 35, marginTop: -16 }}>Phone 2</Text>
                        <View>
                            <TextInput
                                style={[styles.textInput, { width: '48%' }]}
                                onChangeText={text => setPhone2(text)}
                                placeholder="Phone 2"
                                keyboardType='number-pad'
                                maxLength={10}
                                value={phone2}
                                placeholderTextColor={'#394867'}
                            />
                        </View>
                    </View>
                    {/* nmame 2222>>>>>>>>>>>>> */}

                </View>
                <View style={{ width: '100%', borderColor: '#000', borderWidth: 0.2, marginTop: 60, alignSelf: "center", opacity: 0.5 }}>
                </View>
                {/* references 2 end>>>>>>>>>>>> */}


                {/* references 3>>>>>>>>>>strart */}
                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assests/file.png')}
                        />
                        <Text style={{ fontWeight: "bold", color: "#000", marginTop: -5 }}>Reference</Text>
                    </View>
                    <Text style={{ fontWeight: "bold", color: "#000", marginLeft: 35, marginTop: -16 }}>Name 3</Text>
                    <View>
                        <TextInput
                            style={[styles.textInput, { width: '48%' }]}
                            onChangeText={text => setName3(text)}
                            placeholder="Name 3"
                            value={name3}
                            placeholderTextColor={'#394867'}
                        />
                    </View>
                </View>
                {/* Name 2>>>>>>>>>>>>*/}


                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assests/file.png')}
                        />
                        <Text style={{ fontWeight: "bold", color: "#000", marginTop: 5 }}>Relation 3</Text>
                    </View>
                    <View style={{
                        width: "48%", alignSelf: "flex-end", marginRight: 15, marginTop: -35, 
                    }}>
                        <DropDownPicker
                            open={open3}
                            value={value3}
                            items={items3}
                            setOpen={setOpen3}
                            setValue={setValue3}
                            setItems={setItems3}
                            placeholder={!isFocus ? 'Select Relation' : '...'}
                            onChange={item => {
                                setValue3(item.value3);
                                setIsFocus(false);
                            }}


                        />
                    </View>

                    {/* nmame 2222 */}
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../../assests/file.png')}
                            />
                            <Text style={{ fontWeight: "bold", color: "#000", marginTop: -5 }}>Reference</Text>
                        </View>
                        <Text style={{ fontWeight: "bold", color: "#000", marginLeft: 35, marginTop: -16 }}>Phone 3</Text>
                        <View>
                            <TextInput
                                style={[styles.textInput, { width: '48%' }]}
                                onChangeText={text => setPhone3(text)}
                                placeholder="Phone 3"
                                maxLength={10}
                                keyboardType='number-pad'
                                value={phone3}
                                placeholderTextColor={'#394867'}
                            />
                        </View>
                    </View>
                    {/* nmame 2222>>>>>>>>>>>>> */}
                    <View style={{ width: '100%', borderColor: '#000', borderWidth: 0.2, marginTop: 60, alignSelf: "center", opacity: 0.5 }}>
                    </View>
                    {/* references 3>>>>>>>>>>end */}










                    {/* last referencess */}

                    {/* nmame 2222>>>>>>>>>>>>> */}

                </View>

                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assests/file.png')}
                        />
                        <Text style={{ fontWeight: "bold", color: "#000", marginTop: -5 }}>Reference</Text>
                    </View>
                    <Text style={{ fontWeight: "bold", color: "#000", marginLeft: 35, marginTop: -16 }}>Name 4</Text>
                    <View>
                        <TextInput
                            style={[styles.textInput, { width: '48%' }]}
                            onChangeText={text => setName4(text)}
                            placeholder="Name 4"
                            value={name4}
                            placeholderTextColor={'#394867'}
                        />
                    </View>
                </View>
                {/* Name 2>>>>>>>>>>>>*/}


                <View style={{ marginLeft: 10, marginTop: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../../assests/file.png')}
                        />
                        <Text style={{ fontWeight: "bold", color: "#000", marginTop: 5 }}>Relation 4</Text>
                    </View>
                    <View style={{
                        width: "48%", alignSelf: "flex-end", marginRight: 15, marginTop: -35,
                    }}>
                        <DropDownPicker
                            open={open4}
                            value={value4}
                            items={items4}
                            setOpen={setOpen4}
                            setValue={setValue4}
                            setItems={setItems4}
                            placeholder={!isFocus ? 'Select Relation' : '...'}
                            onChange={item => {
                                setValue4(item.value4);
                                setIsFocus(false);
                            }}

                        />
                    </View>

                    {/* nmame 2222 */}
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../../assests/file.png')}
                            />
                            <Text style={{ fontWeight: "bold", color: "#000", marginTop: -5 }}>Reference</Text>
                        </View>
                        <Text style={{ fontWeight: "bold", color: "#000", marginLeft: 35, marginTop: -16 }}>Phone 4</Text>
                        <View>
                            <TextInput
                                style={[styles.textInput, { width: '48%' }]}
                                onChangeText={text => setPhone4(text)}
                                placeholder="Phone 4"
                                value={phone4}
                                keyboardType='number-pad'
                                maxLength={10}
                                placeholderTextColor={'#394867'}
                            />
                        </View>
                    </View>
                    {/* nmame 2222>>>>>>>>>>>>> */}
                    <View style={{ width: '100%', borderColor: '#000', borderWidth: 0.2, marginTop: 20, alignSelf: "center", opacity: 0.5 }}>
                    </View>
                    {/* last referencess   end >>>>>>>>>*/}


                    {/* buttom */}



                    {/* buttom >>>>>>>>> */}
                    {handleValidated() ?
                        <LinearButton
                            title={'Upload And Save'}
                            onPress={() => onClick()}
                            width={170}
                            customStyle={{ alignSelf: 'center', marginTop: 40 }}
                        />
                        :
                        <LoginButton
                            title={'Upload And Save'}
                            onPress={() => { }}
                            style={{ alignSelf: 'center', marginTop: 40 }}
                        />
                    }


                </View>

            </ScrollView>
        </View>
    )
}

export default Ref;

const styles = StyleSheet.create({


    tinyLogo: {
        height: 30,
        width: 30,

    },
    textInput: {
        height: 50,
        width: "100%",
        borderColor: "grey",
        borderRadius: 6,
        borderWidth: 1,
        paddingHorizontal: 16,
        marginTop: -35,
        alignSelf: 'flex-end',
        marginRight: 15,
        color:'#000'
    }

});



