import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import axios from "axios";

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState("");

  const submitFeedback = async () => {
    if (!feedback.trim()) {
      Alert.alert("Error", "Please enter feedback");
      return;
    }

    try {
      await axios.post("http://10.120.88.14:10000/api/feedback", {
        message: feedback,
      });

      Alert.alert("Success", "Feedback submitted");
      setFeedback("");
    } catch (err) {
      Alert.alert("Error", "Failed to submit feedback");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Feedback</Text>

      <TextInput
        placeholder="Write your feedback..."
        value={feedback}
        onChangeText={setFeedback}
        style={styles.input}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={submitFeedback}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 25, 
    backgroundColor: "#f7f9fc",
  },

  title: { 
    fontSize: 30, 
    fontWeight: "900", 
    marginBottom: 20, 
    textAlign: "center",
    color: "#1b1d28",
    letterSpacing: 0.5
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 18,
    padding: 20,
    minHeight: 140,
    fontSize: 17,
    marginBottom: 25,
    borderWidth: 1.3,
    borderColor: "#dde3ea",

    // Glass effect shadow
    shadowColor: "#6a7a89",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 5,

    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#15c586",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",

    // 3D soft shadow
    shadowColor: "#15c586",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 12,
    elevation: 8,
  },

  buttonText: { 
    color: "#fff", 
    fontSize: 19, 
    fontWeight: "800",
    letterSpacing: 0.3
  },
});
