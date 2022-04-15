import React, { useEffect } from 'react';
import Router from 'next/router';

function Index() {

    useEffect(() => {
        Router.push('/home')
    })

    return (
        <div>
            Aboba
        </div>
    )
}

export default Index;