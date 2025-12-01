import React, { useEffect, useState } from "react"; 
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";

export default function AdminScreen() {
  const [donations, setDonations] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch donations from backend
  const fetchDonations = () => {
    axios.get("http://10.120.88.14:10000/api/donations")
      .then((res) => setDonations(res.data))
      .catch(err => console.error(err));
  };

  // Fetch feedback from backend
  const fetchFeedbacks = () => {
    axios.get("http://10.120.88.14:10000/api/feedback")
      .then((res) => setFeedbacks(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDonations();
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://10.120.88.14:10000/api/donations/${id}`);
    Alert.alert("Deleted", "Donation removed");
    fetchDonations();
  };

  const handleDeliver = async (id) => {
    await axios.put(`http://10.120.88.14:10000/api/donations/${id}`, { status: "delivered" });
    Alert.alert("Updated", "Marked as delivered");
    fetchDonations();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <Text style={styles.sectionTitle}>Donations</Text>
      <FlatList
        data={donations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.foodText}>🍱 {item.foodItems}</Text>
            <Text style={styles.locationText}>📍 {item.location}</Text>
            <Text style={styles.statusText}>Status: {item.status}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.deliverButton} onPress={() => handleDeliver(item._id)}>
                <Text style={styles.buttonText}>✅ Delivered</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
                <Text style={styles.buttonText}>🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Text style={styles.sectionTitle}>Feedbacks</Text>
      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.foodText}>
              👤 {item.user?.name || "Unknown User"} ({item.user?.email || "N/A"})
            </Text>
            <Text style={styles.locationText}>💬 {item.message}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2f7", padding: 18 },
  title: { fontSize: 30, fontWeight: "800", color: "#1e2a38", marginBottom: 20, textAlign: "center", letterSpacing: 0.6 },
  sectionTitle: { fontSize: 22, fontWeight: "700", color: "#34495e", marginTop: 15, marginBottom: 10 },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e7eaef",
  },
  foodText: { fontSize: 20, fontWeight: "700", color: "#2c3e50", marginBottom: 6 },
  locationText: { fontSize: 16, color: "#596e79", marginBottom: 5 },
  statusText: { fontSize: 16, color: "#1abc9c", fontWeight: "600", marginBottom: 12 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 5 },
  deliverButton: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#1dd1a1",
    shadowColor: "#1dd1a1",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  deleteButton: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#ff6b6b",
    shadowColor: "#ff6b6b",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  buttonText: { color: "#fff", fontSize: 17, fontWeight: "700", letterSpacing: 0.5 },
});
