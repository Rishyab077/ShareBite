import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import EditProfileScreen from "./screens/EditProfileScreen";

import HomeScreen from "./screens/HomeScreen";
import AddDonationScreen from "./screens/AddDonationScreen";
import AvailableDonationsScreen from "./screens/AvailableDonationsScreen";
import AdminScreen from "./screens/AdminScreen";
import AIAssistantScreen from "./screens/AIAssistantScreen";
import MapPickerScreen from "./screens/MapPickerScreen";

import FeedbackScreen from "./screens/FeedbackScreen";
import ProfileScreen from "./screens/ProfileScreen";


const Stack = createStackNavigator();

function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddDonation" component={AddDonationScreen} />
        <Stack.Screen name="AvailableDonations" component={AvailableDonationsScreen} />
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="AIAssistant" component={AIAssistantScreen} />
        <Stack.Screen name="MapPicker" component={MapPickerScreen} />
        
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



registerRootComponent(App);

