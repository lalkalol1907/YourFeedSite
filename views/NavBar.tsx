import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import User from '../models/user';
import { BsPlusLg } from 'react-icons/bs';

interface NavBarProps {
    auth: boolean;
    user?: User;
    logOut?: () => void;
    newPost?: () => void;
}

function NavBar(props: NavBarProps) {
    const [auth, setAuth] = useState(props.auth);
    const [user, setUser] = useState(props.user);

    useEffect(
        () => {
            setAuth(props.auth);
            setUser(props.user);
        },
        [props.auth, props.user]
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

                <div className="navbar_logoButton">
                    <img src="logo.svg" alt="avatar" className="navbar_logo" />
                </div>

                <Link href="/feed">
                    <p className="navbar_button">Feed</p>
                </Link>
                <Link href="/messenger">
                    <p className="navbar_button">Messenger</p>
                </Link>
                <div className="spacer" />
                <button className='createpost_button' onClick={props.newPost} >
                    <BsPlusLg className='plus_button' />
                </button>
                <div className='navbar_avatarButton_wrapper'>
                    <Avatar src={''} className="navbar_avatarButton" />
                    <div className='dropdown_profile'>
                        <Link href="/profile">
                            <p className='dropdown_element'>Profile</p>
                        </Link>
                        <button onClick={props.logOut} className="dropdown_element">Log Out</button>
                    </div>
                </div>
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
