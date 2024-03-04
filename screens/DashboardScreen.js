import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import CropCard from "../components/CropCard";
import Navbar from "../components/Navbar";
import Spacing from "../constants/Spacing";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../action/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubsidyCard from "../components/SubsidyCard";
import policies from "../constants/Policies";


const DashboardScreen = ({ navigation }) => {
    const [year, setYear] = useState('');
    const [amount, setAmount] = useState('');

    const predictBiomass = () => {
        alert('Predicting biomass for year ${year} with amount ${amount}');
    };

    const getToken = async () =>{
        return await AsyncStorage.getItem("token")
    }

    const dispatch = useDispatch()
    const { loading, isAuthenticated, error, user,token } = useSelector((state) => state.user);

    useEffect(() => {
        const token = getToken()
        if(token){
            loadUser(token)
        }
    }, [token]);

    useEffect(() => {
        if(user && isAuthenticated){
            if(!user?.name){
                console.log('Entered')
                navigation.navigate('SetUp')
            }
            navigation.navigate('Dashboard');
        }
    }, [user,dispatch,isAuthenticated]);

    const navigateToSearch = () => {
        alert('Navigating to search page');
    };

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                data: [20,  45,  28,  80,  99,  43],
            },
        ],
    };

    const cropSliderData = [
        {
            id: '1',
            cropType: 'Vegetable',
            cropName: 'Tomato',
            imageUrl:
                'https://source.unsplash.com/collection/190727/1600x900',
            wasteType: 'Organic',
        },
        {
            id: '2',
            cropType: 'Fruit',
            cropName: 'Apple',
            imageUrl:
                'https://source.unsplash.com/collection/190727/1600x900',
            wasteType: 'Organic',
        },
        {
            id: '3',
            cropType: 'Grain',
            cropName: 'Rice',
            imageUrl:
                'https://source.unsplash.com/collection/190727/1600x900',
            wasteType: 'Non-Organic',
        },
    ];

    // Subsidy data

    const navigateToSubsidyDetails = (subsidyName) => {
        alert('Navigating to details for ${subsidyName}');

    };

    return (
        <ScrollView style={styles.AndroidSafeArea}>


            <View style={styles.main}>
                <View style={styles.dashboardSection}>
                    <Text style={styles.sectionHeading}>Yearly Income</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardHeading}>Income</Text>
                        <Text style={styles.cardNumber}>$50,000</Text>
                        <Text style={styles.cardDescription}>Amount</Text>
                    </View>

                    <Text style={styles.sectionHeading}>Yearly Waste</Text>
                    <View style={styles.card}>
                        <Text style={styles.cardHeading}>Waste</Text>
                        <Text style={styles.cardNumber}>15,000 tons</Text>
                        <Text style={styles.cardDescription}></Text>
                    </View>

                    <Text style={styles.sectionHeading}>Biomass Chart</Text>
                    <View style={styles.chartContainer}>
                        <LineChart
                            data={chartData}
                            width={300}
                            height={200}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            chartConfig={{
                                backgroundGradientFrom: '#f8f8f8',
                                backgroundGradientTo: '#f8f8f8',
                                decimalPlaces: 2,
                                color: (opacity = 1) =>
                                    `rgba(52, 152, 219, ${opacity})`,
                            }}
                            bezier
                        />
                    </View>
                </View>

                <View style={styles.inputSection}>
                    <Text style={styles.sectionHeading}>
                        Add Biomass Data
                    </Text>
                    <TextInput
                        placeholder="Year"
                        style={styles.input}
                        value={year}
                        onChangeText={(text) => setYear(text)}
                    />
                    <TextInput
                        placeholder="Amount"
                        style={styles.input}
                        value={amount}
                        onChangeText={(text) => setAmount(text)}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={predictBiomass}>
                        <Text style={styles.buttonText}>Predict</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.subsidySection}>
                <Text style={styles.sectionHeading}>Subsidies</Text>
                <FlatList
                    horizontal
                    data={policies}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <SubsidyCard
                            styles={styles}
                            subsidyName={item.subsidyName}
                            info={item.info}
                            onPress={() => navigateToSubsidyDetails(item.subsidyName)}
                        />
                    )}
                />
            </View>


            {/*<View style={styles.cropSliderContainer}>*/}
            {/*    <Text style={styles.cropSliderHeading}>Crop Slider</Text>*/}
            {/*    <FlatList*/}
            {/*        horizontal*/}
            {/*        data={cropSliderData}*/}
            {/*        keyExtractor={(item) => item.id}*/}
            {/*        renderItem={({ item }) => (*/}
            {/*            <CropCard*/}
            {/*                cropType={item.cropType}*/}
            {/*                cropName={item.cropName}*/}
            {/*                imageUrl={item.imageUrl}*/}
            {/*                wasteType={item.wasteType}*/}
            {/*            />*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</View>*/}

            {/*<View style={styles.footer}>*/}
            {/*    <TouchableOpacity*/}
            {/*        style={styles.smallFooterButton}*/}
            {/*        onPress={navigateToSearch}>*/}
            {/*        <Text style={styles.smallButtonText}>*/}
            {/*            Search Shortest Distance*/}
            {/*        </Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}





        </ScrollView>
    );
};

const styles = StyleSheet.create({
    subsidyName: {
        fontWeight: 'bold',
        color: '#4CAF50',
        fontSize:   16,
        marginBottom:   5,
    },
    info: {
        color: '#888',
        marginBottom:   10,
    },
    learnButton: {
        backgroundColor: '#4CAF50',
        padding:   10,
        borderRadius:   8,
    },
    // buttonText: {
    //     color: '#fff',
    //     textAlign: 'center',
    // },
    AndroidSafeArea: {
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
        marginBottom: 8,
        paddingHorizontal: 20,
        paddingTop: 10,
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
        marginHorizontal: 5,
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
        paddingBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    },
    cropSliderContainer: {
        marginTop: 20,
    },
    cropSliderHeading: {
        fontSize: 18,
        marginBottom: 8,
        paddingHorizontal: 20,
        paddingTop: 10,
        color: '#4CAF50',
    },
    cropCard: {
        width: 150,
        marginHorizontal: 5,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    SubsidyCard: {
        width: 150,
        marginHorizontal: 5,
        borderRadius: 10,
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

export default DashboardScreen;
