// 📦 Import required modules
import express from "express";
import bcrypt from "bcryptjs"; // bcryptjs works well with Node
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ---------------------------
// 🟢 Signup Route (User Registration)
// ---------------------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to register", error: err.message });
  }
});

// ---------------------------
// 🔵 Login Route (User Authentication)
// ---------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role || "user" },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// ---------------------------
// 🟣 Get Logged-in User Info
// ---------------------------
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret");

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user", details: err.message });
  }
});



export default router;

// -------------------------------------------------------------
// 1️⃣ Signup Route (POST /signup)
// Used when a user creates a new account.
//
// It does:
// ✔️ Check if email already exists
// ✔️ Hash the password
// ✔️ Save the user in the database
// ✔️ Send success message ("User registered successfully")
// -------------------------------------------------------------

// -------------------------------------------------------------
// 2️⃣ Login Route (POST /login)
// Used when a user logs in.
//
// It does:
// ✔️ Check if email exists
// ✔️ Compare the entered password with stored password
// ✔️ Create a JWT token for authentication
// ✔️ Send user info + token back to the frontend
// -------------------------------------------------------------

// -------------------------------------------------------------
// 3️⃣ Get Logged-in User Route (GET /me)
// Used to fetch profile of the currently logged-in user.
//
// It does:
// ✔️ Read token sent by frontend (Authorization header)
// ✔️ Verify the token
// ✔️ Find the user from the database using token ID
// ✔️ Return user details (password removed)
// -------------------------------------------------------------

// 🎯 Summary:
// This file handles signup, login, and getting current user info using JWT.
// -------------------------------------------------------------
