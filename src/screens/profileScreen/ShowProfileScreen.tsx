import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUserDetail } from "../../redux/slices/userSlice";
import styles from "./Profile.style";

import GradientBackground from "../../components/gradient/GradinetBackgorund";
import Header from "../../components/header/Header";

const ProfileScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const { userDetail } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetail());
    }, []);

    return (
        <GradientBackground style={{ flex: 1 }}>

            {/* HEADER */}
            <Header title="Profile" navigation={navigation} />

            <View style={{ flex: 1, margin: 20, justifyContent: 'center' }}>

                {/* PROFILE CARD */}
                <View style={styles.card}>
                    <Image
                        source={{
                            uri:
                                userDetail?.profile_pic ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        }}
                        style={styles.avatar}
                    />

                    <Text style={styles.name}>
                        {userDetail?.full_name}
                    </Text>

                    <Text style={styles.phone}>
                        {userDetail?.phone_no}
                    </Text>
                </View>

                {/* DETAILS CARD */}
                <View style={styles.detailCard}>
                    <Item label="Email" value={userDetail?.email} />
                    <Item label="PAN" value={userDetail?.pan_card_no} />
                    <Item label="Aadhaar" value={userDetail?.aadhar_card_no} />
                </View>

            </View>
        </GradientBackground>
    );
};

const Item = ({ label, value }: any) => (
    <View style={{ marginBottom: 15 }}>
        <Text style={{ color: "#888", fontSize: 12 }}>{label}</Text>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {value || "-"}
        </Text>
    </View>
);

export default ProfileScreen;