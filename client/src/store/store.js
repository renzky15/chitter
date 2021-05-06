import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import TweetReducer from "../reducers/TweetReducer"
import thunk from "redux-thunk"

export default () => {
    const composeEnhancer =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const store = createStore(
        combineReducers({
            tweets: TweetReducer,
        }),
        composeEnhancer(applyMiddleware(thunk))
    )
    return store
}
