import React, { Component } from 'react';
import NavBar from '../views/NavBar';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    constructor() {
        super()
        this.state = {
            auth: false,
            user_id: 0,
            login: 'abobik',
            password: 'aboba'
        }
        this.LogIn = this.LogIn.bind(this)
        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handleLPasswordChange = this.handleLPasswordChange.bind(this)
        this.getToken = this.getToken.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    LogIn() {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: this.state.login,
                password: this.state.password
            })
        }).then(response => {
            response.json().then(body => {
                console.log(body)
                if (body.stat) {
                    document.cookie = `access_token=${body.access_token}`
                    this.setState({ ...this.state, auth: true, user_id: body.user.id })
                }
            })
        })
    }

    handleSubmit(event) {
        this.LogIn()
        event.preventDefault()
    }

    handleRegister(event) {
        event.preventDefault()
    }

    handleLoginChange(event) {
        this.setState({ ...this.state, login: event.target.value })
    }

    handleLPasswordChange(event) {
        this.setState({ ...this.state, password: event.target.value })
    }

    getToken() {
        var access_token = Cookies.get('access_token')
        fetch('/is_authenticated', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                access_token: access_token
            })
        }).then(response => {
            response.json().then(
                body => {
                    if (body.stat) {
                        this.setState({ ...this.state, auth: true, user_id: body.user.id })
                    } else {
                        this.setState({ ...this.state, auth: false })
                    }
                    console.log(body)
                }
            )
        })
    }

    componentDidMount() {
        // document.title = "YourFeed"
        this.getToken()
    }

    render() {
        return (
            <div className='flex flex-col items-center min-h-screen bg-gray-100'>
                {this.state.auth &&
                    <Redirect to="/feed" />
                }
                <NavBar />
                <form className="h-96 text-xl p-5 flex flex-col items-center bg-gray-200 border-0 rounded-3xl shadow-2xl m-10 w-80" onSubmit={this.handleSubmit} >
                    <p className='text-xl font-bold text-gray-700'>Log In</p>
                    <input type="text" value={this.state.login} onChange={this.handleLoginChange} className='text-lg py-2 px-4 my-1 text-gray-500 bg-gray-200 border-0 border-b w-60 hover:bg-gray-300 rounded-t-lg'/>
                    <input type="text" value={this.state.password} onChange={this.handleLPasswordChange} className='text-lg py-2 px-4 my-1 text-gray-500 bg-gray-200 border-0 border-b w-60 mb-8 hover:bg-gray-300 rounded-t-lg'/>
                    <input type="submit" value="Log In" className='text-lg py-2 px-0 my-1 rounded-full text-white bg-fuchsia-700 w-36 border-0 hover:cursor-pointer shadow hover:shadow-md hover:shadow-fuchsia-700 shadow-fuchsia-700'/>
                    <div className='flex-1' />
                    <button className='text-lg text-gray-600 bg-gray-200 underline border-0 hover:cursor-pointer mb-2' onClick={this.handleRegister}>Register</button>
                </form>
            </div>
        )
    }
}

export default Login