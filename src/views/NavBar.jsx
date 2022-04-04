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
            <nav className='navbar_div'>
                <div className='ml-3 mr-1'>
                    <Link to="/home">
                        <button type='button' className='logo_button'>
                            <img src={require('../logo.svg').default} alt="avatar" className='w-14 px-3 py-0 m-0' />
                        </button>
                    </Link>
                </div>
                <div className='navbar_button_div'>
                    <Link to="/feed">
                        <button type="button" className="group bg-gray-100 border-0 rounded-xl hover:bg-gray-200 text-base font-semibold hover:cursor-pointer px-0">
                            <p className='text-gray-500 px-2 py-0 group-hover:text-fuchsia-700 mx-2'>Feed</p>
                        </button>
                    </Link>
                </div>
                <div className='navbar_button_div'>
                    <Link to="/messenger">
                        <button type="button" className="group bg-gray-100 border-0 rounded-xl hover:bg-gray-200 text-base font-semibold hover:cursor-pointer px-0">
                            <p className='text-gray-500 px-2 py-0 group-hover:text-fuchsia-700 mx-2'>Messenger</p>
                        </button>
                    </Link>
                </div>
                <div className='spacer' />
                <div className='ml-1 mr-3'>

                    

                    <Link to="/profile">
                        <button type="button" className='group bg-gray-100 border-0 hover:cursor-pointer p-0 m-0'>
                            <Avatar className='m-0 p-0 group-hover:brightness-75' src={""} />
                        </button>
                    </Link>
                </div>
            </nav>
        )
    }
    return (
        <div className='min-w-full flex items-center py-2 md:justify-start border-solid border-b border-0 border-gray-200 bg-gray-100 mb-4'>
            <div className='ml-3 mr-1'>
                <Link to="/home">
                    <button type='button' className=' mb-0 p-0 border-0 bg-gray-100 rounded-xl hover:bg-gray-200 hover:cursor-pointer'>
                        <img src={require('../logo.svg').default} alt="avatar" className='w-14 px-3 py-0 m-0' />
                    </button>
                </Link>
            </div>
            <div className='flex-1' />
            <button type="button" className='group bg-gray-100 border-2 border-solid border-fuchsia-700 rounded-2xl text-sm font-semibold hover:cursor-pointer hover:bg-fuchsia-100 hover:border-fuchsia-900 py-0'>
                <p className='text-fuchsia-700 px-2.5 group-hover:underline underline-offset-2 group-hover:text-fuchsia-900 my-1'>Sign Up</p>
            </button>
            <button type="button" className='group bg-gray-100 border-2 border-solid border-gray-400 rounded-2xl text-sm hover:cursor-pointer ml-2 hover:bg-gray-200 hover:border-gray-800 py-0 mr-3' >
                <p className='text-gray-600 px-2.5 font-bold group-hover:text-black group-hover:underline underline-offset-2 my-1'>Sign In</p>
            </button>
        </div>
    )
}

export default NavBar;