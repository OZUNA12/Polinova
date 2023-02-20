import React from 'react'
import '../styles/SplashScreen.css';
import logoCotiapp from '../assets/cotiapp-logo2-t.png'

const SplashScreen = () => {

    setTimeout(function() {
        window.location.href = '/home';
    }, 2000);

    return (
        <div className='div-splash-scree-main'>
            <img src={logoCotiapp} alt='' className='img-splash-screen'/>
        </div>
    )
}

export default SplashScreen