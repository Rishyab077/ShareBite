import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import axios from "axios";

// ✅ AvailableDonationsScreen – displays all pending donations
export default function AvailableDonationsScreen() {

  // ✅ State variable to store donations
  const [donations, setDonations] = useState([]);

  // ✅ Fetch donations when the component loads
  useEffect(() => {
    axios.get("https://sharebite-8dqo.onrender.com/api/donations").then((res) => {
      // 🔹 Filter only donations that are still pending
      const pending = res.data.filter((d) => d.status === "pending");
      setDonations(pending); // Save pending donations to state
    });
  }, []);

  return (
    <View style={{ padding: 10 }}>
      {/* ✅ Display list of pending donations using FlatList */}
      <FlatList
        data={donations}                     // Data source
        keyExtractor={(item) => item._id}    // Unique key for each item
        renderItem={({ item }) => (          // How each donation item appears
          <View style={{ borderWidth: 1, padding: 10, margin: 5 }}>
            <Text>👤 Donor: {item.donorName}</Text>
            <Text>🍱 Food: {item.foodItems}</Text>
            <Text>📦 Quantity: {item.quantity}</Text>
            <Text>📍 Location: {item.location}</Text>
            
            {/* ✅ Button to request the donation */}
            <Button
              title="Request"
              onPress={() =>
                Alert.alert("Requested", `You requested ${item.foodItems}`)
              }
            />
          </View>
        )}
      />
    </View>
  );
}
