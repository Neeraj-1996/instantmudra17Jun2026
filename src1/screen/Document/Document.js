import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,

  Alert,
  Platform
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header/Header';
import LoginButton from '../../components/LoginButton/LoginButton';
import LinearButton from '../../components/LinearButton/LinearButton';
// import ImagePicker from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import Loader from '../../components/Loader/Loader';
import axios from 'axios';
import { API_BASE_URL, ERROR_MESSAGE } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Document = props => {
  const [showLoader, setShowLoader] = useState(false);
  const [selfieImage, setSelfieImage] = useState('');
  const [employeeIdImage, setEmployeeIdImage] = useState('');
  const [panImage, setPanImage] = useState('');
  const [aadharFrontImage, setAadharFrontImage] = useState('');
  const [aadharBackImage, setAadharBackImage] = useState('');
  const [showPopup, setShowPopup] = useState(false)
  const [documentType, setDocumentType] = useState('')
  const [data, setData] = useState('')

  const [progress, setProgress] = useState(0);

  const requestPermission = from => {
    request(PERMISSIONS.IOS.CAMERA).then(result => {
      if (result === 'granted') openCameraNew(from);
    });
  };

  // console.log("selfieImage on Select:", selfieImage)
  // console.log("panImage on Select:", panImage)
  const handleValidated = () => {
    return  panImage !== undefined && employeeIdImage !== '' && aadharFrontImage !== '' && aadharBackImage !==''
  }
  // useEffect(async () => {
  // //  const datas = props?.route?.params?.aadhar
  // //  console.log('images',datas)
  // const img = await AsyncStorage.getItem('aadhatimg');
  // setAadharFrontImage(img)
  useEffect(() => {
    gettwoimg()
  }, [])

 ;

  const gettwoimg = async () => {
    const userIdZ = await AsyncStorage.getItem('userIdZ');
    setShowLoader(true)
    const body = {
      user_id: userIdZ
    }

    console.log('Document.js', body)

    axios
      .post('https://instantmudra.com/admin/API/getUserDocuments', body)
      .then(res => {
        console.log('Document.js data', res?.data)

        if (res?.data?.status == true) {
          setShowLoader(false)
          setData(res?.data)
        }

      })
      .catch(error => {
        console.log('Document.js getUserDocuments', error);
        alert('We are facing some techical issue. please try after sometime')
      });
  }

  const openImageLibrary = (from) => {
    const options = {
      mediaType: 'photo',
      quality: 0.4, // Adjust quality (0.0 = lowest, 1.0 = highest)
    };
  
    launchImageLibrary(options).then((images) => {
      const image = images?.assets?.[0];
      if (!image) return;
  
      if (documentType === 'Selfie') {
        setSelfieImage(image);
      } else if (documentType === 'employeeIdCard') {
        setEmployeeIdImage(image);
      } else if (documentType === 'AadharFront') {
        setAadharFrontImage(image);
      } else if (documentType === 'AadharBack') {
        setAadharBackImage(image);
      } else if (documentType === 'Pan') {
        setPanImage(image);
      } else if (documentType === 'Passport') {
        setEmployeeIdImage(image);
      }
  
      setShowPopup(false);
    });
  };
  




  const openCameraNew = (from) => {
    const cameraType = documentType === 'Selfie' ? 'front' : 'back';

    launchCamera({
      quality: 0.4,
      cameraType: cameraType,
    }).then(images => {
      const image = images?.assets[0];
      if (documentType === 'Selfie') {
        setSelfieImage(image);
      } else if (documentType === 'employeeIdCard') {
        setEmployeeIdImage(image);
      } else if (documentType === 'AadharFront') {
        setAadharFrontImage(image);
      } else if (documentType === 'AadharBack') {
        setAadharBackImage(image);
      } else if (documentType === 'Pan') {
        setPanImage(image);
      } else if (documentType === 'Passport') {
        setEmployeeIdImage(image);
      }
      setShowPopup(false);
    }).catch((error)=>{
      console.log(error)
    })
  };



  const showSelectionPopup = () => (
    <TouchableOpacity
      onPress={() => setShowPopup(false)}
      style={{
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.73)',
        zIndex: 10,
        height: '100%',
        width: '100%',
      }}>
      <View
        style={{
          height: 150,
          width: 300,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignSelf: 'center'
        }}>

        <TouchableOpacity
          onPress={openCameraNew}
          style={{
            height: 40,
            width: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#39A7FF",
            borderRadius: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
          }}>
          <Text style={{ fontWeight: '500', fontSize: 19, color: '#000000' }}>Open Camera</Text>
        </TouchableOpacity>
        {/* <View style={{ height: 1, width: '100%', backgroundColor: 'grey' }} /> */}
        {documentType !== 'Selfie' && <TouchableOpacity
          onPress={openImageLibrary}
          style={{
            height: 40,
            width: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#ffa17d",
            borderRadius: 30,
            marginTop: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,

            elevation: 11,
          }}>
          <Text style={{ fontWeight: '400', fontSize: 16, color: '#000000' }}>Open Image Library</Text>
        </TouchableOpacity>}
        
      </View>
    </TouchableOpacity>
  );

  const uploadUserDocuments = async () => {
  try {
    setShowLoader(true);

    const userIdZ = await AsyncStorage.getItem('userIdZ');
    if (!userIdZ) throw new Error("User ID is missing");

    const formData = new FormData();

    // Utility to fix file uri format for Android
    const getUri = (uri) => {
      return Platform.OS === 'android' ? uri : uri.replace('file://', '');
    };

    // Validate required files
    if (!employeeIdImage || !employeeIdImage.uri) throw new Error("Employer ID image missing");
    formData.append("user_id", userIdZ);
    formData.append("employer_id_card", {
      name: employeeIdImage.fileName || 'employer_id.jpg',
      type: employeeIdImage.type || 'image/jpeg',
      uri: getUri(employeeIdImage.uri),
    });

    if (
      aadharFrontImage?.uri &&
      aadharBackImage?.uri &&
      panImage?.uri
    ) {
      formData.append("aadhar_front", {
        name: aadharFrontImage.fileName || 'aadhar_front.jpg',
        type: aadharFrontImage.type || 'image/jpeg',
        uri: getUri(aadharFrontImage.uri),
      });

      formData.append("aadhar_back", {
        name: aadharBackImage.fileName || 'aadhar_back.jpg',
        type: aadharBackImage.type || 'image/jpeg',
        uri: getUri(aadharBackImage.uri),
      });

      formData.append("pan_card_photo", {
        name: panImage.fileName || 'pan_card.jpg',
        type: panImage.type || 'image/jpeg',
        uri: getUri(panImage.uri),
      });
    }

    // Optional selfie (uncomment if needed)
    // if (selfieImage?.uri) {
    //   formData.append("profile_pic", {
    //     name: selfieImage.fileName || 'selfie.jpg',
    //     type: selfieImage.type || 'image/jpeg',
    //     uri: getUri(selfieImage.uri),
    //   });
    // }

    console.log("Uploading documents...");

    const response = await axios.post(
      "https://instantmudra.com/admin/API/uploadNewUserFiles_one",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      }
    );

    console.log("Upload response:", response.data);

    if (response.status === 200 && response.data.status === true) {
      props.navigation.navigate("SalariesWorkDetails", { from: "Document" });
    } else {
      alert(response.data?.msg || "Upload failed. Please try again.");
    }
  } catch (err) {
    console.log("Upload error:", err);
    alert("We are facing some technical issue. Team is looking into it Document.");
  } finally {
    setShowLoader(false);
  }
};
  // const uploadUserDocuments = async () => {
  //   setShowLoader(true)
  //   const formData = new FormData();

  //   //const userData = await AsyncStorage.getItem('USER_DATA');
  //   const userIdZ = await AsyncStorage.getItem('userIdZ');

  //   // const user_data = JSON.parse(userData)

  //   formData.append("user_id", userIdZ)
  //   formData.append("employer_id_card", {
  //     name: employeeIdImage?.fileName,
  //     type: employeeIdImage?.type,
  //     uri: employeeIdImage?.uri,
  //   })

  //   //alert(aadharFrontImage?.uri);
  //   if (aadharFrontImage?.uri !== undefined && aadharBackImage?.uri !== undefined && panImage?.uri !== undefined) {
  //     formData.append("aadhar_front", {
  //       name: aadharFrontImage?.fileName,
  //       type: aadharFrontImage?.type,
  //       uri: aadharFrontImage?.uri,
  //     })

  //     formData.append("aadhar_back", {
  //       name: aadharBackImage?.fileName,
  //       type: aadharBackImage?.type,
  //       uri: aadharBackImage?.uri,
  //     })

  //     formData.append("pan_card_photo", {
  //       name: panImage?.fileName,
  //       type: panImage?.type,
  //       uri: panImage?.uri,
  //     })

  //   }


  //   // formData.append("profile_pic", {
  //   //   name: selfieImage?.fileName,
  //   //   type: selfieImage?.type,
  //   //   uri: selfieImage?.uri,
  //   // })

  //   console.log("🚀 ~ Rahul kUMAR YADAVZ >>>>>>>>>>>>.~ line 268 ~ uploadUserDocuments ~ formData", JSON.stringify(formData))

  //   axios
  //     .post("https://instantmudra.com/admin/API/uploadNewUserFiles_one", formData, {
  //       onUploadProgress: (progressEvent) => {
  //         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //         setProgress(percentCompleted);
  //       },
  //     })
  //     .then(res => {
  //       console.log("Document.js uploadUserDocuments response", res)
  //       if (res.status === 200 && res.data.status === true) {
  //         props.navigation.navigate("SalariesWorkDetails", { from: "Document" })
  //         setShowLoader(false)
  //       }
  //     })
  //     .catch(err => {
  //       setShowLoader(false)
  //       alert(err)
  //       alert('We are facing some techical issue. Team is looking into it Document.')
  //     })
  // }

  return (
    <View style={styles.container}>

      {showPopup && showSelectionPopup()}
      {/* <Loader showLoader={showLoader} /> */}
      <Header hideLeftHeader={true} navigation={props.navigation} title="Document" />
      <ScrollView style={{ paddingVertical: 20 }}>
        {/* <Text style={[styles.fieldName, { color: '#000' }]}>Upload Profile Images</Text> */}
        {/* {selfieImage !== '' ? (
          <View style={[styles.field, { backgroundColor: '#E3E5E5' }]}>
            <Image
              style={{ height: 90, width: 100, }}
              source={{ uri: selfieImage?.uri }}
            />
            <TouchableOpacity
              onPress={() => setSelfieImage('')}
              style={{ position: 'absolute', right: -8, top: -8 , backgroundColor:'#ff6552', borderRadius:50, padding:2}}>
              <Image style= {styles.redCross} source={require('../../assests/Trash.png')} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setShowPopup(true)
              setDocumentType('Selfie')
            }}
            style={styles.field}>
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../../assests/camera.png')}
            />
            <Text style={styles.text}>Upload</Text>
          </TouchableOpacity>
        )} */}
        <Text style={[styles.fieldName, { marginTop: 12, color: '#000' }]}>
          Employee ID Card
        </Text>
        {employeeIdImage !== '' ? (
          <View style={[styles.field, { backgroundColor: '#E3E5E5' }]}>
            <Image
              style={{ height: 90, width: 100 }}
              source={{ uri: employeeIdImage?.uri }}
            />
            <TouchableOpacity
              onPress={() => setEmployeeIdImage('')}
              style={{ position: 'absolute', right: -10, top: -10 , backgroundColor:'#ff6552', borderRadius:50, padding:2}}>
              <Image source={require('../../assests/Trash.png')} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setShowPopup(true)
              setDocumentType('employeeIdCard')
            }}
            style={styles.field}>
            <Image
              style={{ height: 30, width: 30 }}
              source={require('../../assests/camera.png')}
            />
            <Text style={[styles.text, { color: '#000' }]}>Upload</Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.fieldName, { marginTop: 12, color: '#000' }]}>PAN Card Number ({props.route?.params?.panNumber})</Text>


        {panImage !== '' ? (
          <View style={[styles.field, { backgroundColor: '#E3E5E5' }]}>

            <Image style={{ height: 90, width: 100 }} source={{ uri: panImage?.uri }} />
            <TouchableOpacity
              onPress={() => setPanImage('')}
              style={{ position: 'absolute', top: -8, right: -8 , backgroundColor:'#ff6552', borderRadius:50, padding:2}}>
              <Image style= {styles.redCross}  source={require('../../assests/Trash.png')} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setShowPopup(true)
              setDocumentType('Pan')
            }}
            style={styles.field}>
            <Image
              style={{ height: 30, width: 30, }}
              source={require('../../assests/camera.png')}
            />
            <Text style={[styles.text, { color: '#000' }]}>Upload</Text>
          </TouchableOpacity>
        )}

        {/* <TextInput
          style={{
            height: 40,
            borderColor: '#E5E5E5',
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            marginTop: 16,
            marginHorizontal: 20
          }}
          value={panCardNumber}
          placeholder="Enter Your PAN Card Number"
          onChangeT
          ext={(text) => setPanCardNumber(text)}
          /> */}

        {
          showLoader && (
            <View
              style={{

                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center',

              }}>
              <View
                style={{
                  height: 200,
                  width: 200,
                  backgroundColor: "#FF90BC",
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 200,
                  alignSelf: 'center',
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.39,
                  shadowRadius: 8.30,

                  elevation: 13,
                }}>
                <ActivityIndicator color={'white'} size={'large'} />
                <Text style={{ color: '#000' }}>Uploading ... {progress}%</Text>
              </View>
            </View>
          )
        }


        <Text style={[styles.fieldName, { marginTop: 12, color: '#000' }]}>
          Aadhar Card Number  ({props.route?.params?.aadharNumber})
        </Text>
        <View
          style={{
            flexDirection: 'row',
            height: 90,
            marginTop: 12,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 8,
            marginHorizontal: 20
            // backgroundColor:"blue"
          }}>
          {/* {aadharFrontImage !== '' || data?.data?.aadhar_front !== null ?  ( */}
          {aadharFrontImage !== '' ? (
            <View
              style={{
                height: '100%',
                width: '48%',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#E3E5E5',
                // marginLeft: 13,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E3E5E5'
              }}>
              <Image
                style={{ height: 90, width: 100 }}
                source={{ uri: aadharFrontImage?.uri }}
              />
              <TouchableOpacity
                onPress={() => setAadharFrontImage('')}
                style={{ position: 'absolute', right: -10, top: -10 , backgroundColor:'#ff6552', borderRadius:50, padding:2}}>
                <Image style= {styles.redCross}  source={require('../../assests/Trash.png')} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                height: '100%',
                width: '48%',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#E3E5E5',
                // marginLeft: 13,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setShowPopup(true)
                setDocumentType('AadharFront')
              }}
            >
              <Image
                style={{ height: 30, width: 30 }}
                source={require('../../assests/camera.png')}
              />
              <Text style={[styles.text, { color: '#000' }]}>Upload (Front)</Text>
            </TouchableOpacity>
          )}

          {aadharBackImage !== '' ? (
            <View
              style={{
                height: '100%',
                width: '48%',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#E3E5E5',
                // marginLeft: 13,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E3E5E5'
              }}>
              <Image
                style={{ height: 90, width: 100 }}
                source={{
                  uri: aadharBackImage?.uri
                }}
              />
              <TouchableOpacity
                onPress={() => setAadharBackImage('')}
                style={{ position: 'absolute', right: -10, top: -10,backgroundColor:'#ff6552', borderRadius:50, padding:2 }}>
                <Image style= {styles.redCross}  source={require('../../assests/Trash.png')} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                height: '100%',
                width: '48%',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#E3E5E5',
                marginLeft: 13,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setShowPopup(true)
                setDocumentType('AadharBack')
              }}
            >
              <Image
                style={{ height: 30, width: 30 }}
                source={require('../../assests/camera.png')}
              />
              <Text style={[styles.text, { color: '#000' }]}>Upload (Back)</Text>
            </TouchableOpacity>
          )}
        </View>
        {handleValidated() ?
          <LinearButton
            title={'Upload And Save'}
            onPress={() => uploadUserDocuments()}
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

        <View style={{ width: '100%', height: 50 }}></View>
      </ScrollView>

    </View>
  );
};
export default Document;
