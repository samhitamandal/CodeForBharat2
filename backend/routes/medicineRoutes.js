const express = require("express");
const router = express.Router();
const {
  getAllMedicines,
  searchMedicine,
} = require("../controllers/medicinecontroller");

router.get("/", getAllMedicines);
router.get("/search", searchMedicine);

module.exports = router;
