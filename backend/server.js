import express from "express"; 
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";

// ✅ Load environment variables from .env file
dotenv.config();

// ✅ Initialize Express app
const app = express();

// ✅ Middleware
app.use(cors()); // allow requests from frontend (like Expo app)
app.use(express.json()); // automatically parse incoming JSON data

// ✅ Connect to MongoDB using the function from db.js
connectDB();

// ✅ Basic test route to check if server is working
app.get("/", (req, res) => {
  res.send("Welcome to ShareBite API 🍴");
});

// ✅ Set up API routes
app.use("/api/auth", authRoutes);       // routes for user signup/login
app.use("/api/donations", donationRoutes); // routes for managing donations

// ✅ Port configuration (use port from .env or default 5000)
const PORT = process.env.PORT || 5000;

// ✅ Start server and listen on all network interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`🌐 Access from Expo using: http://<your-local-ip>:${PORT}`);
});
