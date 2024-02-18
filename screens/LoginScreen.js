import {
    SafeAreaView, ScrollView,
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
import {loadUser, loginUser} from "../action/userAction";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation: { navigate } }) => {
    const dispatch = useDispatch();

    const { loading, isAuthenticated, error, user,token } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        console.log('Hello')
        await dispatch(loginUser(email, password));
    }

    const getToken = async () =>{
        return await AsyncStorage.getItem("token")
    }

    useEffect(() => {
        const token = getToken()
        console.log(token)
        if(token){
            loadUser(token)
        }
    }, [token]);

    useEffect(() => {
            if(user && isAuthenticated){
                if(!user?.name){
                    console.log('Entered')
                    navigate('SetUp')
                    return
                }
                if(user.role == 'depot'){
                    navigate('Dashboard')
                }else if(user.role == 'harvester'){
                    navigate('Dashboard');
                }else{
                    navigate('Prediction')
                }
            }
    }, [user,dispatch,isAuthenticated]);

    useEffect(() => {
        if(error){
            if(error.status_code === 401){
                console.log(error.message)
            }else if(error.status_code === 402){
                navigate("Otp",{ data : {
                        email,
                    }})
            }else{
                console.log(error.message)
            }
        }
    }, [error,dispatch]);
    return (
        <SafeAreaView>
            <ScrollView
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
                        Login here
                    </Text>
                    <Text
                        style={{
                            fontFamily: Font["poppins-semiBold"],
                            fontSize: FontSize.large,
                            maxWidth: "60%",
                            textAlign: "center",
                        }}
                    >
                        Welcome back you've been missed!
                    </Text>
                </View>
                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}
                >
                    <AppTextInput placeholder="Email" value={email} onChangeText = {(e) =>{
                        setEmail(e)
                    }} />
                    <AppTextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText = {(e) =>{
                        setPassword(e)
                    }} />
                </View>

                <View>
                    <Text
                        style={{
                            fontFamily: Font["poppins-semiBold"],
                            fontSize: FontSize.small,
                            color: Colors.primary,
                            alignSelf: "flex-end",
                        }}
                    >
                        Forgot your password ?
                    </Text>
                </View>

                <TouchableOpacity
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
                    onPress={()=>{
                        handleLogin()
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
                        Sign in
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate("Register")}
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
                        Create new account
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;

