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