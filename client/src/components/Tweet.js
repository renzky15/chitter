import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import TweetForm from "./TweetForm/TweetForm"
import { tweetActions } from "../action/tweet"
import TweetList from "./TweetList/TweetList"

import AuthContext from "../util/AuthContext"

function Tweet(props) {
    // props.dispatch(
    //     addTweet({
    //         name: "Test",
    //         comments: 12,
    //         retweets: 23,
    //         likses: 23,
    //     })
    // )

    useEffect(() => {
        props.dispatch(tweetActions.getAllTweet())
    }, [])

    const { currentUser } = useContext(AuthContext)

    console.log(currentUser)

    return (
        <div className="container">
            <TweetForm
                onTweetPost={(tweetPost) => {
                    props.dispatch(tweetActions.addTweet(tweetPost))
                }}
            />

            {props.tweet_payload.length > 0 ? <TweetList /> : <div></div>}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        tweet_payload: state.tweets,
    }
}
export default connect(mapStateToProps)(Tweet)
