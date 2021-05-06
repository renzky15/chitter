const express = require("express")
const router = express.Router()
const {
    getAllUsers,
    addUser,
    getSingleUser,
} = require("../controllers/UserController")

router.route("/").get(getAllUsers).post(addUser)

router.route("/:id").get(getSingleUser)

module.exports = router
