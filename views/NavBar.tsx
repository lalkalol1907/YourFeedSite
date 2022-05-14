import Link from 'next/link';
import { Avatar } from '@mui/material';
import { BsPlusLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setAuth, setUser } from '../store/slices/UserSlice';
//TODO: navbar redux
interface NavBarProps {
    logOut?: () => void;
    newPost?: () => void;
}

function NavBar(props: NavBarProps) {

    const { user, auth } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const onLogOutPressed = () => {
        if (!props.logOut) {
            return;
        }
        dispatch(setAuth(false))
        dispatch(setUser(undefined))
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
                        <button onClick={onLogOutPressed} className="dropdown_element">Log Out</button>
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
