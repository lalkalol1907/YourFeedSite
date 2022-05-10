import { useEffect, useState } from 'react';
import React from 'react';
import Login from '../pages/login';
import { useCookies } from 'react-cookie';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
	setEmail,
	setPassword,
	setPasswordConfirmation,
	setUsername,
	setUsernameRed,
	setEmailRed,
	setPasswordConfirmationRed,
	setPasswordRed,
	setRegistrationError
} from '../store/slices/RegisterFormSlice';

interface RegisterFormProps {
	handleSignInButton: () => void;
}

function RegisterForm(props: RegisterFormProps) {
	const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

	const wrapperRefUsername = React.createRef<HTMLInputElement>();
	const wrapperRefEmail = React.createRef<HTMLInputElement>();
	const wrapperRefPassword = React.createRef<HTMLInputElement>();
	const wrapperRefConfirmation = React.createRef<HTMLInputElement>();

	const {
		email,
		password,
		passwordConfirmation,
		username,
		usernameExists,
		emailExists,
		passwordValid,
		usernameValid,
		emailValid,
		passwordMatch,
		usernameRed,
		emailRed,
		passwordRed,
		passwordConfirmationRed,
		buttonEnabled,
		registrationError
	} = useSelector((state: RootState) => state.registerForm)

	const dispatch = useDispatch()

	const register = () => {
		console.log(password);
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
					setCookie('access_token', body.access_token);
					Router.push('/feed');
				} else {
					dispatch(setRegistrationError(body.err));
				}
			});
		});
	};

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setUsername(event.target.value.toLowerCase()));
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setEmail(event.target.value.toLowerCase()));
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPassword(event.target.value));
	};

	const handlePasswordConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPasswordConfirmation(event.target.value));
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		if (!buttonEnabled) {
			return;
		}
		register();
		event.preventDefault();
	};

	const handleSignInButton = (event: React.SyntheticEvent) => {
		props.handleSignInButton();
		event.preventDefault();
	};

	useEffect(
		() => {
			const wrapper = wrapperRefUsername.current;
			if (wrapper) {
				if (
					(!usernameExists && usernameValid && usernameRed) ||
					(!usernameRed && (usernameExists || !usernameValid))
				) {
					wrapper.classList.toggle('incorrect');
					dispatch(setUsernameRed());
				}
			}
		},
		[usernameValid, usernameExists]
	);

	useEffect(
		() => {
			const wrapper = wrapperRefEmail.current;
			if (wrapper) {
				if ((!emailExists && emailValid && emailRed) || (!emailRed && (emailExists || !emailValid))) {
					wrapper.classList.toggle('incorrect');
					dispatch(setEmailRed());
				}
			}
		},
		[emailValid, emailExists]
	);

	useEffect(
		() => {
			const wrapper = wrapperRefPassword.current;
			if (wrapper) {
				if (passwordValid === passwordRed) {
					wrapper.classList.toggle('incorrect');
					dispatch(setPasswordRed());
				}
			}
		},
		[passwordValid]
	);

	useEffect(
		() => {
			const wrapper = wrapperRefConfirmation.current;
			if (wrapper) {
				if (passwordMatch === passwordConfirmationRed) {
					wrapper.classList.toggle('incorrect');
					dispatch(setPasswordConfirmationRed());
				}
			}
		},
		[passwordMatch]
	);

	return (
		<form className="form" onSubmit={handleSubmit}>
			<p className="form_text">Register</p>
			<div className="spacer" />
			<input
				ref={wrapperRefUsername}
				type="text"
				value={username}
				onChange={handleUsernameChange}
				className="form_input"
				placeholder="Username"
			/>
			<input
				ref={wrapperRefEmail}
				type="text"
				value={email}
				onChange={handleEmailChange}
				className="form_input"
				placeholder="Email"
			/>
			<input
				ref={wrapperRefPassword}
				type="text"
				value={password}
				onChange={handlePasswordChange}
				className="form_input"
				placeholder="Password"
			/>
			<input
				ref={wrapperRefConfirmation}
				type="text"
				value={passwordConfirmation}
				onChange={handlePasswordConfirmationChange}
				className="form_input"
				placeholder="Confirm password"
			/>
			<input type="submit" value="Register" className="form_submit_button" disabled={!buttonEnabled} />
			<div className="spacer" />
			<div className="spacer" />
			<button className="form_register_option_button" onClick={handleSignInButton}>
				<p className="form_register_option_text">SignIn</p>
			</button>
		</form>
	);
}

export default RegisterForm;
