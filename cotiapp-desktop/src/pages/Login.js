import React, { useEffect } from 'react';
import axios from 'axios';
import backend from '../constants';
import { Navigate } from 'react-router-dom';
import Titulo from '../components/Titulo';

const Login = () => {

    useEffect(()=>{
        const isLogged = ()=>{
            if(localStorage.getItem('id') !== null){
                window.location.href = '/';
            }
        }

        isLogged();
    })

    const login = async(e)=>{
        e.preventDefault();

        const correo = document.getElementById('correo').value;
        const password = document.getElementById('password').value;

        const formData = new FormData();
        formData.append('correo', correo);
        formData.append('password', password);

        const {data} = await axios.post(backend()+'/api/login', formData);
        if(data.exito){
            localStorage.setItem('id', data.id);
            window.location.href = '/';
        }else{
            alert('Correo y/o contraseña incorrectos');
        }
    }

    return (
        <div>
            <Titulo>Login</Titulo>
            <form onSubmit={login}>
                <label htmlFor='correo'>Correo:</label>
                <input
                    id='correo'
                    type='email'
                    placeholder='Correo Electronico'
                    required
                />

                <label htmlFor='password'>Contraseña:</label>
                <input
                    id='password'
                    type='password'
                    placeholder='Contraseña'
                    minLength='6'
                    required
                />

                <button>Iniciar Sesión</button>
            </form>
        </div>
    )
}

export default Login