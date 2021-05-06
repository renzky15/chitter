import React, { useState } from "react"
import "./TweetList.css"

function CommentForm(props) {
    const [comment, setComment] = useState("")

    const onTextChange = (e) => {
        const commentVal = e.target.value
        setComment(commentVal)
    }
    return (
        <div className="comment-form-container">
            <div className="comment-wrapper">
                <div className="username-icon">
                    <span></span>
                </div>
                <form className="comment-form">
                    <textarea
                        onChange={onTextChange}
                        value={comment}
                        name="comment"
                        placeholder="Comment here"
                    />
                </form>
                <div id="tweet-btn-container">
                    <button className="tweet-btn">Send</button>
                </div>
            </div>
        </div>
    )
}
export default CommentForm
