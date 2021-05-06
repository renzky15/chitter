const Tweet = require("../models/tweet")

// @desc POST  Tweet
// @route POST /api/tweet
// @access Public
exports.tweet = async (req, res, next) => {
    try {
        const {
            user_id,
            username,
            tweet_body,
            date_tweeted,
            likes,
            comments,
            retweets,
        } = req.body

        const tweet = await Tweet.create(req.body)

        return res.status(201).json({
            success: true,
            data: tweet,
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

exports.getAllTweets = async (req, res, next) => {
    try {
        const tweets = await Tweet.find()

        return res.status(201).json({
            success: true,
            count: tweets.length,
            data: tweets,
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

exports.likeTweet = async (req, res, next) => {
    const { _id, likes } = req.body
    try {
        const tweet = await Tweet.findOneAndUpdate({ _id }, { $set: { likes } })
        const tweets = await Tweet.find()
        return res.status(201).json({
            success: true,
            count: tweets.length,
            data: tweets,
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

exports.removeTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById({ _id: req.params._id })
        if (!tweet) {
            return res.status(404).json({
                success: false,
                error: "No item found",
            })
        }

        await tweet.remove()
        const tweets = await Tweet.find()
        return res.status(200).json({
            success: true,
            data: tweets,
            message: "Successfully deleted",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error",
        })
    }
}
