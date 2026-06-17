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


const Aadhar = (props) => {
    const [isModalVisiblebeneficial, setModalVisiblebeneficial] = useState(false);
    const [isModalVisiblebeneficialback, setModalVisiblebeneficialback] = useState(false);
    const [image, setImage] = useState('https://www.nicepng.com/png/detail/129-1298352_upload-icon-logo-upload-file-png.png');
    const [image1, setImage1] = useState('https://www.nicepng.com/png/detail/129-1298352_upload-icon-logo-upload-file-png.png');
    const [aadharno, setAadharno] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [send, setSend] = useState('');
    const [send1, setSend1] = useState('');
    const [resdata, setResdata] = useState('');
    const isFocused = useIsFocused();
    const [data, setData] = useState(null);
    const [showLoader, setShowLoader] = useState(false);



    //console.log('aadhar data>>>>', send)
    const handleValidation = () => {
       // const mobileRegex = /^\d{10}$/;
    
       return(
           image !== 'https://www.nicepng.com/png/detail/129-1298352_upload-icon-logo-upload-file-png.png' && image1 !== 'https://www.nicepng.com/png/detail/129-1298352_upload-icon-logo-upload-file-png.png'
       )
      }


    const takePhotoFromCamera = () => {
        launch({
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

    // aadhar back images>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const takePhotoBack = () => {
        launchCamera({
           
            includeBase64: true,
        }).then(image1 => {
            setImage1(image1.path);
            setSend1(`data:${image1.mime};base64,${image1.data}`)
            // props.navigation.navigate('PersonalInformationAadhar', {
            //     item: send
            // })
            setModalVisiblebeneficialback(!isModalVisiblebeneficialback)
            // updateAadhar();


        });
    };

    const choosePhotoBack = () => {
        launchCamera({
            includeBase64: true
        }).then(image1 => {
            setSend1(`data:${image1.mime};base64,${image1.data}`)
            setImage1(image1.path);
            // props.navigation.navigate('PersonalInformationAadhar', {
            //     item: send
            // })
            // updateAadhar();
            setModalVisiblebeneficialback(!isModalVisiblebeneficialback)

        });
    };
    return (
        <>
            <View style={{ flex: 1, }}>
                <Header navigation={props.navigation} title={'Aadhar Verifications'} />

                <ScrollView>

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
                    {/* Modal part start for back //////////////////////////////*/}
                    <View>
                        <Modal isVisible={isModalVisiblebeneficialback}
                            animationType="slide"
                        >

                            <View style={{ width: '75%', height: 170, backgroundColor: "#fff", alignSelf: "center", borderRadius: 10, padding: 15 }}>
                                <TouchableOpacity onPress={takePhotoBack}>
                                    <View style={styles.camroot}>
                                        <Image source={require('../../assests/cam.png')}
                                            style={styles.img}

                                        />
                                        <Text style={{ alignSelf: "center", marginLeft: 10, color: "#fff" }}>Upload From Camera</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={choosePhotoBack}>

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
                    <View>
                        <Text style={{ alignSelf: "center", fontSize: 25, fontWeight: "500", marginTop: 70 }}>Upload Aadhar Front</Text>
                    </View>
                    <View>

                   
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
                    {/* aadhar back */}





                    
                    <View>
                        <Text style={{ alignSelf: "center", fontSize: 25, fontWeight: "500",}}>Upload Aadhar Back</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisiblebeneficialback(!isModalVisiblebeneficialback)}>
                        <View>
                            <Image
                                source={{
                                    uri: image1,
                                }}
                                style={styles.imgaadhar}
                            />

                        </View>
                    </TouchableOpacity>
                    </View>
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
                                        marginTop: 200,
                                        alignSelf: 'center'

                                    }}>
                                    <ActivityIndicator color={'white'} size={'large'} />
                                </View>
                            </View>
                        )
                    }

{
              handleValidation() ?
                <LinearButton title={'Confirm'}
                  width={150} 
                  customStyle= {{alignSelf: "flex-start", marginTop:40, alignSelf:'center'}}
                  onPress= {()=>props.navigation.navigate("PersonalInformationAadhar",
                   { 
                       item: send,
                       back:send1
                    })}
                />
              :
                <LoginButton title={'Confirm'} 
                  style={{marginTop: 40, alignSelf:"center"}} 
                />
            }
                    {/* <TouchableOpacity onPress={() => props.navigation.navigate('PersonalInformationAadhar', {
                        item: send
                    })} >
                    <View style={{ width: 160, height: 50, backgroundColor: "#DC2430", justifyContent: 'center', borderRadius: 10, alignSelf: "center" }}>
                    <Text style={{ alignSelf: "center", color: '#fff', fontSize: 18, fontWeight: "bold", }}>CONTINUE</Text>

                    </View>
                    </TouchableOpacity> */}
        </ScrollView>
            </View >

        </>
    )
}

export default Aadhar;

const styles = StyleSheet.create({
    imgaadhar: {
        width: "40%",
        height: 100,
        alignSelf: "center",
        margin: 50,
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
    }


})
