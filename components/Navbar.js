import React, { useState } from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView, StyleSheet, View, Platform, StatusBar
} from 'react-native';
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Spacing from "../constants/Spacing";
import {useNavigation} from "@react-navigation/native";
const Navbar = ({logo,title,ham}) => {
    const navigation = useNavigation();
    const handleHamPress = () => {
       navigation.navigate('drawer')
    };
    return (
        <>
            <SafeAreaView className={"w-full"} style={styles.AndroidSafeArea}>
                <TouchableOpacity onPress={handleHamPress}>
                    <Image source={ham} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: FontSize.xLarge, color: Colors.dark, fontFamily: Font["poppins-bold"] }}>{title}</Text>
                <Image source={logo} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
            </SafeAreaView>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />
        </>


        );
};
export default Navbar;

const styles = StyleSheet.create({
        AndroidSafeArea: {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing : null,
            backgroundColor: '#f8f8f8',
            flexDirection: 'row' ,
            justifyContent:'space-between'
        }
    }
)
