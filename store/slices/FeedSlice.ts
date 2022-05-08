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
        },
        setPosts: (state, action: PayloadAction<PostViewState[]>) => {
            state.posts = action.payload
        }
    },
})

export const { like, setPosts } = feedSlice.actions

export default feedSlice.reducer