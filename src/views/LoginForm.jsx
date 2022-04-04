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
            <p className='log_in_text'>Log In</p>
            <input type="text" value={login} onChange={handleLoginChange} className={incorrectLogin ?
                'incorrect_input'
                : 'correct_input'} placeholder='Username or email' />
            <input type={showPassword ? "text" : "password"} value={password} onChange={handleLPasswordChange} className={incorrectPassword ?
                'incorrect_input' :
                'correct_input'} placeholder='Password' />
            <input type="submit" value="Log In" className='login_button' disabled={!buttonEnabled} />
            <div className='flex-1' />
            <button className='hover:cursor-pointer mb-2 bg-gray-200 border-0 py-0' onClick={handleRegisterButton}>
                <p className='register_option_button'>Register</p>
            </button>
        </form>
    )
}

export default LoginForm