const jwt = require("jsonwebtoken")

function auth(req, res, next) {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                success: false,
                error: "Unauthorized",
            })
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = verifyToken.user

        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized",
        })
    }
}

module.exports = auth
