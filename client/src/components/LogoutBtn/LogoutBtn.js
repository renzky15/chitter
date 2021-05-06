import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import AuthContext from "../../util/AuthContext"
import { logout } from "../../api/auth"
import "./LogoutBtn.css"

function LogoutBtn() {
    const { isLoggedIn } = useContext(AuthContext)

    const history = useHistory()

    async function userLogout() {
        await logout()

        await isLoggedIn()
        history.push("/login")
    }

    return (
        <button className="logout-btn" onClick={userLogout}>
            Log out
        </button>
    )
}

export default LogoutBtn
