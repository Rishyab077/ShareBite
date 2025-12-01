// 📦 Import required modules
import express from "express"; // Used to create API routes
import Donation from "../models/Donation.js"; // Import Donation model (MongoDB schema)

// 🚀 Create a router object to define routes
const router = express.Router();


// ---------------------------
// 🟢 ADD Donation Route (POST)
// ---------------------------
// This route allows a donor to add a new food donation
router.post("/", async (req, res) => {
  try {
    // 🧠 Create a new donation using the request body (sent by frontend)
    const donation = new Donation(req.body);

    // 💾 Save donation to MongoDB
    await donation.save();

    // ✅ Send success message and donation data as response
    res.json({ message: "Donation added!", donation });
  } catch (err) {
    // ❌ Handle any error (like database connection failure)
    res.status(500).json({ error: err.message });
  }
});


// ---------------------------
// 🔵 GET All Donations Route (GET)
// ---------------------------
// This route fetches all donations from the database (used by admin or volunteer)
router.get("/", async (req, res) => {
  try {
    // 📋 Find all donation documents in MongoDB
    const donations = await Donation.find();

    // ✅ Send list of all donations as JSON
    res.json(donations);
  } catch (err) {
    // ❌ Handle errors
    res.status(500).json({ error: err.message });
  }
});




// ---------------------------
// 🟠 UPDATE Donation Route (PUT)
// ---------------------------
// This route updates donation details (for example: mark donation as 'delivered')
router.put("/:id", async (req, res) => {
  try {
    // ✏️ Find donation by ID and update its data with request body
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // ✅ Return updated donation details
    res.json(donation);
  } catch (err) {
    // ❌ Handle errors (invalid ID or DB issues)
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------
// 🔴 DELETE Donation Route (DELETE)
// ---------------------------
// This route deletes a donation by its ID (used by admin)
router.delete("/:id", async (req, res) => {
  try {
    // 🗑️ Find donation by ID and delete it
    await Donation.findByIdAndDelete(req.params.id);

    // ✅ Send confirmation message
    res.json({ message: "Donation deleted" });
  } catch (err) {
    // ❌ Handle errors
    res.status(500).json({ error: err.message });
  }
});


// 📤 Export router so it can be used in server.js
export default router;


// SUMMARY OF donationRoutes.js

// This file handles all donation-related API routes.

// 1️⃣ POST /
// Adds a new donation.
// Frontend sends donation data → it gets saved in MongoDB → returns "Donation added!".

// 2️⃣ GET /
// Gets ALL donations from the database.
// Used by admin/volunteer to see all donations.

// 3️⃣ PUT /:id
// Updates a donation by its ID.
// Example: mark donation as "delivered" or update details.

// 4️⃣ DELETE /:id
// Deletes a donation by its ID.
// Used by admin to remove a donation.

// router is exported so server.js can use these routes.
