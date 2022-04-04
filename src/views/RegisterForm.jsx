import { useState } from "react";

function RegisterForm(props) {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [username, setUsername] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const handleSignInButton = (event) => {
        props.handleSignInButton()
        event.preventDefault()
    }

    return (
        <form className="h-96 text-xl p-5 flex flex-col items-center bg-gray-200 border-0 rounded-3xl shadow-2xl mt-16 w-80" onSubmit={handleSubmit} >
            <button className='hover:cursor-pointer mb-2 bg-gray-200 border-0 py-0' onClick={handleSignInButton}>
                <p className='text-lg text-gray-600 py-1 underline my-0 hover:'>SignIn</p>
            </button>
        </form>
    )
}

export default RegisterForm