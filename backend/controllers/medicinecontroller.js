const Medicine = require("../models/Medicine");

const getAllMedicines = async (req, res) => {
  try {
    console.log("Welcome to shop"); // 👈 Debugging Log
    const medicines = await Medicine.find({});
    // console.log("Fetched medicines from DB:", medicines); // 👈 Debugging Log
    res.json(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const searchMedicine = async (req, res) => {
  console.log("Lets search!");
  const { name } = req.query;
  console.log("Searching for name:", name);
  try {
    const medicine = await Medicine.find({
      med_name: { $regex: "^" + name, $options: "i" },
    });

    if (medicine) {
      res.status(200).json(medicine);
    } 
    else {
      res.status(404).json({ message: "Medicine not found" });
    }
  } 
  catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};

module.exports = {
  getAllMedicines,
  searchMedicine,
};
