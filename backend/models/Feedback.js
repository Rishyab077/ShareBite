const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);


// This file defines how feedback is stored.

// Fields:

// 1.user → which user gave feedback (optional)
// 2.message → feedback text
// 3.createdAt → date and time
 
// Creates Feedback model for database operations.