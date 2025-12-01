import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

export default function AIAssistantScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://10.120.88.14:8000/ask", { query: question });
      setAnswer(res.data.answer);
    } catch {
      setAnswer("❌ Failed to get response from AI.");
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🤖 AI Assistant</Text>

      <TextInput
        placeholder="Ask something..."
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={askAI}>
        <Text style={styles.buttonText}>{loading ? "⏳ Asking..." : "Ask AI"}</Text>
      </TouchableOpacity>

      <View style={styles.answerContainer}>
        <Text style={styles.answer}>{answer}</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: "#eef2f3",
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1b1f23",
    textAlign: "center",
    marginBottom: 25,
    letterSpacing: 1,
  },

  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 14,
    padding: 18,
    minHeight: 70,
    fontSize: 17,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#4facfe",
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: "center",

    // Gradient-like shadow feel
    shadowColor: "#4facfe",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,

    marginBottom: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  answerContainer: {
    padding: 18,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.7)",

    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    minHeight: 100,
  },

  answer: {
    fontSize: 17,
    lineHeight: 24,
    color: "#2c3e50",
    fontWeight: "500",
  },
});
