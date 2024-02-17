import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CommonNavbar = ({ title, leftButton, rightButton }) => {
    return (
        <View style={styles.navbar}>
            {leftButton && <Button title={leftButton.title} onPress={leftButton.onPress} />}
            <Text style={styles.title}>{title}</Text>
            {rightButton && <Button title={rightButton.title} onPress={rightButton.onPress} />}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Adjust as needed
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CommonNavbar;
