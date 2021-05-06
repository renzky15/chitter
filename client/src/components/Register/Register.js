import React, { useState, useContext } from "react"
import { withRouter, Redirect, useHistory } from "react-router"
import { register } from "../../api/auth"

import "./Register.css"
import AuthContext from "../../util/AuthContext"

function Register() {
    const { isLoggedIn } = useContext(AuthContext)
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const handleRegister = async (e) => {
        e.preventDefault()
        const registerPayload = {
            email,
            password,
            firstName,
            lastName,
            username,
        }
        try {
            await register(registerPayload)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {})

            await isLoggedIn()
            history.push("/")

            setEmail("")
            setPassword("")
            setFirstName("")
            setLastName("")
            setUsername("")
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="register_container">
            <h2
                style={{
                    textAlign: "center",
                    margin: 0,
                    marginTop: "30px",
                }}
            >
                Chitter | Register
            </h2>

            <form className="register_form" onSubmit={handleRegister}>
                <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    name="firstName"
                    placeholder="First Name"
                    value={firstName}
                />
                <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    name="lastName"
                    placeholder="Last Name"
                    value={lastName}
                />
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    placeholder="@Username"
                    value={username}
                />
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

                <button className="btn_register">Sign Up</button>
            </form>
            <p id="login_link">
                Already have an account? <a href="/login">Sign in here</a>
            </p>
        </div>
    )
}

export default withRouter(Register)
