import { configureStore } from "@reduxjs/toolkit";
import feedReducer from './slices/FeedSlice'
import loginFormReducer from './slices/LoginFormSlice'
import registerFormReducer from "./slices/RegisterFormSlice";

export const store = configureStore({
    reducer: {
        feed: feedReducer,
        loginForm: loginFormReducer,
        registerForm: registerFormReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
