import React, { Component } from 'react';
import NavBar from '../views/NavBar';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import LoginForm from '../views/LoginForm';

class Login extends Component {

    constructor() {
        super()
        this.state = {
            auth: false,
            user_id: 0,
            IncorrectPassword: false, 
            IncorrectLogin: false,
            register: false
        }
        this.getToken = this.getToken.bind(this)
        this.handleRegButton = this.handleRegButton.bind(this)
        this.LogIn = this.LogIn.bind(this)
    }

    LogIn(login, password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        }).then(response => {
            response.json().then(body => {
                console.log(body)
                if (body.stat) {
                    Cookies.set('access_token', body.access_token)
                    this.setState({ ...this.state, auth: true, user_id: body.user.id })
                }
                else {
                    if (body.info.message === "Incorrect password") {
                        this.setState({...this.state, IncorrectPassword: true, IncorrectLogin: false})
                    }
                    if (body.info.message === "Incorrect username") {
                        this.setState({...this.state, IncorrectLogin: true, IncorrectPassword: false})
                    }
                }
            })
        })
    }

    handleRegButton() {
        this.setState({...this.setState, register: true, IncorrectLogin: false, IncorrectPassword: false})
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
        this.getToken()
    }

    render() {
        return (
            <div className='flex flex-col items-center min-h-screen bg-gray-100'>
                {this.state.auth &&
                    <Redirect to="/feed" />
                }
                <NavBar />
                <LoginForm LogIn={this.LogIn} IncorrectLogin={this.state.IncorrectLogin} IncorrectPassword={this.state.IncorrectPassword} handleRegister={this.handleRegButton}/>
            </div>
        )
    }
}

export default Login