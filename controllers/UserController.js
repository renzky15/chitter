const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// @desc Get all users
// @route GET /api/user
// @access Public
exports.getAllUsers = async (req, res, next) => {
    try {
        const user = await User.find()

        return res.status(200).json({
            success: true,
            count: user.length,
            data: user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        })
    }
}

// @desc Add  User
// @route POST /api/user
// @access Public
exports.addUser = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, username } = req.body

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists.",
            })
        }

        const salt = await bcrypt.genSalt()

        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = {
            email,
            passwordHash,
            firstName,
            lastName,
            username,
        }

        const savedUser = await User.create(newUser)

        // login the user after create
        const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET)

        console.log(token)
        //  handling cookie
        res.cookie("token", token, {
            httpOnly: true,
        }).send()

        return res.status(201).json({
            success: true,
            data: user,
        })
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(
                (val) => val.message
            )
            return res.status(400).json({
                success: false,
                error: messages,
            })
        } else {
            return res.status(500).json({
                success: false,
                error: "Server Error",
            })
        }
    }
}

// @desc get single user
// @route GET /api /auth/user/:id
// @access Public
exports.getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        return res.status(200).json({
            success: true,
            user_data: user,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        })
    }
}
