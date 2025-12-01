import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";

export default function EditProfileScreen({ route, navigation }) {
  const { user } = route.params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(""); // new password field

  const updateProfile = async () => {
    try {
      await axios.put(`http://10.120.88.14:10000/api/profile/${user.id}`, {
        name,
        email,
        password: password ? password : undefined, // send only if user entered
      });

      alert("Profile updated!");
      navigation.goBack();
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#eef2f3" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit Profile</Text>

          {/* Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
          />

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={updateProfile}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 25, alignItems: "center" },
  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    elevation: 15,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  title: { fontSize: 28, fontWeight: "900", color: "#123a2b", marginBottom: 25, textAlign: "center" },
  label: { fontSize: 15, fontWeight: "700", color: "#374151", marginBottom: 6, marginTop: 12 },
  input: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    fontSize: 16,
    backgroundColor: "#f9fafb",
    borderWidth: 1.6,
    borderColor: "#d1d5db",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },
  button: {
    backgroundColor: "#16c47f",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 28,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#16c47f",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "800", letterSpacing: 0.5 },
});
