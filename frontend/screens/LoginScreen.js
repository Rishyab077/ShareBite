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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://10.120.88.14:10000/api/auth/login",
        { email, password }
      );

      // 🔥 STORE TOKEN SAFELY
      await AsyncStorage.setItem("token", res.data.token);

      const user = res.data.user;

      // 🔥 Navigate based on role
      if (user.role === "admin") {
        navigation.replace("Admin", { user });
      } else {
        navigation.replace("Home", { user });
      }

    } catch (err) {
      const msg = err.response?.data?.message || "Invalid credentials!";
      Alert.alert("Login Failed", msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// -----------------------------------------------------------
// STYLES
// -----------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  card: {
    width: "100%",
    padding: 30,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.20)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  title: {
    fontSize: 30,
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
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
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
    shadowRadius: 10,
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
