import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Platform, StatusBar} from 'react-native';
import * as Progress from 'react-native-progress';
import Navbar from "../components/Navbar";
import Spacing from "../constants/Spacing";
import {useDispatch, useSelector} from "react-redux";
import {predictBiomasss} from "../action/dashboardAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAllDepots, getNearestDepots, loadUser} from "../action/userAction";
import Font from '../constants/Font';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import RNPickerSelect from 'react-native-picker-select';
import { PREDCIT_BIOMASS_RESET } from '../constants/dashboardConstants';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const PredictionScreen = ({navigation: { navigate } }) => {

    const [predictedBiomass,setPredictedBiomass] = useState("")
    const [year,setYear] = useState("")
    const { biomassPrediction,error,loading } = useSelector((state) => state.harvestDashboard);
    const {depots} = useSelector((state) => state.depot);
    const getToken = async () =>{
        return await AsyncStorage.getItem("token")
    }
    const predictionYear = [
        { label: "2018", value: "2018" },
        { label: "2019", value: "2019" },
    ]
    const dispatch = useDispatch()
    const { token,user,isAuthenticated } = useSelector((state) => state.user);
    const [selectedDepot,setSelectedDepot] = useState(null);
    const fetchDepots = async () =>{
        console.log('Fetching Depots ')
        await dispatch(getNearestDepots(token))
    }
    useEffect(() => {
        if(depots){
            console.log(depots)
        }
        if(token){
            fetchDepots()
        }
    }, []);

    // useEffect(() => {
    //     const token = getToken()
    //     console.log(token)
    //     if(token){
    //         dispatch(loadUser(token))
    //     }
    // }, []);

    useEffect(() => {
        if(user && isAuthenticated){
            console.log('User')
            console.log(user)
            if(!user?.name){
                console.log('Entered')
                navigate('SetUp')
            }
        }
    }, [user,dispatch,isAuthenticated]);

    const fetchPredictionBiomass = async  () =>{
        console.log(user)
        if(year != ""){
            await dispatch(predictBiomasss(token,year,user.location.longitude,user.location.latitude))
        }
    }
    useEffect(() => {
        console.log(biomassPrediction.predictionValues)
        if(biomassPrediction){
            setPredictedBiomass(biomassPrediction.predictionValues)
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

    const onHandleSelectDepot = (depot) => {
        setSelectedDepot(depot)
        openModal()
    };

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
                <Text style={styles.heading}>{(!predictedBiomass)? "Prediction for which year" : "Prediction for "+ year  }</Text>
                {!predictedBiomass?
                <>
                 <View style={[
                                {
                                fontFamily: Font["poppins-regular"],
                                fontSize: FontSize.small,
                                padding: Spacing * 2,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing,
                                marginVertical: Spacing,
                                }
                            ]}>
                    <RNPickerSelect
                        onValueChange={(value) => setYear(value)}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: "Select a Year", value: null }}
                        items={predictionYear}
                        />
                       
                    </View>
                 <TouchableOpacity style={{...styles.sliderContactBtn, padding: Spacing * 2}} onPress={fetchPredictionBiomass}>
                            <Text style={styles.sliderContactBtnText}>Prediction</Text>
                        </TouchableOpacity>
                </>
               :<> 
                <View style={styles.cardContent}>
                    <Text style={styles.icon}>📊</Text>
                    <View style={styles.predictionInfo}>
                        <Text><Text style={styles.bold}>Biomass Predicted:</Text> {predictedBiomass} kg</Text>
                        <Text><Text style={styles.bold}>Profit:</Text> <Text style={styles.positive}>$3,456</Text></Text>
                    </View>
                </View>
                <TouchableOpacity  onPress={()=>{
                     dispatch({
                        type: PREDCIT_BIOMASS_RESET,
                        payload: {
                        }
                    });
                }}><Text  style={styles.infoBtn}>
                Clear
                </Text></TouchableOpacity>
                </>}
               
            </View>

            <Text style={styles.depotHeading}>Nearest Depots</Text>


            {/* Slider Cards for Nearest Depots */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.depotSlider}>
                {depots?depots.map((depot, index) => (
                    <View
                        key={index}
                        style={styles.sliderCard}// You may want to pass depot data to the modal
                    >
                        <Text style={styles.sliderHeading}>{depot.name}</Text>
                        <Text style={styles.sliderLocation}>{depot.location.latitude}</Text>
                        <Text style={styles.sliderLocation}>{depot.location.longitude}</Text>
                        <TouchableOpacity style={styles.sliderContactBtn} onPress={()=>{
                            onHandleSelectDepot(depot)
                            }}>
                            <Text style={styles.modalButtonText}>Select Depots</Text>
                        </TouchableOpacity>
                    </View>
                )):null}
            </ScrollView>

            {/* Modal for Depot Information */}
            {selectedDepot?
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeading}>{selectedDepot.name}</Text>
                        <Text style={styles.sliderLocation}>{"Latitude:"+selectedDepot.location.latitude}</Text>
                        <Text style={styles.sliderLocation}>{"Longitude:"+selectedDepot.location.longitude}</Text>
                        <MapView
                            style={styles.map}
                            provider={PROVIDER_GOOGLE}
                            region={{
                                latitude: parseFloat(selectedDepot.location.latitude),
                                longitude:  parseFloat(selectedDepot.location.longitude),
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                key={selectedDepot._id}
                                coordinate={{
                                    latitude : parseFloat(selectedDepot.location.latitude),
                                    longitude : parseFloat(selectedDepot.location.longitude)
                                }}
                                title={selectedDepot.name}
                            />
                        </MapView>
                        <Text style={styles.sliderLocation}>{"Distance: "+selectedDepot.shortest_node[0]}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={onHandleSelectDepot}>
                            <Text style={styles.modalButtonText}>Contact</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                            <Text style={styles.modalCloseButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>:""}
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
    map: {
        width: '100%',
        height: '60%',
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
        height: 175 ,
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
        padding: Spacing ,
        borderRadius: 4,
        alignSelf: 'flex-start',
        width: 100, // Small width for the contact button
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
        marginTop: 0,
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
