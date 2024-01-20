import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import AppTextInput from "../components/AppTextInput";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import OtpNumberInput from "../components/OtpNumberInput";
import { AntDesign } from '@expo/vector-icons';

const OtpScreen = ({ navigation: { navigate } }) => {
    return (
        <SafeAreaView>
            <View
                style={{
                    padding: Spacing * 2,
                    marginTop : Spacing * 2,
                }}
            >
                <TouchableOpacity
                    onPress={() => navigate("Login")}
                >
                <AntDesign name="arrowleft" size={24} color={Colors.darkGray}
                style={{
                    shadowColor: Colors.primary,
                    shadowOffset: {
                        width: 0,
                        height: Spacing,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: Spacing
                }}
                />
                </TouchableOpacity>
                <View
                    style={{
                        alignItems: "flex-start",
                    }}
                >
                    <Text
                        style={{
                            fontSize: FontSize.large,
                            color: Colors.text,
                            marginTop: Spacing * 7,
                            fontFamily: Font["poppins-bold"],
                        }}
                    >
                        Verification Code
                    </Text>
                    <Text
                        style={{
                            fontFamily: Font["poppins-regular"],
                            fontSize: FontSize.xmedium,
                            color : Colors.darkGray,
                            maxWidth: "80%",
                            fontStyle : 'normal',
                            textAlign: "left",
                        }}
                    >
                        We have sent the verification code to your email address
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        marginVertical: Spacing * 3,
                        gap : Spacing * 2
                    }}
                >
                    {[0, 1, 2, 3].map((item, index) => (
                        <OtpNumberInput key={index}/>
                    ))}
                </View>

                <TouchableOpacity
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: Colors.primary,
                        marginVertical: Spacing * 3,
                        borderRadius: Spacing * 5,
                        shadowColor: Colors.primary,
                        shadowOffset: {
                            width: 0,
                            height: Spacing,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: Spacing,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: Font["poppins-bold"],
                            color: Colors.onPrimary,
                            textAlign: "center",
                            fontSize: FontSize.large,
                        }}
                    >
                        Confirm
                    </Text>
                </TouchableOpacity >

            </View>
        </SafeAreaView>
    );
}

export default OtpScreen;

const styles = StyleSheet.create({});
