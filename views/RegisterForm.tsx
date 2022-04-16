import { useEffect, useState } from 'react';
import React from 'react';
import Login from '../pages/login';
import { useCookies } from 'react-cookie';
import Router from 'next/router';


interface RegisterFormProps {
	handleSignInButton: () => void;
}

function RegisterForm(props: RegisterFormProps) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ usernameExists, setUsernameExists ] = useState(false);
	const [ passwordValid, setPasswordValid ] = useState(true);
	const [ usernameValid, setUsernameValid ] = useState(true);
	const [ passwordMatch, setPasswordMatch ] = useState(true);
	const [ buttonEnabled, setButtonEnabled ] = useState(true); // false
	const [ emailValid, setEmailValid ] = useState(true);
	const [ emailExists, setEmailExists ] = useState(false);
	const [ registrarionError, setRegistrationError ] = useState('');
    const [ cookies, setCookie, removeCookie ] = useCookies([ 'access_token' ]);

	const changeButtonState = () => {
		setButtonEnabled(
			passwordValid &&
				passwordMatch &&
				emailValid &&
				!usernameExists &&
				usernameValid &&
				!emailExists &&
				username.length != 0 &&
				password.length != 0
		);
	};

	const checkPassword = () => {
		setPasswordValid(true);
	};

	const checkUsername = () => {
		let loginIsValid = /^[0-9A-Z_-]+$/i.test(username) || Login.length == 0;
		setUsernameValid(loginIsValid);
	};

	const checkPasswordMatch = () => {
		setPasswordMatch(password === passwordConfirmation);
	};

	const checkEmail = () => {
		let emailIsValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
		setEmailValid(emailIsValid);
	};

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
					setRegistrationError(body.err);
				}
			});
		});
	};

	const checkUsernameExists = () => {
		fetch('/api/check_username_exists', {
			method: 'POST',
			headers: {
				'Content-Type': 'aplication/json'
			},
			body: JSON.stringify({
				username: username
			})
		}).then((response) => {
			response.json().then((body) => {
				if (!body.stat) {
					setRegistrationError(body.err);
					return;
				}
				console.log(body.exists);
				setUsernameExists(body.exists);
			});
		});
	};

	const checkEmailExists = () => {
		fetch('/api/check_email_exists', {
			method: 'POST',
			headers: {
				'Content-Type': 'aplication/json'
			},
			body: JSON.stringify({
				email: email
			})
		}).then((response) => {
			response.json().then((body) => {
				if (!body.stat) {
					setRegistrationError(body.err);
					return;
				}
				setEmailExists(body.exists);
			});
		});
	};

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value.toLowerCase());
	};

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value.toLowerCase());
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handlePasswordConfirmationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordConfirmation(event.target.value);
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
			checkPasswordMatch();
		},
		[ passwordConfirmation ]
	);

	useEffect(
		// TODO: fix bug with password matching
		() => {
			checkPasswordMatch();
			checkPassword();
		},
		[ password ]
	);

	useEffect(
		() => {
			if (email.length == 0) {
				setEmailExists(false);
				setEmailValid(true);
			} else {
				checkEmail();
				if (emailValid && email.length != 0) {
					checkEmailExists();
				}
			}
		},
		[ email ]
	);

	useEffect(
		() => {
			if (username.length == 0) {
				setUsernameExists(false);
				setUsernameValid(true);
				return;
			} else {
				checkUsername();
				if (usernameValid && username.length != 0) {
					checkUsernameExists();
				}
			}
		},
		[ username ]
	);

	useEffect(
		() => {
			changeButtonState();
		},
		[
			usernameExists,
			usernameValid,
			emailValid,
			passwordMatch,
			passwordValid,
			emailExists,
			username.length != 0,
			password.length != 0
		]
	);

	return (
		<form className="form" onSubmit={handleSubmit}>
			<p className="form_text">Register</p>
			<div className="spacer" />
			<input
				type="text"
				value={username}
				onChange={handleUsernameChange}
				className={usernameValid && !usernameExists ? 'form_correct_input' : 'form_incorrect_input'}
				placeholder="Username"
			/>
			<input
				type="text"
				value={email}
				onChange={handleEmailChange}
				className={
					(emailValid || email.length == 0) && !emailExists ? 'form_correct_input' : 'form_incorrect_input'
				}
				placeholder="Email"
			/>
			<input
				type="text"
				value={password}
				onChange={handlePasswordChange}
				className={passwordValid ? 'form_correct_input' : 'form_incorrect_input'}
				placeholder="Password"
			/>
			<input
				type="text"
				value={passwordConfirmation}
				onChange={handlePasswordConfirmationChange}
				className={passwordMatch ? 'form_correct_input' : 'form_incorrect_input'}
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
