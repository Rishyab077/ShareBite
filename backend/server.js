import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";   // ✅ import feedback
import profileRoutes from "./routes/profileRoutes.js";     // ✅ import profile

// ✅ Load environment variables
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Middleware
app.use(cors()); // allow requests from frontend (Expo)
app.use(express.json()); // parse JSON request bodies

// ✅ Connect to MongoDB
connectDB();

// ✅ Basic test route
app.get("/", (req, res) => {
  res.send("Welcome to ShareBite API 🍴");
});

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/feedback", feedbackRoutes);   // ✅ feedback route
app.use("/api/profile", profileRoutes);     // ✅ profile route

// ✅ Port configuration
const PORT = process.env.PORT || 5000;

// ✅ Start server and listen on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`🌐 Access from Expo using: http://10.120.88.14:${PORT}`);
});
