import axios from "axios"
const api = "http://localhost:8000/api"
const config = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
}
export async function login(payload) {
    try {
        const res = await axios.post(`/auth/login`, payload, config)

        return res.data
    } catch (error) {
        console.log("Error.")
    }
}

export async function register(payload) {
    try {
        const res = await axios.post(`/user`, payload, config)

        return res.data
    } catch (error) {
        console.log("Error.")
    }
}

export async function getLoggedIn() {
    try {
        const res = await axios.get(`/auth/loggedIn`)
        return res.data
    } catch (error) {
        console.log("Error.")
    }
}

export async function logout() {
    try {
        const res = await axios.get(`/auth/logout`)
        return res.data
    } catch (error) {
        console.log("Error.")
    }
}
