import { Component } from "react";

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: '',
            incorrectPassword: false,
            incorrectLogin: false,
            buttonIsActive: true
        }
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handleLPasswordChange = this.handleLPasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeButtonState = this.changeButtonState.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.setState({ ...this.state, incorrectLogin: newProps.incorrectLogin, incorrectPassword: newProps.incorrectPassword })
    }

    changeButtonState() {    
        let loginIsValid = /^[0-9A-Z_-]+$/i.test(this.state.login)
        this.setState({...this.state, buttonIsActive: this.state.password.length >= 0 && this.state.login.length > 0 && loginIsValid})
    }

    handleSubmit(event) {
        this.props.logIn(this.state.login, this.state.password)
        event.preventDefault()
    }

    handleRegisterButton(event) {
        this.props.onPressedRegButton()
        event.preventDefault()
    }

    handleLoginChange(event) {
        this.setState({ ...this.state, login: event.target.value, incorrectLogin: false })
        // this.changeButtonState()
    }

    handleLPasswordChange(event) {
        this.setState({ ...this.state, password: event.target.value, incorrectPassword: false })
        // this.changeButtonState()
    }

    render() {
        return (
            <form className="h-96 text-xl p-5 flex flex-col items-center bg-gray-200 border-0 rounded-3xl shadow-2xl mt-16 w-80" onSubmit={this.handleSubmit} >
                <p className='text-xl font-bold text-gray-700'>Log In</p>
                <input type="text" value={this.state.login} onChange={this.handleLoginChange} className={this.state.incorrectLogin ?
                    'text-lg py-2 px-4 my-1 text-gray-500 bg-red-300 border-0 border-b border-red-600 w-60 hover:bg-red-200 focus:outline-none focus:bg-red-200 focus:shadow rounded-t-lg'
                    : 'text-lg py-2 px-4 my-1 text-gray-500 bg-gray-200 border-0 border-b border-gray-700 w-60 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:shadow rounded-t-lg'} placeholder='Username or email' />
                <input type="text" value={this.state.password} onChange={this.handleLPasswordChange} className={this.state.incorrectPassword ?
                    'text-lg py-2 px-4 my-1 text-gray-500 bg-red-300 border-0 border-b border-red-600 w-60 mb-8 hover:bg-red-200 focus:outline-none focus:bg-red-200 focus:shadow rounded-t-lg' :
                    'text-lg py-2 px-4 my-1 text-gray-500 bg-gray-200 border-0 border-b border-gray-700 w-60 mb-8 hover:bg-gray-300 focus:outline-none focus:bg-gray-300 focus:shadow rounded-t-lg'} placeholder='Password' />
                <input type="submit" value="Log In" className='text-lg py-2 px-0 my-1 rounded-full text-white bg-fuchsia-700 w-36 border-0 hover:cursor-pointer shadow hover:shadow-md hover:shadow-fuchsia-700 shadow-fuchsia-700 disabled:hover:shadow disabled:hover:shadow-fuchsia-700' disabled={!this.state.buttonIsActive}/>
                <div className='flex-1' />
                <button className='hover:cursor-pointer mb-2 bg-gray-200 border-0 py-0' onClick={this.handleRegisterButton}>
                    <p className='text-lg text-gray-600 py-1 underline my-0 hover:'>Register</p>
                </button>
            </form>
        )
    }
}

export default LoginForm