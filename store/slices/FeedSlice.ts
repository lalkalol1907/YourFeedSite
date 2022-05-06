import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsDataBase, UsersDataBase } from "../../DataBase/DB_Objects";
import PostViewState from "../../models/postviewstate";

interface FeedState {
    posts: PostViewState[]
    newPostView: boolean
}

const initialState: FeedState = {
    posts: [],
    newPostView: false
}

export const fetchPosts = createAsyncThunk(
    'feed/fetchPosts',
    async(userId: number, thunkAPI) => {
        const response = await fetch('/api/get_posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId
            })
        })
        const body = await response.json()
        console.log(body.posts[0])
        return body.posts as PostViewState[]
    }
)

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        like: (state, action: PayloadAction<{id: number, userId: number}>) => {
            const { id, userId } = action.payload;
            const posts = state.posts;
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].id === id) {
                    if (posts[i].likedUsers.includes(userId)) {
                        for (let j = 0; j < posts[i].likedUsers.length; j++) {
                            if (posts[i].likedUsers[j] === userId) {
                                posts[i].likedUsers.splice(j, 1)
                            }
                        }
                        posts[i].likesCounter -= 1
                    } else {
                        posts[i].likedUsers.push(userId)
                        posts[i].likesCounter += 1

                    }
                    posts[i].liked = !posts[i].liked
                    break;
                }
            }
            state.posts = posts;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts = action.payload
        })
    }
})

export const { like } = feedSlice.actions

export default feedSlice.reducer