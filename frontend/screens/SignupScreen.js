import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
  try {
    const res = await axios.post(
      "http://10.120.88.14:10000/api/auth/signup",
      { name, email, password }
    );
    Alert.alert("Success", res.data.message);
    navigation.replace("Login");
  } catch (err) {
    const msg = err.response?.data?.message || "Failed to register!";
    Alert.alert("Signup Failed", msg);
  }
};


  return (
    <View style={styles.container}>
      {/* GLASS CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Account ✨</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#95a5a6"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#95a5a6"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#95a5a6"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {/* REGISTER BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* LINK */}
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// Your existing styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27ae60",
    backgroundImage: "linear-gradient(180deg, #2ecc71, #27ae60)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  card: {
    width: "100%",
    padding: 30,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: 1,
    textShadowColor: "rgba(255,255,255,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 15,
    borderRadius: 14,
    fontSize: 16,
    marginBottom: 15,
    color: "#2c3e50",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    backgroundColor: "#2980b9",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2980b9",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  link: {
    color: "#fff",
    textAlign: "center",
    marginTop: 18,
    fontSize: 16,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
});
