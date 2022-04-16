
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // get token from headers
            token = req.headers.authorization.split(" ")[1]

            // verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token
            req.user = await User.findById(decoded.id).select("-password")
            next()
        }
        catch (error) {
            console.log(error)
        }
    }
    try {
        if (!token) {
            res.status(401).json("Not authorized, no token")
        }
    }
    catch (error) {
        console.log(error)
    }
} 

module.exports = protect