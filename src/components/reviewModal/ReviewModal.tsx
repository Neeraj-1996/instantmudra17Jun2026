import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    Button,
    Alert,
} from "react-native";
import { BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCheckbox from "../checkbox/CustomCheckbox";
import styles from "./ReviewModal.styles";

// import { BASE_URL } from "../../utils";
import { EmtyCheckCox, FillCheckBox } from "../../assets/images";
import { getResons, userLoginReason } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/hooks";

interface Reason {
    id: number;
    name: string;
}

interface ReviewModalProps {
    visible: boolean;
    onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
    visible,
    onClose,
}) => {
    const [reasons, setReasons] = useState<Reason[]>([]);
    const [selectedReasonId, setSelectedReasonId] = useState<number | null>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchReasons = async () => {
            try {
                const response: any = await dispatch(
                    getResons()
                ).unwrap();

                if (response?.status === true) {
                    setReasons(response?.data);
                }
            } catch (error) {
                console.error(
                    "Error fetching reasons:",
                    error
                );
            }
        };

        fetchReasons();
    }, [dispatch]);

    // Toggle checkbox
    const handleCheckboxChange = (id: number) => {
        setSelectedReasonId((prev) => (prev === id ? null : id));
    };
    const handleSubmit = async () => {
        try {
            const selectedReason = reasons.find(
                (reason) => reason.id === selectedReasonId
            );

            if (!selectedReason) {
                Alert.alert("Please select a reason");
                return;
            }

            const payload = {
                reasons: selectedReason.name,
                msg: "User clicked back from loan flow",
            };


            const response = await dispatch(
                userLoginReason(payload)
            ).unwrap();

            console.log("REASON API RESPONSE:", response);

            // Show success alert
            Alert.alert(
                "Success",
                "Reason submitted successfully",
                [
                    {
                        text: "OK",
                        onPress: () => BackHandler.exitApp(),
                    },
                ],
                { cancelable: false }
            );

        } catch (error) {
            console.error("Error submitting reason:", error);

            Alert.alert(
                "Error",
                "Something went wrong. Please try again."
            );
        }
    };


    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>
                        Why are you leaving?
                    </Text>

                    {reasons.map((reason) => (
                        <View
                            key={reason.id}
                            style={styles.reasonContainer}
                        >
                            <CustomCheckbox
                                value={selectedReasonId === reason.id}
                                onChange={() => handleCheckboxChange(reason.id)}
                                checkedImage={FillCheckBox}
                                uncheckedImage={EmtyCheckCox}
                            />
                            <Text style={styles.reasonText}>
                                {reason.name}
                            </Text>
                        </View>
                    ))}

                    <View style={styles.buttonContainer}>
                        <Button title="Submit" onPress={handleSubmit} />

                        <Button
                            title="Cancel"
                            onPress={onClose}
                            color="#ff5733"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ReviewModal;