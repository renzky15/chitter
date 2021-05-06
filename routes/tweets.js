const express = require("express")
const router = express.Router()
const {
    tweet,
    getAllTweets,
    likeTweet,
    removeTweet,
} = require("../controllers/TweetController")
const auth = require("../middleware/auth")

router.route("/").all(auth).get(getAllTweets).post(tweet).put(likeTweet)

router.route("/:_id").delete(removeTweet)

module.exports = router
