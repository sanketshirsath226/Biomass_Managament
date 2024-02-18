import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";

const SubsidyCard = ({ styles, subsidyName, info, onPress }) => {
    const stringTruncate = function(str, length){
        const dots = str.length > length ? '...' : '';
        return str.substring(0, length)+dots;
    };
    return (
        <View style={cardStyles.card}>
            <Text style={styles.title}>{subsidyName}</Text>
            <Text style={styles.info}>{stringTruncate(info,30)}</Text>
            <TouchableOpacity style={styles.learnButton} onPress={onPress}>
                <Text style={styles.buttonText}>Learn</Text>
            </TouchableOpacity>
        </View>
    );
};

const cardStyles = StyleSheet.create({
    card: {
        width: 200,
        height : 150,
        flexDirection : 'column',
        backgroundColor: '#fff',
        shadowColor: '#000',
        justifyContent : "space-between" ,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderRadius: 8,
        padding: 20,
        overflow : "visible" ,
        marginBottom: 15,
        marginHorizontal: 5,
    },
})
export default SubsidyCard
