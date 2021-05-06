import React, { useState, useContext } from "react"
import "./TweetForm.css"
import AuthContext from "../../util/AuthContext"
import moment from "moment"

export default function TweetForm(props) {
    const [tweetText, setTweetText] = useState("")
    const { currentUser } = useContext(AuthContext)

    const onTweet = (e) => {
        e.preventDefault()

        if (!tweetText) {
            window.alert("Empty tweet cannot be published.")
        } else {
            props.onTweetPost({
                username: currentUser.username,
                user_id: currentUser._id,
                tweet_body: tweetText,
                date_tweeted: moment(),
            })

            setTweetText("")
        }
    }
    const onTextChange = (e) => {
        const tweet = e.target.value
        setTweetText(tweet)
    }
    return (
        <div className="container">
            <div className="form-container">
                <form onSubmit={onTweet}>
                    <div className="row-element">
                        <div className="username-icon">
                            <span>{currentUser.firstName}</span>
                        </div>

                        <div className="text-area">
                            <textarea
                                name="tweet-text"
                                placeholder="What's happening"
                                autoFocus
                                onChange={onTextChange}
                                value={tweetText}
                            />
                        </div>
                    </div>
                    <div id="tweet-btn-container">
                        <button className="tweet-btn">Cheep</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
