// ✅ Import Expo helper to register root component
import { registerRootComponent } from 'expo';

// ✅ Import React
import React from 'react';

// ✅ Import navigation container and stack navigator from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// ✅ Import all screens of the app
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import AddDonationScreen from './screens/AddDonationScreen';
import AvailableDonationsScreen from './screens/AvailableDonationsScreen';
import AdminScreen from './screens/AdminScreen';
import AIAssistantScreen from './screens/AIAssistantScreen';

// ✅ Create stack navigator
const Stack = createStackNavigator();

// ✅ Main App component
function App() {
  return (
    // ✅ Wrap the app with NavigationContainer to enable navigation
    <NavigationContainer>
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddDonation" component={AddDonationScreen} />
    <Stack.Screen name="AvailableDonations" component={AvailableDonationsScreen} options={{ title: "Donation History" }}/>
    <Stack.Screen name="Admin" component={AdminScreen} />
    <Stack.Screen name="AI Assistant" component={AIAssistantScreen} />
  </Stack.Navigator>
</NavigationContainer>
  );
}

// ✅ Register the App component as the root component for Expo
registerRootComponent(App);
