import { bgCyan } from 'chalk';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import Header from '../../components/Header/Header';
import Modal from "react-native-modal";
// import ImagePicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import LinearButton from '../../components/LinearButton/LinearButton';
import LoginButton from '../../components/LoginButton/LoginButton';



const Pan = (props) => {

    const [showLoader, setShowLoader] = useState(false)
    const [image, setImage] = useState('https://www.nicepng.com/png/detail/129-1298352_upload-icon-logo-upload-file-png.png');
    const [send, setSend] = useState('');
    const [isModalVisiblebeneficial, setModalVisiblebeneficial] = useState(false);

    // hooks>>>>>>>>
    const [pan, setPan] = useState('')

    const handleValidation = () => {
        // const mobileRegex = /^\d{10}$/;

        return (
            pan !== '' && image !== 'https://www.nicepng.com/png/detail/129-1298352_upload-icon-logo-upload-file-png.png'
        )
    }
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',send)
    // hooks>>>>>>>>

// IMAGE PICKER ADD >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const takePhotoFromCamera = () => {
    launchCamera({
        includeBase64: true,
     
    }).then(image => {
        setImage(image.path);
        setSend(`data:${image.mime};base64,${image.data}`)
        // props.navigation.navigate('PersonalInformationAadhar', {
        //     item: send
        // })
        setModalVisiblebeneficial(!isModalVisiblebeneficial)
        // updateAadhar();


    });
};

const choosePhotoFromLibrary = () => {
    launchCamera({
        includeBase64: true
    }).then(image => {
        setSend(`data:${image.mime};base64,${image.data}`)
        setImage(image.path);
        // props.navigation.navigate('PersonalInformationAadhar', {
        //     item: send
        // })
        // updateAadhar();
        setModalVisiblebeneficial(!isModalVisiblebeneficial)

    });
};
// IMAGE PICKER ADD >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return (
        <>
            <View style={{ flex: 1, }}>
                    {/* Modal part start for Beneficial //////////////////////////////*/}
                    <View>
                        <Modal isVisible={isModalVisiblebeneficial}
                            animationType="slide"
                        >

                            <View style={{ width: '75%', height: 170, backgroundColor: "#fff", alignSelf: "center", borderRadius: 10, padding: 15 }}>
                                <TouchableOpacity onPress={takePhotoFromCamera}>
                                    <View style={styles.camroot}>
                                        <Image source={require('../../assests/cam.png')}
                                            style={styles.img}

                                        />
                                        <Text style={{ alignSelf: "center", marginLeft: 10, color: "#fff" }}>Upload From Camera</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={choosePhotoFromLibrary}>

                                    <View style={styles.camroot}>
                                        <Image source={require('../../assests/gallery.png')}
                                            style={styles.img}

                                        />
                                        <Text style={{ alignSelf: "center", marginLeft: 10, color: "#fff" }}>Upload From Gallery</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </Modal>
                    </View>
                    {/*  modal  end for Beneficial ////////////////////////////////// */}
                <Header navigation={props.navigation} title={'Pan Verifications'} />

                <ScrollView>

                    <View>
                        <View>
                            <Text style={{ fontSize: 25, fontWeight: "600", marginTop: 10, padding: 20, alignSelf: "center" }}>Enter Pan Number</Text>
                        </View>
                        <View style={{ width: '60%', borderWidth: 1, borderColor: "#000", alignSelf: "center", borderRadius: 10, backgroundColor: "#fff" }}>
                            <TextInput
                                onChangeText={setPan}
                                value={pan}
                                maxLength={10}
                                autoCapitalize="characters"
                                placeholder="Enter Pan No."

                                defaultValue={pan}
                                style={{ width: '50%', height: 50, marginLeft: 20, color: '#000', fontWeight: "bold", fontSize: 18 }}
                            />
                        </View>


                        {/* pan image startr */}
                        <View>
                            <Text style={{ alignSelf: "center", fontSize: 25, fontWeight: "500", marginTop: 70 }}>Upload Pan Images</Text>
                        </View>


                        <TouchableOpacity onPress={() => setModalVisiblebeneficial(!isModalVisiblebeneficial)}>
                        <View>

                            <Image
                                source={{
                                    uri: image,
                                }}
                                style={styles.imgaadhar}
                            />
                        </View>
                        </TouchableOpacity>
                        {/* pan image startr  end */}



                        {
                            handleValidation() ?
                                <LinearButton title={'Confirm'}
                                    width={150}
                                    customStyle={{ alignSelf: "flex-start", marginTop: 40, alignSelf: 'center' }}
                                    onPress={() => props.navigation.navigate("PersonalInformationPan",
                                        {
                                            datapan : pan,
                                            ImgPan : send

                                        })}
                                />
                                :
                                <LoginButton title={'Confirm'}
                                    style={{ marginTop: 40, alignSelf: "center" }}
                                />
                        }


                        {/* 
                        <TouchableOpacity onPress={() =>  props.navigation.navigate("PersonalInformationPan", {
                            datapan : pan
                        })}>

                   

                            <View style={{ width: '80%', height: 50, backgroundColor: "#B53059", justifyContent: "center", alignSelf: "center", marginTop: 40, elevation: 4 }}>
                                <Text style={{ alignSelf: "center", fontSize: 18, color: "#FFF", fontWeight: 'bold' }}>CONTINUE</Text>
                            </View>
                        </TouchableOpacity> */}

                    </View>

                    {/* aadhar data  */}
                    <ScrollView>

                    </ScrollView>

                    {/* aadhar data end>>>>>>>>>>  */}
                </ScrollView>


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
                                    marginTop: 300,
                                    alignSelf: 'center'

                                }}>
                                <ActivityIndicator color={'white'} size={'large'} />
                            </View>
                        </View>
                    )
                }

            </View>

        </>
    )
}

export default Pan;

const styles = StyleSheet.create({
    imgaadhar: {
        width: "80%",
        height: 180,
        alignSelf: "center",
        margin: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
    },
    camroot: {
        width: 200,
        height: 50,
        backgroundColor: "#7B4397",
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10
    },
    img: {
        width: 25,
        height: 25,
        alignSelf: "center",
        tintColor: "#fff"
    },
    imgaadhar: {
        width: "40%",
        height: 100,
        alignSelf: "center",
        margin: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
    },


})
