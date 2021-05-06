import { Tweet, allTweet, likeCounter, remove } from "../api/tweet"

const today = new Date()
// export const addTweet = ({
//     user_id = '',
//     username = "",
//     tweetBody = "",
//     tweeted_date = today.toDateString(),
//     comments = 0,
//     retweets = 0,
//     likes = 0,
// } = {}) => ({
//     type: "ADD_TWEET",
//     tweet_payload: {
//         user_id,
//         username,
//         tweetBody,
//         tweeted_date,
//         comments,
//         retweets,
//         likes,
//     },
// })

export const tweetActions = {
    addTweet,
    getAllTweet,
    likeTweet,
    removeTweet,
}
function addTweet(tweet_payload) {
    return async (dispatch) => {
        await Tweet(tweet_payload).then(
            (res) => {
                dispatch(success(res.data))
            },
            (error) => {
                console.log(error.message)
            }
        )
    }

    function success(tweet_payload) {
        return { type: "ADD_TWEET", tweet_payload }
    }
}

function getAllTweet(page) {
    return async (dispatch) => {
        await allTweet(page).then(
            (res) => {
                dispatch(success(res.data))
                // console.log(res)
            },
            (error) => {
                console.log(error.message)
            }
        )
    }

    function success(tweets_payload) {
        return { type: "ALL_TWEET", tweets_payload }
    }
}

function likeTweet(payload) {
    return async (dispatch) => {
        await likeCounter(payload).then(
            (res) => {
                dispatch(success(res.data))
                // console.log(res)
            },
            (error) => {
                console.log(error.message)
            }
        )
    }

    function success(tweets_payload) {
        return { type: "LIKE_TWEET", tweets_payload }
    }
}

function removeTweet(payload) {
    return async (dispatch) => {
        await remove(payload).then(
            (res) => {
                dispatch(success(res.data))
            },
            (error) => {
                console.log(error.message)
            }
        )
    }

    function success(tweets_payload) {
        return { type: "REMOVE_TWEET", tweets_payload }
    }
}
