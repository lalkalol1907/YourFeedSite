import React, { Component } from 'react'
import NavBar from '../views/NavBar';

class Messenger extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <div className="text-xl p-5">
                    <p>Messenger</p>
                </div>
            </div>
        )
    }
}

export default Messenger;