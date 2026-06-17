import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import colors, {resetScreen} from '../../common';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
// import {LoginButton as LoginButtons} from '../../components/LoginButton/LoginButton';
import Header from '../../components/Header/Header';
import LinearButton from '../../components/LinearButton/LinearButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
import {API_BASE_URL, ERROR_MESSAGE} from '../../utils';
// import {
//   LoginManager,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk-next';
import Loader from '../../components/Loader/Loader';

const Login = props => {
  const [showLoader, setShowLoader] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleValidated = () => {
    return userName?.length > 2 && password?.length > 2;
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '751288480435-30tp6s2hr5gj9rfqgcjg7hi41vdo8a8q.apps.googleusercontent.com',
      iosClientId:
        '751288480435-30tp6s2hr5gj9rfqgcjg7hi41vdo8a8q.apps.googleusercontent.com',
      androidClientId:
        '751288480435-30tp6s2hr5gj9rfqgcjg7hi41vdo8a8q.apps.googleusercontent.com',
    });
  }, []);

  const socialMediaLogin = payload => {
    setShowLoader(true);
    console.log('socialMediaLogin body', payload);

    axios
      .post(API_BASE_URL + 'social-media-login', payload)
      .then(res => {
        setShowLoader(false);
        console.log('socialMediaLogin response', res);
        if (res.data?.status === 200) {
          console.log('socialMediaLogin response', res.data?.data?.user);
          AsyncStorage.setItem('IS_LOGGEDIN', 'true');
          AsyncStorage.setItem('TOKEN', res.data?.data?.token);
          AsyncStorage.setItem(
            'USER_DATA',
            JSON.stringify(res.data?.data?.user),
          );
          
          resetScreen(props.navigation, 'Home');
        }
      })
      .catch(err => {
        setShowLoader(false);
        Alert.alert(ERROR_MESSAGE);
        console.log('socialMediaLogin Err', err?.response);
      });
  };

/*   const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name, email, picture',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + JSON.stringify(error));
        } else {
          const socialPayload = {
            first_name: result?.first_name ?? '',
            last_name: result?.last_name ?? '',
            email: result?.email ?? '',
            profile_image_url: result?.picture?.data?.url ?? '',
            social_id: result?.id ?? '',
            social_media_type: 'Facebook',
          };

          socialMediaLogin(socialPayload);
          // this.setState({userInfo: result});
          console.log('result:', JSON.stringify(result));
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  }; */

  // const onGoogleButtonPress = async () => {
  //   // Get the users ID token
  //   const {idToken} = await GoogleSignin.signIn();
  //   console.log('DEEPA 1', idToken);
  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   console.log('DEEPA 2', googleCredential);
  //   const signInData = await auth().signInWithCredential(googleCredential);

  //   console.log(
  //     '🚀 ~ file: Login.js ~ line 30 ~ onGoogleButtonPress ~ signInData',
  //     signInData,
  //   );

  //   const socialPayload = {
  //     first_name: signInData?.additionalUserInfo?.profile?.given_name ?? '',
  //     last_name: signInData?.additionalUserInfo?.profile?.family_name ?? '',
  //     email: signInData?.additionalUserInfo?.profile?.email ?? '',
  //     profile_image_url: signInData?.user?.photoURL ?? '',
  //     social_id: signInData?.user?.uid ?? '',
  //     social_media_type: 'Gmail',
  //   };

  //   socialMediaLogin(socialPayload);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);

  //   // try {
  //   //   GoogleSignin.configure(
  //   //   {
  //   //     //webClientId is required if you need offline access
  //   //     offlineAccess: true,
  //   //     webClientId:'426493739057-tht75jpnect4edhgsid8s6uh9v7j5a8m.apps.googleusercontent.com',
  //   //     androidClientId: '426493739057-tht75jpnect4edhgsid8s6uh9v7j5a8m.apps.googleusercontent.com',
  //   //     scopes: ['profile', 'email']
  //   //   });
  //   //   await GoogleSignin.hasPlayServices();
  //   //   console.log("reached google sign in");
  //   //   const userInfo = await GoogleSignin.signIn();
  //   //   console.log(userInfo);
  //   //   this.setState({ userInfo });
  //   // } catch (error) {
  //   //   console.log("reached google sign in error", error);
  //   //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //   //     console.log("error occured SIGN_IN_CANCELLED");
  //   //     // user cancelled the login flow
  //   //   } else if (error.code === statusCodes.IN_PROGRESS) {
  //   //     console.log("error occured IN_PROGRESS");
  //   //     // operation (f.e. sign in) is in progress already
  //   //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //   //     console.log("error occured PLAY_SERVICES_NOT_AVAILABLE");
  //   //   } else {
  //   //     console.log(error)
  //   //     console.log("error occured unknow error");
  //   //   }
  //   // }
  // };

  const UserLogin = () => {
    setShowLoader(true);
    console.log('loginUser Passing body', {
      user_name: userName,
      password: password,
    });
    axios
      .post(API_BASE_URL + 'UserLogin', {
        user_email: user̥Name,
        password: password,
      })
      .then(res => {
        console.log('Login.js UserLogin response', res.data);

        setShowLoader(false);
        if (res.status === 200 && res.data.status === true) {
          AsyncStorage.setItem("USER_DATA", JSON.stringify(res?.data?.response))
          if (res.data?.response?.profile_completed === "0") {
            props.navigation.navigate('PersonalInformation', {userName:userName, fullName: res?.data?.response?.full_name});
          } else {
            props.navigation.navigate('Home');
          }
        }
        // if (res.status === 200 && res.data.status === true) {
        //   AsyncStorage.setItem('IS_LOGGEDIN', 'true');
        //   // AsyncStorage.setItem('TOKEN', res.data?.data?.token);
        //   AsyncStorage.setItem(
        //     'USER_DATA',
        //     JSON.stringify(res.data?.data?.user),
        //   );
        //   resetScreen(props.navigation, 'Home');
        // }
      })
      .catch(err => {
        setShowLoader(false);
        console.log('loginUser err', err?.response);
        alert(ERROR_MESSAGE);
      });
  };

