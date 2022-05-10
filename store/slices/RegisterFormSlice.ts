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