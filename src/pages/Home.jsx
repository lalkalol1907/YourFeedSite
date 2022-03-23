import React, { Component } from 'react';
import NavBar from '../views/NavBar';

class Home extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <div className="text-xl p-5">
                    <p>Home</p>
                </div>
            </div>
        )
    }
}

export default Home;