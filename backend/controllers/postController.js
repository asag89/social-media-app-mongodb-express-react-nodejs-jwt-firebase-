
const Post = require("../models/postModel")

// create post
exports.createPost = async (req, res) => {
    try {
        const { text, image } = req.body

        if (!text) {
            res.status(400).json("Please add a text field")
        }

        const newPost = await Post.create({
            text,
            image,
            user: req.user.id,
            username: req.user.username
        })
        res.status(201).json(newPost)
    }
    catch (error) {
        console.log(error)
    }
}

// delete post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            res.status(404).json("Post not found")
        }

        if (!req.user) {
            res.status(401).json("User not found")
        }

        // make sure the logged in user matches the post user
        if (post.user.toString() !== req.user.id) {
            res.status(401).json("User not authorized")
        }

        await Post.findByIdAndRemove(post.id)
        res.status(200).json(req.params.id)
    }
    catch (error) {
        console.log(error)
    }
}

// my post
exports.getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id })
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
}

// timeline post
exports.getAllPosts = async (req, res) => {
    try {
        const userPosts = await Post.find({ user: req.user.id })

        const followingsPosts = await Promise.all(req.user.followings.map((id) => {
            return Post.find({ user: id })
        }))
        res.status(200).json(userPosts.concat(...followingsPosts))
    }
    catch (error) {
        console.log(error)
    }
}