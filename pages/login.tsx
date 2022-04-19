import React, { useState, useEffect } from 'react';
import NavBar from '../views/NavBar';
import LoginForm from '../views/LoginForm';
import RegisterForm from '../views/RegisterForm';
import Router from 'next/router';
import { NextPageContext } from 'next';
import * as cookie from 'cookie';
import { TokenSTG } from '../DataBase/DB_Objects';

interface LoginProps {
	auth: boolean;
}

function Login(props: LoginProps) {
	const [ registerForm, setRegisterForm ] = useState(false);
	const [ auth, setAuth ] = useState(props.auth);

	const onPressedRegButton = () => {
		setRegisterForm(true);
	};

	const onPressedSignInButton = () => {
		setRegisterForm(false);
	};

	useEffect(() => {
		if (auth) {
			Router.push('/feed');
		}
	}, []);

	return (
		<div className="login">
			<NavBar auth={false} />
			<div className="login_container">
				<div className="login_wrapper">
					{/* <img src={"login.svg"} className="login_pic" / > */}
					<div className="login_pic" />
				</div>
				{/* <div className="login_pic" /> */}
				{registerForm ? (
					<RegisterForm handleSignInButton={onPressedSignInButton} />
				) : (
					<LoginForm onPressedRegButton={onPressedRegButton} />
				)}
			</div>
		</div>
	);
}

export async function getServerSideProps(context: NextPageContext) {
	var access_token = cookie.parse(context.req ? context.req.headers.cookie || '' : document.cookie).access_token;

	if (!access_token) {
		return {
			props: {
				auth: false
			}
		};
	}

	return {
		props: {
			auth: TokenSTG.authToken(access_token).stat
		}
	};
}

export default Login;
