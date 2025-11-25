// 📦 Import mongoose (used for working with MongoDB)
import mongoose from "mongoose"; 

// 🧩 Define the structure (schema) for the "Donation" collection
const donationSchema = new mongoose.Schema({
  // 👤 Name of the person donating the food
  donorName: { type: String, required: true },

  // 🍱 Description or list of food items being donated
  foodItems: { type: String, required: true },

  // 📦 Quantity of food (for example: "10 meals", "5 plates")
  quantity: { type: String, required: true },

  // 📍 Pickup location for the donation
  location: { type: String, required: true },

  // 🕓 Current status of the donation (default = "pending")
  status: { type: String, default: "pending" },
});

// 🚀 Export the model so it can be used in other files
// (It will create a "donations" collection in MongoDB)
export default mongoose.model("Donation", donationSchema);
