import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from "react-native";
import GradientButton from "../../../components/button/Button";

interface Props {
    visible: boolean;
    onClose: () => void;
    bankForm: {
        accountHolder: string;
        accountNumber: string;
        ifsc: string;
        bankName: string;
    };
    setBankForm?: React.Dispatch<React.SetStateAction<{
        accountHolder: string;
        accountNumber: string;
        ifsc: string;
        bankName: string;
    }>>;
    onVerify: () => void;
    loading?: boolean;
}

const BankVerificationModal: React.FC<Props> = ({
    visible,
    onClose,
    bankForm,
    onVerify,
    loading = false,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback>
                <View style={styles.overlay}>
                    <View style={styles.container}>

                        <Text style={styles.title}>
                            Verify Bank Account
                        </Text>

                        <Text style={styles.subtitle}>
                            Please verify your bank account details before proceeding.
                        </Text>

                        <View style={styles.detailCard}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Account Holder</Text>
                                <Text style={styles.value}>
                                    {bankForm.accountHolder}
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.row}>
                                <Text style={styles.label}>Account Number</Text>
                                <Text style={styles.value}>
                                    {bankForm.accountNumber}
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.row}>
                                <Text style={styles.label}>Bank Name</Text>
                                <Text style={styles.value}>
                                    {bankForm.bankName}
                                </Text>
                            </View>

                            <View style={styles.divider} />

                            <View style={styles.row}>
                                <Text style={styles.label}>IFSC Code</Text>
                                <Text style={styles.value}>
                                    {bankForm.ifsc}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.buttonWrapper, styles.cancelButton]}
                                onPress={onClose}
                            >
                                <Text style={styles.cancelText}>Reject</Text>
                            </TouchableOpacity>

                            <View style={styles.buttonWrapper}>
                                <GradientButton
                                    title="Verify"
                                    onPress={onVerify}
                                    loading={loading}
                                />
                            </View>
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default BankVerificationModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        paddingHorizontal: 20,
    },

    container: {
        backgroundColor: "#FFF",
        borderRadius: 18,
        padding: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
    },

    subtitle: {
        textAlign: "center",
        color: "#666",
        marginTop: 8,
        marginBottom: 20,
        lineHeight: 20,
    },

    detailCard: {
        backgroundColor: "#F8F8F8",
        borderRadius: 12,
        padding: 15,
    },

    row: {
        marginVertical: 8,
    },

    label: {
        fontSize: 13,
        color: "#777",
    },

    value: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        marginTop: 4,
    },

    divider: {
        height: 1,
        backgroundColor: "#E6E6E6",
        marginVertical: 6,
    },

    buttonRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
        gap: 10, // RN >= 0.71
    },

    buttonWrapper: {
        flex: 1,
        height: 48,
    },

    cancelButton: {
        flex: 1,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D32F2F",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },

    cancelText: {
        color: "#D32F2F",
        fontWeight: "600",
        fontSize: 16,
    },

    verifyButton: {
        flex: 1,
        height: 50,
        // marginLeft: 10,
    },
});