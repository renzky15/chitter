const mongoose = require("mongoose")

const TweetSchema = new mongoose.Schema({
    user_id: {
        type: String,
        trim: true,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
    },

    tweet_body: {
        type: String,
        required: true,
    },
    date_tweeted: {
        type: Date,
        trim: true,
    },
    likes: {
        type: Number,
        trim: true,
        default: 0,
    },
    comments: {
        type: Array,
        trim: true,
        default: [],
    },

    retweets: {
        type: Number,
        trim: true,
    },
})

module.exports = mongoose.model("tweets", TweetSchema)
