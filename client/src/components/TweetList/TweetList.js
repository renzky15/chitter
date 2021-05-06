import React, { useState, useEffect, useContext } from "react"
import "./TweetList.css"
import { connect } from "react-redux"
import moment from "moment"
import { tweetActions } from "../../action/tweet"
import AuthContext from "../../util/AuthContext"
import InfiniteScroll from "react-infinite-scroll-component"
import CommentForm from "./CommentForm"

function TweetList(props) {
    const [tweetList, setTweetList] = useState([])
    const [likeCounter, setLikeCounter] = useState()
    const [page, setPage] = useState(1)
    const { currentUser } = useContext(AuthContext)
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [commentId, setCommentId] = useState()
    useEffect(() => {
        const onLoadTweetList = () => {
            setTweetList(props.tweet_payload)
        }
        onLoadTweetList()
    }, [props.tweet_payload])

    const handleLikeCounter = (tweet_id) => {
        const data = tweetList.filter((list) => list._id === tweet_id)
        setLikeCounter(data[0].likes + 1)
        const payload = {
            likes: likeCounter,
            _id: tweet_id,
        }
        props.dispatch(tweetActions.likeTweet(payload))
    }

    const handleRemoveTweet = (id) => {
        try {
            props.dispatch(tweetActions.removeTweet(id))
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleComment = (id) => {
        setShowCommentForm(!showCommentForm)
        setCommentId(id)
    }

    const fetchMoreData = () => {
        console.log(props.dispatch(tweetActions.getAllTweet(page)))
        setTweetList(props.tweet_payload)
        setPage((prev) => prev + 1)
    }
    useEffect(() => {
        fetchMoreData()
    }, [])
    return (
        <div className="container">
            <ul>
                <div id="scrollable">
                    <InfiniteScroll
                        dataLength={tweetList.length}
                        next={fetchMoreData}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollable"
                    >
                        {tweetList
                            .map((tweet, index) => (
                                <div>
                                    <div className="tweet-list-container">
                                        <li key={index}>
                                            <div className="li-element">
                                                <div className="username-icon">
                                                    <span></span>
                                                </div>

                                                <div className="tweet-body">
                                                    <div className="tweet-body-header">
                                                        <div className="tweet-username">
                                                            <span>
                                                                {tweet.username}
                                                            </span>
                                                        </div>
                                                        <div className="date-actions-wrapper">
                                                            <div className="tweet-date-created">
                                                                <span>
                                                                    {moment(
                                                                        tweet.date_tweeted
                                                                    ).fromNow()}
                                                                </span>
                                                            </div>
                                                            {currentUser._id ===
                                                            tweet.user_id ? (
                                                                <div className="remove-tweet-btn">
                                                                    <button
                                                                        onClick={() =>
                                                                            handleRemoveTweet(
                                                                                tweet._id
                                                                            )
                                                                        }
                                                                        className="remove-btn"
                                                                    >
                                                                        <span className="remove-btn-text">
                                                                            x
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="tweet-body-text">
                                                        <p>
                                                            {tweet.tweet_body}
                                                        </p>
                                                    </div>
                                                    <div className="like-comments-counter">
                                                        <div className="number-of-likes">
                                                            <span>
                                                                {tweet.likes}{" "}
                                                                like(s)
                                                            </span>
                                                        </div>
                                                        <div className="number-of-comments">
                                                            <span>
                                                                {
                                                                    tweet
                                                                        .comments
                                                                        .length
                                                                }{" "}
                                                                comments
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <hr id="line-separator" />
                                                    <div className="tweet-body-footer">
                                                        <div className="tweet-like-btn">
                                                            <button
                                                                onClick={() =>
                                                                    handleLikeCounter(
                                                                        tweet._id
                                                                    )
                                                                }
                                                            >
                                                                <span id="btn-like">
                                                                    Like
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="tweet-comment-btn">
                                                            <button
                                                                onClick={() =>
                                                                    handleComment(
                                                                        tweet._id
                                                                    )
                                                                }
                                                            >
                                                                Comment
                                                            </button>
                                                        </div>
                                                        <div className="tweet-retweet-btn">
                                                            <span>Retweet</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                    {commentId === tweet._id ? (
                                        <CommentForm id={commentId} />
                                    ) : (
                                        <div></div>
                                    )}
                                </div>
                            ))
                            .reverse()}
                    </InfiniteScroll>
                </div>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tweet_payload: state.tweets,
    }
}
export default connect(mapStateToProps)(TweetList)
