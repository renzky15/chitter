const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode")

// @desc Login  User
// @route POST /api/login
// @access Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter all required fields.",
            })
        }

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(401).json({
                message: "Incorrect",
            })
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.passwordHash
        )
        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Incorrect",
            })
        }

        // login user
        const token = jwt.sign(
            { user: existingUser._id },
            process.env.JWT_SECRET
        )

        console.log(token)
        //  handling cookie
        res.cookie("token", token, {
            httpOnly: true,
        })
            .json({ userID: existingUser._id, message: "Success" })
            .send()
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

exports.logout = async (req, res, next) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    }).send()
}

exports.loggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.json({ isLoggedIn: false, currentUser: {} }).send()
        }

        jwt.verify(token, process.env.JWT_SECRET)

        const decodePayload = jwt_decode(token)
        console.log(decodePayload)

        const currentUser = await User.findOne({ _id: decodePayload.user })

        res.json({ currentUser: currentUser, isLoggedIn: true }).send()
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized",
        })
    }
}
