import { createSlice } from "@reduxjs/toolkit"
import { LoginFormState } from "./LoginFormReducer"
import { RegisterFormState } from "./RegisterFormReducer"


interface LoginState {
    loginFormState: LoginFormState
    registerFormState: RegisterFormState
}

const initialState: LoginState = {
    loginFormState: {
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
    },
    registerFormState: {
        email: '',
        password: '',
        passwordConfirmation: '',
        username: '',
        usernameExists: false, 
        emailExists: false,
        passwordValid: true,
        usernameValid: true,
        emailValid: true,
        passwordMatch: true,
        usernameRed: false,
        emailRed: false,
        passwordRed: false,
        passwordConfirmationRed: false,
        buttonEnabled: false,
        registrationError: ''
    }
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        
    }
})