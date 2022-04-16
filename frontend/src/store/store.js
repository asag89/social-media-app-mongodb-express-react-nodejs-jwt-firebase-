
import { configureStore } from "@reduxjs/toolkit"

import currentUserReducer from "../feautures/currentUser/currentUserSlice"
import PostReducer from "../feautures/post/postSlice"
import UserReducer from "../feautures/user/userSlice"

const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        post: PostReducer,
        user: UserReducer,
    }
})

export default store