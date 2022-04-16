import React, { useState, useEffect } from 'react';

interface LoginFormProps {
	logIn: (login: string, password: string) => void;
	incorrectLogin: boolean;
	incorrectPassword: boolean;
	onPressedRegButton: () => void;
	error: string;
}

function LoginForm(props: LoginFormProps) {
	const [ login, setLogin ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ incorrectPassword, setIncorrectPassword ] = useState(false);
	const [ incorrectLogin, setIncorrectLogin ] = useState(false);
	const [ buttonEnabled, setButtonEnabled ] = useState(false); // false
	const [ showPassword, setShowPassword ] = useState(false);
	const [ loginValid, setLoginValid ] = useState(true);

	const changeButtonState = () => {
		setButtonEnabled(password.length != 0 && login.length != 0 && loginValid);
	};

	const checkLogin = () => {
		let loginIsValid = /^[0-9A-Z_-]+$/i.test(login);
		setLoginValid(loginIsValid);
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		props.logIn(login, password);
		event.preventDefault();
	};

	const handleRegisterButton = (event: React.SyntheticEvent) => {
		props.onPressedRegButton();
		event.preventDefault();
	};

	const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(event.target.value);
		setIncorrectLogin(false);
	};

	const handleLPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setIncorrectPassword(false);
	};

	useEffect(
		() => {
			setIncorrectLogin(props.incorrectLogin);
			setIncorrectPassword(props.incorrectPassword);
		},
		[ props.incorrectLogin, props.incorrectPassword ]
	);

	useEffect(
		() => {
			changeButtonState();
		},
		[ password.length != 0, login.length != 0, loginValid ]
	);

	return (
		<form className="form" onSubmit={handleSubmit}>
			<p className="form_text">Log In</p>
			<div className="spacer" />
			<input
				type="text"
				value={login}
				onChange={handleLoginChange}
				className={incorrectLogin ? 'form_incorrect_input' : 'form_correct_input'}
				placeholder="Username or email"
			/>
			<input
				type={showPassword ? 'text' : 'password'}
				value={password}
				onChange={handleLPasswordChange}
				className={incorrectPassword ? 'form_incorrect_input' : 'form_correct_input'}
				placeholder="Password"
			/>
			<input type="submit" value="Log In" className="form_submit_button" disabled={!buttonEnabled} />
			<div className="spacer" />
			<button className="form_register_option_button" onClick={handleRegisterButton}>
				<p className="form_register_option_text">Register</p>
			</button>
		</form>
	);
}

export default LoginForm;
