import { useEffect, useState } from 'react';
import React from 'react';
import Login from '../pages/login';

interface RegisterFormProps {
	handleSignInButton: () => void;
	register: (email: string, username: string, password: string) => void;
	error: string;
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
	const [ error, setError ] = useState(props.error);

	const changeButtonState = () => {
		setButtonEnabled(
			passwordValid &&
				passwordMatch &&
				emailValid &&
                !usernameExists &&
				usernameValid &&
                emailExists &&
				username.length != 0 &&
				password.length != 0
		);
	};

	const checkPassword = () => {
		setPasswordValid(true);
		changeButtonState();
	};

	const checkUsername = () => {
		let loginIsValid = /^[0-9A-Z_-]+$/i.test(username) || Login.length == 0;
		setUsernameValid(loginIsValid);
		changeButtonState();
	};

	const checkPasswordMatch = () => {
		setPasswordMatch(password === passwordConfirmation);
		changeButtonState();
	};

	const checkEmail = () => {
		let emailIsValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
		setEmailValid(emailIsValid);
	};

	const checkUsernameExists = () => {
		fetch('/api/check_username_exists', {
			method: 'POST',
			headers: {
				'Content-Type': 'aplication/json'
			},
			body: JSON.stringify({
				username
			})
		}).then((response) => {
            response.json().then((body) => {
                if (!body.stat) {
                    setError(body.err)
                    return
                }
                setUsernameExists(body.exists);
            })
        });
        changeButtonState();
	};

    const checkEmailExists = () => {
        fetch('/api/check_email_exists', {
			method: 'POST',
			headers: {
				'Content-Type': 'aplication/json'
			},
			body: JSON.stringify({
				email
			})
		}).then((response) => {
            response.json().then((body) => {
                if (!body.stat) {
                    setError(body.err)
                    return
                }
                setEmailExists(body.exists);
            })
        });
        changeButtonState();
    }

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
		props.register(email, username, password);
		event.preventDefault();
	};

	const handleSignInButton = (event: React.SyntheticEvent) => {
		props.handleSignInButton();
		event.preventDefault();
	};

    useEffect(() => {
        setError(props.error)
    }, [props.error])

    useEffect(() => {
        checkPasswordMatch();
    }, [passwordConfirmation])

    useEffect(() => {
        checkPasswordMatch();
        checkPassword();
    }, [password])

    useEffect(() => {
        checkEmail();
        if (emailValid && email.length != 0) {
            checkEmailExists();
        }
    }, [email])

    useEffect(() => {
        checkUsername();
        if (usernameValid && username.length != 0) {
            checkUsernameExists();
        }
    }, [username])

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
				className={emailValid || email.length == 0 ? 'form_correct_input' : 'form_incorrect_input'}
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
            <input type="submit" value="Register" disabled={!buttonEnabled} />
			<div className="spacer" />
			<div className="spacer" />
			<button className="form_register_option_button" onClick={handleSignInButton}>
				<p className="form_register_option_text">SignIn</p>
			</button>
		</form>
	);
}

export default RegisterForm;
