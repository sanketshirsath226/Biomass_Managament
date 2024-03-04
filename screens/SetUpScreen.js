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
import {clearErrors, loadUser, loginUser, registerUser, updateProfile} from "../action/userAction";
import {UPDATE_PROFILE_RESET} from "../constants/userConstants";

const SetUpScreen = ({ navigation: { navigate } }) => {


    const dispatch = useDispatch();

    const { isAuthenticated, message,user,token } = useSelector((state) => state.user);

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [name,setName] = useState("");
    const [role,setRole]  =useState("harvester");
    const [location, setLocation] = useState("24.58758,71.88882");


    useEffect(() => {
        if(!user || !isAuthenticated){

        }
    }, [useDispatch,isAuthenticated,message]);


    useEffect(() => {
        if (error) {
            console.log(error)
            dispatch(clearErrors());
        }
        if (isUpdated && token) {
            console.log("Profile Updated");
            dispatch(loadUser(token));
            if(user.role === 'harvester'){
                navigate('Dashboard')
                return
            }
            if(user.role === 'refinery'){
                navigate('Dashboard')
                return
            }

            if(user.role === 'depot'){
                navigate('Dashboard')
                return
            }
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
    }, [dispatch, user, error, isUpdated]);


    const onHandleSubmit = async (e) => {
    //     if(password !== confirmPassword){
    //         return;
    //     }
    //     await dispatch(registerUser(email,mobile,password));

        const locationMap = location.split(",");

        await dispatch(updateProfile(name,role,{
            'longitude' : locationMap[0],
            'latitude' : locationMap[1]
        },token));
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
                            marginVertical: Spacing * 4,
                        }}
                    >
                        Set Up Profile
                    </Text>
                    <Text
                        style={{
                            fontFamily: Font["poppins-regular"],
                            fontSize: FontSize.small,
                            maxWidth: "80%",
                            textAlign: "center",
                        }}
                    >
                        Please Update Profile
                    </Text>
                </View>
                <View
                    style={{
                        marginVertical: Spacing * 3,
                    }}
                >

                    <AppTextInput name="name" placeholder="Full Name" value={name}  onChangeText = {(text) =>{
                        setName(text)
                    }} />
                    <AppTextInput name="role" placeholder="Role" value={role}  onChangeText = {(text) =>{
                        setRole(text)
                    }} />
                    <AppTextInput name={"location"} placeholder="Location (Longtitude , Latitiude)" value={location}  onChangeText = {(text) =>{
                        setLocation(text)
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
                        Set Up Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default SetUpScreen;
