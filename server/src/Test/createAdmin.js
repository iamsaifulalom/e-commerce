const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/ecomerce");

    const hashedPassword = await bcrypt.hash("123456", 10);

    const newUser = new User({
      phoneNumber: "01935679071",
      role: "admin",
      password: hashedPassword,
      name: "Saiful",
    });

    const user = await newUser.save();
    console.log("Admin created:", user);

    mongoose.disconnect(); // close connection
  } catch (err) {
    console.error("Error creating admin:", err.message);
  }
};

createAdmin();
