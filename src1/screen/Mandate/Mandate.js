import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform
} from 'react-native';

import styles from './styles';
import Header from '../../components/Header/Header';
import LinearButton from '../../components/LinearButton/LinearButton';
// import DocumentPicker from 'react-native-document-picker';
import { pick } from '@react-native-documents/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera,launchImageLibrary } from 'react-native-image-picker';
import { API_BASE_URL} from '../../utils';

let count = 0;

const Mandate = props => {
  const [SalarySlipFirst, setSalarySlipFirst] = useState({});
  const [SalarySlipSecond, setSalarySlipSecond] = useState({});
  const [SalarySlipThird, setSalarySlipThird] = useState({});
  const [AccountStatement, setAccountStatement] = useState({});
  const [statementPin, setStatementPin] = useState('');
  const [salaryPin, setSalaryPin] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [Progress, setProgress] = useState(0);
  const [documentType, setDocumentType] = useState('')
  const [showPopup, setShowPopup] = useState(false)
    const [selfieImage, setSelfieImage] = useState('');

  // console.log("AccountStatement at Mandate", AccountStatement)

  // const setDocument = async from => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.pdf],
  //     });
  //     const selectedPDF = res?.[0] ?? {};
     
  //     if (selectedPDF.name) {
  //       selectedPDF.name = selectedPDF.name.replace(/'/g, '');
  //     }
  //     console.log("selectedPDF",selectedPDF);
  //     if (from === 'SalarySlipFirst') {
  //       setSalarySlipFirst(selectedPDF);
  //     } else if (from === 'SalarySlipSecond') {
  //       setSalarySlipSecond(selectedPDF);
  //     } else if (from === 'SalarySlipThird') {
  //       setSalarySlipThird(selectedPDF);
  //     } else if (from === 'AccountStatement') {
  //       setAccountStatement(selectedPDF);
  //     }
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else {
  //       throw err;
  //     }
  //   }
  // };

//   const setDocument = async (from) => {
//   try {
//     const [pickResult] = await pick({ type: 'application/pdf' });

//   if (pickResult?.name) {
//   pickResult.name = pickResult.name
//     .replace(/'/g, '')  // remove single quotes
//     .replace(/\s+/g, ''); // remove spaces
// }


//     console.log("Picked File:", pickResult);

//     if (from === 'SalarySlipFirst') {
//       setSalarySlipFirst(pickResult);
//     } else if (from === 'SalarySlipSecond') {
//       setSalarySlipSecond(pickResult);
//     } else if (from === 'SalarySlipThird') {
//       setSalarySlipThird(pickResult);
//     } else if (from === 'AccountStatement') {
//       setAccountStatement(pickResult);
//     }
//   } catch (err) {
//     console.log("Document Picker Error:", err);
//     // handle cancel or error
//   }
// };

const setDocument = async (from) => {
  try {
    const [pickResult] = await pick({ type: 'application/pdf' });

    if (pickResult) {
      // Generate unique file name
      const uniqueName =
        Date.now().toString() +
        Math.floor(Math.random() * 1e18).toString() + ".pdf";

      // Replace the original name
      pickResult.name = uniqueName;

      console.log("Picked File (renamed):", pickResult);

      if (from === 'SalarySlipFirst') {
        setSalarySlipFirst(pickResult);
      } else if (from === 'SalarySlipSecond') {
        setSalarySlipSecond(pickResult);
      } else if (from === 'SalarySlipThird') {
        setSalarySlipThird(pickResult);
      } else if (from === 'AccountStatement') {
        setAccountStatement(pickResult);
      }
    }
  } catch (err) {
    console.log("Document Picker Error:", err);
    // handle cancel or error
  }
};


const getUri = (uri) => {
  if (Platform.OS === 'android') return uri;
  return uri.replace('file://', '');
};

  // const getNameFromPath = path => {
  //   console.log("🚀 ~ file: SalariesWorkDetails.js ~ line 160 ~ pathpathpath", path)
  //   // return ''
  //   return path?.split('/')?.splice(-1)?.[0];
  // };
  const applyLoan = async () => {
  setShowLoader(true);

  const userData = await AsyncStorage.getItem('USER_DATA');
  const user_data = JSON.parse(userData);

  // Early check for required fields
  if (
    !props.route?.params?.LoanAmount ||
    !user_data?.user_id ||
    !AccountStatement?.uri ||
    !SalarySlipFirst?.uri ||
    !SalarySlipSecond?.uri ||
    !SalarySlipThird?.uri ||
    !selfieImage?.uri
  ) {
    setShowLoader(false);
    alert("All fields are mandatory!");
    return;
  }

  const formData = new FormData();
  formData.append("processing_fee", 450);
  formData.append("total_interest", 200);
  formData.append("loan_amount", props.route?.params?.LoanAmount);
  formData.append("user_id", user_data.user_id);
  formData.append("bank_statement_pin", statementPin);
  formData.append("salary_slip_pin", salaryPin);
  formData.append("disbursed_amount", props.route?.params?.LoanAmount);

  formData.append("bank_statement", {
    name: AccountStatement.name,
    type: AccountStatement.type,
    uri: getUri(AccountStatement.uri),
  });

  formData.append("salary_slip1", {
    name: SalarySlipFirst.name,
    type: SalarySlipFirst.type,
    uri: getUri(SalarySlipFirst.uri),
  });
  formData.append("salary_slip2", {
    name: SalarySlipSecond.name,
    type: SalarySlipSecond.type,
    uri: getUri(SalarySlipSecond.uri),
  });
  formData.append("salary_slip3", {
    name: SalarySlipThird.name,
    type: SalarySlipThird.type,
    uri: getUri(SalarySlipThird.uri),
  });

  formData.append("profile_pic1", {
    name: selfieImage.fileName || 'selfie.jpg',
    type: selfieImage.type || 'image/jpeg',
    uri: getUri(selfieImage.uri),
  });

  axios
    .post(API_BASE_URL + "do_apply_loan", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    })
    .then((res) => {
      console.log("applyLoan response", res);
      setShowLoader(false);
      if (res.status === 200 && res.data?.status === true) {
        props.navigation.navigate("ThankyouScreen", {
          referenceNumber: res.data.data,
        });
      } else {
        alert(res.data?.msg || "Something went wrong");
      }
    })
    .catch((err) => {
      console.log("applyLoan error", err);
      alert("Something went wrong: " + err.message);
      setShowLoader(false);
    });
};


//   const applyLoan = async () => {
//     setShowLoader(true)

//     const userData = await AsyncStorage.getItem('USER_DATA');
//     const user_data = JSON.parse(userData);
//     const formData = new FormData();
//     formData.append("processing_fee", 450);
//     formData.append("total_interest", 200);
//     formData.append("loan_amount", props.route?.params?.LoanAmount);
//     formData.append("user_id", user_data?.user_id);

//     formData.append("bank_statement_pin", statementPin); 
//     formData.append("salary_slip_pin", salaryPin); 

//     formData.append("disbursed_amount", props.route?.params?.LoanAmount);
//     formData.append("bank_statement", {
//       name: AccountStatement?.name,
//       type: AccountStatement?.type,
//       uri: AccountStatement?.uri,
//     });
//     formData.append("salary_slip1", {
//       name: SalarySlipFirst?.name,
//       type: SalarySlipFirst?.type,
//       uri: SalarySlipFirst?.uri,
//     })
//     formData.append("salary_slip2", {
//       name: SalarySlipSecond?.name,
//       type: SalarySlipSecond?.type,
//       uri: SalarySlipSecond?.uri,
//     })
//     formData.append("salary_slip3", {
//       name: SalarySlipThird?.name,
//       type: SalarySlipThird?.type,
//       uri: SalarySlipThird?.uri,
//     })
//         formData.append("profile_pic1", {
//         name: selfieImage.fileName || 'aadhar_back.jpg',
//         type: selfieImage.type || 'image/jpeg',
//         uri: getUri(selfieImage.uri),
//       });

//     // console.log('fomfanfiodasijfi',formData)
//     for (let pair of formData._parts) {
//   console.log(`${pair[0]}:`, pair[1]);
// }

//     axios
//       .post(API_BASE_URL + "do_apply_loan", formData, {
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setProgress(percentCompleted);
//         },
//       })
//       .then(res => {
//         console.log("applyLoan response", res)
//         if (res?.status == 200 && res?.data?.status === true) {
//           setShowLoader(false)
//           props.navigation.navigate("ThankyouScreen", { referenceNumber: res?.data?.data })
//         } else {
//           setShowLoader(false)
//           alert(res?.data?.msg)
//         }
//       })
//       .catch(err => {
//         console.log("applyLoan error", err)
//         alert(`All the fields are mandatory !, ${err.message}`)
//         setShowLoader(false)

//       })
//   }


  const handleAccountAggregator = async () => {
   

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ci_session=f0b4dm4iberdmifk1c3akimote564ha7; ci_session=dnpfqhlt2m11gh75eb6g373718crkgdr");
    
    const raw = JSON.stringify({
      "phone_no": "9643073742"
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://instantmudra.com/admin/API/CirfInitiate", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };
  

  const openCameraNew = (from) => {
      const cameraType = documentType === 'Selfie' ? 'front' : 'back';
  
      launchCamera({
        quality: 0.3,
        cameraType: cameraType,
      }).then(images => {
        const image = images?.assets[0];
        if (documentType === 'Selfie') {
          setSelfieImage(image);
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
            }
            setShowPopup(false);
          });
        };
        

  return (
    <View style={styles.container}>
      <Header navigation={props.navigation} title={'Upload Document'} />
       {showPopup && showSelectionPopup()}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={() => setDocument('SalarySlipFirst')}
            style={styles.uploadTouchable}>
            {SalarySlipFirst?.uri !== undefined ? (
              <Image
                style={styles.image}
                source={require('../../assests/pdf.png')}
              />
            ) : (
              <Image
                style={styles.image}
                source={require('../../assests/uploadImage.png')}
              />
            )}
            <Text style={styles.text}>
              {SalarySlipFirst?.name || 'upload 1st salary slip'}
            </Text>
            {SalarySlipFirst?.uri !== undefined && (
              <TouchableOpacity
                style={styles.deleteImage}
                onPress={() => setSalarySlipFirst('')}>
                <Image source={require('../../assests/Trash.png')} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
           onPress={() => setDocument('SalarySlipSecond')}
           style={styles.uploadTouchable}>
            {SalarySlipSecond?.uri !== undefined ? (
              <Image
                style={styles.image}
                source={require('../../assests/pdf.png')}
              />
            ) : (
              <Image
                style={styles.image}
                source={require('../../assests/uploadImage.png')}
              />
            )}
            <Text style={styles.text}>
              {SalarySlipSecond?.name || 'upload 2nd salary slip'}
            </Text>
            {SalarySlipSecond?.uri !== undefined && (
              <TouchableOpacity
                style={styles.deleteImage}
                onPress={() => setSalarySlipSecond('')}>
                <Image source={require('../../assests/Trash.png')} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDocument('SalarySlipThird')}
            style={styles.uploadTouchable}>
            {SalarySlipThird?.uri !== undefined ? (
              <Image
                style={styles.image}
                source={require('../../assests/pdf.png')}
              />
            ) : (
              <Image
                style={styles.image}
                source={require('../../assests/uploadImage.png')}
              />
            )}
            <Text style={styles.text}>
              {SalarySlipThird.name || 'upload 3rd salary slip'}
            </Text>
            {SalarySlipThird?.uri !== undefined && (
              <TouchableOpacity
                style={styles.deleteImage}
                onPress={() => setSalarySlipThird('')}>
                <Image source={require('../../assests/Trash.png')} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>


          <Text style={[styles.fieldName, { color: '#001C30' }]}>Account Statements</Text>
          {/* loader>>>>>>>>> */}
          <View>
            {
              showLoader && (
                <View
                  style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    zIndex: 99

                  }}>
                  <View
                    style={{
                      height: 150,
                      width: 150,
                      backgroundColor: "#C5DFF8",
                      justifyContent: 'center',
                      alignItems: 'center',
                      // marginTop: 1,
                      alignSelf: 'center',
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 6,
                      },
                      shadowOpacity: 0.37,
                      shadowRadius: 7.49,

                      elevation: 12,

                    }}>
                    <ActivityIndicator color={'#0B666A'} size={'large'} />
                    <Text style={{ textAlign: 'center', color: '#000', fontWeight: '500' }}>Please Wait ... {Progress}%</Text>
                  </View>
                </View>
              )
            }



          </View>
          {/* loader>>>>>>>>> */}


          <TouchableOpacity
            onPress={() => setDocument('AccountStatement')}
            style={[styles.uploadTouchable, { marginBottom: 20 }]}>
            {AccountStatement?.uri !== undefined ? (
              <Image
                style={styles.image}
                source={require('../../assests/pdf.png')}
              />
            ) : (
              <Image
                style={styles.image}
                source={require('../../assests/uploadImage.png')}
              />
            )}
            <Text style={styles.text}>
              {AccountStatement.name || 'upload 6 month Statement (pdf Only)'}
            </Text>

    {/* <LinearButton
            onPress={() => handleAccountAggregator()}
            title={'Account Aggregator'}
            width={170}
            marginTop={40}
          />
       */}

            {AccountStatement?.uri !== undefined && (
              <TouchableOpacity
                style={[styles.deleteImage]}
                onPress={() => setAccountStatement('')}>
                <Image source={require('../../assests/Trash.png')} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          <Text style={[styles.textField, { color: '#001C30' }]}>A/c Statement Pin</Text>
          <TextInput
            style={[styles.textInput, { marginTop: 1 }]}
            onChangeText={text => setStatementPin(text)}
            placeholder="Enter Statement Pin / Password"
            placeholderTextColor={'#001C30'}
            value={statementPin}
          // editable={false}
          />

          <Text style={[styles.textField, { color: '#001C30', marginTop: 20 }]}>Salary Slip Pin</Text>
          <TextInput
            style={[styles.textInput, { marginTop: 1 }]}
            onChangeText={text => setSalaryPin(text)}
            placeholder="Enter Salary Slip Pin / Password"
            placeholderTextColor={'#001C30'}
            value={salaryPin}
          // editable={false}
          />
 <Text style={[styles.textField, { color: '#001C30', marginTop: 20 }]}>Upload Profile Images</Text> 
         {selfieImage !== '' ? (
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
            <Text style={styles.text1}>Upload</Text>
          </TouchableOpacity>
        )}

          <LinearButton
            onPress={() => applyLoan()}
            title={'Apply Loan'}
            width={170}
            marginTop={40}
          />

          {/* <View style= {{height:360, width:"100%",}}></View> */}
        </ScrollView>


      </SafeAreaView>
    </View>
  );
};
export default Mandate;
