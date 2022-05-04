import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsDataBase, UsersDataBase } from "../../DataBase/DB_Objects";

interface PostViewState {
    liked: boolean
    likesCounter: number
    likedUsers: number[]
    userId: number
    content: string
    text: string
    id: number
    username: string
    userPic: string
}

interface FeedState {
    posts: PostViewState[]
}

const initialState: FeedState = {
    posts: []
}

const fetchPosts = createAsyncThunk(
    'feed/fetchPosts',
    async(userId: number, thunkAPI) => {
        // !!! TODO: сделать fetch и бэкэнд для этого
        const postViewStates: PostViewState[] = []
        const posts = await PostsDataBase.getPosts()
        posts.forEach(async post => {
            delete post._id
        });
        for (const post of posts) {
            const user = await UsersDataBase.getUser(post.user_id)
            if (!user) continue
            postViewStates.push({userPic: user.picture_url, username: user.username, id: post.id, text: post.text, content: post.content, userId: post.user_id, likedUsers: post.like_users, likesCounter: post.like_users.length, liked: post.like_users.includes(userId)})
        }
        return postViewStates
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