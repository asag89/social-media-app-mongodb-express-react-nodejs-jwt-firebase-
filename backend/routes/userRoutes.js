
const router = require("express").Router()
const protect = require("../middleware/authMiddleware")

const {
    registerUser,
    loginUser,
    getme,
    editProfile,
    follow,
    followings,
    followers,
    getOtherUserProfile,
    recommendedUsers } = require("../controllers/userController")

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/me", protect, getme)

router.put("/edit", protect, editProfile) 

router.put("/follow/:id", protect, follow)          // follow / unfollow

router.get("/followings:id", followings)      // get followings

router.get("/followers:id", followers)        // get followers

router.get("/user/:id", getOtherUserProfile)

router.get("/recommended", protect, recommendedUsers)

module.exports = router