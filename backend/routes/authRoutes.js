// 📦 Import required modules
import express from "express"; // Used to create routes and handle HTTP requests
import bcrypt from "bcryptjs"; // Used to hash (encrypt) passwords securely
import jwt from "jsonwebtoken"; // Used to create JSON Web Tokens for authentication
import User from "../models/User.js"; // Import the User model (MongoDB schema)

// 🚀 Create an Express router
const router = express.Router();

// ---------------------------
// 🟢 Signup Route (User Registration)
// ---------------------------
router.post("/signup", async (req, res) => {
  try {
    // 🧠 Extract name, email, and password from the request body
    const { name, email, password } = req.body;

    // 🔎 Check if a user with the same email already exists in the database
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash (encrypt) the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 Create a new user using the User model
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save(); // 💾 Save user to MongoDB

    // ✅ Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // ❌ Handle errors (e.g., database or server issues)
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ---------------------------
// 🔵 Login Route (User Authentication)
// ---------------------------
router.post("/login", async (req, res) => {
  try {
    // 🧠 Extract email and password from the request body
    const { email, password } = req.body;

    // 🔎 Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // 🔑 Compare entered password with stored hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🎟️ Generate a JWT token for secure login
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload (user ID + role)
      process.env.JWT_SECRET || "defaultsecret", // Secret key for signing token
      { expiresIn: "7d" } // Token will expire in 7 days
    );

    // ✅ Send response with token and user details
    res.status(200).json({
      message: "Login successful",
      token, // Used for authentication in future requests
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (err) {
    // ❌ Handle server or database errors
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 📤 Export the router so it can be used in server.js
export default router;
