
const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    username:{
        type:String,
        default: ""
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    likes: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema)