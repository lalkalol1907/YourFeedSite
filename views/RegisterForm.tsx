import { useState } from "react";
import React from "react";

interface RegisterFormProps {
    handleSignInButton: () => void
}

function RegisterForm(props: RegisterFormProps) {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [username, setUsername] = useState('')

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
    }

    const handleSignInButton = (event: React.SyntheticEvent) => {
        props.handleSignInButton()
        event.preventDefault()
    }

    return (
        <form className="form" onSubmit={handleSubmit} >
            <p className='form_text'>Register</p>
            <button className='form_register_option_button' onClick={handleSignInButton}>
                <p className='form_register_option_text'>SignIn</p>
            </button>
        </form>
    )
}

export default RegisterForm