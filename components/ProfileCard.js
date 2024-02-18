import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, Platform, StatusBar} from 'react-native';
import {useSelector} from "react-redux";
import Spacing from "../constants/Spacing";
import {SafeAreaProvider} from "react-native-safe-area-context";
export const ProfileCard = () => {
    const { loading, isAuthenticated, error, user,token } = useSelector((state) => state.user);

    useEffect(() => {
        if(user){
            console.log(user.mobile)
        }
    }, []);
    return (
        <View style={styles.box}>
            <View style={styles.group}>
                <View style={styles.overlapGroup}>
                    <Image source={require('../assets/Ellipse 11.png')} style={styles.ellipse} />
                    <View style={styles.overlap}>
                        <View style={styles.div}>
                            <Text style={styles.textWrapper}>{(user)?user.name:""}</Text>
                            <Text style={styles.textWrapper2}>{(user)?user.mobile:""}</Text>
                            <Text style={styles.textWrapper3}>{(user)?user.email:""}</Text>
                            <Text style={styles.textWrapper4}>{(user)?user.role:""}</Text>
                            <Image source={require('../assets/Group 883.png')} style={styles.img} />
                        </View>
                        <Image source={require('../assets/Vector.png')} style={styles.vector} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + Spacing : null,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row' ,
        justifyContent:'space-between'
    },
    box: {
        height: 148,
        width: '100%',
    },
    group: {
        height: 148,
        left: 0,
        position: 'absolute',
        top: 30,
        width:'100%',
    },
    overlapGroup: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        height: 148,
        position: 'relative',
        width: 430,
    },
    ellipse: {
        height: 112,
        left: 13,
        objectFit: 'cover',
        position: 'absolute',
        top: 24,
        width: 112,
    },
    overlap: {
        height: 100,
        left: 138,
        position: 'absolute',
        top: 24,
        width: 289,
    },
    div: {
        height: 100,
        left: 0,
        position: 'absolute',
        top: 0,
        width: 289,
    },
    textWrapper: {
        color: '#000000',
        fontFamily: 'Inter-SemiBold',
        fontSize: 24,
        fontWeight: '600',
        height: 30,
        left: 0,
        letterSpacing: 0,
        // lineHeight: 'normal',
        position: 'absolute',
        top: 0,
        width: 248,
    },
    textWrapper2: {
        color: '#000000',
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        fontWeight: '600',
        height: 30,
        left: 37,
        letterSpacing: 0,
        // lineHeight: 'normal',
        position: 'absolute',
        top: 47,
        width: 107,
    },
    textWrapper3: {
        color: '#000000',
        fontFamily: 'Inter-SemiBold',
        fontSize: 15,
        fontWeight: '600',
        height: 30,
        left: 30,
        letterSpacing: 0,
        // lineHeight: 'normal',
        // position: 'absolute',
        top: 75,
        width: 252,
    },
    textWrapper4: {
        color: '#000000',
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        fontWeight: '700',
        height: 30,
        left: 0,
        letterSpacing: 0,
        // lineHeight: 'normal',
        opacity: 0.75,
        position: 'absolute',
        top: 24,
        width: 132,
    },
    img: {
        height: 24,
        left: 0,
        position: 'absolute',
        top: 49,
        width: 24,
    },
    vector: {
        height: 16,
        left: 4,
        position: 'absolute',
        top: 79,
        width: 20,
    },
});

export default ProfileCard;
