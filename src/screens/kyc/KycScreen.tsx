import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    TextInput,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import KycStyles from "./Kyc.styles";
import GradientButton from "../../components/button/Button";
import { IdCardBack, IdCardFront, Kyc } from "../../assets/images";
import CustomInput from "../../components/input/CustomInput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { submitKyc } from "../../redux/slices/userSlice";
import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
import ImagePickerModal from "../../components/imagePickerModal/ImagePickerModal";
import usePermissions from "../../hooks/usePermissions";


type FormType = {
    pan: string;
    aadhaar: string;
    email: string;
    mobile: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
};

const KycScreen: React.FC = ({ navigation, route }: any) => {
    const [panImage, setPanImage] = useState<any>(null);
    const [aadhaarFront, setAadhaarFront] = useState<any>(null);
    const [aadhaarBack, setAadhaarBack] = useState<any>(null);
    const [errors, setErrors] = useState<any>({});
    const { email = "" } = route?.params || {};
    console.log("Email from route params:", email);
    const [form, setForm] = useState<FormType>({
        pan: "",
        aadhaar: "",
        email,
        mobile: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
    });
    const [allowManualLocation, setAllowManualLocation] = useState(false);

    const [pickerVisible, setPickerVisible] = useState(false);
    const [selectedSetter, setSelectedSetter] = useState<any>(null);
    // const generateRandomImageName = () => {
    //     return `image_${Math.random().toString(36).substring(2, 10)}.jpg`;
    // };

    // const pickImage = (setter: any) => {
    //     launchImageLibrary({ mediaType: "photo" }, (res) => {
    //         if (res.assets && res.assets.length > 0) {
    //             const asset = res.assets[0];

    //             setter({
    //                 uri: asset.uri?.startsWith("file://")
    //                     ? asset.uri
    //                     : `file://${asset.uri}`,
    //                 name: asset.fileName || `image_${Date.now()}.jpg`,
    //                 type: asset.type || "image/jpeg",
    //             });
    //         }
    //     });
    // };

    const { takePhoto } = usePermissions();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.user);

    const isValidPAN = (pan: string) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleNext = () => {
        let newErrors: any = {};

        // VALIDATIOn
        if (!form.pan) {
            newErrors.pan = "PAN is required";
        } else if (!isValidPAN(form.pan)) {
            newErrors.pan = "Invalid PAN format (ABCDE1234F)";
        }
        if (!form.aadhaar || form.aadhaar.length !== 12) newErrors.aadhaar = true;
        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(form.email)) {
            newErrors.email = "Enter valid email address";
        }
        if (!form.mobile || form.mobile.length !== 10) newErrors.mobile = true;
        if (!form.address) newErrors.address = true;
        if (!form.pincode || form.pincode.length !== 6) newErrors.pincode = true;
        if (!form.city) newErrors.city = true;

        if (!panImage) newErrors.panImage = true;
        if (!aadhaarFront) newErrors.aadhaarFront = true;
        if (!aadhaarBack) newErrors.aadhaarBack = true;

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        // API CALL
        dispatch(
            submitKyc({
                ...form,
                panImage,
                aadhaarFront,
                aadhaarBack,
            })
        )
            .unwrap()
            .then((res: any) => {
                // console.log("res", res);

                if (res?.status === true && res?.message === "KYC submitted successfully") {
                    navigation.replace("EmploymentScreen");
                } else {
                    Alert.alert(
                        "Submission failed",
                        res?.message || "Unable to submit KYC"
                    );
                }
            })
            .catch((err) => {
                console.log("Response =>", err?.response?.data);
                console.log("Status =>", err?.response?.status);
                console.log("Error =>", err);
                Alert.alert(
                    "Submission error",
                    err?.response?.data?.message || err?.message || "Something went wrong"
                );
            });
    };


    const UploadBox = ({
        label,
        image,
        onPress,
        placeholderImage,
        error,
    }: any) => (
        <View style={{ width: "48%" }}>
            <TouchableOpacity
                style={[
                    KycStyles.uploadBox,
                    error && { borderColor: "red", borderWidth: 1.5 },
                ]}
                onPress={onPress}
            >
                {image ? (
                    <Image
                        source={{ uri: image.uri }}
                        style={KycStyles.uploadImage}
                    />
                ) : (
                    <View style={{ alignItems: "center" }}>
                        <Text style={KycStyles.uploadText}>{label}</Text>
                        <Image source={placeholderImage} style={KycStyles.IdImage} />
                    </View>
                )}
            </TouchableOpacity>

            {error && (
                <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    Mandatory field
                </Text>
            )}
        </View>
    );


    const handleChange = (key: keyof FormType, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const panInputRef = useRef<TextInput | null>(null);

    const panKeyboardType =
        form.pan.length >= 5 && form.pan.length < 9 ? "number-pad" : "default";

    useEffect(() => {
        // On iOS, keyboardType doesn't update while TextInput is focused.
        // Force a brief blur+focus to update the keyboard when type changes.
        const input = panInputRef.current;
        try {
            if (input && (input as any).isFocused && (input as any).isFocused()) {
                input.blur();
                setTimeout(() => input.focus(), 50);
            }
        } catch (e) {
            // ignore
        }
    }, [panKeyboardType]);

    const fetchPinCodeDetails = async (pin: string) => {
        try {
            const response = await fetch(
                `https://api.postalpincode.in/pincode/${pin}`
            );
            const data = await response.json();

            const postOffice = data?.[0]?.PostOffice;

            if (
                data?.[0]?.Status === "Success" &&
                postOffice &&
                postOffice.length > 0
            ) {
                const firstOffice = postOffice[0];

                setForm(prev => ({
                    ...prev,
                    city: firstOffice.District,
                    state: firstOffice.State,
                }));

                setAllowManualLocation(false);
            } else {
                setForm(prev => ({
                    ...prev,
                    city: "",
                    state: "",
                }));

                setAllowManualLocation(true);

                Alert.alert(
                    "Location not found",
                    "Please enter State and City manually"
                );
            }
        } catch (error) {
            setForm(prev => ({
                ...prev,
                city: "",
                state: "",
            }));

            setAllowManualLocation(true);

            Alert.alert(
                "Error",
                "Unable to fetch location. Please enter manually."
            );
        }
    };


    const openGallery = async () => {

        setPickerVisible(false);
        console.log("Opening gallery...");
        const res = await launchImageLibrary({
            mediaType: "photo",
            quality: 0.8,
        });
        console.log("Gallery result:", res);
        if (res.assets && res.assets.length > 0) {

            const asset = res.assets[0];

            const uri = asset.uri || asset.uriString || null;
            const normalizedUri = uri
                ? uri.startsWith("/")
                    ? `file://${uri}`
                    : uri
                : null;

            selectedSetter({
                uri: normalizedUri,
                name: asset.fileName || `image_${Date.now()}.jpg`,
                type: asset.type || "image/jpeg",
            });
        }
    };

    const openCamera = async () => {

        setPickerVisible(false);

        const result = await takePhoto({
            mediaType: "photo",
            quality: 0.5,
            cameraType: "back",
        });
        console.log("Camera result:", result);
        if (
            result?.success &&
            result?.asset
        ) {

            const asset = result.asset;
            const uri = asset.uri || asset.uriString || null;
            const normalizedUri = uri
                ? uri.startsWith("/")
                    ? `file://${uri}`
                    : uri
                : null;

            selectedSetter({
                uri: normalizedUri,
                name: asset.fileName || `image_${Date.now()}.jpg`,
                type: asset.type || "image/jpeg",
            });
        }
    };


    const openPicker = (setter: any) => {
        setSelectedSetter(() => setter);
        setPickerVisible(true);
    };

    return (
        <ScreenWrapper scroll showBack enableReviewModal={true}>
            {/* // <SafeAreaView style={KycStyles.safeArea}>
        //     <ScrollView contentContainerStyle={KycStyles.container}> */}
            <View style={{ alignItems: 'center', justifyContent: "center", margin: 10 }}>
                {/* Top Image */}
                <Image source={Kyc} style={KycStyles.topImage} />

                {/* Title */}
                <Text style={KycStyles.title}>Complete your KYC</Text>

                {/* Subtitle */}
                <Text style={KycStyles.subtitle}>
                    For the purpose of industry regulation, your details are required.
                </Text>

                <CustomInput
                    inputRef={panInputRef}
                    value={form.pan}
                    onChangeText={(val: string) => handleChange("pan", val)}
                    placeholder="Pan Number"
                    error={errors.pan}
                    maxLength={10}
                    autoCapitalize='characters'
                    keyboardType={panKeyboardType}
                />

                <UploadBox
                    label="Pan Card"
                    image={panImage}
                    onPress={() => openPicker(setPanImage)}
                    // onPress={() => pickImage(setPanImage)}
                    placeholderImage={IdCardFront}
                    error={errors.panImage}
                />
                <View style={{ marginBottom: 15 }} />


                {/* Aadhaar */}
                <CustomInput
                    value={form.aadhaar}
                    maxLength={12}
                    onChangeText={(val: string) => handleChange("aadhaar", val)}
                    placeholder="Aadhar Number"
                    keyboardType='number-pad'
                    error={errors.aadhaar}
                />

                <View style={KycStyles.row}>
                    <UploadBox
                        label="Aadhar Front"
                        image={aadhaarFront}
                        onPress={() => openPicker(setAadhaarFront)}
                        placeholderImage={IdCardFront}
                        error={errors.aadhaarFront}
                    />
                    <UploadBox
                        label="Aadhar Back"
                        image={aadhaarBack}
                        onPress={() => openPicker(setAadhaarBack)}
                        placeholderImage={IdCardBack}
                        error={errors.aadhaarBack}
                    />
                </View>

                <CustomInput
                    value={form.email}
                    onChangeText={(val: string) => handleChange("email", val)}
                    placeholder="Email address"
                    error={errors.email}
                />

                <CustomInput
                    value={form.mobile}
                    onChangeText={(val: string) => handleChange("mobile", val)}
                    placeholder="Alternate Mobile Number"
                    error={errors.mobile}
                    maxLength={10}
                    keyboardType='number-pad'
                />

                <CustomInput
                    value={form.address}
                    onChangeText={(val: string) => handleChange("address", val)}
                    placeholder="Enter residence address"
                    error={errors.address}
                />

                <View style={KycStyles.row}>
                    <View style={{ width: "48.5%" }}>
                        <CustomInput
                            value={form.pincode}
                            onChangeText={(val: string) => {
                                handleChange("pincode", val);

                                if (val.length === 6) {
                                    fetchPinCodeDetails(val);
                                } else {
                                    setForm(prev => ({
                                        ...prev,
                                        pincode: val,
                                        city: "",
                                        state: "",
                                    }));

                                    setAllowManualLocation(false);
                                }
                            }}
                            placeholder="Pincode"
                            error={errors.pincode}
                            keyboardType="number-pad"
                            maxLength={6}
                        />
                    </View>
                    <View style={{ width: "48.5%" }}>
                        <CustomInput
                            value={form.city}
                            onChangeText={(val: string) => handleChange("city", val)}
                            placeholder="City"
                            error={errors.city}
                            editable={allowManualLocation}
                        />
                    </View>
                </View>

                <CustomInput
                    value={form.state}
                    onChangeText={(val: string) => handleChange("state", val)}
                    placeholder="State"
                    error={errors.state}
                    editable={allowManualLocation}
                />

                {errors.selfie && (
                    <Text style={{ color: "red", fontSize: 12 }}>
                        Mandatory field
                    </Text>
                )}

                {/* Button */}
                <GradientButton
                    title="Continue"
                    onPress={handleNext}
                    loading={loading}
                    disabled={loading}
                    style={KycStyles.button}
                />

                <ImagePickerModal
                    visible={pickerVisible}
                    onClose={() => setPickerVisible(false)}
                    onCameraPress={openCamera}
                    onGalleryPress={openGallery}
                />

            </View>
        </ScreenWrapper>
    );
};

export default KycScreen;

