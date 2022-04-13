import { useState, useEffect } from "react";

function LoginForm(props) {
    
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [incorrectPassword, setIncorrectPassword] = useState(false)
    const [incorrectLogin, setIncorrectLogin] = useState(false)
    const [buttonEnabled, setButtonEnabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const changeButtonState = () => {
        let loginIsValid = /^[0-9A-Z_-]+$/i.test(this.state.login)
        setButtonEnabled(password.length >= 0 && login.length > 0 && loginIsValid)
    }

    const handleSubmit = (event) => {
        props.logIn(login, password)
        event.preventDefault()
    }

    const handleRegisterButton = (event) => {
        props.onPressedRegButton()
        event.preventDefault()
    }

    const handleLoginChange = (event) => {
        setLogin(event.target.value)
        setIncorrectLogin(false)
        // changeButtonState()
    }

    const handleLPasswordChange = (event) => {
        setPassword(event.target.value)
        setIncorrectPassword(false)
        // changeButtonState()
    }

    useEffect(() => {
        setIncorrectLogin(props.incorrectLogin)
        setIncorrectPassword(props.incorrectPassword)
    }, [props.incorrectLogin, props.incorrectPassword])

    return (
        <form className="login_form" onSubmit={handleSubmit} >
            <p className='login_form_text'>Log In</p>
            <div className='spacer' />
            <input type="text" value={login} onChange={handleLoginChange} className={incorrectLogin ?
                'login_form_incorrect_input'
                : 'login_form_correct_input'} placeholder='Username or email' />
            <input type={showPassword ? "text" : "password"} value={password} onChange={handleLPasswordChange} className={incorrectPassword ?
                'login_form_incorrect_input' :
                'login_form_correct_input'} placeholder='Password' />
            <input type="submit" value="Log In" className='login_form_submit_button' disabled={!buttonEnabled} />
            <div className='spacer' />
            <div className='spacer' />
            <button className='login_form_register_option_button' onClick={handleRegisterButton}>
                <p className='login_form_register_option_text'>Register</p>
            </button>
        </form>
    )
}

export default LoginForm