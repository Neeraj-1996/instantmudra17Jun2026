import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./RefScreen.styles";
import GradientBackground from "../../components/gradient/GradinetBackgorund";
import CustomInput from "../../components/input/CustomInput";
import CustomDropdown from "../../components/input/CustomDropdown";
import { submitReference } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import ScreenWrapper from "../../components/screenWrapper/ScreenWrapper";
const relations = [
    { label: "Father", value: "Father" },
    { label: "Mother", value: "Mother" },
    { label: "Brother", value: "Brother" },
    { label: "Sister", value: "Sister" },
    { label: "Others", value: "Others" },
];
type ReferenceType = {
    name: string;
    phone: string;
    relation: string | null;
    open: boolean;

    errors: {
        name?: boolean;
        phone?: boolean;
        relation?: boolean;
    };
};

const RefScreen: React.FC = ({ navigation }: any) => {
    const [refs, setRefs] = useState<ReferenceType[]>([
        { name: "", phone: "", relation: null, open: false, errors: {} },
        { name: "", phone: "", relation: null, open: false, errors: {} },
        { name: "", phone: "", relation: null, open: false, errors: {} },
        { name: "", phone: "", relation: null, open: false, errors: {} },
    ]);

    const updateRef = <K extends keyof ReferenceType>(
        index: number,
        key: K,
        value: ReferenceType[K]
    ) => {
        const updated = [...refs];
        updated[index][key] = value;
        setRefs(updated);
    };


    const validate = () => {
        let valid = true;

        const updated = refs.map((ref, index) => {
            if (index < 2) {
                const errors = {
                    name: !ref.name,
                    phone: ref.phone.length !== 10,
                    relation: !ref.relation,
                };

                if (errors.name || errors.phone || errors.relation) {
                    valid = false;
                }

                return { ...ref, errors };
            }

            return { ...ref, errors: {} };
        });

        setRefs(updated);
        return valid;
    };

    const isValid = () => {
        return refs.every(
            r => r.name && r.phone.length === 10 && r.relation
        );
    };
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        // navigation.replace("LoanScreen");
        if (!validate()) return;

        const payload = {
            primary_reference_name: refs[0]?.name || "",
            primary_reference_relation: refs[0]?.relation || "",
            primary_reference_phone: refs[0]?.phone || "",

            secondary_reference_name: refs[1]?.name || "",
            secondary_reference_relation: refs[1]?.relation || "",
            secondary_reference_phone: refs[1]?.phone || "",

            third_reference_name: refs[2]?.name || "",
            third_reference_relation: refs[2]?.relation || "",
            third_reference_phone: refs[2]?.phone || "",

            fourth_reference_name: refs[3]?.name || "",
            fourth_reference_relation: refs[3]?.relation || "",
            fourth_reference_phone: refs[3]?.phone || "",
        };

        dispatch(submitReference(payload))
            .unwrap()
            .then((res) => {
                console.log("REFERENCE SUCCESS ", res);
                navigation.replace("LoanScreen");
            })
            .catch((err) => {
                console.log("REFERENCE FAILED ", err);
            });
    };

    return (
        <ScreenWrapper scroll >
            <GradientBackground>

                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={styles.container}>

                        <Text style={styles.title}>Upload References</Text>

                        {refs.map((item, index) => (
                            <View key={index} style={[styles.card, {
                                zIndex: 1000 - index,
                                elevation: 1000 - index,
                            }]}>

                                <Text style={styles.cardTitle}>
                                    Reference {index + 1}
                                </Text>

                                {/* Name */}
                                <CustomInput
                                    value={item.name}
                                    onChangeText={(text: string) =>
                                        updateRef(index, "name", text)
                                    }
                                    placeholder="Enter Name"
                                    error={item.errors?.name}
                                />

                                {/* Relation */}
                                <CustomDropdown
                                    data={relations}
                                    value={item.relation}
                                    onChange={(val: string) =>
                                        updateRef(index, "relation", val)
                                    }
                                    placeholder="Select Relation"
                                    error={item.errors?.relation}
                                />


                                {/* Phone */}

                                <CustomInput
                                    value={item.phone}
                                    onChangeText={(text: string) =>
                                        updateRef(index, "phone", text)
                                    }
                                    keyboardType="phone-pad"
                                    placeholder="Enter Phone"
                                    maxLength={10}
                                    error={item.errors?.phone}
                                />
                            </View>
                        ))}

                        {/* Button */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                // !isValid() && { opacity: 0.5 },
                            ]}
                            onPress={handleSubmit}
                        // disabled={!isValid()}
                        >
                            <Text style={styles.buttonText}>
                                Upload & Save
                            </Text>
                        </TouchableOpacity>

                    </ScrollView>
                </SafeAreaView>

            </GradientBackground>
        </ScreenWrapper>
    );
};

export default RefScreen;