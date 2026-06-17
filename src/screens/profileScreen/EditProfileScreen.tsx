import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import styles from "./EditProfile.styles";
import CustomInput from "../../components/input/CustomInput";
import GradientButton from "../../components/button/Button";
import { BackIcon, Calendra, UserIcon } from "../../assets/images";

type FormType = {
    name: string;
    mobile: string;
    alternateMobile: string;
    email: string;
    dob: string;
    address: string;
    qualification: string;
    state: string;
};

const EditProfileScreen = ({ navigation }: any) => {

    const [image, setImage] = useState<string | null>(null);

    const [form, setForm] = useState<FormType>({
        name: "",
        mobile: "",
        alternateMobile: "",
        email: "",
        dob: "",
        address: "",
        qualification: "",
        state: "",
    });

    const [errors, setErrors] = useState<any>({});

    const handleChange = <K extends keyof FormType>(key: K, value: FormType[K]) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: "photo" }, (res) => {
            if (res.assets) {
                setImage(res.assets[0].uri || null);
            }
        });
    };

    const takePhoto = () => {
        launchCamera({ mediaType: "photo" }, (res) => {
            if (res.assets) {
                setImage(res.assets[0].uri || null);
            }
        });
    };

    const handleSubmit = () => {
        let newErrors: any = {};

        Object.keys(form).forEach((key) => {
            if (!form[key as keyof FormType]) {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Saved ", form);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={BackIcon} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit profile</Text>
                </View>

                {/* Profile Image */}
                <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
                    <Image
                        source={image ? { uri: image } : UserIcon}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>

                {/* Inputs */}
                <CustomInput
                    value={form.name}
                    onChangeText={(val: string) => handleChange("name", val)}
                    placeholder="Name"
                    error={errors.name}
                />

                <CustomInput
                    value={form.mobile}
                    onChangeText={(val: string) => handleChange("mobile", val)}
                    placeholder="Registered Number"
                    error={errors.mobile}
                />

                <CustomInput
                    value={form.alternateMobile}
                    onChangeText={(val: string) => handleChange("alternateMobile", val)}
                    placeholder="Alternate Number"
                    error={errors.alternateMobile}
                />

                <CustomInput
                    value={form.email}
                    onChangeText={(val: string) => handleChange("email", val)}
                    placeholder="Email"
                    error={errors.email}
                />

                {/* DOB with icon */}
                <View>
                    <CustomInput
                        value={form.dob}
                        onChangeText={(val: string) => handleChange("dob", val)}
                        placeholder="Date of Birth"
                        error={errors.dob}
                    />
                    <Image source={Calendra} style={styles.calendarIcon} />
                </View>

                <CustomInput
                    value={form.address}
                    onChangeText={(val: string) => handleChange("address", val)}
                    placeholder="Address"
                    error={errors.address}
                />

                <CustomInput
                    value={form.qualification}
                    onChangeText={(val: string) => handleChange("qualification", val)}
                    placeholder="Educational qualification"
                    error={errors.qualification}
                />

                <CustomInput
                    value={form.state}
                    onChangeText={(val: string) => handleChange("state", val)}
                    placeholder="State"
                    error={errors.state}
                />

                {/* Button */}
                <GradientButton
                    title="Save Changes"
                    onPress={handleSubmit}
                    style={styles.button}
                />

            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProfileScreen;