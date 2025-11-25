import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

// ✅ SignupScreen component – allows new users to register
export default function SignupScreen({ navigation }) {

  // ✅ State variables to store input values
  const [name, setName] = useState("");      // Stores user's name
  const [email, setEmail] = useState("");    // Stores user's email
  const [password, setPassword] = useState(""); // Stores user's password

  // ✅ Function to handle signup button click
  const handleSignup = async () => {
    try {
      // 🔹 Send POST request to backend API with user data
      await axios.post("https://sharebite-8dqo.onrender.com/api/auth/signup", { name, email, password });
      
      // 🔹 Show success alert
      Alert.alert("Success", "User registered successfully!");
      
      // 🔹 Navigate to Login screen after successful signup
      navigation.replace("Login");
    } catch {
      // 🔹 Show error alert if signup fails
      Alert.alert("Error", "Failed to register!");
    }
  };

  return (
    // ✅ Main container
    <View style={{ padding: 20 }}>
      
      {/* ✅ Screen title */}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Sign Up</Text>
      
      {/* ✅ Input field for name */}
      <TextInput 
        placeholder="Name" 
        value={name} 
        onChangeText={setName} 
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }} 
      />
      
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
      
      {/* ✅ Register button */}
      <Button title="Register" onPress={handleSignup} />
    </View>
  );
}
