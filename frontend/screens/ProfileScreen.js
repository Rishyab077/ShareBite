import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({ name: "", email: "", id: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get("http://10.120.88.14:10000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const payload = res.data || {};
        setUser({
          id: payload.id || payload._id || "",
          name: payload.name || "",
          email: payload.email || "",
        });
      } catch (err) {
        console.log("Failed to load user", err?.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="dark-content" backgroundColor="#f4f7fb" />
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading profile…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f7fb" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Image
            source={{
              uri:
                "https://img.freepik.com/premium-vector/user-profile-icon-design-illustration-user-profile-avatar-gold-color-style_565585-18762.jpg",
            }}
            style={styles.avatar}
          />

          <Text style={styles.name}>{user.name || "Guest User"}</Text>
          <Text style={styles.email}>{user.email || "No email provided"}</Text>

          {/* Buttons */}
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => navigation.navigate("EditProfile", { user })}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.feedbackButton]}
              onPress={() => navigation.navigate("Feedback")}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Give Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            Keep your profile updated for a smoother experience.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },

  container: {
    alignItems: "center",
    padding: 22,
    paddingTop: 40,
  },

  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: "#555",
  },

  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 22,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 12,

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 18,
    borderWidth: 6,
    borderColor: "#edf3f7",
    backgroundColor: "#fff",
  },

  name: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1d2a38",
    marginBottom: 6,
  },

  email: {
    fontSize: 15,
    color: "#6c7a88",
    marginBottom: 25,
  },

  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
  },

  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginHorizontal: 6,
    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },

  editButton: {
    backgroundColor: "#16c47f",
  },

  feedbackButton: {
    backgroundColor: "#4c8bf5",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.4,
  },

  footerNote: {
    marginTop: 24,
    width: "100%",
    alignItems: "center",
  },

  footerText: {
    color: "#61707b",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 18,
    lineHeight: 20,
  },
});
