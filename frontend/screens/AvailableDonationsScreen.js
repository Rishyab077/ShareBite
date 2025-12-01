import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

export default function AvailableDonationsScreen() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
  axios.get("http://10.120.88.14:10000/api/donations")
    .then((res) => {
      const pending = res.data.filter((d) => d.status === "pending");
      setDonations(pending);
    })
    .catch((err) => console.log(err));
}, []);


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.donor}>👤 Donor: {item.donorName}</Text>
      <Text style={styles.food}>🍱 Food: {item.foodItems}</Text>
      <Text style={styles.quantity}>📦 Quantity: {item.quantity}</Text>
      <Text style={styles.location}>📍 Location: {item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Donations</Text>
      <FlatList
        data={donations}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#eef2f3",
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20,
    color: "#1b1f23",
    letterSpacing: 1,
  },

  card: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 20,
    borderRadius: 18,
    marginVertical: 10,

    // PREMIUM SHADOW
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,

    // BORDER
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },

  donor: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2d3436",
    marginBottom: 6,
  },

  food: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0984e3",
    marginBottom: 6,
  },

  quantity: {
    fontSize: 16,
    color: "#636e72",
    marginBottom: 6,
  },

  location: {
    fontSize: 16,
    color: "#636e72",
    marginBottom: 10,
  },
});
