import React, { useEffect } from 'react'

const Logout = () => {

    useEffect(()=>{
        const logout = ()=>{
            localStorage.clear();
            window.location.href = '/login';
        }
        logout();
    })

    return (
        <div>
            <h1>Cerrando sesion...</h1>
        </div>
    )
}

export default Logout