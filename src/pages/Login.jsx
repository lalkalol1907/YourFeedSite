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
            <div>
                {this.state.auth &&
                    <Redirect to="/feed" />
                }
                <NavBar />
                <form className="text-xl p-5 flex flex-col w-40" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.login} onChange={this.handleLoginChange} />
                    <input type="text" value={this.state.password} onChange={this.handleLPasswordChange} />
                    <input type="submit" value="Login" />
                </form>
            </div>
        )
    }
}

export default Login