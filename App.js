import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './SignupScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import FormalScreen from './Formalscreen'; // Import category screens
import CasualScreen from './Casualscreen';
import EveningWearScreen from './EveningWearscreen';
import SportsScreen from './Sportsscreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Formal" component={FormalScreen} />
        <Stack.Screen name="Casual" component={CasualScreen} />
        <Stack.Screen name="EveningWear" component={EveningWearScreen} />
        <Stack.Screen name="Sports" component={SportsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}