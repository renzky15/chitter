const express = require("express")
const router = express.Router()

const { login, logout, loggedIn } = require("../controllers/AuthController")

router.route("/login").post(login)
router.route("/loggedIn").get(loggedIn)
router.route("/logout").get(logout)

// router.route("/:id").delete(deleteItem)

module.exports = router
