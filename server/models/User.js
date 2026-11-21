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

// encrypt the password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

// create and return jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//  validate the password
userSchema.methods.isValidatedPassword = async function (userSchema) {
  return await bcrypt.compare(userSentPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
