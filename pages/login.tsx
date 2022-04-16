import React, { useState, useEffect } from 'react';
import NavBar from '../views/NavBar';
import LoginForm from '../views/LoginForm';
import RegisterForm from '../views/RegisterForm';
import Router from 'next/router';
import { useCookies } from 'react-cookie';

function Login() {
	const [ registerForm, setRegisterForm ] = useState(false);
	const [ cookies, setCookie, removeCookie ] = useCookies([ 'access_token' ]);

	const getToken = () => {
		const access_token = cookies.access_token;
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
	
	const onPressedRegButton = () => {
		setRegisterForm(true);
	};

	const onPressedSignInButton = () => {
		setRegisterForm(false);
	};

	useEffect(() => {
		getToken();
	}, []);

	return (
		<div className="login">
			<NavBar auth={false} />
			<div className="login_container">
                <div className='login_wrapper'>
				{/* <img src={"login.svg"} className="login_pic" / > */}
                    <div className="login_pic" />
                </div>
				{/* <div className="login_pic" /> */}
				{registerForm ? (
					<RegisterForm
						handleSignInButton={onPressedSignInButton}
					/>
				) : (
					<LoginForm
						onPressedRegButton={onPressedRegButton}
					/>
				)}
			</div>
		</div>
	);
}

export default Login;
