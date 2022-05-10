import { configureStore } from "@reduxjs/toolkit";
import feedReducer from './slices/FeedSlice'
import loginFormReducer from './slices/LoginFormSlice'

export const store = configureStore({
    reducer: {
        feed: feedReducer,
        loginForm: loginFormReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
