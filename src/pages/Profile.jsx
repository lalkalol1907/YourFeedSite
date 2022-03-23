import React, { Component } from 'react'
import NavBar from '../views/NavBar';

class Profile extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <div className="text-xl p-5">
                    <p>Profile</p>
                </div>
            </div>
        )
    }
}

export default Profile;