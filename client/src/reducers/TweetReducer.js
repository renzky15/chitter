const tweetReducerDefaultState = []

export default (state = tweetReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_TWEET":
            return [...state, action.tweet_payload]
        case "ALL_TWEET":
            return [...action.tweets_payload]
        case "REMOVE_TWEET":
            return [...action.tweets_payload]
        case "LIKE_TWEET":
            return [...action.tweets_payload]

        // case "LIKE_TWEET":
        //     return state.map((tweet_payload) => {
        //         if (task_payload.id === action.id) {
        //             return {
        //                 ...task_payload,
        //                 ...action.updates,
        //             }
        //         } else {
        //             return task_payload
        //         }
        //     })
        default:
            return state
    }
}
