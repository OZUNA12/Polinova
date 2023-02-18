import React, { useEffect } from 'react'
import LoadingOverlay from 'react-loading-overlay';

import '../styles/Loading.css'

const Logout = () => {

    useEffect(()=>{
        const logout = ()=>{
            localStorage.clear();
            window.location.href = '/login';
        }
        logout();
    })

    return (
        <LoadingOverlay
            className='loading'
            active={true}
            spinner
            text='Cerrando sesión...'
        >
        </LoadingOverlay>
    )
}

export default Logout