import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import { RootState } from '../store/store';
import {
    setLogin,
    setPassword,
    setPasswordRed,
    setLoginRed,
    setShowPassword,
	setIncorrectLogin,
    setIncorrectPassword,
    setLoginError
} from '../store/slices/LoginFormSlice'
import { useDispatch, useSelector } from 'react-redux';

interface LoginFormProps {
	onPressedRegButton: () => void;
}

function LoginForm(props: LoginFormProps) {
	const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

	const wrapperRefLogin = React.createRef<HTMLInputElement>();
	const wrapperRefPassword = React.createRef<HTMLInputElement>();

	const { login,
		password,
		incorrectPassword,
		incorrectLogin,
		buttonEnabled,
		showPassword,
		loginValid,
		loginError,
		passwordRed,
		loginRed
	} = useSelector((state: RootState) => state.loginForm)
	const dispatch = useDispatch()

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
					setCookie('access_token', body.access_token);
					Router.push('/feed');
				} else {
					if (body.info.message === 'Incorrect password') {
						dispatch(setIncorrectPassword(true));
						dispatch(setIncorrectLogin(false));
					}
					if (body.info.message === 'Incorrect username') {
						dispatch(setIncorrectLogin(true));
						dispatch(setIncorrectPassword(false));
					}
					if (!body.info.message) {
						dispatch(setLoginError(body.err));
					}
				}
			});
		});
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		logIn(login, password);
		event.preventDefault();
	};

	const handleRegisterButton = (event: React.SyntheticEvent) => {
		props.onPressedRegButton();
		event.preventDefault();
	};

	const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setLogin(event.target.value));
	};

	const handleLPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPassword(event.target.value));
	};

	useEffect(
		() => {
			const wrapper = wrapperRefPassword.current;
			if (wrapper) {
				if (passwordRed !== incorrectPassword) {
					wrapper.classList.toggle('incorrect');
					dispatch(setPasswordRed())
				}
			}
		},
		[incorrectPassword]
	);

	useEffect(
		() => {
			const wrapper = wrapperRefLogin.current;
			if (wrapper) {
				if ((loginRed && loginValid && !incorrectLogin) || (!loginRed && (!loginValid || incorrectLogin))) {
					wrapper.classList.toggle('incorrect');
					dispatch(setLoginRed())
				}
			}
		},
		[incorrectLogin, loginValid]
	);

	return (
		<form className="form" onSubmit={handleSubmit}>
			<p className="form_text">Log In</p>
			<div className="spacer" />
			<input
				ref={wrapperRefLogin}
				type="text"
				value={login}
				onChange={handleLoginChange}
				className="form_input"
				placeholder="Username or email"
			/>
			{/* <CSSTransition in={incorrectPassword} classNames="fade" timeout={0} > */}
			<input
				ref={wrapperRefPassword}
				type={showPassword ? 'text' : 'password'}
				value={password}
				onChange={handleLPasswordChange}
				className="form_input"
				placeholder="Password"
			/>
			{/* </CSSTransition> */}
			<input type="submit" value="Log In" className="form_submit_button" disabled={!buttonEnabled} />
			<div className="spacer" />
			<button className="form_register_option_button" onClick={handleRegisterButton}>
				<p className="form_register_option_text">Register</p>
			</button>
		</form>
	);
}

export default LoginForm;
