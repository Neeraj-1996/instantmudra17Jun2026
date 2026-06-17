import React, { useEffect, useState } from 'react'
import { View, Text ,BackHandler} from 'react-native';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from "../../screen/Splash/Splash"
import Onboarding from '../../screen/Onboarding/Onboarding';
import Registration from '../../screen/Registration/Registration';
import Login from '../../screen/Login/Login';
import Verify from '../../screen/Verify/Verify';
import VerifyEmail from '../../screen/VerifyEmail/VerifyEmail';
import PersonalDetails from '../../screen/PersonalDetails/PersonalDetails';
import PersonalInformation from '../../screen/PersonalInformation/PersonalInformation';
import CompanyDetails from '../../screen/CompanyDetails/CompanyDetails';
import Document from "../../screen/Document/Document";
import SalariesWorkDetails from "../../screen/SalariesWorkDetails/SalariesWorkDetails"
import Mandate from "../../screen/Mandate/Mandate"
import Home from "../../screen/Home/Home"
import Profile from "../../screen/Profile/Profile"
import MandateList from "../../screen/MandateList/MandateList"
import Reference from '../../screen/Reference/Reference';
import ReferenceTwo from '../../screen/ReferenceTwo/ReferenceTwo';
import MyLoan from '../../screen/MyLoan/MyLoan';
import Reset from '../../screen/Reset/Reset';
import CheckEmail from '../../screen/CheckEmail/CheckEmail';
import NewPassword from '../../screen/NewPassword/NewPassword';
import UpdatePassword from '../../screen/UpdatePassword/UpdatePassword';
import PhoneOtpVerify from '../../screen/PhoneOtpVerify/PhoneOtpVerify';
import PhoneNumberVerify from '../../screen/PhoneNumberVerify/PhoneNumberVerify';
import LoanDetails from '../../screen/LoanDetails/LoanDetails';
import LoanDetailsNew from '../../screen/LoanDetailsNew/LoanDetailsNew'
import MyLoanDetails from '../../screen/MyLoanDetails/MyLoanDetails';
import ViewProfile from '../../screen/ViewProfile/ViewProfile';
import EMandatePaymentPage from '../../screen/EMandatePaymentPage/EMandatePaymentPage';
import IciciPaymentPage from '../../screen/IciciPaymentPage/IciciPaymentPage';
import ThankyouScreen from '../../screen/ThankyouScreen/ThankyouScreen';
import RazorpayPaymentPage from '../../screen/RazorpayPaymentPage/RazorpayPaymentPage';
import PaymentScreen from '../../screen/PaymentScreen/PaymentScreen';
import SocialLoginScreen from '../../screen/SocialLoginScreen/SocialLoginScreen';
import Notifications from '../../screen/Notifications/Notifications';
import PrivacyPolicy from '../../screen/SideBar/PrivacyPolicy';
import Term from '../../screen/SideBar/Terms';
import Contact from '../../screen/SideBar/Contact';
import Faq from '../../screen/SideBar/Faq';
import Mobilelogin from '../../screen/E-MandateTab/Mobilelogin';
import Otp from '../../screen/E-MandateTab/Otp';
import Form1 from '../../screen/E-MandateTab/Form1';
import ComplainForm from '../../screen/Complain Form/ComplainForm';
import Aadhar from '../../screen/AadharPan Verifications/Aadhar';
import Pan from '../../screen/AadharPan Verifications/Pan';
import PersonalInformationAadhar from '../../screen/PersonalInformation/PersonalInformationAadhar';
import PersonalInformationPan from '../../screen/PersonalInformation/PersonalInformationPan';
import Salarystatus1 from '../../screen/SalariesWorkDetails/Salarystatus1';
import Emandateweb from '../../screen/E-MandateTab/Emandateweb';
import Ref from '../../screen/ReferencesScreen/Ref';
import PermissionsPg from '../../screen/FirstLaunchPermissions/PermissionsPg';
import WebViewPP from '../../screen/FirstLaunchPermissions/WebViewPP';
import EmploymentStatusScreen from '../../screen/Emplyestatus/Emplyeestatus';
import ReviewModal from '../../screen/Reviewmodel/Reviewmodel.';
import CreditScoreScreen from '../../screen/CreditScore/CreditScore';
import LoanDetailsActive from '../../screen/LoanDetailsNew/LoanDetailsActive';
import AccountAggregator from '../../screen/Mandate/AccountAggregator';
const Stack = createStackNavigator();
  function Navigation() {

  




  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      let permissionResult;

      if (Platform.OS === 'android') {
        permissionResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
      } else {
        permissionResult = await request(PERMISSIONS.IOS.CAMERA);
      }

      if (permissionResult === 'granted' || permissionResult === 'true') {
        console.log('Camera permission granted');
      } else {
        console.log('Camera permission denied');
        // Optionally, you can show an Alert for better UX
        Alert.alert('Permission denied', 'You need to grant camera permission for the app to work properly.');
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };



  const [isModalVisible, setModalVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    console.log("backHandler",backHandler);
    return () => backHandler.remove();
  }, [currentScreen]);


  const handleBackPress = () => {
    // Only show modal if the current screen is OtpVerification or any specific screen 
    if (currentScreen === 'PersonalInformation' || currentScreen === 'CompanyDetails'|| currentScreen === 'Document' || currentScreen === 'Ref' || currentScreen === 'SalariesWorkDetails') {
      setModalVisible(true);
      return true; // Prevent default back navigation
    }
    return false; 
  };

  console.log("current screenn",currentScreen) 

  const onScreenChange = (routeName) => {
    setCurrentScreen(routeName);
  };

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Splash"
      // initialRouteName="Onboarding"
      screenListeners={{
        state: (e) => {
          const route = e?.data?.state?.routes?.[e?.data?.state?.index];
          onScreenChange(route?.name); 
        },
      }}
      >

        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
        <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
        <Stack.Screen name="Document" component={Document} />
        <Stack.Screen name="SalariesWorkDetails" component={SalariesWorkDetails} />
        <Stack.Screen name="Mandate" component={Mandate} />
        <Stack.Screen name="Home" component={Home}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MandateList" component={MandateList} />
        <Stack.Screen name="Reference" component={Reference} />
        <Stack.Screen name="ReferenceTwo" component={ReferenceTwo} />
        <Stack.Screen name="MyLoan" component={MyLoan} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen name="CheckEmail" component={CheckEmail} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="PhoneNumberVerify" component={PhoneNumberVerify} />
        <Stack.Screen name="PhoneOtpVerify" component={PhoneOtpVerify} />
        <Stack.Screen name="LoanDetails" component={LoanDetails} />
        <Stack.Screen name="LoanDetailsNew" component={LoanDetailsNew} />
        <Stack.Screen name="MyLoanDetails" component={MyLoanDetails} />
        <Stack.Screen name="ViewProfile" component={ViewProfile} />
        <Stack.Screen name="EMandatePaymentPage" component={EMandatePaymentPage} />
        <Stack.Screen name="IciciPaymentPage" component={IciciPaymentPage} />
        <Stack.Screen name="ThankyouScreen" component={ThankyouScreen} />
        <Stack.Screen name="RazorpayPaymentPage" component={RazorpayPaymentPage} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="SocialLoginScreen" component={SocialLoginScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Term" component={Term} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="Mobilelogin" component={Mobilelogin} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Form1" component={Form1} />
        <Stack.Screen name="ComplainForm" component={ComplainForm} />
        <Stack.Screen name="Aadhar" component={Aadhar} />
        <Stack.Screen name="Pan" component={Pan} />
        <Stack.Screen name="PersonalInformationAadhar" component={PersonalInformationAadhar} />
        <Stack.Screen name="PersonalInformationPan" component={PersonalInformationPan} />
        <Stack.Screen name="Salarystatus1" component={Salarystatus1} />
        <Stack.Screen name="Emandateweb" component={Emandateweb} />
        <Stack.Screen name="Ref" component={Ref} />
        <Stack.Screen name="PermissionsPg" component={PermissionsPg} />
        <Stack.Screen name="wv" component={WebViewPP} />
        <Stack.Screen name="EmploymentStatusScreen" component={EmploymentStatusScreen} />
        <Stack.Screen name="CreditScoreScreen" component={CreditScoreScreen} />
        <Stack.Screen name="LoanDetailsActive" component={LoanDetailsActive} />
        <Stack.Screen name="AccountAggregator" component={AccountAggregator} />


      </Stack.Navigator>
    </NavigationContainer>
    <ReviewModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

export default Navigation;

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       setLoading(false);
  //     });
  // }, []);  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     // navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       setLoading(false);
  //     });
  // }, []);