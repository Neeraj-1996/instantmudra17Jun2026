import React from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import globalStyles from "../../styles/styles";
import { Colors } from "../../styles/colors";
import { Fonts } from "../../styles/fonts";

const CustomDropdown = ({
    data,
    value,
    onChange,
    placeholder,
    error,
}: any) => {
    return (
        <View style={{ width: "100%", marginBottom: 15, zIndex: 999 }}>
            <Dropdown
                style={[
                    globalStyles.dropdown,
                    error && { borderColor: "red" }
                ]}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={value}
                onChange={(item) => onChange(item.value)}
                placeholderStyle={{ color: "#000", fontFamily: Fonts.REGULAR, fontSize: 14 }}
                selectedTextStyle={{ color: "#000" }}
            />

            {error && (
                <Text style={globalStyles.errorText}>
                    Mandatory field
                </Text>
            )}
        </View>
    );
};

export default CustomDropdown;

