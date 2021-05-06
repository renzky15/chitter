import React, { useContext, useState } from "react"
import { useHistory, withRouter } from "react-router"
import { connect } from "react-redux"
import { login } from "../../api/auth"

import "./Login.css"
import AuthContext from "../../util/AuthContext"

function Login(props) {
    const { isLoggedIn } = useContext(AuthContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        const loginPayload = {
            email,
            password,
        }
        try {
            await login(loginPayload)

            await isLoggedIn()
            history.push("/")
        } catch (error) {
            window.alert("Incorrect email or password.")
        }
    }
    return (
        <div className="login_container">
            <h2
                style={{
                    textAlign: "center",
                    margin: 0,
                    marginTop: "30px",
                }}
            >
                Chitter | Login
            </h2>

            <form className="login_form" onSubmit={handleLogin}>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    placeholder="Email"
                    required
                    value={email}
                />

                <input
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Password"
                    required
                />

                <button className="btn_login">Login</button>
            </form>
            <p id="register_link">
                Not yet register? <a href="/register">Register here</a>
            </p>
        </div>
    )
}

export default connect()(withRouter(Login))
