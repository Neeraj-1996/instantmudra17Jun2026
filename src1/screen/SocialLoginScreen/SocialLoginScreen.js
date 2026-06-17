import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
const SocialLoginScreen = (props) => {

  // const onGoogleButtonPress = async () => {
  //   // Get the users ID token
  //   // const { idToken } = await GoogleSignin.signIn();
  //   console.log('DEEPA 1', idToken);
  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   console.log('DEEPA 2', googleCredential);
  //   const signInData = await auth().signInWithCredential(googleCredential);

  //   console.log(
  //     '🚀 ~ file: Login.js ~ line 30 ~ onGoogleButtonPress ~ signInData',
  //     signInData,
  //   );

  //   props.navigation.navigate('PersonalInformation', {
  //     social_media_type: 'Gmail',
  //     social_name: signInData?.additionalUserInfo?.profile?.name,
  //     social_email: signInData?.additionalUserInfo?.profile?.email,
  //     social_id: signInData?.user?.uid,
  //     social_profile_pic: signInData?.additionalUserInfo?.profile?.picture
  //   })

  //   socialMediaLogin(socialPayload);
  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);

  // };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.2 }}
      locations={[0, 0.6, 1]}
      colors={['#7B4397', '#B53059', '#DC2430']}
      style={{ flex: 1 }}>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
        }}>
        <TouchableOpacity style={styles.button}>
          <Image
            style={styles.image}
            source={require('../../assests/facebook.png')}
          />
          <Text style={styles.buttonText}>Login With Facebook</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => onGoogleButtonPress()

          }
          style={[styles.button, { marginTop: 30 }]}>
          <Image
            style={styles.image}
            source={require('../../assests/google.png')}
          />
          <Text style={styles.buttonText}>Login With Google</Text>
        </TouchableOpacity> */}
      </View>
    </LinearGradient>
  );
};
export default SocialLoginScreen;
