import "./App.css"

import { Provider } from "react-redux"
import configStore from "./store/store"
import Router from "./Router"
import axios from "axios"

import { AuthContextProvider } from "./util/AuthContext"

axios.defaults.withCredentials = true

const store = configStore()

function App() {
    return (
        <Provider store={store}>
            <AuthContextProvider>
                <Router />
            </AuthContextProvider>
        </Provider>
    )
}

export default App
