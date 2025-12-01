import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";

export default function HomeScreen({ navigation }) {
  const [donations, setDonations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const ADMIN_PASSWORD = "1234";

  useEffect(() => {
    axios
      .get("http://10.120.88.14:10000/api/donations")
      .then((res) => {
        const pending = res.data.filter((d) => d.status === "pending");
        const latestTwo = pending.slice(-2).reverse();
        setDonations(latestTwo);
      })
      .catch((err) => console.log("API error:", err));
  }, []);

  const handleAdminPress = () => setModalVisible(true);

  const checkPassword = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setModalVisible(false);
      setPasswordInput("");
      navigation.navigate("Admin");
    } else {
      Alert.alert("❌ Wrong Password", "You cannot access Admin screen");
      setPasswordInput("");
    }
  };

  const renderDonation = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.food}>🍱 {item.foodItems}</Text>
      <Text style={styles.quantity}>📦 {item.quantity}</Text>
      <Text style={styles.location}>📍 {item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* --- Profile Button --- */}
<TouchableOpacity
  style={styles.profileButton}
  onPress={() => navigation.navigate("Profile")}
>
  <Image
    source={{
      uri: "https://img.freepik.com/premium-vector/user-profile-icon-design-illustration-user-profile-avatar-gold-color-style_565585-18762.jpg",
    }}
    style={styles.profileImage}
  />
</TouchableOpacity>


      {/* Top Main Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("AddDonation")}>
          <Text style={styles.buttonText}> ➕ Add Donation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("AvailableDonations")}>
          <Text style={styles.buttonText}>📋 Donation History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("AIAssistant")}>
          <Text style={styles.buttonText}>🤖 Ask AI Assistant</Text>
        </TouchableOpacity>
      </View>

      {/* --- Admin Button (Now NOT hidden) --- */}
      <TouchableOpacity style={styles.circleButton} onPress={handleAdminPress}>
        <Text style={styles.circleText}>🔒{"\n"}Admin</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Latest Donations:</Text>

      <FlatList
        data={donations}
        keyExtractor={(item) => item._id}
        renderItem={renderDonation}
        contentContainerStyle={{ paddingBottom: 120 }}  // needed for admin button space
      />

      {/* --- Modal --- */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Admin Password</Text>

            <TextInput
              placeholder="Password"
              value={passwordInput}
              onChangeText={setPasswordInput}
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity style={styles.submitButton} onPress={checkPassword}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f7",
    padding: 20,
    paddingTop: 90,
  },

  // Profile Button
  profileButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    zIndex: 10,
  },
  profileText: {
    fontSize: 26,
    color: "#fff",
  },

  profileImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  borderWidth: 2,
  borderColor: "#fff",
},


  // Top Buttons
  buttonRow: {
    marginBottom: 20,
  },
  mainButton: {
    backgroundColor: "#4c8bf5",
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  // Admin Button
  circleButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#16c47f",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    zIndex: 20,   // ⭐ FIX: ensures the button is clickable
  },

  circleText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 15,
    color: "#1e2a38",
  },

  // Donation card
  card: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    marginVertical: 10,
    elevation: 4,
  },
  food: {
    fontSize: 17,
    fontWeight: "700",
  },
  quantity: {
    fontSize: 16,
  },
  location: {
    fontSize: 16,
  },

  // Modal
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 18,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 18,
  },

  input: {
    backgroundColor: "#f8f9fc",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 18,
  },

  submitButton: {
    backgroundColor: "#16c47f",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  cancelButton: {
    backgroundColor: "#ff5a5f",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});
