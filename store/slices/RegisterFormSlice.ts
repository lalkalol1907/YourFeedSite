import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface RegisterFormState {
    email: string
    password: string
    passwordConfirmation: string
    username: string
    usernameExists: boolean
    emailExists: boolean
    passwordValid: boolean
    usernameValid: boolean
    emailValid: boolean
    passwordMatch: boolean
    usernameRed: boolean
    emailRed: boolean
    passwordRed: boolean
    passwordConfirmationRed: boolean
    buttonEnabled: boolean
    registrationError: string
}

const checkEmail = (email: string): boolean => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

const checkUsername = (username: string): boolean => {
    return /^[0-9A-Z_-]+$/i.test(username)
}

const checkPassword = (password: string): boolean => {
    return true
}

export const checkUsernameExists = createAsyncThunk(
    'registerForm/checkUsernameExists',
    async (username: string): Promise<boolean> => {
        // TODO: fix

        const response = await fetch('/api/check_username_exists', {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                username: username
            })
        })
        const body = await response.json()

        return body.stat && body.exists
    }
)

export const checkEmailExists = createAsyncThunk(
    'registerForm/checkEmailExists',
    async (email: string): Promise<boolean> => {
        const response = await fetch('/api/check_email_exists', {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        const body = await response.json()
        return body.stat && body.exists
    }
)



const buttonState = (state: RegisterFormState): boolean => {
    return state.passwordValid &&
        state.passwordMatch &&
        state.emailValid &&
        !state.usernameExists &&
        state.usernameValid &&
        !state.emailExists &&
        state.username.length !== 0 &&
        state.password.length !== 0 &&
        state.email.length !== 0
}

const initialState: RegisterFormState = {
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

export const registerFormSlice = createSlice({
    name: 'registerForm',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
            if (action.payload.length === 0) {
                state.emailExists = false
                state.emailValid = true
                return
            }
            const emailValid = checkEmail(action.payload)
            state.emailValid = emailValid
            state.buttonEnabled = buttonState(state)
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
            state.passwordMatch = state.passwordConfirmation === state.password
            state.passwordValid = action.payload.length === 0 || checkPassword(action.payload)
            state.buttonEnabled = buttonState(state)
        },
        setPasswordConfirmation: (state, action: PayloadAction<string>) => {
            state.passwordConfirmation = action.payload
            state.passwordMatch = state.passwordConfirmation === state.password
            state.buttonEnabled = buttonState(state)
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
            if (action.payload.length === 0) {
                state.usernameExists = false
                state.usernameValid = true
                return
            }
            const usernameValid = checkUsername(action.payload)
            state.usernameValid = usernameValid
            state.buttonEnabled = buttonState(state)
        },
        setUsernameRed: (state, action: PayloadAction) => {
            state.usernameRed = !state.usernameRed
        },
        setEmailRed: (state, action: PayloadAction) => {
            state.emailRed = !state.emailRed
        },
        setPasswordConfirmationRed: (state, action: PayloadAction) => {
            state.passwordConfirmationRed = !state.passwordConfirmationRed
        },
        setPasswordRed: (state, action: PayloadAction) => {
            state.passwordRed = !state.passwordRed
        },
        setRegistrationError: (state, action: PayloadAction<string>) => {
            state.registrationError = action.payload
        }
    },
    extraReducers: (builder) => {
        // TODO: fix bug when typing fast
        builder.addCase(checkEmailExists.fulfilled, (state, action) => {
            if (action.meta.arg === state.email) {
                state.emailExists = action.payload
                state.buttonEnabled = buttonState(state)
            }
        })
        builder.addCase(checkUsernameExists.fulfilled, (state, action) => {
            console.log(action)
            if (action.meta.arg === state.username) {
                state.usernameExists = action.payload
                state.buttonEnabled = buttonState(state)
            }
        })
    }
})

export const {
    setEmail,
    setPassword,
    setPasswordConfirmation,
    setUsername,
    setUsernameRed,
    setEmailRed,
    setPasswordConfirmationRed,
    setPasswordRed,
    setRegistrationError,
} = registerFormSlice.actions

export default registerFormSlice.reducer
