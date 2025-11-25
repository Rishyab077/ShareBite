import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import axios from "axios";

// ✅ HomeScreen component – main screen for regular users
export default function HomeScreen({ navigation }) {

  // ✅ State variable to store the latest donations
  const [donations, setDonations] = useState([]);

  // ✅ useEffect runs once when the component mounts
  useEffect(() => {
    // 🔹 Fetch all donations from backend
    axios.get("https://sharebite-8dqo.onrender.com/api/donations").then((res) => {
      // 🔹 Filter donations with status "pending"
      const pending = res.data.filter((d) => d.status === "pending");
      
      // 🔹 Take the latest 2 pending donations and reverse order
      const latestTwo = pending.slice(-2).reverse();
      
      // 🔹 Save to state
      setDonations(latestTwo);
    });
  }, []);

  return (
    <View style={{ padding: 10 }}>
      
      {/* ✅ Button to navigate to AddDonation screen */}
      <Button title="➕ Add Donation" onPress={() => navigation.navigate("AddDonation")} />

      {/* ✅ Button to navigate to all available donations */}
      <Button title="📋 Donation History" onPress={() => navigation.navigate("AvailableDonations")} />

      {/* ✅ Button to navigate to AI Assistant screen */}
      <Button title="🤖 Ask AI Assistant" onPress={() => navigation.navigate("AI Assistant")} />

      {/* ✅ Section title */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 10 }}>Latest Donations:</Text>

      {/* ✅ Display latest donations using FlatList */}
      <FlatList
        data={donations}                       // Data source
        keyExtractor={(item) => item._id}      // Unique key for each item
        renderItem={({ item }) => (            // How each item looks
          <View style={{ borderWidth: 1, margin: 5, padding: 10 }}>
            <Text>🍱 {item.foodItems}</Text>
            <Text>📦 {item.quantity}</Text>
            <Text>📍 {item.location}</Text>
          </View>
        )}
      />
    </View>
  );
}
