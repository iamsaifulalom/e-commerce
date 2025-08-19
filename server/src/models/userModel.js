const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "customer", 
    enum: ["customer", "seller", "admin"],
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
