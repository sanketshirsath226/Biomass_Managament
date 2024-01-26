import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, {useEffect, useState} from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { Ionicons } from "@expo/vector-icons";

import AppTextInput from "../components/AppTextInput";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "../action/userAction";

const RegisterScreen = ({ navigation: { navigate } }) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    /*
    TODO NEED TO FIX MOBILE NO BUG
    1. APPEND MOBILE NUMBER WITH +91
    */
    const [mobile,setMobile] = useState("+91")
    const [confirmPassword , setConfirmPassword] = useState("");
    const dispatch = useDispatch();

    const { loading, isAuthenticated, error, message } = useSelector((state) => state.user);


    useEffect(() => {
        if(isAuthenticated && message){
            console.log(message)
            navigate('Otp',{ data : {
                    email,
                }});
        }
    }, [useDispatch,isAuthenticated,message]);



    // TODO : Need to Change the OnHandleChange to dynamically update according to the name tag
    // const onHandleChange = (e) =>{
    //     console.log(e)
    //     switch (e.name){
    //         case "email" :
    //             setEmail(e.target.value);
    //             break;
    //         case "password":
    //             setPassword(e.target.value);
    //             break;
    //         case "confirm Password":
    //             setConfirmPassword(e.target.value);
    //             break;
    //     }
    // }

    const onHandleSubmit = async (e) => {
        if(password !== confirmPassword){
            return;
        }
        await dispatch(registerUser(email,mobile,password));
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    padding: Spacing * 2,
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: FontSize.xLarge,
                            color: Colors.primary,
                            fontFamily: Font["poppins-bold"],
                            marginVertical: Spacing * 3,
                        }}
                    >
                        Create account
                    </Text>
                    <Text
                        style={{
                            fontFamily: Font["poppins-regular"],
                            fontSize: FontSize.small,
                            maxWidth: "80%",
                            textAlign: "center",
                        }}
                    >
                        Create an account so you can explore all the existing jobs
                    </Text>
                </View>
                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}
                >

                    <AppTextInput name="email" placeholder="Email" value={email}  onChangeText = {(text) =>{
                        setEmail(text)
                    }} />
                    <AppTextInput name="mobile" placeholder="Mobile No" value={mobile}  onChangeText = {(text) =>{
                        setMobile(text)
                    }} />
                    <AppTextInput name={"password"} placeholder="Password" value={password} key={'password'} onChangeText = {(text) =>{
                        setPassword(text)
                    }} />
                    <AppTextInput name={"confirm Password"}  placeholder="Confirm Password" value={confirmPassword} onChangeText = {(text) =>{
                        setConfirmPassword(text)
                    }} />


                </View>

                <TouchableOpacity
                    onPress={onHandleSubmit}
                    style={{
                        padding: Spacing * 2,
                        backgroundColor: Colors.primary,
                        marginVertical: Spacing * 3,
                        borderRadius: Spacing,
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
                        Sign up
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate("Login")}
                    style={{
                        padding: Spacing,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: Font["poppins-semiBold"],
                            color: Colors.text,
                            textAlign: "center",
                            fontSize: FontSize.small,
                        }}
                    >
                        Already have an account
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: Font["poppins-semiBold"],
                            color: Colors.primary,
                            textAlign: "center",
                            fontSize: FontSize.small,
                        }}
                    >
                        Or continue with
                    </Text>

                    <View
                        style={{
                            marginTop: Spacing,
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: Colors.gray,
                                borderRadius: Spacing / 2,
                                marginHorizontal: Spacing,
                            }}
                        >
                            <Ionicons
                                name="logo-google"
                                color={Colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: Colors.gray,
                                borderRadius: Spacing / 2,
                                marginHorizontal: Spacing,
                            }}
                        >
                            <Ionicons
                                name="logo-apple"
                                color={Colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: Colors.gray,
                                borderRadius: Spacing / 2,
                                marginHorizontal: Spacing,
                            }}
                        >
                            <Ionicons
                                name="logo-facebook"
                                color={Colors.text}
                                size={Spacing * 2}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;
