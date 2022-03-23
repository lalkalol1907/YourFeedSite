import React, { Component } from 'react'
import NavBar from '../views/NavBar';

class Settings extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <div className="text-xl p-5">
                    <p>Settings</p>
                </div>
            </div>
        )
    }
}

export default Settings;