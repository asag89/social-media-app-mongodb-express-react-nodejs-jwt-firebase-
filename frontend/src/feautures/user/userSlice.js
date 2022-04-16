
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],                  // recommended users
    userProfile: null,          // single user profile  
    followings: [],             // user's followings
    followers: [],              // user's followers
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const recommendedUsers = createAsyncThunk("user/recommendedUsers", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().currentUser.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get("/users/recommended", config)
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getOtherUsers = createAsyncThunk("user/getOtherUsers", async (userId, thunkAPI) => {
    try {
        const response = await axios.get(`/users/user/${userId}`)
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getFollowings = createAsyncThunk("user/followings", async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().currentUser.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(`/users/followings${userId}`, config)
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getFollowers = createAsyncThunk("user/followers", async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().currentUser.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(`/users/followers${userId}`, config)
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const followUnfollow = createAsyncThunk("user/followUnfollow", async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().currentUser.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put(`/users/follow/${userId}`, "_", config)     // "_" placeholder
        return response.data
    }
    catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.userProfile = null
        }
    },
    extraReducers: (builder) => {
        builder

            // recommended users
            .addCase(recommendedUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(recommendedUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(recommendedUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.users = []
            })

            // get other users profile
            .addCase(getOtherUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOtherUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.userProfile = action.payload
            })
            .addCase(getOtherUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.userProfile = null
            })

            // get user followings
            .addCase(getFollowings.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFollowings.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.followings = action.payload
            })
            .addCase(getFollowings.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.followings = []
            })

            // get user followers
            .addCase(getFollowers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.followers = action.payload
            })
            .addCase(getFollowers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.followers = []
            })

            // user follow / unfollow
            .addCase(followUnfollow.pending, (state) => {
                state.isLoading = true
            })
            .addCase(followUnfollow.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload

            })
            .addCase(followUnfollow.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { resetUser } = userSlice.actions
export default userSlice.reducer
