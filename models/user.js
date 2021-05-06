const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
    },

    passwordHash: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("users", UserSchema)
