import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import styles from './style'
import GradientBackground from "../../../components/gradient/GradinetBackgorund";
import { Colors } from "../../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getUserDetail, logoutUser } from "../../../redux/slices/userSlice";
import { MenuItems } from "./menuItems";

const CustomDrawer = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const { userDetail } = useAppSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserDetail());
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {/*  HEADER */}
            <GradientBackground style={styles.header}>

                <TouchableOpacity
                    style={styles.profileRow}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("ProfileScreen")}
                >
                    <Image
                        source={{
                            uri:
                                userDetail?.profile_pic ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        }}
                        style={styles.avatar}
                    />

                    <View>
                        <Text style={styles.name}>
                            {userDetail?.full_name || "User"}
                        </Text>

                        <Text style={styles.subName}>
                            {userDetail?.phone_no || ""}
                        </Text>
                    </View>
                </TouchableOpacity>

            </GradientBackground>

            {/*  MENU */}
            <View style={styles.menuContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {MenuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => {
                                if (item.type === "screen") {
                                    navigation.navigate(item.route);
                                }

                                else if (item.type === "web") {
                                    navigation.navigate("WebViewScreen", {
                                        url: item.url,
                                        title: item.label,
                                    });
                                }

                                else if (item.type === "action") {

                                    Alert.alert(
                                        "Logout",
                                        "Are you sure you want to logout?",
                                        [
                                            { text: "Cancel", style: "cancel" },
                                            {
                                                text: "Yes",
                                                onPress: async () => {
                                                    await dispatch(logoutUser());

                                                    navigation.reset({
                                                        index: 0,
                                                        routes: [{ name: "OnboardingScreen" }],
                                                    });
                                                },
                                            },
                                        ]
                                    );

                                }
                            }}
                        >
                            <Image
                                source={item.icon}
                                style={styles.menuIcon}
                            />

                            <Text style={styles.menuText}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    {/* VERSION */}
                    <View style={styles.versionRow}>
                        <Text style={styles.versionText}>
                            App Version: <Text style={{ color: "green" }}>67.8.6</Text>
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View >
    );
};

export default CustomDrawer;