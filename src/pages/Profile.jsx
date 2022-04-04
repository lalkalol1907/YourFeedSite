import React from 'react'
import NavBar from '../views/NavBar';

function Profile(props) {
    return (
        <div>
            <NavBar />
            <div className="text-xl p-5">
                <p>Profile</p>
            </div>
        </div>
    )
}

export default Profile;