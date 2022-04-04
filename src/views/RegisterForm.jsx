import { Component, useState } from "react";

class RegisterForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            passwordConfirmation: '',
            username: '',
            
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
    }

    handleSignInButton(event) {
        this.props.handleSignInButton()
        event.preventDefault()
    }

    render() {
        return (
            <form className="h-96 text-xl p-5 flex flex-col items-center bg-gray-200 border-0 rounded-3xl shadow-2xl mt-16 w-80" onSubmit={this.handleSubmit} >
                <button className='hover:cursor-pointer mb-2 bg-gray-200 border-0 py-0' onClick={this.handleSignInButton}>
                    <p className='text-lg text-gray-600 py-1 underline my-0 hover:'>SignIn</p>
                </button>
            </form>
        )
    }

}

function RegisterForm(props) {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [username, setUsername] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
    }
}

export default RegisterForm