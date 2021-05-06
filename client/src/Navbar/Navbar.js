import React, { useContext } from "react"
import "./Navbar.css"
import LogoutBtn from "../components/LogoutBtn/LogoutBtn"
import AuthContext from "../util/AuthContext"

export default function Navbar() {
    const { currentUser } = useContext(AuthContext)
    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-content-logo">Chitter</div>

                <div className="navbar-content-right">
                    <div className="navbar-content-user">
                        <span>
                            {currentUser.firstName + " " + currentUser.lastName}
                        </span>
                    </div>
                    <div className="navbar-content-logout-btn">
                        <LogoutBtn />
                    </div>
                </div>
            </div>
        </div>
    )
}
