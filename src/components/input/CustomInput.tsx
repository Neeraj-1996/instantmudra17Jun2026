import React from "react";
import {
    View,
    TextInput,
    Text,
    KeyboardTypeOptions,
    TextInputProps,
} from "react-native";
import { Colors } from "../../styles/colors";
import globalStyles from "../../styles/styles";

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: boolean | string;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
    editable?: boolean;

    // NEW PROPS
    autoCorrect?: boolean;
    autoComplete?: TextInputProps["autoComplete"];
    importantForAutofill?: "auto" | "no" | "noExcludeDescendants" | "yes" | "yesExcludeDescendants";
}

const CustomInput: React.FC<Props> = ({
    value,
    onChangeText,
    placeholder,
    error,
    autoCapitalize = "none",
    keyboardType = "default",
    maxLength,
    editable = true,

    // DEFAULT VALUES
    autoCorrect = false,
    autoComplete = "off",
    importantForAutofill = "no",
}) => {
    return (
        <View style={{ width: "100%", marginBottom: 15 }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.black}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                maxLength={maxLength}
                editable={editable}

                // ADDED
                autoCorrect={autoCorrect}
                autoComplete={autoComplete}
                importantForAutofill={importantForAutofill}

                style={[
                    globalStyles.input,
                    error && { borderColor: "red" }
                ]}
            />

            {error && (
                <Text style={globalStyles.errorText}>
                    {typeof error === "string"
                        ? error
                        : "Mandatory field"}
                </Text>
            )}
        </View>
    );
};

export default CustomInput;