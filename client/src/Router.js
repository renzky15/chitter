import React, { useContext } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Tweet from "./components/Tweet"
import Login from "./components/Login/Login"

import Register from "./components/Register/Register"
import AuthContext from "./util/AuthContext"
import Navbar from "./Navbar/Navbar"

function Router() {
    const { loggedIn } = useContext(AuthContext)
    console.log(loggedIn)

    return (
        <BrowserRouter>
            {loggedIn === true && <Navbar />}
            <Switch>
                {loggedIn === true && (
                    <>
                        <Route exact path="/" component={Tweet} />
                    </>
                )}
                {loggedIn === false && (
                    <>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </>
                )}
            </Switch>
        </BrowserRouter>
    )
}
export default Router
