import React, { useEffect } from 'react';
import NavBar from '../views/NavBar';
import LoginForm from '../views/LoginForm';
import RegisterForm from '../views/RegisterForm';
import { NextPageContext } from 'next';
import * as cookie from 'cookie';
import { TokenSTG } from '../DataBase/DB_Objects';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setAuth, setUser } from '../store/slices/UserSlice';

function Login() {
	const { registerForm } = useSelector((state: RootState) => state.login)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setAuth(false))
		dispatch(setUser(undefined))
	})

	return (
		<div className="login">
			<NavBar />
			<div className="login_container">
				<div className="login_wrapper">
					{/* <img src={"login.svg"} className="login_pic" / > */}
					<div className="login_pic" />
				</div>
				{registerForm ? (
					<RegisterForm />
				) : (
					<LoginForm />
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
