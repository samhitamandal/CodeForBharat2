const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  med_name: { type: String, required: true },
  med_desc: { type: String },
  side_effects: { type: String },
  med_price: { type: Number },
  med_quantity: { type: Number },
  // image: { type: String } // Uncomment this after you add images to DB
});

module.exports = mongoose.model("Medicine", medicineSchema, "Medicines");
// module.exports = mongoose.models.Medicines || mongoose.model('Medicines', medicineSchema);