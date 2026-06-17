import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from "react-native";
import Header from "../../components/header/Header";
import styles from "./styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getNotifications, readNotification } from "../../redux/slices/userSlice";
import { useIsFocused } from "@react-navigation/native";
import Loader from "../../components/loader/Loader";
import moment from "moment";

const NotificationScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();

    const isFocused = useIsFocused();

    const {
        notifications,
        notificationLoading,
    } = useAppSelector(state => state.user);

    useEffect(() => {

        if (isFocused) {

            dispatch(getNotifications());
        }

    }, [isFocused]);

    const markAsRead = async (item: any) => {

        if (item?.reed_status === 1) {
            return;
        }

        const res = await dispatch(
            readNotification(item.id)
        );

        console.log("READ RESPONSE", res);

        dispatch(getNotifications());
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => markAsRead(item)}
        >
            {item?.reed_status === 0 && (
                <View style={styles.dot} />
            )}

            <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.message}>{item.body}</Text>
                <Text style={styles.time}>{moment(item?.created_at).format("DD MMM YYYY, hh:mm A")}</Text>

            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header title="Notifications" navigation={navigation} />
            {notificationLoading ? (

                <Loader showLoader={true} />

            ) : (

                <FlatList
                    data={notifications}
                    renderItem={renderItem}
                    keyExtractor={(item: any) =>
                        item.id.toString()
                    }
                    contentContainerStyle={
                        styles.listContainer
                    }
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            No Notifications
                        </Text>
                    }
                />
            )}
        </View>
    );
};

export default NotificationScreen;