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
            <p className='p-info-version'>CotiApp - Versión BETA 0.0.1</p>
        </div>
    )
}

export default SplashScreen