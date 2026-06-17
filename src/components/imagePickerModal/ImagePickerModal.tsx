import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";

interface Props {
    visible: boolean;
    onClose: () => void;
    onCameraPress: () => void;
    onGalleryPress: () => void;
}

const ImagePickerModal: React.FC<Props> = ({
    visible,
    onClose,
    onCameraPress,
    onGalleryPress,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>

                            <Text style={styles.title}>
                                Select Image
                            </Text>

                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={onCameraPress}
                            >
                                <Text style={styles.optionText}>
                                    Open Camera
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.optionButton}
                                onPress={onGalleryPress}
                            >
                                <Text style={styles.optionText}>
                                    Open Gallery
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={onClose}
                            >
                                <Text style={styles.cancelText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ImagePickerModal;

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    modalContainer: {
        width: "100%",
        backgroundColor: "#FFF",
        borderRadius: 22,
        padding: 22,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#000",
        marginBottom: 22,
        textAlign: "center",
    },

    optionButton: {
        height: 52,
        borderRadius: 14,
        backgroundColor: "#F3F6FF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
    },

    optionText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#3D5CFF",
    },

    cancelButton: {
        height: 50,
        borderRadius: 14,
        backgroundColor: "#FFECEC",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },

    cancelText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#FF3B30",
    },
});