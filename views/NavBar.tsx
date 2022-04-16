import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import User from '../models/user';

interface NavBarProps {
	auth: boolean;
	user?: User;
	logOut?: () => void;
}

function NavBar(props: NavBarProps) {
	const [ auth, setAuth ] = useState(props.auth);
	const [ user, setUser ] = useState(props.user);

	useEffect(
		() => {
			setAuth(props.auth);
			setUser(props.user);
		},
		[ props.auth, props.user ]
	);

	const onLogOutPressed = () => {
		if (!props.logOut) {
			return;
		}
		props.logOut();
	};

	if (auth) {
		return (
			<nav className="navbar">
				<Link href="/home">
					<div className="navbar_logoButton">
						<img src="logo.svg" alt="avatar" className="navbar_logo" />
					</div>
				</Link>
				<Link href="/feed">
					<p className="navbar_button">Feed</p>
				</Link>
				<Link href="/messenger">
					<p className="navbar_button">Messenger</p>
				</Link>
				<div className="spacer" />
				<Link href="/profile">
					<Avatar src={''} className="navbar_avatarButton" />
				</Link>
			</nav>
		);
	}
	return (
		<nav className="navbar">
			<Link href="/home">
				<div className="navbar_logoButton">
					<img src="logo.svg" alt="avatar" className="navbar_logo" />
				</div>
			</Link>
		</nav>
	);
}

export default NavBar;
