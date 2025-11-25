import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import axios from "axios";

// ✅ AIAssistantScreen – allows users to ask questions to the AI assistant
export default function AIAssistantScreen() {

  // ✅ State variable to store the user's question
  const [question, setQuestion] = useState("");

  // ✅ State variable to store the AI's answer
  const [answer, setAnswer] = useState("");

  // ✅ Function to send user's question to the AI backend and get answer
  const askAI = async () => {
    try {
      // 🔹 Make POST request to the Flask RAG API
      const res = await axios.post("http://10.113.75.14:8000/ask", { query: question });

      // 🔹 Update state with the answer from AI
      setAnswer(res.data.answer);
    } catch (err) {
      // 🔹 Show error if API request fails
      setAnswer("❌ Failed to get response from AI.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* ✅ Input box for user to type a question */}
      <TextInput
        placeholder="Ask something..."
        value={question}
        onChangeText={setQuestion}  // Update question state as user types
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      {/* ✅ Button to send question to AI */}
      <Button title="Ask AI" onPress={askAI} />

      {/* ✅ Display AI's answer */}
      <Text style={{ marginTop: 20 }}>{answer}</Text>
    </View>
  );
}
