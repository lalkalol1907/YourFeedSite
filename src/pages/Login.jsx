import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import NavBar from '../views/NavBar';
import LoginForm from '../views/LoginForm';

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authState: false,
            userId: 0,
            incorrectPassword: false,
            incorrectLogin: false,
            register: false,
        };
        this.getToken = this.getToken.bind(this);
        this.onPressedRegButton = this.onPressedRegButton.bind(this);
        this.logIn = this.logIn.bind(this);
        this.navigate = this.props.navigate;
    }

    onPressedRegButton() {
        this.setState(prevState => ({
            ...prevState, register: true, incorrectLogin: false, incorrectPassword: false,
        }));
    }

    getToken() {
        const accessToken = Cookies.get('access_token');
        fetch('/is_authenticated', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accessToken,
            }),
        }).then((response) => {
            response.json().then(
                (body) => {
                    if (body.stat) {
                        this.setState(prevState => ({ ...prevState, authState: true, userId: body.user.id }));
                        this.navigate('/feed');
                    } else {
                        this.setState(prevState => ({ ...prevState, authState: false }));
                    }
                    console.log(body);
                },
            );
        });
    }

    logIn(login, password) {
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login,
                password,
            }),
        }).then((response) => {
            response.json().then((body) => {
                console.log(body);
                if (body.stat) {
                    Cookies.set('access_token', body.access_token);
                    this.setState(prevState => ({ ...prevState, authState: true, userId: body.user.id }));
                    this.navigate('/feed');
                } else {
                    if (body.info.message === 'Incorrect password') {
                        this.setState(prevState => ({ ...prevState, incorrectPassword: true, incorrectLogin: false }));
                    }
                    if (body.info.message === 'Incorrect username') {
                        this.setState(prevState => ({ ...prevState, incorrectLogin: true, incorrectPassword: false }));
                    }
                }
            });
        });
    }

    componentDidMount() {
        this.getToken();
    }

    render() {
        return (
            <div className="flex flex-col items-center min-h-screen bg-gray-100">
                <NavBar />
                <LoginForm logIn={this.logIn} incorrectLogin={this.state.incorrectLogin} incorrectPassword={this.state.incorrectPassword} onPressedRegButton={this.onPressedRegButton} />
            </div>
        );
    }
}

function Login(props) {
    const navigate = useNavigate();
    return (<LoginComponent {...props} navigate={navigate} />);
}

export default Login;
