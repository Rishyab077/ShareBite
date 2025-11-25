import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import axios from "axios";

// ✅ AdminScreen – Dashboard for admin to manage all donations
export default function AdminScreen() {
  // ✅ State to store all donations from backend
  const [donations, setDonations] = useState([]);

  // ✅ Function to fetch all donations from the server
  const fetchDonations = () => {
    aaxios.get("https://sharebite-8dqo.onrender.com/api/donations")

      .then((res) => setDonations(res.data)); // Update state with fetched donations
  };

  // ✅ Fetch donations when screen loads
  useEffect(() => {
    fetchDonations();
  }, []);

  // ✅ Delete a donation by ID
  const handleDelete = async (id) => {
    await axios.delete(`https://sharebite-8dqo.onrender.com/api/donations/${id}`);
    Alert.alert("Deleted", "Donation removed"); // Show confirmation
    fetchDonations(); // Refresh list after deletion
  };

  // ✅ Mark a donation as delivered by ID
  const handleDeliver = async (id) => {
    await axios.put(`https://sharebite-8dqo.onrender.com/api/donations/${id}`, { status: "delivered" });
    Alert.alert("Updated", "Marked as delivered"); // Show confirmation
    fetchDonations(); // Refresh list after update
  };

  return (
    <View style={{ padding: 10 }}>
      {/* ✅ Dashboard title */}
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Admin Dashboard</Text>

      {/* ✅ Display all donations in a scrollable list */}
      <FlatList
        data={donations} // Data source
        keyExtractor={(item) => item._id} // Unique key for each donation
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, padding: 10, margin: 5 }}>
            {/* Display donation details */}
            <Text>🍱 {item.foodItems}</Text>
            <Text>📍 {item.location}</Text>
            <Text>Status: {item.status}</Text>

            {/* Buttons to mark delivered or delete */}
            <Button title="✅ Mark Delivered" onPress={() => handleDeliver(item._id)} />
            <Button title="🗑️ Delete" color="red" onPress={() => handleDelete(item._id)} />
          </View>
        )}
      />
    </View>
  );
}
