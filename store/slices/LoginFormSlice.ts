import { stepButtonClasses } from "@mui/material"
import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RiTruckLine } from "react-icons/ri"

interface LoginFormState {
    login: string
    password: string
    incorrectPassword: boolean
    incorrectLogin: boolean
    buttonEnabled: boolean
    showPassword: boolean
    loginValid: boolean
    loginError: string
    passwordRed: boolean
    loginRed: boolean
}

const checkLogin = (login: string): boolean => {
    return /^[0-9A-Z_-]+$/i.test(login);
}

const buttonState = (state: LoginFormState): boolean => {
    return state.loginValid && state.login.length !== 0 && state.password.length !== 0
}

const initialState: LoginFormState = {
    login: '',
    password: '',
    incorrectPassword: false,
    incorrectLogin: false,
    buttonEnabled: false,
    showPassword: false,
    loginValid: true,
    loginError: '',
    passwordRed: false,
    loginRed: false
}

export const loginFormSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload
            state.incorrectLogin = false
            state.loginValid = action.payload.length === 0 || checkLogin(action.payload)
            state.buttonEnabled = buttonState(state)
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
            state.incorrectPassword = false
            state.buttonEnabled = buttonState(state)
        },
        setPasswordRed: (state, action: PayloadAction) => {
            state.passwordRed = !state.passwordRed
        },
        setLoginRed: (state, action: PayloadAction) => {
            state.loginRed = !state.loginRed
        },
        setShowPassword: (state, action: PayloadAction) => {
            state.showPassword = !state.showPassword
        },
        setIncorrectPassword: (state, action: PayloadAction<boolean>) => {
            state.incorrectPassword = action.payload
        },
        setIncorrectLogin: (state, action: PayloadAction<boolean>) => {
            state.incorrectLogin = action.payload
        },
        setLoginError: (state, action: PayloadAction<string>) => {
            state.loginError = action.payload
        }
    }
})

export const {
    setLogin,
    setPassword,
    setPasswordRed,
    setLoginRed,
    setShowPassword,
    setIncorrectLogin,
    setIncorrectPassword,
    setLoginError
} = loginFormSlice.actions

export default loginFormSlice.reducer