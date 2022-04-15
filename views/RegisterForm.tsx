import { useState } from "react";
import React from "react";

interface RegisterFormProps {
    handleSignInButton: () => void
    register: (email: string, username: string, password: string) => void
    error: boolean
}

function RegisterForm(props: RegisterFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [username, setUsername] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(true)
    const [buttonEnabled, setButtonEnabled] = useState(true) // false
    const [emailValid, setEmailValid] = useState(true)
    const [error, setError] = useState(props.error)

    const checkPassword = () => {
        setPasswordValid(true)
    }   

    const changeButtonState = () => {
        setButtonEnabled(passwordValid && passwordMatch && emailValid)
    }

    const checkPasswordMatch = () => {
        setPasswordMatch(password === passwordConfirmation)
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
        checkPassword()
        checkPasswordMatch()
    }

    const handlePasswordConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(event.target.value)
        checkPasswordMatch()
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        if (!buttonEnabled) {

            return
        }
        props.register(email, username, password)
        event.preventDefault()
    }

    const handleSignInButton = (event: React.SyntheticEvent) => {
        props.handleSignInButton()
        event.preventDefault()
    }

    return (
        <form className="form" onSubmit={handleSubmit} >
            <p className='form_text'>Register</p>
            <div className="spacer" />
            <input type="text" value={username} onChange={handleUsernameChange} className="form_correct_input" placeholder="Username" />
            <input type="text" value={email} onChange={handleEmailChange} className="form_correct_input" placeholder="Email" />
            <input type="text" value={password} onChange={handlePasswordChange} className="form_correct_input" placeholder="Password" />
            <input type="text" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} className="form_correct_input" placeholder="Confirm password" />
            <div className="spacer" />
            <div className="spacer" />
            <button className='form_register_option_button' onClick={handleSignInButton}>
                <p className='form_register_option_text'>SignIn</p>
            </button>
        </form>
    )
}

export default RegisterForm