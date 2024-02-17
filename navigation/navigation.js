import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { DefaultTheme } from "@react-navigation/native";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import OtpScreen from "../screens/OtpScreen";
import ResultScreen from "../screens/ResultScreen";
import SetUpScreen from "../screens/SetUpScreen";
import DashboardScreen from "../screens/DashboardScreen";
import PredictionScreen from "../screens/PredictionScreen";
import NavigationMap from "../screens/NavigationMap";
import NavDrawer from "../components/NavDrawer";
import CommonNavbar from "../components/CommonNavbar";
import Navbar from "../components/Navbar";

// ... import other screens

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Colors.background,
    },
};
const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={({ route }) => ({
                    header: () =>  <Navbar title={"Biosevak"} logo={require('../assets/logo.png')} ham={require("../assets/hamburger.png")}/>
                })}
            >
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Prediction" component={PredictionScreen} />
            <Stack.Screen name="NavigationMap" component={NavigationMap} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name='Otp' component={OtpScreen}/>
            <Stack.Screen name='PopMessage' component={ResultScreen}/>
            <Stack.Screen name="SetUp" component={SetUpScreen} />
            <Stack.Screen name="drawer" component={NavDrawer}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


