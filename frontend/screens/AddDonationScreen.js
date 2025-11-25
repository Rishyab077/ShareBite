import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import axios from "axios";

// ✅ Screen for adding a new donation
export default function AddDonationScreen({ navigation }) {
  // ✅ State variables to store input values
  const [donorName, setDonorName] = useState(""); // Donor's name
  const [foodItems, setFoodItems] = useState(""); // Food items being donated
  const [quantity, setQuantity] = useState("");   // Quantity of food
  const [location, setLocation] = useState("");   // Pickup location

  // ✅ Function to send donation data to backend
  const handleAddDonation = async () => {
    try {
      await axios.post("http://10.113.75.14:5000/api/donations", {
        donorName,
        foodItems,
        quantity,
        location,
      });

      // ✅ Show success message
      Alert.alert("Success", "Donation added!");
      navigation.goBack(); // Go back to previous screen
    } catch {
      // ✅ Show error if API call fails
      Alert.alert("Error", "Failed to add donation.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* ✅ Screen title */}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Add Donation</Text>

      {/* ✅ Input fields for donation details */}
      <TextInput
        placeholder="Donor Name"
        value={donorName}
        onChangeText={setDonorName}
        style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
      />
      <TextInput
        placeholder="Food Items"
        value={foodItems}
        onChangeText={setFoodItems}
        style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
      />
      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}
      />

      {/* ✅ Button to submit donation */}
      <Button title="Add Donation" onPress={handleAddDonation} />
    </View>
  );
}
