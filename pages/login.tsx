import React, { useState } from 'react';
import NavBar from '../views/NavBar';
import LoginForm from '../views/LoginForm';
import RegisterForm from '../views/RegisterForm';
import { NextPageContext } from 'next';
import * as cookie from 'cookie';
import { TokenSTG } from '../DataBase/DB_Objects';

function Login() {
	const [ registerForm, setRegisterForm ] = useState(false);

	const onPressedRegButton = () => {
		setRegisterForm(true);
	};

	const onPressedSignInButton = () => {
		setRegisterForm(false);
	};

	return (
		<div className="login">
			<NavBar auth={false} />
			<div className="login_container">
				<div className="login_wrapper">
					{/* <img src={"login.svg"} className="login_pic" / > */}
					<div className="login_pic" />
				</div>
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
			props: {}
		};
	}

    const auth = TokenSTG.authToken(access_token).stat

	if (auth) {
        return {
            redirect: {
                permanent: false, 
                destination: "/feed"
            }, 
            props: {}
        }
    }

    return {
        props: {}
    }
}

export default Login;
