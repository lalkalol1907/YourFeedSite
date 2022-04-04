import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import NavBar from '../views/NavBar';
import LoginForm from '../views/LoginForm';
import RegisterForm from '../views/RegisterForm';


function Login(props) {
    
    const [incorrectPassword, setIncorrectPassword] = useState(false)
    const [incorrectLogin, setIncorrectLogin] = useState(false)
    const [registerForm, setRegisterForm] = useState(false)
    const navigate = useNavigate();

    const onPressedRegButton = () => {
        setRegisterForm(true)
        setIncorrectLogin(false)
        setIncorrectPassword(false)
    }

    const getToken = () => {
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
                        navigate('/feed');
                    }
                },
            );
        });
    }

    const logIn = (login, password) => {
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
                    navigate('/feed');
                } else {
                    if (body.info.message === 'Incorrect password') {
                        setIncorrectPassword(true)
                        setIncorrectLogin(false)
                    }
                    if (body.info.message === 'Incorrect username') {
                        setIncorrectLogin(true)
                        setIncorrectPassword(false)
                    }
                }
            });
        });
    }

    const onPressedSignInButton = () => {

    }

    useEffect(() => {
        getToken()
    }, [])

    return (
        <div className="login_page">
            <NavBar />
            <LoginForm logIn={logIn} incorrectLogin={incorrectLogin} incorrectPassword={incorrectPassword} onPressedRegButton={onPressedRegButton} />
            {/* <RegisterForm handleSignInButton={onPressedSignInButton} /> */}
        </div>
    );
}

export default Login;
