import React, { useState, useEffect, createContext } from "react"
import { getLoggedIn } from "../api/auth"
import { connect } from "react-redux"

const AuthContext = createContext()

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined)
    const [currentUser, setCurrentUser] = useState({})

    const isLoggedIn = async () => {
        const res = await getLoggedIn()

        console.log(res.isLoggedIn)

        setLoggedIn(res.isLoggedIn)
        setCurrentUser(res.currentUser)
    }

    useEffect(() => {
        isLoggedIn()
    }, [])
    return (
        <AuthContext.Provider value={{ loggedIn, currentUser, isLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider }
export default AuthContext
