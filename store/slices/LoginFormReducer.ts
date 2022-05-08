import { createReducer } from "@reduxjs/toolkit"

export interface LoginFormState {
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

const LoginFormReducer = createReducer()