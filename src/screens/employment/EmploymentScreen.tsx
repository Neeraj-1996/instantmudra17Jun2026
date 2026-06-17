import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
} from "react-native";

import styles from "./Employment.styles";
import GradientButton from "../../components/button/Button";
import { Kyc } from "../../assets/images";
import { globalStyles } from "../../styles/globalStyles";
import CustomDropdown from "../../components/input/CustomDropdown";
import CustomInput from "../../components/input/CustomInput";
import { getBankFromIfsc, getUserStatus, submitEmployment } from "../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
import { handleUserNavigation } from "../../utils/navigationHelper";

type FormType = {
    employmentType: string | null;
    companyName: string;
    salary: string;
    salarySlip: string | null;
    address: string;
    // pincode: string;
    // city: string;
    accountNumber: string;
    ifsc: string;
    bankName: string;
    accountType: string;
    accountHolderName: string;
};

const EmploymentScreen = ({ navigation }: any) => {

    const [form, setForm] = useState<FormType>({
        employmentType: null,
        companyName: "",
        salary: "",
        salarySlip: null,
        address: "",
        // pincode: "",
        // city: "",
        accountNumber: "",
        ifsc: "",
        bankName: "",
        accountType: "",
        accountHolderName: "",
    });

    const [errors, setErrors] = useState<any>({});
    const accountTypeData = [
        { label: "Savings", value: "savings" },
        { label: "Current", value: "current" },
        { label: "Salaried", value: "salaried" },
    ];


    const yesNoData = [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
    ];
    const employmentData = [
        { label: "Salaried", value: "salaried" },
        { label: "Self Employed", value: "self_employee" },
    ];

    const handleChange = <K extends keyof FormType>(
        key: K,
        value: FormType[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const dispatch = useAppDispatch();
    const { bankDetails } = useAppSelector((state) => state.user)

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        try {

            setLoading(true);

            let newErrors: any = {};

            if (!form.employmentType) newErrors.employmentType = true;
            if (!form.companyName) newErrors.companyName = true;
            if (!form.salary) newErrors.salary = true;
            if (!form.salarySlip) newErrors.salarySlip = true;
            if (!form.address) newErrors.address = true;
            // if (!form.pincode) newErrors.pincode = true;
            // if (!form.city) newErrors.city = true;
            if (!form.accountNumber) newErrors.accountNumber = true;
            if (!form.ifsc) newErrors.ifsc = true;
            if (!form.bankName) newErrors.bankName = true;
            if (!form.accountType) newErrors.accountType = true;
            if (!form.accountHolderName) newErrors.accountHolderName = true;

            setErrors(newErrors);

            if (Object.keys(newErrors).length > 0) {
                return;
            }

            const payload = {
                employement_type: form.employmentType,
                company_name: form.companyName,
                take_home_salary: form.salary,
                salary_slip: form.salarySlip,
                company_address: form.address,
                bank_name: form.bankName,
                account_number: form.accountNumber,
                ifsc_code: form.ifsc,
                account_type: form.accountType,
                account_holder_name: form.accountHolderName,
            };

            const res = await dispatch(
                submitEmployment(payload)
            ).unwrap();
            const resUser = await dispatch(
                getUserStatus()
            ).unwrap();

            handleUserNavigation(
                navigation,
                resUser.user_status
            );

        } catch (err) {

            console.log(
                "EMPLOYMENT FAILED ",
                err
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {
        if (bankDetails) {
            handleChange("bankName", bankDetails.BANK || "");
        }
    }, [bankDetails]);

    return (
        <ScreenWrapper scroll showBack>
            <View style={globalStyles.centerBox}>
                {/* Back */}

                {/* Top Image */}
                <Image source={Kyc} style={styles.topImage} />

                {/* Title */}
                <Text style={styles.title}>Fill your Employment Details</Text>

                <Text style={styles.subtitle}>
                    We use this to verify your loan eligibility.
                </Text>

                {/* Dropdown (Fake UI like design) */}
                <CustomDropdown
                    data={employmentData}
                    value={form.employmentType}
                    onChange={(val: string) => handleChange("employmentType", val)}
                    placeholder="Employment type"
                    error={errors.employmentType}
                />

                {/* Company Name */}
                <CustomInput
                    value={form.companyName}
                    onChangeText={(val: string) => handleChange("companyName", val)}
                    placeholder="Company Name"
                    error={errors.companyName}
                />


                {/* Salary Row */}
                <View style={styles.row}>
                    <View style={{ width: "30%" }}>
                        <CustomInput
                            value={form.salary}
                            onChangeText={(val: string) => handleChange("salary", val)}
                            placeholder="Salary"
                            keyboardType='number-pad'
                            error={errors.salary}
                        />
                    </View>

                    <View style={{ width: "67%" }}>
                        <CustomDropdown
                            data={yesNoData}
                            value={form.salarySlip}
                            onChange={(val: string) => handleChange("salarySlip", val)}
                            placeholder="Salary slip"
                            error={errors.salarySlip}
                        />
                    </View>
                </View>

                {/* Address */}
                <CustomInput
                    value={form.address}
                    onChangeText={(val: string) => handleChange("address", val)}
                    placeholder="Company Address"
                    error={errors.address}
                />

                {/* <View style={styles.row}>
                    <View style={{ width: "50%" }}>
                        <CustomInput
                            value={form.pincode}
                            onChangeText={(val: string) => handleChange("pincode", val)}
                            placeholder="Pincode"
                            error={errors.pincode}
                            keyboardType='number-pad'
                            maxLength={6}
                        />
                    </View>
                    <View style={{ width: "50%" }}>
                        <CustomInput
                            value={form.city}
                            onChangeText={(val: string) => handleChange("city", val)}
                            placeholder="State/City"
                            error={errors.city}
                        />
                    </View>
                </View> */}

                {/* BANK SECTION */}
                <Text style={styles.sectionTitle}>Fill your Bank Details</Text>

                <Text style={styles.subtitle}>
                    Required for safe and quick disbursal.
                </Text>

                {/* Account Number */}
                <CustomInput
                    value={form.accountNumber}
                    onChangeText={(val: string) => handleChange("accountNumber", val)}
                    placeholder="Enter Bank Account number"
                    keyboardType='number-pad'
                    error={errors.accountNumber}
                />

                {/* IFSC + Bank */}
                <View style={styles.row}>
                    <View style={{ width: "48.5%" }}>
                        <CustomInput
                            value={form.accountHolderName}
                            onChangeText={(val: string) => handleChange("accountHolderName", val)}
                            placeholder="Account Holder Name"
                            error={errors.accountHolderName}
                        />
                    </View>
                    <View style={{ width: "48.5%" }}>
                        <CustomInput
                            value={form.ifsc}
                            onChangeText={(val: string) => {
                                const text = val.toUpperCase();

                                handleChange("ifsc", text);

                                if (text.length === 11) {
                                    dispatch(getBankFromIfsc(text));
                                }
                            }}
                            placeholder="IFSC Code"
                            error={errors.ifsc}
                            autoCorrect={false}
                            autoCapitalize="characters"
                            autoComplete="off"
                            importantForAutofill="no"
                            keyboardType="default"
                        />

                    </View>
                </View>

                <View style={styles.row}>
                    <View style={{ width: "48.5%" }}>
                        <CustomDropdown
                            data={accountTypeData}
                            value={form.accountType}
                            onChange={(val: string) => handleChange("accountType", val)}
                            placeholder="Account Type"
                            error={errors.accountType}
                        />
                    </View>
                    <View style={{ width: "48.5%" }}>
                        <CustomInput
                            value={form.bankName}
                            onChangeText={(val: string) => handleChange("bankName", val)}
                            placeholder="Bank Name"
                            error={errors.bankName}
                        />
                    </View>
                </View>

                {/* Button */}
                <GradientButton
                    title="Continue"
                    onPress={handleSubmit}
                    style={styles.button}
                    loading={loading}
                    disabled={loading}
                />
                {/* <GradientButton
                    title="Continue"
                    onPress={handleSubmit}
                    style={styles.button}
                /> */}
            </View>
        </ScreenWrapper>

    );
};

export default EmploymentScreen;