import { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import 'flowbite'

function NavBar(props) {
    const [auth, setAuth] = useState(props.auth)
    const [user, setUser] = useState(props.user)

    useEffect(() => {
        setAuth(props.auth)
        setUser(props.user)
    }, [props.auth, props.user])

    const onLogOutPressed = () => {
        props.logOut()
    }

    if (auth) {
        return (
            <nav className='navbar'>
                <Link to="/home" className='navbar_logoButton'>
                    <img src={require('../logo.svg').default} alt="avatar" className='logo' />
                </Link>
                <Link to="/feed" className='navbar_button'>
                    <p>Feed</p>
                </Link>
                <Link to="/messenger" className='navbar_button'>
                    <p>Messenger</p>
                </Link>
                <div className='spacer' />
                <Link to="/profile" className='navbar_avatarButton'>
                    <Avatar src={""} />
                </Link>
            </nav>
        )
    }
    return (
        <div className='navbar'>
            <Link to="/home" className='navbar_logoButton'>
                <img src={require('../logo.svg').default} alt="avatar" className='logo' />
            </Link>
            <div className='spacer' />
            <button type="button" className='navbar_button_signUp'>
                <p>Sign Up</p>
            </button>
            <button type="button" className='navbar_button_signIn' >
                <p>Sign In</p>
            </button>
        </div>
    )
}

export default NavBar;