require("dotenv").config()
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization;
        const phoneNumber = jwt.verify(token?.split(" ")[1], process.env.JWT_SECRET)?.phoneNumber;
        const user = await User.findOne({ phoneNumber }).select("role phoneNumber");

        if (!user) throw new Error("User not logged in.");

        req.user = {
            _id: user?._id.toString(),
            role: user.role,
            phoneNumber,
            authToken: token
        };
        next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ error: "দয়া করে সাইন ইন করুন।" })
    }
}


const checkRole = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
};


module.exports = { checkAuth, checkRole };