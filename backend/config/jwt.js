const jwt = require("jsonwebtoken");
const express = require("express");
//const { JWT_SECRET } = require('../config/config.js')
//const { JWT_EXPIRATION } = require('../config/config.js')
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

module.exports = { generateToken };
