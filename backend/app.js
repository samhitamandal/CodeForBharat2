const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { generateToken } = require("./config/jwt.js");
const { jwtMiddleware } = require("./middleware/jwtMiddleware.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const paymentRoutes = require("./routes/stripe.js");

const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const medicineRoutes = require("./routes/medicineRoutes.js");
const cart = require("./routes/cart.js")
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();
app.use("/api/medicines", medicineRoutes);
app.use("/api/medicines/search", medicineRoutes);
app.use("/auth", authRoutes);
app.use("/api/stripe", paymentRoutes);
app.use("/users", userRoutes);
app.use("/api/cart",cart)
// start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
