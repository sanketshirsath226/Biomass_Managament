import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image, ScrollView,
} from 'react-native';
const CropCard = ({ cropType, cropName, imageUrl, wasteType }) => (
    <View style={styles.cropCard}>
        <Image source={{ uri: imageUrl }} style={styles.cropImage} />
        <View style={styles.cropCardContent}>
            <Text style={styles.cropType}>{cropType}</Text>
            <Text style={styles.cropName}>{cropName}</Text>
            <Text style={styles.wasteType}>{wasteType}</Text>
            <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    menuIcon: {
        fontSize: 24,
    },
    profileIcon: {
        fontSize: 24,
    },
    main: {
        padding: 20,
    },
    dashboardSection: {
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 18,
        marginBottom: 10,
        color: '#4CAF50',
    },
    card: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
    },
    cardHeading: {
        fontWeight: 'bold',
        color: '#4CAF50',
        fontSize: 16,
        marginBottom: 5,
    },
    cardNumber: {
        fontSize: 24,
        marginVertical: 10,
    },
    cardDescription: {
        color: '#888',
    },
    chartContainer: {
        width: '100%',
        maxWidth: 300,
        alignSelf: 'center',
    },
    inputSection: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        paddingBottom: -10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight : 'bold',
        fontSize: 14,
    },
    cropSliderContainer: {
        marginTop: 20,
    },
    cropSliderHeading: {
        fontSize: 18,
        marginBottom: 8,
        paddingHorizontal: 20,
        paddingTop: -10,
        color: '#4CAF50',
    },
    cropCard: {
        width: 150,
        marginHorizontal: 5,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        backgroundColor: 'white',
    },
    cropImage: {
        width: '100%',
        height: 80,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    cropCardContent: {
        padding: 10,
    },
    cropType: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
        color: '#4CAF50',
    },
    cropName: {
        fontSize: 12,
        marginBottom: 5,
    },
    wasteType: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    selectButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    smallFooterButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
    },
    smallButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
export default CropCard
