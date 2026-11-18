const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    required: false,
    default:
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
  },
});
