// 📦 Import mongoose to work with MongoDB
import mongoose from "mongoose";

// 🧩 Define the structure (schema) for the "User" collection
const userSchema = new mongoose.Schema({
  // 👤 User's full name
  name: { type: String, required: true },

  // 📧 User's email address (must be unique — no duplicates allowed)
  email: { type: String, required: true, unique: true },

  // 🔐 User's password (will be stored in encrypted form later)
  password: { type: String, required: true },

  // 🎭 User's role — can be "user" (default) or "admin"
  role: { type: String, default: "user" } 
});

// 🚀 Export the model so other files (like routes) can use it
// This creates a "users" collection in MongoDB
export default mongoose.model("User", userSchema);
