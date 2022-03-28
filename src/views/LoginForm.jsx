import { Component } from "react";

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            IncorrectPassword: false,
            IncorrectLogin: false
        }
        this.props = props
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handleLPasswordChange = this.handleLPasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.setState({ ...this.state, IncorrectLogin: newProps.IncorrectLogin, IncorrectPassword: newProps.IncorrectPassword })
    }

    handleSubmit(event) {
        this.props.LogIn(this.state.login, this.state.password)
        event.preventDefault()
    }

    handleRegister(event) {
        this.props.handleRegister()
        event.preventDefault()
    }

    handleLoginChange(event) {
        this.setState({ ...this.state, login: event.target.value, IncorrectLogin: false })
    }

    handleLPasswordChange(event) {
        this.setState({ ...this.state, password: event.target.value, IncorrectPassword: false })
    }

    render() {
        return (
            <form className="h-96 text-xl p-5 flex flex-col items-center bg-gray-200 border-0 rounded-3xl shadow-2xl mt-16 w-80" onSubmit={this.handleSubmit} >
                <p className='text-xl font-bold text-gray-700'>Log In</p>
                <input type="text" value={this.state.login} onChange={this.handleLoginChange} className={this.state.IncorrectLogin ?
                    'text-lg py-2 px-4 my-1 text-gray-500 bg-red-300 border-0 border-b border-red-600 w-60 hover:bg-red-200 focus:outline-none focus:bg-red-200 focus:shadow rounded-t-lg'
                    : 'text-lg py-2 px-4 my-1 text-gray-500 bg-gray-200 border-0 border-b border-gray-700 w-60 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:shadow rounded-t-lg'} placeholder='Username or email' />
                <input type="text" value={this.state.password} onChange={this.handleLPasswordChange} className={this.state.IncorrectPassword ?
                    'text-lg py-2 px-4 my-1 text-gray-500 bg-red-300 border-0 border-b border-red-600 w-60 mb-8 hover:bg-red-200 focus:outline-none focus:bg-red-200 focus:shadow rounded-t-lg' :
                    'text-lg py-2 px-4 my-1 text-gray-500 bg-gray-200 border-0 border-b border-gray-700 w-60 mb-8 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:shadow rounded-t-lg'} placeholder='Password' />
                <input type="submit" value="Log In" className='text-lg py-2 px-0 my-1 rounded-full text-white bg-fuchsia-700 w-36 border-0 hover:cursor-pointer shadow hover:shadow-md hover:shadow-fuchsia-700 shadow-fuchsia-700' />
                <div className='flex-1' />
                <button className='hover:cursor-pointer mb-2 bg-gray-200 border-0 py-0' onClick={this.handleRegister}>
                    <p className='text-lg text-gray-600 py-1 underline my-0 hover:'>Register</p>
                </button>
            </form>
        )
    }
}

export default LoginForm