import axios from "axios"
const api = "http://localhost:8000/api"

const config = {
    "Content-Type": "application/json",
}
export async function Tweet(payload) {
    try {
        const res = await axios.post(`/tweet`, payload, config)

        return res.data
    } catch (error) {
        console.log("Error.")
    }
}

export async function allTweet(page) {
    try {
        const res = await axios.get(`/tweet?page=${page}`, config)

        return res.data
    } catch (error) {
        console.log("Error.")
    }
}

export async function likeCounter(payload) {
    try {
        const res = await axios.put(`/tweet`, payload, config)

        return res.data
    } catch (error) {
        console.log("Error.")
    }
}
export async function remove(_id) {
    try {
        const res = await axios.delete(`/tweet/${_id}`, config)

        return res.data
    } catch (error) {
        console.log("Error.")
    }
}
