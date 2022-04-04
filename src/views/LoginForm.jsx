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
        <form className="h-96 text-xl p-5 flex flex-col items-center bg-gray-200 border-0 rounded-3xl shadow-2xl mt-16 w-80" onSubmit={handleSubmit} >
            <p className='text-xl font-bold text-gray-700'>Log In</p>
            <input type="text" value={login} onChange={handleLoginChange} className={incorrectLogin ?
                'text-lg py-2 px-4 my-1 text-gray-500 bg-red-300 border-0 border-b border-red-600 w-60 hover:bg-red-200 focus:outline-none focus:bg-red-200 focus:shadow rounded-t-lg'
                : 'text-lg py-2 px-4 my-1 text-gray-500 bg-gray-200 border-0 border-b border-gray-700 w-60 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:shadow rounded-t-lg'} placeholder='Username or email' />
            <input type={showPassword ? "text" : "password"} value={password} onChange={handleLPasswordChange} className={incorrectPassword ?
                'text-lg py-2 px-4 my-1 text-gray-500 bg-red-300 border-0 border-b border-red-600 w-60 mb-8 hover:bg-red-200 focus:outline-none focus:bg-red-200 focus:shadow rounded-t-lg' :
                'text-lg py-2 px-4 my-1 text-gray-500 bg-gray-200 border-0 border-b border-gray-700 w-60 mb-8 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:shadow rounded-t-lg'} placeholder='Password' />
            <input type="submit" value="Log In" className='text-lg py-2 px-0 my-1 rounded-full text-white bg-fuchsia-700 w-36 border-0 hover:cursor-pointer shadow hover:shadow-md hover:shadow-fuchsia-700 shadow-fuchsia-700 disabled:hover:shadow disabled:hover:shadow-fuchsia-700' disabled={!buttonEnabled} />
            <div className='flex-1' />
            <button className='hover:cursor-pointer mb-2 bg-gray-200 border-0 py-0' onClick={handleRegisterButton}>
                <p className='text-lg text-gray-600 py-1 underline my-0 hover:'>Register</p>
            </button>
        </form>
    )
}

export default LoginForm