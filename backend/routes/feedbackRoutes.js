const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST /api/feedback - submit feedback
router.post("/", async (req, res) => {
  try {
    const { userId, message } = req.body;
    const feedback = new Feedback({ user: userId, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit feedback" });
  }
});

// GET /api/feedback - get all feedback (optional, admin only)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name email");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

module.exports = router;

// This file defines API routes for managing feedback:

// 1️⃣ POST /api/feedback
//    - Used to submit new feedback.
//    - It takes `userId` and `message` from the request body.
//    - Saves feedback in the database.
//    - Returns a success message on successful submission.

// 2️⃣ GET /api/feedback
//    - Used to fetch all feedbacks (typically for admin use).
//    - Retrieves feedbacks from the database.
//    - Populates user details (name and email) for each feedback.
//    - Returns feedback data as JSON.

// 🎯 In one sentence:
// This file handles submitting and fetching user feedback using MongoDB.
