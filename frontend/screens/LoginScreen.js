import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

// ✅ LoginScreen component – allows existing users to log in
export default function LoginScreen({ navigation }) {

  // ✅ State variables to store input values
  const [email, setEmail] = useState("");      // Stores user's email
  const [password, setPassword] = useState(""); // Stores user's password

  // ✅ Function to handle login button click
  const handleLogin = async () => {
    try {
      // 🔹 Send POST request to backend API with email and password
      const res = await axios.post("https://sharebite-8dqo.onrender.com/api/auth/login", { email, password });
      
      // 🔹 Check user role returned from backend
      if (res.data.role === "admin") {
        // 🔹 If admin, navigate to Admin dashboard
        navigation.replace("Admin");
      } else {
        // 🔹 If normal user, navigate to Home screen
        navigation.replace("Home");
      }
    } catch (err) {
      // 🔹 Show error alert if login fails
      Alert.alert("Login Failed", "Invalid credentials!");
    }
  };

  return (
    // ✅ Main container
    <View style={{ padding: 20 }}>

      {/* ✅ Screen title */}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Login</Text>

      {/* ✅ Input field for email */}
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} 
      />

      {/* ✅ Input field for password */}
      <TextInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry // Hides the password
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} 
      />

      {/* ✅ Login button */}
      <Button title="Login" onPress={handleLogin} />

      {/* ✅ Navigate to Signup screen */}
      <Button title="Sign Up" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
}
