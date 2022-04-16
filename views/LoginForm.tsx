import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group'
import Router from 'next/router';
import { useCookies } from 'react-cookie';

interface LoginFormProps {
	onPressedRegButton: () => void;
}

function LoginForm(props: LoginFormProps) {
	const [ login, setLogin ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ incorrectPassword, setIncorrectPassword ] = useState(false);
	const [ incorrectLogin, setIncorrectLogin ] = useState(false);
	const [ buttonEnabled, setButtonEnabled ] = useState(false); // false
	const [ showPassword, setShowPassword ] = useState(false);
	const [ loginValid, setLoginValid ] = useState(true);
    const [ loginError, setLoginError ] = useState('');
    const [ cookies, setCookie, removeCookie ] = useCookies([ 'access_token' ]);

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

	const changeButtonState = () => {
		setButtonEnabled(password.length != 0 && login.length != 0 && loginValid);
	};

	const checkLogin = () => {
		let loginIsValid = /^[0-9A-Z_-]+$/i.test(login);
		setLoginValid(loginIsValid);
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
		setLogin(event.target.value);
	};

	const handleLPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		
	};

	useEffect(
		() => {
			changeButtonState();
		},
		[ password.length != 0, login.length != 0, loginValid ]
	);

    useEffect(() => {
        setIncorrectPassword(false)
    }, [ password ])

    useEffect(() => {
        setIncorrectLogin(false)
    }, [login])

	return (
		<form className="form" onSubmit={handleSubmit}>
			<p className="form_text">Log In</p>
			<div className="spacer" />
			<input
				type="text"
				value={login}
				onChange={handleLoginChange}
				className={incorrectLogin  ? 'form_incorrect_input' : 'form_correct_input'}
				placeholder="Username or email"
			/>
            {/* <CSSTransition in={incorrectPassword} classNames="fade" timeout={0} > */}
			<input
				type={showPassword ? 'text' : 'password'}
				value={password}
				onChange={handleLPasswordChange}
				className={incorrectPassword ? 'form_incorrect_input' : 'form_correct_input'}
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
