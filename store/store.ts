import { configureStore } from "@reduxjs/toolkit";
import feedReducer from './slices/FeedSlice'
import loginFormReducer from './slices/LoginFormSlice'
import registerFormReducer from "./slices/RegisterFormSlice";
import loginReducer from "./slices/LoginSlice";
import userReducer from "./slices/UserSlice";


export const store = configureStore({
    reducer: {
        feed: feedReducer,
        loginForm: loginFormReducer,
        registerForm: registerFormReducer,
        login: loginReducer,
        user: userReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
