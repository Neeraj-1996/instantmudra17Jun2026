import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    BackHandler,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { styles } from './Emandate.styles';
import Header from '../../components/header/Header';
import { EmandateImage } from '../../assets/images';
import GradientButton from '../../components/button/Button';
import { moderateScale } from '../../styles/responsive';
import { getMandateDetails } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/hooks';
import { ENDPOINTS } from '../../api/endpoints';


interface Props {
    navigation: any;
}

const EMandate: React.FC<Props> = ({ navigation }) => {
    const [impl, setImpl] = useState<string>('');
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [webUrl, setWebUrl] = useState<string>('');
    const dispatch = useAppDispatch();
    // ================= BACK HANDLER =================
    const handleBackButtonClick = (): boolean => {
        navigation.goBack();
        return true;
    };

    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButtonClick
        );
        return () => subscription.remove();
    }, []);

    // ================= API =================

    useEffect(() => {
        fetchMandate();
    }, []);
    const fetchMandate = async () => {
        const res = await dispatch(getMandateDetails());

        if (getMandateDetails.fulfilled.match(res)) {
            const apiData = res.payload?.data; // FIX HERE

            const orderId = apiData?.order_id;
            const userId = apiData?.user_id;

            if (!orderId || !userId) {
                Alert.alert("Error", "Order/User ID not found");
                return;
            }

            //  set order id in input
            setImpl(orderId);

            //  generate webview URL
            const url = `${ENDPOINTS.EANDATE_URL}${userId}/${orderId}`;
            setWebUrl(url);

        } else {
            Alert.alert("Error", "Failed to fetch mandate details");
        }
    };

    // const webViewURL = API_BASE_URL + "mandateRegisterWeb/" + user_id + "/" + order_id;

    // ================= UI =================

    return (
        <View style={styles.container}>
            <Header navigation={navigation} title="Enter IM-PL-Number" />

            {showLoader && (
                <View style={styles.loaderWrapper}>
                    <ActivityIndicator color="red" size="large" />
                </View>
            )}

            <ScrollView>
                <View style={styles.innerContainer}>
                    <StatusBar barStyle="dark-content" backgroundColor="#f1f1f1" />

                    <Image
                        source={EmandateImage}
                        style={styles.img}
                    />

                    <Text style={styles.label}>Enter Reference ID</Text>

                    <View style={styles.input}>
                        <TextInput
                            style={styles.inputText}
                            value={impl}
                            onChangeText={setImpl}
                            placeholder="IM-PL-000000"
                            autoCapitalize="characters"
                            maxLength={12}
                            placeholderTextColor="#6A7F94"
                            editable={false}
                        />
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <GradientButton
                            title="Continue"
                            style={{ width: moderateScale(250) }}
                            // onPress={() => console.log('Continue Pressed')}
                            onPress={() => {
                                if (!webUrl) {
                                    Alert.alert("Error", "URL not ready");
                                    return;
                                }

                                navigation.navigate("WebViewScreen", {
                                    url: webUrl,
                                    title: "E-Mandate"
                                });
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default EMandate;