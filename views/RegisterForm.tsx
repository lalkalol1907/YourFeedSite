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

	const wrapperRefUsername = React.createRef<HTMLInputElement>();
	const wrapperRefEmail = React.createRef<HTMLInputElement>();
	const wrapperRefPassword = React.createRef<HTMLInputElement>();
	const wrapperRefConfirmation = React.createRef<HTMLInputElement>();

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
		let loginIsValid = /^[0-9A-Z_-]+$/i.test(username);
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

	// TODO: create state vars for every input and replace vars in useEffect()

	useEffect(
		() => {
			const wrapper = wrapperRefUsername.current;
			if (wrapper) {
				if (username.length != 0) {
					wrapper.classList.toggle('incorrect');
				}
			}
		},
		[ usernameValid && !usernameExists ]
	);

	useEffect(
		() => {
			const wrapper = wrapperRefEmail.current;
			if (wrapper) {
				if (email.length != 0) {
					wrapper.classList.toggle('incorrect');
				}
			}
		},
		[ emailValid && !emailExists ]
	);

	useEffect(
		() => {
			const wrapper = wrapperRefPassword.current;
			if (wrapper) {
				if (password.length != 0) wrapper.classList.toggle('incorrect');
			}
		},
		[ passwordValid ]
	);

	useEffect(
		() => {
			const wrapper = wrapperRefConfirmation.current;
			if (wrapper) {
				if (password.length != 0 || passwordConfirmation.length != 0) wrapper.classList.toggle('incorrect');
			}
		},
		[ passwordMatch ]
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
