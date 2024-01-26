import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import AppTextInput from "../components/AppTextInput";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import OtpNumberInput from "../components/OtpNumberInput";
import { AntDesign } from '@expo/vector-icons';
import {loginUser, verifyUser} from "../action/userAction";
import {useDispatch, useSelector} from "react-redux";

const OtpScreen = ({route , navigation: { navigate } }) => {
    const {email} = route.params.data;
    const dispatch = useDispatch();

    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);

    const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
    const [combinedOtp, setCombinedOtp] = useState('');

    useEffect(() => {
        if(user && isAuthenticated){
            navigate("PopMessage",{result : {
                        success : true,
                        title : 'Success',
                        message : 'Congratulation! You have been successfully authenticated'
                        }});
        }
    }, [dispatch,user,isAuthenticated]);

    // useEffect(() => {
    //     if(error){
    //         navigate("PopMessage",{result : {
    //                 success : false,
    //                 title : error.status_code,
    //                 message : error.message
    //         }});
    //     }
    // }, [error,dispatch]);
    const handleOtpChange = (index, value) => {
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = value;
        setOtpDigits(newOtpDigits);

        const newCombinedOtp = newOtpDigits.join('');
        setCombinedOtp(newCombinedOtp);
    };


    const onHandleSubmit = async (e) => {
        await dispatch(verifyUser(email,combinedOtp));
    }
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
                    {
                        otpDigits.map((digit, index) => (
                            <OtpNumberInput
                                key={index}
                                onChangeText={(text) => handleOtpChange(index, text)}
                                value={otpDigits[index]}
                            />
                        ))
                    }
                </View>

                <TouchableOpacity
                    // onPress={() => navigate("PopMessage",{result : {
                    //     success : true,
                    //     title : 'Success',
                    //     message : 'Congratulation! You have been successfully authenticated'
                    //     }})}

                    onPress={ () =>{
                        onHandleSubmit()
                    }}
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
