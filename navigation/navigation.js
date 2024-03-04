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
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import DPredictionScreen from "../screens/DPredictionScreen";
import {logoutUser} from "../services/AuthService";
import Logout from "../screens/Logout";
import RDashboardScreen from "../screens/RDashboardScreen";

// ... import other screens

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Colors.background,
    },
};
const Stack = createStackNavigator();

export default function     Navigation() {
    const HarvestingStack = createStackNavigator();
    const DepotStack = createStackNavigator();
    const RefineryStack = createStackNavigator()
    const [roleSelected,setRoleSelected] = useState("")

    const navBarElement = [
        {
            name : "Dashboard",
            navigate : "Dashboard"
        },
        {
            name : "Demands",
            navigate : "DepotsPrediction"
        },
        {
            name : "Map",
            navigate : "NavigationMap"
        },
        {
            name : "Profile",
            navigate : "Profile"
        },
        // {
        //     name : "History",
        //     navigate : "History"
        // },
        {
            name : "Logout",
            navigate: "Logout"
        }
    ];
    const HarvesterElement = [
        {
            name : "Dashboard",
            navigate : "Dashboard"
        },
        {
            name : "Prediction",
            navigate : "Prediction"
        },
        {
            name : "Map",
            navigate : "NavigationMap"
        },
        {
            name : "Profile",
            navigate : "Profile"
        },
        // {
        //     name : "History",
        //     navigate : "History"
        // },
        {
            name : "Logout",
            navigate: "Logout"
        }
    ];
    const RefineryElement = [
        {
            name : "Dashboard",
            navigate : "RDashboard"
        },
        {
            name : "Prediction",
            navigate : "Prediction"
        },
        {
            name : "Map",
            navigate : "NavigationMap"
        },
        {
            name : "Profile",
            navigate : "Profile"
        },
        // {
        //     name : "History",
        //     navigate : "History"
        // },
        {
            name : "Logout",
            navigate: "Logout"
        }
    ];
    const { loading, isAuthenticated, error, user,token } = useSelector((state) => state.user);

    useEffect(() => {
        if(user?.role === 'harvester'){
            setRoleSelected(HarvesterElement)
        }
        if(user?.role === "refinery"){
            setRoleSelected(RefineryElement)
        }
        if(user?.role === 'depot'){
            setRoleSelected(navBarElement)
        }
    }, [user,isAuthenticated]);
    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                screenOptions={({ route }) => ({
                    header: () =>  <Navbar title={"Biosevak"} navBarElement={roleSelected} logo={require('../assets/logo.png')} ham={require("../assets/hamburger.png")}/>,
                    headerShown: (!(route.name === 'Login' || route.name === 'Register' || route.name === 'SetUp' || route.name === 'Welcome' || route.name === 'drawer' || route.name === 'Otp')),
                })}
            >
            <Stack.Screen name="Welcome" component={Welcome} />

            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name='Otp' component={OtpScreen}/>

            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name='PopMessage' component={ResultScreen}/>
            <Stack.Screen name="SetUp" component={SetUpScreen} />
            <Stack.Screen name="drawer" component={NavDrawer}/>
            <Stack.Screen name="NavigationMap" component={NavigationMap} />
            <Stack.Screen name="Prediction" component={PredictionScreen} />
            <Stack.Screen name="DepotsPrediction" component={DPredictionScreen} />
            <Stack.Screen name="RDashboard" component={RDashboardScreen} />

            <Stack.Screen name="Logout" component={Logout}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


