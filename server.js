const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")

dotenv.config({ path: "./config/config.env" })
// DB connection
connectDB()
const user = require("./routes/user")
const auth = require("./routes/auth")
const tweets = require("./routes/tweets")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`
    )
)

app.use("/api/user", user)
app.use("/api/auth", auth)
app.use("/api/tweet", tweets)
