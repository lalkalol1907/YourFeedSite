import { configureStore } from "@reduxjs/toolkit";
import feedReducer from './slices/FeedSlice'
import loginFormReducer from './slices/LoginFormSlice'
import registerFormReducer from "./slices/RegisterFormSlice";
import loginReducer from "./slices/LoginSlice";


export const store = configureStore({
    reducer: {
        feed: feedReducer,
        loginForm: loginFormReducer,
        registerForm: registerFormReducer,
        login: loginReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
