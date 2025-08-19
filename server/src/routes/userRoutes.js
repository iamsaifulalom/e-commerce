require("dotenv").config()
const { Router } = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkRole, checkAuth } = require('../middleware/checkAuth');
const handleError = require("../helper/common/handleError");

const router = Router()

/// veryfi user and sendg backe identyty
router.get("/me", checkAuth, async (req, res) => {
    const { user } = req;
    res.status(200).json(user)
})

//create new users after otp varifications
router.post("/", checkAuth, checkRole(["admin"]), async (req, res) => {
    try {

        const userData = req.body;
        const user = await User.findOne({ phoneNumber: userData?.phoneNumber })
        if (user) return res.status(400).json({ error: "নাম্বারটি ব্যবহার করা হচ্ছে।" })

        let newUser;
        if (!userData.role) throw new Error("Invalid data")
        const isCustomer = userData.role === "customer";

        if (isCustomer) {
            const { phoneNumber } = userData;
            if (!phoneNumber) throw new Error("Invalid data")
            newUser = new User({ phoneNumber: phoneNumber })
        } else {
            const { phoneNumber, password: palanPassword, name, role } = userData;
            if (!phoneNumber || !palanPassword || !name || !role) throw new Error("Invalid data")

            newUser = new User({
                phoneNumber,
                role,
                password: await bcrypt.hash(palanPassword, 10),
                name
            })
        }
        await newUser.save()
        res.status(201).json({ message: "সফলভাবে ইউজারকে যুক্ত করা হয়েছে।" })
    } catch (error) {

        console.log(error.message)
        return res.status(500).json({ error: error.message })
    }

})


// sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        let user = await User.findOne({ phoneNumber: phoneNumber })

        // if user is not found then create one with phone number
        if (!user) {
            const newUser = new User({ phoneNumber })
            user = await newUser.save();
        }

        // check if custommer or not
        const isCustomer = user.role === "customer"

        if (!isCustomer) {
            if (!password) return res.status(400).json({ error: "Password required" })
            const isPasswordMatch = bcrypt.compare(password, user.password)
            if (!isPasswordMatch) return res.status(400).json({ error: "Invalid credential" })
        }

        // sign a jwt
        const authToken = jwt.sign(
            { phoneNumber: user.phoneNumber },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        )

        return res.status(200).json({ authToken })
    } catch (error) {
        handleError(error, res)
    }
})

//@admin only
// all users
router.get("/", checkAuth, checkRole(["admin"]), async (req, res) => {

    try {
        const limit = 20
        const { role, search, page = 1 } = req.query;

        const query = {}

        // filter by role
        if (role) query.role = role;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } }
            ];
        }

        const users = await User.find(query)
            .sort({ updatedAt: -1 }).skip((page - 1) * limit)
            .limit(limit)
            .select("-password -createdAt -updatedAt -__v")


        res.status(200).json({
            users,
            hasMore: users.length === limit
        });

    } catch (err) {
        console.log("erro while fetching all users at /api/users", err.messaga)
        res.status(500).json({ error: err.message })
    }
})

// get user detaisl by id
// @ public
router.get("/:id", checkAuth, checkRole(["admin"]), async (req, res) => {

    try {
        const { id } = req.params
        const user = await User.findById(id)
            .select("-password -createdAt -updatedAt -__v");
        res.status(200).json(user)
    } catch (err) {
        console.log("erro while fetching user at /api/users/:id", err.messaga)
        res.status(500).json({ error: err.message })
    }
})

// update user 
// only admin
router.put("/", checkAuth, checkRole(["admin"]), async (req, res) => {

    try {
        const { _id, name, phoneNumber, role, password } = req.body;
        const isCustomer = role === "customer";
        const user = await User.findById(_id)

        const isSaiful = user?.phoneNumber === "01935679071";

        let newUserData = {};

        if (isCustomer) newUserData.phoneNumber = phoneNumber;
        if (!isCustomer) newUserData.name = name;
        if (!isSaiful) {
            if (role) newUserData.role = role;
            if (phoneNumber) newUserData.phoneNumber = phoneNumber;
        }

        if (password && !isCustomer) {
            newUserData.password = await bcrypt.hash(password, 10);
        };

        const UpdatedUser = await User.findByIdAndUpdate(_id, newUserData, { new: true });
        if (!UpdatedUser) return res.status(404).json({ error: "User not found" })

        res.status(200).json({ message: "User updated" })
    } catch (error) {
        handleError(error, res)
    }
})

// delete user 
// @ public
// @ admin only
router.delete("/:id", checkAuth, checkRole(["admin"]), async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User deleted succesfully" })
    } catch (error) {
        console.log("erro while deleting user at /api/users/:id", err.messaga)
        res.status(500).json({ error: err.message })
    }
})

module.exports = router;