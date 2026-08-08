import React, { use, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "react-native-image-picker";
import { Camera, GirlIconCamera, PdfIcon } from "../../assets/images";
import styles from "./DocumentScreen.styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { submitLoanDocuments } from "../../redux/slices/userSlice";
import Loader from "../../components/loader/Loader";
import usePermissions from "../../hooks/usePermissions";

import { pick, types } from '@react-native-documents/picker';
import CustomInput from "../../components/input/CustomInput";

const DocumentScreen: React.FC = ({ navigation, route }: any) => {
    const { loanAmount } = route.params;

    const [selfie, setSelfie] = useState<Asset | null>(null);
    const [errors, setErrors] = useState<{
        selfie?: boolean;
        bank?: boolean;
        salary?: boolean;
    }>({});

    const [bankStatement, setBankStatement] = useState<any>(null);
    const [salarySlip1, setSalarySlip1] = useState<any>(null);
    const [salarySlip2, setSalarySlip2] = useState<any>(null);
    const [salarySlip3, setSalarySlip3] = useState<any>(null);
    const [bankStatementPin, setBankStatementPin] = useState("");
    const [salarySlipPin, setSalarySlipPin] = useState("");
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.user);

    const { takePhoto } = usePermissions();
    const handleTakePhoto = async () => {

        const response = await takePhoto();

        if (response.success && response.asset) {

            setSelfie(response.asset);

        }
    };
    const pickDocument = async (type: 'bank' | 'salary') => {
        try {
            const result = await pick({
                type: [types.pdf],
                allowMultiSelection: type === 'salary',
            });

            if (type === 'bank') {
                setBankStatement(result[0]);
            }
        } catch (err) {
            console.log('User cancelled or error', err);
        }
    };

    const pickSalarySlip = async (setFile: any) => {
        try {
            const result = await pick({
                type: [types.pdf],
            });

            setFile(result[0]);
        } catch (err) {
            console.log('Cancelled or error', err);
        }
    };


    const handleNext = () => {
        let newErrors: any = {};

        if (!selfie) newErrors.selfie = true;
        if (!bankStatement) newErrors.bank = true;

        if (!salarySlip1 && !salarySlip2 && !salarySlip3) {
            newErrors.salary = true;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        dispatch(
            submitLoanDocuments({
                loanAmount,
                bankStatement,
                salarySlip1,
                salarySlip2,
                salarySlip3,
                selfie,
                bankStatementPin,
                salarySlipPin,
            })
        )
            .unwrap()
            .then((res) => {
                // console.log(
                //     "Loan Apply Response:",
                //     JSON.stringify(res, null, 2)
                // );

                // Success
                if (
                    res?.status === true &&
                    res?.message === "Loan applied successfully"
                ) {
                    navigation.replace("SuccessScreen", {
                        orderId: res?.data?.order_id,
                    });
                    return;
                }

                // API returned failure
                Alert.alert(
                    "Submission Failed",
                    res?.message ||
                    "Something went wrong. Please resubmit the form."
                );
            })
            .catch((err) => {
                // console.log("Loan Apply Error:", err);

                Alert.alert(
                    "Submission Failed",
                    typeof err === "string"
                        ? err
                        : err?.message ||
                        "Something went wrong. Please resubmit the form."
                );
            });
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>


                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Document</Text>
                </View>

                <Loader showLoader={loading} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Content */}
                    <View style={styles.content}>

                        {/* Bank Statement */}
                        <Text style={styles.sectionTitle}>Bank Statement</Text>
                        <View style={styles.divider} />

                        {/* <View style={styles.centerBox}> */}
                        {/* <Image source={PdfIcon} style={styles.pdfIcon} /> */}
                        <TouchableOpacity onPress={() => pickDocument('bank')}>
                            <View style={[
                                styles.centerBox,
                                errors.bank && { borderColor: 'red', borderWidth: 1.5 }
                            ]}>
                                <Image source={PdfIcon} style={styles.pdfIcon} />
                                {bankStatement && (
                                    <Text style={{ marginTop: 10 }}>
                                        {bankStatement.name}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                        {/* </View> */}


                        <CustomInput
                            value={bankStatementPin}
                            onChangeText={setBankStatementPin}
                            placeholder="Enter Bank Statement PIN (Optional)"
                        // keyboardType="numeric"
                        />
                        {/* Salary Slips */}
                        <Text style={styles.sectionTitle}>Salary Slips</Text>

                        <View style={styles.row}>

                            {/* Salary Slip 1 */}
                            <View style={{ width: "48%" }}>
                                <TouchableOpacity onPress={() => pickSalarySlip(setSalarySlip1)}>
                                    <View style={[
                                        styles.smallBox,
                                        errors.salary && { borderColor: 'red', borderWidth: 1.5 }
                                    ]}>
                                        <Image source={PdfIcon} style={styles.pdfIconSmall} />
                                        <Text style={styles.label}>
                                            {salarySlip1 ? salarySlip1.name : "Salary Slip 1"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* Salary Slip 2 */}
                            <View style={{ width: "48%" }}>
                                <TouchableOpacity onPress={() => pickSalarySlip(setSalarySlip2)}>
                                    <View style={[
                                        styles.smallBox,
                                        errors.salary && { borderColor: 'red', borderWidth: 1.5 }
                                    ]}>
                                        <Image source={PdfIcon} style={styles.pdfIconSmall} />
                                        <Text style={styles.label}>
                                            {salarySlip2 ? salarySlip2.name : "Salary Slip 2"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>

                        {/* Salary Slip 3 */}
                        <TouchableOpacity onPress={() => pickSalarySlip(setSalarySlip3)}>
                            <View style={[styles.centerBoxSmall, errors.salary && { borderColor: 'red', borderWidth: 1.5 }]} >
                                <Image source={PdfIcon} style={styles.pdfIconSmall} />
                                <Text style={styles.label}>
                                    {salarySlip3 ? salarySlip3.name : "Salary Slip 3"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ marginTop: 10 }}>
                            <CustomInput
                                value={salarySlipPin}
                                onChangeText={setSalarySlipPin}
                                placeholder="Enter Salary Slip PIN (Optional)"
                            // keyboardType="ph"

                            />
                        </View>

                        {/* ================= SELFIE ================= */}
                        <Text style={styles.selfieText}>Upload Your Selfie</Text>

                        <TouchableOpacity onPress={handleTakePhoto}>
                            <View
                                style={[
                                    styles.selfieContainer,
                                    errors.selfie && styles.errorBorder,
                                ]}
                            >
                                {selfie ? (
                                    <Image source={{ uri: selfie.uri }} style={styles.selfie} />
                                ) : (
                                    <>
                                        <Image source={GirlIconCamera} style={styles.selfie} />
                                        <View style={styles.overlay} />
                                        <Image source={Camera} style={styles.cameraIcon} />
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>


                        {/* Button */}

                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>
                                {loading ? "Uploading..." : "Done"}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default DocumentScreen;