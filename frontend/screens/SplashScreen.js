import React, { useEffect } from "react"; 
import { View, Text, ActivityIndicator } from "react-native";

// ✅ SplashScreen component – shows a loading screen when app starts
export default function SplashScreen({ navigation }) {

  // ✅ useEffect runs once when component mounts
  useEffect(() => {
    // ⏱️ Wait 2 seconds, then navigate to Login screen
    setTimeout(() => {
      navigation.replace("Login"); // Replace splash with login so user cannot go back
    }, 2000);
  }, []);

  return (
    // ✅ Centered container for splash screen
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
      
      {/* ✅ App name / logo */}
      <Text style={{ fontSize: 30, fontWeight: "bold", color: "#2c3e50" }}>🍱ShareBite🤝</Text>
      
      {/* ✅ Loading indicator */}
      <ActivityIndicator size="large" color="#2ecc71" style={{ marginTop: 20 }} />
    </View>
  );
}
