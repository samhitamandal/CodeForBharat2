const express = require("express");
const { getAllUsers, getUserById,updateUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/:id", getUserById);
router.get("/getAllUser", getAllUsers);
router.put("/:id", updateUserById);

module.exports = router;