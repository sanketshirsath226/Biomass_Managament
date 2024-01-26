import React, {useEffect, useState} from "react";
import {View, Text, Button, SafeAreaView, ImageBackground, Dimensions, TouchableOpacity} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import LottieView from "lottie-react-native";

const { height } = Dimensions.get("window");

const ResultScreen = ({ route , navigation: { navigate } }) => {
    // const [state, setState] = useState(false);
    const {success, message,title} = route.params.result

    useEffect(() => {
            if(success) {
                console.log('/Dashboard')
            }else{
                navigate('Login')
            }
    }, [success]);
    return (
        <SafeAreaView>
            <View className={'h-full justify-center '}>
                {(success)?  <LottieView style={{
                    height: height / 4,
                }}   source={require('../assets/animation/Success.json')} autoPlay loop />  :
                    <LottieView style={{
                        height: height / 4,
                    }} source={require('../assets/animation/Error.json')} autoPlay loop />
                }
                <View
                    style={{
                        paddingHorizontal: Spacing * 4,
                        paddingTop: Spacing * 4,
                    }}
                >
                    <Text
                        style={{
                            fontSize: FontSize.xLarge,
                            color: Colors.primary,
                            fontFamily: Font["poppins-bold"],
                            textAlign: "center",
                        }}
                    >
                        {title}
                    </Text>

                    <Text
                        style={{
                            fontSize: FontSize.medium,
                            color: Colors.darkGray,
                            fontFamily: Font["poppins-semiBold"],
                            textAlign: "center",
                        }}
                    >
                        {message}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigate("PopMessage",{result : {
                                success : true,
                                title : 'Success',
                                message : 'Congratulation! You have been successfully authenticated'
                            }})}
                        style={{
                            padding: Spacing * 2,
                            backgroundColor: Colors.primary,
                            marginVertical: Spacing * 5,
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
            </View>
        </SafeAreaView>
    );
};

export default ResultScreen;
