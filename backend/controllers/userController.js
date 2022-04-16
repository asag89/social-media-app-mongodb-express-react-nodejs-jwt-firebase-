
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// register
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            res.status(400).json("Please add all fields")
        }

        // check if user exist
        const userExist = await User.findOne({ email })

        if (userExist) {
            res.status(400).json("User already exist")
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        if (user) {
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                followers: user.followers,
                followings: user.followings,
                token: generateToken(user.id)
            })
        }
        else {
            res.status(400).json("Invalid user data")
        }
    } catch (error) {
        console.log(error)
    }
}

// login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            req.status(400).json("Please add all fields")
        }

        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                followers: user.followers,
                followings: user.followings,
                biography: user.biography,
                image: user.image,
                token: generateToken(user.id)
            })
        }
        else {
            res.status(401).json("Please check your email and pasword")
        }
    } catch (error) {
        console.log(error)
    }
}



// edit user profile
exports.editProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true })
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            followers: user.followers,
            followings: user.followings,
            biography: user.biography,
            image: user.image,
            token: generateToken(user.id)
        })
    }
    catch (error) {
        console.log(error)
    }

}

// follow system
exports.follow = async (req, res) => {
    try {
        const userId = req.user.id
        const followUserId = req.params.id
        const user = await User.findById(userId)
        const followUser = await User.findById(followUserId)

        if (!user.followings.includes(followUserId)) {
            await user.updateOne({ $push: { followings: followUserId } })
            await followUser.updateOne({ $push: { followers: userId } })
            res.status(200).json("user has been followed")
        }
        if (user.followings.includes(followUserId)) {
            await user.updateOne({ $pull: { followings: followUserId } })
            await followUser.updateOne({ $pull: { followers: userId } })
            res.status(200).json("user has been unfollowed")
        }
    }
    catch (error) {
        console.log(error)
    }
}


exports.followings = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const followings = await User.find({ _id: { $in: [...user.followings] } }).select("_id username image")
        res.status(200).json(followings)
    } catch (error) {
        console.log(error)
    }
}

exports.followers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const followers = await User.find({ _id: { $in: [...user.followers] } }).select("_id username image")
        res.status(200).json(followers)
    } catch (error) {
        console.log(error)
    }
}

// to visit other users profile
exports.getOtherUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

// recommended users
exports.recommendedUsers = async (req, res) => {
    try {
        const recommendedUsers = await User.find({ _id: { $nin: [...req.user.followings, req.user.id] } }).select("-password").limit(5)
        res.json(recommendedUsers)
    } catch (error) {
        console.log(error)
    }
}


// current user
exports.getme = (req, res) => {
    res.status(200).json(req.user)
}

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}