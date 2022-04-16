import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import NavBar from '../views/NavBar';
import LoginForm from '../views/LoginForm';
import RegisterForm from '../views/RegisterForm';
import Router from 'next/router';
import { BSONSymbol } from 'mongodb';

function Login() {
	const [ incorrectPassword, setIncorrectPassword ] = useState(false);
	const [ incorrectLogin, setIncorrectLogin ] = useState(false);
	const [ registerForm, setRegisterForm ] = useState(false);
	const [ registrarionError, setRegistrationError ] = useState('');
	const [ loginError, setLoginError ] = useState('');

	const onPressedRegButton = () => {
		setRegisterForm(true);
		setIncorrectLogin(false);
		setIncorrectPassword(false);
	};

	const getToken = () => {
		const access_token = Cookies.get('access_token');
		console.log(access_token);
		fetch('/api/is_authenticated', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				access_token
			})
		}).then((response) => {
			response.json().then((body) => {
				console.log(body);
				if (body.stat) {
					Router.push('/feed');
				}
			});
		});
	};

	const logIn = (login: string, password: string) => {
		console.log('ABOBA');
		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				login,
				password
			})
		}).then((response) => {
			response.json().then((body) => {
				console.log(body);
				if (body.stat) {
					Cookies.set('access_token', body.access_token);
					Router.push('/feed');
				} else {
					if (body.info.message === 'Incorrect password') {
						setIncorrectPassword(true);
						setIncorrectLogin(false);
					}
					if (body.info.message === 'Incorrect username') {
						setIncorrectLogin(true);
						setIncorrectPassword(false);
					}
					if (!body.info.message) {
						setLoginError(body.err);
					}
				}
			});
		});
	};

	const register = (email: string, username: string, password: string) => {
        console.log(password)
		fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				username,
				password
			})
		}).then((response) => {
			response.json().then((body) => {
				if (body.stat) {
					Cookies.set('access_token', body.access_token);
					Router.push('/feed');
				} else {
					setRegistrationError(body.err);
				}
			});
		});
	};

	const onPressedSignInButton = () => {
		setRegisterForm(false);
	};

	useEffect(() => {
		getToken();
	}, []);

	return (
		<div className="login">
			<NavBar auth={true} />
			<div className="login_container">
				{/* <img src={""} className="" / > */}
				<div className="login_pic" />
				{registerForm ? (
					<RegisterForm
						handleSignInButton={onPressedSignInButton}
						register={register}
						error={registrarionError}
					/>
				) : (
					<LoginForm
						logIn={logIn}
						incorrectLogin={incorrectLogin}
						incorrectPassword={incorrectPassword}
						onPressedRegButton={onPressedRegButton}
						error={loginError}
					/>
				)}
			</div>
		</div>
	);
}

export default Login;
