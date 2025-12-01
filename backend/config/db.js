// 📦 Import mongoose (used to connect and interact with MongoDB)
import mongoose from "mongoose";

// ⚙️ Create an async function to connect to MongoDB
const connectDB = async () => {
  try {
    // 🔗 Try connecting to MongoDB using the connection string from .env file
    await mongoose.connect(process.env.MONGO_URI);

    // ✅ If connected successfully, show a success message
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    // ❌ If connection fails, show an error message
    console.error("❌ MongoDB Connection Failed:", err.message);

    // 🛑 Stop the server if database connection fails
    process.exit(1);
  }
};

// 🚀 Export the function so it can be used in other files (like server.js)
export default connectDB;


//This file connects your app to MongoDB.
//If connection works → show success.
//If connection fails → stop the server.
// Used in server.js to start the database connection.