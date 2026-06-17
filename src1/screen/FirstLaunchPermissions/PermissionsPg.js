import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Platform } from 'react-native';
import CustomCheckBox from '../../components/Checkbox/Checkbox';



const PermissionsPg = (props) => {

    const [isCheck, setisCheck] = useState(false);


    const GoNext = () => {
        if (isCheck == true) {
            props.navigation.replace('wv') // wv: web view privacy policy
        } else {
            alert('Please accept our mandatory permissions to continue.')
        }

    }

    return (
        <ScrollView>

            <View style={{ justifyContent: "center", marginTop: '30%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 25, color: "#000", marginTop: 10, }}>Mandatory Permissions</Text>


                <View>
                    <Text style={{ alignSelf: "center", marginTop: 5, fontSize: 18, color: "#000" }}>Personal Information</Text>
                    <Text style={{ alignSelf: "center", margin: 5, textAlign: "center", color: '#272829' }}>This app collects personal information, including name, mobile, number, and email address. This information is required as a part of the registration process to access our services. This App also collects mobile number for verifications to check the active SIM status on the device, uniquely identify you and prevent frauds and unauthorised access. </Text>
                </View>



                <View>
                    <Text style={{ alignSelf: "center", marginTop: 5, fontSize: 18, color: "#000" }}>Camera Information</Text>
                    <Text style={{ alignSelf: "center", margin: 5, textAlign: "center", color: '#272829' }}>This app need camera access so that you can easily scan or capture rerquired documents and save time by allowing us to auto-fill relevant data and initiate. </Text>
                </View>



                <View style={{ flexDirection: "row", marginTop: 20, margin: 10 }}>
                    <View style={{  margin: 4 }}>
 <CustomCheckBox isChecked={isCheck} onToggle={() => setisCheck(!isCheck)} />
                    </View>
                                   
                    {/* <CheckBox
                        value={isCheck}
                        onValueChange={() => setisCheck(!isCheck)}
                        style={styles.checkbox}
                        tintColors={{ true: 'green', false: '#272829' }}
                    /> */}

                    <Text style={{ marginTop: 5, color: '#272829', fontSize: 15 }}>By continuing you agree to our mandatory permissions.</Text>

                </View>

                <View style={{ flexDirection: "row", alignSelf: "center", margin: 20, }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => BackHandler.exitApp()}>

                        <View style={{ width: 160, height: 50, elevation: 4, backgroundColor: '#fff', justifyContent: "center", borderRadius: 5, }}>
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: 'bold', color: 'red' }}>
                                I Disagree
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} onPress={GoNext}>


                        <View style={{ width: 160, height: 50, elevation: 4, backgroundColor: '#fff', justifyContent: "center", borderRadius: 5, marginLeft: 20 }}>
                            <Text style={{ alignSelf: "center", fontSize: 18, fontWeight: 'bold', color: 'green' }}>
                                I Agree
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>

            </View>
        </ScrollView>

    )
}

export default PermissionsPg
const styles = StyleSheet.create({


    checkbox: {
        // alignSelf: 'center',
    },

})




