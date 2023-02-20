import React from 'react'
import '../styles/SplashScreen.css';
import logoCotiapp from '../assets/cotiapp-logo2-t.png'
import pack from '../../package.json';

const SplashScreen = () => {

    setTimeout(function() {
        window.location.href = '/home';
    }, 2000);

    return (
        <div className='div-splash-scree-main'>
            <img src={logoCotiapp} alt='' className='img-splash-screen'/>
            <p className='p-info-version'>CotiApp - Versión {pack.version} </p>
        </div>
    )
}

export default SplashScreen