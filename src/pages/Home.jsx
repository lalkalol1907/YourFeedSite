import React from 'react';
import NavBar from '../views/NavBar';

function Home(props) {
    return (
        <div>
            <NavBar />
            <div className="text-xl p-5">
                <p>Home</p>
            </div>
        </div>
    )
}

export default Home;