import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform, StatusBar} from 'react-native';
import * as Progress from 'react-native-progress';
import Navbar from "../components/Navbar";
import Spacing from "../constants/Spacing";
import {useDispatch, useSelector} from "react-redux";
import {predictBiomasss} from "../action/dashboardAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loadUser} from "../action/userAction";

const PredictionScreen = ({navigation: { navigate } }) => {

    const [predictedBiomass,setPredictedBiomass] = useState("")
    const { biomassPrediction,error,loading } = useSelector((state) => state.harvestDashboard);

    const getToken = async () =>{
        return await AsyncStorage.getItem("token")
    }

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.user);

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
            }
            navigate('Dashboard');
        }
    }, [user,dispatch,isAuthenticated]);

    const fetchPredictionBiomass = async  () =>{
        await dispatch(predictBiomasss(token))
    }
    useEffect(() => {
        if(biomassPrediction){
            setPredictedBiomass(biomassPrediction.prediction)
            console.log(biomassPrediction);
            return;
        }
    }, [biomassPrediction,dispatch]);

    useEffect(()=>{
        if(error){
            console.log(error)
        }
    },[dispatch,error])

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleContact = () => {
        // Implement your contact functionality here
        alert('Contact button clicked');
    };

    const depots = [
        { name: 'Depot 1', location: 'Location 1', info: 'Faint and Small 1' },
        { name: 'Depot 2', location: 'Location 2', info: 'Faint and Small 2' },
        { name: 'Depot 3', location: 'Location 3', info: 'Faint and Small 3' },
        // Add more depots as needed
    ];

    return (
        <ScrollView style={styles.AndroidSafeArea}>
            {/* Header with Icon and Navbar */}

            {/* Circular Progress Bar for Predicted Amount */}
            <View style={styles.circleContainer}>
                <Progress.Circle
                    size={200}
                    indeterminate={false}
                    progress={.9} // Set your progress value here
                    borderWidth={2}
                    color="#4CAF50" // Green color
                    showsText
                    formatText={() => '$12,345'}
                />
            </View>

            {/* Prediction Heading */}
            <Text style={styles.predictionHeading}>Prediction</Text>

            {/* Interactive Prediction Card */}
            <View style={styles.predictionCard}>
                <Text style={styles.heading}>Prediction for November 2024</Text>
                <View style={styles.cardContent}>
                    <Text style={styles.icon}>📊</Text>
                    {(predictedBiomass)?
                    <View style={styles.predictionInfo}>
                        <Text><Text style={styles.bold}>Biomass Predicted:</Text> {predictedBiomass} kg</Text>
                        <Text><Text style={styles.bold}>Profit:</Text> <Text style={styles.positive}>$3,456</Text></Text>
                    </View>
                    : <TouchableOpacity style={styles.sliderContactBtn} onPress={fetchPredictionBiomass}>
                            <Text style={styles.sliderContactBtnText}>Contact</Text>
                        </TouchableOpacity>}
                </View>
                <Text style={styles.infoBtn} onPress={openModal}>Info</Text>
            </View>

            <Text style={styles.depotHeading}>Nearest Depots</Text>


            {/* Slider Cards for Nearest Depots */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.depotSlider}>
                {depots.map((depot, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.sliderCard}
                        onPress={fetchPredictionBiomass} // You may want to pass depot data to the modal
                    >
                        <Text style={styles.sliderHeading}>{depot.name}</Text>
                        <Text style={styles.sliderLocation}>{depot.location}</Text>
                        <Text style={styles.sliderInfo}>{depot.info}</Text>
                        <TouchableOpacity style={styles.sliderContactBtn} onPress={handleContact}>
                            <Text style={styles.sliderContactBtnText}>Contact</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Modal for Depot Information */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>Depot Name</Text>
                        <Text style={styles.modalText}>Location: Depot Location</Text>
                        <Text style={styles.modalText}>Additional Info: Faint and Small</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleContact}>
                            <Text style={styles.modalButtonText}>Contact</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                            <Text style={styles.modalCloseButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4CAF50', // Green color
        padding: 10,
        width: '100%',
        height: 50,
    },
    menuIcon: {
        fontSize: 24,
        color: '#ffffff', // White text color
    },
    profileIcon: {
        fontSize: 24,
        color: '#ffffff', // White text color
    },
    circleContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    predictionHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
        marginTop: 20,
        marginHorizontal: 20,
    },
    predictionCard: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        marginHorizontal : 10
    },
    heading: {
        fontSize: 20,
        marginBottom: 10,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 40,
        marginRight: 20,
    },
    predictionInfo: {
        flex: 1,
    },
    bold: {
        fontWeight: 'bold',
    },
    positive: {
        color: 'green',
    },
    infoBtn: {
        fontSize: 12,
        textDecorationLine: 'underline',
        color: '#333',
        marginTop: 10,
        cursor: 'pointer',
    },
    depotHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
        marginTop: 20,
        marginHorizontal: 20,
    },
    depotSlider: {
        flexDirection: 'row',
    },
    sliderCard: {
        flex: 10,
        width: 150,
        height: 150,
        padding: 20,
        marginRight: 5,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        marginBottom:20,
    },
    sliderHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    sliderLocation: {
        fontSize: 14,
        marginBottom: 5,
    },
    sliderInfo: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    },
    sliderContactBtn: {
        backgroundColor: '#4CAF50',
        padding: 5,
        borderRadius: 4,
        alignSelf: 'flex-start',
        width: 80, // Small width for the contact button
    },
    sliderContactBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        width: '80%',
        maxHeight: '80%',
    },
    modalHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    modalButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
    modalCloseButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    modalCloseButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default PredictionScreen;
