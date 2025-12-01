import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

export default function AddDonationScreen({ navigation }) {
  const [donorName, setDonorName] = useState("");
  const [foodItems, setFoodItems] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

  const handleAddDonation = async () => {
    try {
      await axios.post("http://10.120.88.14:10000/api/donations", {
        donorName,
        foodItems,
        quantity,
        location,
      });
      Alert.alert("Success", "Donation added!");
      navigation.goBack();
    } catch {
      Alert.alert("Error", "Failed to add donation.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Donation</Text>

      <TextInput
        placeholder="Donor Name"
        value={donorName}
        onChangeText={setDonorName}
        style={styles.input}
      />
      <TextInput
        placeholder="Food Items"
        value={foodItems}
        onChangeText={setFoodItems}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        style={styles.input}
      />
      <TouchableOpacity
  style={styles.input}
  onPress={() => navigation.navigate("MapPicker", { setLocation })}
>
  <Text style={{ color: "#555" }}>
    {location ? location : "Select Location on Map"}
  </Text>
</TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={handleAddDonation}>
        <Text style={styles.buttonText}>Add Donation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#eef2f7",
    flexGrow: 1,
  },

  // --- Title ---
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e2a38",
    marginBottom: 25,
    textAlign: "center",
    letterSpacing: 0.5,
  },

  // --- Input Boxes ---
  input: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 14,
    marginVertical: 10,
    fontSize: 16,

    // Premium border
    borderWidth: 1,
    borderColor: "#e3e6ea",

    // Beautiful soft shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },

  // --- Add Donation Button ---
  button: {
    backgroundColor: "#16c47f",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 25,

    // Smooth glow effect
    shadowColor: "#16c47f",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.6,
  },
});