/*   const loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  }; */

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0.2}}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{flex: 1}}>
      <Loader showLoader={showLoader} />
      <Header
        hideLeftHeader={false}
        navigation={props.navigation}
        title={'Login'}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.loginText}>Welcome Back!</Text>
        <Text style={styles.loginTextTwo}>
          Enter your login details to continue
        </Text>
        <Text style={styles.textField}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter Username"
          onChangeText={text => setUserName(text)}
        />
        <Text style={styles.textField}>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setPassword(text)}
          placeholder="Enter Password"
          secureTextEntry={true}
        />
        <View
          style={{
            marginTop: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {handleValidated() ? (
            <LinearButton
              buttonText={'Login'}
              width={150}
              onPress={() => UserLogin()}
              title={'Login'}
            />
          ) : (
            <TouchableOpacity
              disabled={true}
              style={{
                height: 40,
                width: 150,
                borderRadius: 18,
                backgroundColor: '#E3E5E5',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.buttonText}>{'Login'}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Reset')}
            style={{borderBottomWidth: 1}}>
            <Text style={[styles.textField, {color: '#595959', marginTop: 0}]}>
              Forgot Password ?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            width: 150,
            height: 40,
            backgroundColor: colors.red,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={() => props.navigation.navigate('PhoneNumberVerify')}>
          <Text
            style={{
              color: '#595959',
              fontSize: 12,
              marginLeft: 8,
              color: 'white',
              fontWeight: '600',
            }}>
            {' '}
            Login with OTP
          </Text>
        </TouchableOpacity>

        <View
          style={{heigh: 20, width: 60, backgroundColor: colors.grey}}></View>
        {/* <View style={{height: 200, width: '100%'}}></View> */}
      </ScrollView>
      <View style={styles.footer}>
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#595959', fontSize: 16}}>
            {' '}
            or continue with
          </Text>

          <TouchableOpacity onPress={loginWithFacebook}>
            <Image
              style={styles.image}
              source={require('../../assests/facebook.png')}
            />
          </TouchableOpacity> */}
          {/* <LoginButton
            style={{marginLeft:12,
              height:36, width:36,
              borderRadius:40}}
              permissions={["email"]}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  const accessToken = data.accessToken.toString();
                  getInfoFromToken(accessToken);
                });
              }
            }}
          onLogoutFinished={() => {}}
        /> */}
          {/* <TouchableOpacity onPress={() => onGoogleButtonPress()}>
            <Image
              style={styles.image}
              source={require('../../assests/google.png')}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity>
            <Image
              style={styles.image}
              source={require('../../assests/twitter.png')}
            />
          </TouchableOpacity> */}
          {/* <TouchableOpacity onPress= {()=>props.navigation.navigate("PhoneNumberVerify")}>
            <Text style={{color: '#595959', fontSize:12, marginLeft:8}}> Login with OTP</Text>
          </TouchableOpacity> */}
        {/* </View> */}
        <View
          style={{
            height: 1,
            width: '100%',
            marginTop: 20,
            backgroundColor: '#E3E5E5',
          }}></View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Registration')}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '400',
              marginTop: 20,
              alignSelf: 'center',
              color: colors.red,
            }}>
            Sign up for a New Account
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
export default Login;
