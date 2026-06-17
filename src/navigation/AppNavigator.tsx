import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "../screens/home/HomeScreen";
import SplashScreen from "../screens/splash/SplashScreen";
import OnboardingScreen from "../screens/onboardingScreen/OnboardingScreen";
import RegistrationScreen from "../screens/auth/register/RegistrationScreen";
import OtpScreen from "../screens/auth/otpVerification/OtpScreen";
import KycScreen from "../screens/kyc/KycScreen";
import EmploymentScreen from "../screens/employment/EmploymentScreen";
import DocumentScreen from "../screens/document/DocumentScreen";

import RefScreen from "../screens/refrence/RefScreen";
import LoanScreen from "../screens/loanScreen/LoanScreen";
import SuccessScreen from "../screens/successScreen/SuccessScreen";
import MyLoanDetails from "../screens/loanDetails/MyLoanDetails";
import LoanDetailsActive from "../screens/loanDetailsActive/LoanDetailsActive";
import DrawerNavigator from "../screens/drawer/DrawerNavigator";
import NotificationScreen from "../screens/notification/NotificationScreen";
import Faq from "../screens/drawer/Faq/Faq";
import WebViewScreen from "../components/webScreen/WebViewScreen";
import ProfileScreen from "../screens/profileScreen/ShowProfileScreen";
import ContactUsScreen from "../screens/contactUs/ContactUsScreen";
import EMandate from "../screens/eMandate/EMandate";
import InitialScreen from "../screens/userInitialScreen/InitalUserScreen";

import NoInternetScreen from "../screens/noInternet/NoInternet";
import UpdateScreen from "../screens/update/UpdateScreen";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="KycScreen" component={KycScreen} />
            <Stack.Screen name="EmploymentScreen" component={EmploymentScreen} />

            <Stack.Screen name="DocumentScreen" component={DocumentScreen} />
            <Stack.Screen name="RefScreen" component={RefScreen} />
            <Stack.Screen name="LoanScreen" component={LoanScreen} />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
            <Stack.Screen name="MyLoanDetails" component={MyLoanDetails} />
            <Stack.Screen name="LoanDetailsActive" component={LoanDetailsActive} />
            <Stack.Screen name="Home" component={DrawerNavigator} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="Faq" component={Faq} />
            <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
            <Stack.Screen name="EMandate" component={EMandate} />
            <Stack.Screen name="InitialScreen" component={InitialScreen} />
            <Stack.Screen name="NoInternetScreen" component={NoInternetScreen} />
            <Stack.Screen name="UpdateScreen" component={UpdateScreen} />


        </Stack.Navigator>
    );
};

export default AppNavigator;