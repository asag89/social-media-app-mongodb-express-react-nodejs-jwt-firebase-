
const router = require("express").Router()

const protect = require("../middleware/authMiddleware")

const {
    createPost,
    deletePost,
    getMyPosts,
    getAllPosts } = require("../controllers/postController")

router.get("/", protect, getMyPosts)

router.post("/", protect, createPost)

router.delete("/:id", protect, deletePost)

router.get("/timeline", protect, getAllPosts)   // timeline posts


module.exports = router