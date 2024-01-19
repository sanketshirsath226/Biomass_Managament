import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LandingScreen from "../screens/LandingScreen";

// ... import other screens

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Landing'} options={{headerShown : false}} component={LandingScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
