import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    StyleSheet,
    StatusBar,
    Platform,
    SafeAreaView
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import Geolib from 'geolib';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Navbar from "../components/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spacing from "../constants/Spacing";
import {loadUser} from "../action/userAction";
import {useSelector} from "react-redux";

// Sample depots data
const depots = [
    { id: 1, name: 'Depot A', location: { latitude: 24.66818, longitude: 71.33144 }, demand: 'High' },
    { id: 2, name: 'Depot B', location: { latitude: 24.58758, longitude: 71.57031 }, demand: 'Medium' },
    { id: 3, name: 'Depot C', location: { latitude: 24.58758, longitude: 71.96844 }, demand: 'Low' },
];

const farms = [
    {
        name: 'Depot 1',
        info: 'A sustainable organic farm with a variety of crops.',
        crops: 'Wheat, Corn, Tomatoes',
        size: '50 acres',
    },
    {
        name: 'Depot 2',
        info: 'Family-owned farm producing fresh vegetables.',
        crops: 'Carrots, Lettuce, Potatoes',
        size: '30 acres',
    },
    {
        name: 'Depot 3',
        info: 'Specialized farm with vineyards and orchards.',
        crops: 'Grapes, Apples, Pears',
        size: '40 acres',
    },
];

const NavigationMap = ({navigation: { navigate } }) => {
    const [pickupLocation, setPickupLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
    const [showAllDepots, setShowAllDepots] = useState(false);


    const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);
    const calculateDistance = () => {
        if (pickupLocation && destinationLocation) {
            const distance = Geolib.getDistance(pickupLocation, destinationLocation) / 1000; // Convert meters to kilometers
            Alert.alert('Distance', `${distance.toFixed(2)} km`);
        } else {
            Alert.alert('Error', 'Invalid pickup or destination location');
        }
    };
    const goBack = () => {
        // Implement goBack functionality
    };


    const navigateToSettings = () => {
        // Implement navigation to Settings
    };

    // useEffect(async () => {
    //     const token = await AsyncStorage.get('token');
    //     if(token){
    //         loadUser(token)
    //     }
    // }, []);


    return (
        <SafeAreaView  style={styles.AndroidSafeArea}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={{
                    latitude: 24.66818,
                    longitude: 71.33144,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {pickupLocation && <Marker coordinate={pickupLocation} title="Pickup Location" />}
                {destinationLocation && <Marker coordinate={destinationLocation} title="Destination Location" />}
                {showAllDepots && depots.map((depot) => (
                    <Marker
                        key={depot.id}
                        coordinate={depot.location}
                        title={depot.name}
                        description={`Demand: ${depot.demand}`}
                    />
                ))}
            </MapView>

            <View style={styles.inputContainer}>
                <GooglePlacesAutocomplete
                    placeholder="Enter pickup point"
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'search'}
                    listViewDisplayed="auto"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        setPickupLocation({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        });
                    }}
                    query={{
                        key: 'AIzaSyDWh2tZNTZKRJQQIs6pqspqEiX7f8mxl08',
                        language: 'en',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={300}
                    styles={{
                        textInputContainer: {
                            width: '',
                            alignSelf: 'center',
                            fontWeight : 'bold'
                        },
                        description: {
                            fontWeight: 'bold',
                        },
                    }}
                />

                <GooglePlacesAutocomplete
                    placeholder="Enter destination"
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'search'}
                    listViewDisplayed="auto"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        setDestinationLocation({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        });
                    }}
                    query={{
                        key: 'AIzaSyDWh2tZNTZKRJQQIs6pqspqEiX7f8mxl08',
                        language: 'en',
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={300}
                    styles={{
                        textInputContainer: {
                            width: '75%',
                            alignSelf: 'center',
                        },
                        description: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </View>

            <TouchableOpacity
                style={styles.findDistanceButton}
                onPress={calculateDistance}
            >
                <Text style={styles.buttonText}>Calculate Distance</Text>
            </TouchableOpacity>

            {/* Display the nearest depot and "See All" button */}
            <View style={styles.nearestDepotContainer}>
                <Text style={styles.nearestDepotText}>Nearest Depot: </Text>
                <TouchableOpacity
                    style={styles.seeAllButton}
                    onPress={() => setShowAllDepots(!showAllDepots)}
                >
                    <Text style={styles.buttonText}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
                {farms.map((farm, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{farm.name}</Text>
                        <Text style={styles.cardInfo}>{farm.info}</Text>
                        <Text style={styles.cardDetail}>Crops: {farm.crops}</Text>
                        <Text style={styles.cardDetail}>Size: {farm.size}</Text>
                        <TouchableOpacity style={styles.visitButton}>
                            <Text style={styles.buttonText}>Visit</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex : 1,
        backgroundColor: '#f8f8f8'
    },
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#ECF0F1',
    },
    headerButton: {
        padding: 2,
        marginTop: 28,
    },
    map: {
        width: '100%',
        height: '30%',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 18,
        alignItems: 'center',
    },
    findDistanceButton: {
        backgroundColor: '#60a74e',
        padding: 16,
        borderRadius: 6,
        alignSelf: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    cardContainer: {

    },
    card: {
        width: 200,
        height: 225,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 26,
        marginRight: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardInfo: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
    },
    cardDetail: {
        fontSize: 14,
        marginBottom: 8,
    },
    visitButton: {
        backgroundColor: '#60a74e',
        color: '#fff',
        padding: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    nearestDepotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        marginBottom: 4,
        alignItems: 'center',
        marginTop: 15,
    },
    nearestDepotText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    seeAllButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
});

export default NavigationMap;
