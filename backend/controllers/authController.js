const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env");
const { generateToken } = require("../config/jwt");
const dotenv = require("dotenv");
const dns = require("dns");
const { verifyEmailDNS } = require("../utils/emailVerifyer");
const express = require("express");
dotenv.config();

// Register a new user
const register = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;

  try {
    // Check if email is valid using DNS lookup
    const isValidEmail = await verifyEmailDNS(email);
    if (!isValidEmail) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
    });

    await newUser.save();
    console.log("User registered:", newUser);
    // Generate a JWT token
    const token = generateToken(newUser);

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id, // ✅ this will be available on frontend
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
