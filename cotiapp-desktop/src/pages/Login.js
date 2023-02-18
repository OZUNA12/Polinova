import React, { useEffect } from 'react';
import axios from 'axios';
import sweetalert2 from 'sweetalert2';
import backend from '../constants';
import Titulo from '../components/Titulo';
import Subtitulo from '../components/Subtitulo';
import Boton1 from '../components/Boton1';
import Label from '../components/Label';

import '../styles/Login.css'

const Login = () => {

    useEffect(()=>{
        const isLogged = ()=>{
            if(localStorage.getItem('id') !== null){
                window.location.href = '/';
            }
        }

        isLogged();

        const height = window.innerHeight;
    console.log(height);
    });

    


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
            sweetalert2.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: 'Correo y/o contraseña incorrectos',
                footer: 'Si has olvidado tu contraseña contacta con el administrador en tu empresa'
            })
            
        }
    }

    return (
        <div className='div-login-main'>
            <form onSubmit={login} className='form-login'>

                <Titulo>Iniciar Sesión</Titulo>

                <div className='div-input-login'>
                <Label htmlFor='correo'>Correo:</Label>
                    <input                        
                        className='input-login'
                        id='correo'
                        type='email'
                        placeholder='Correo Electronico'
                        required
                    />
                </div>
                    
                <div className='div-input-login'>
                    <Label htmlFor='password'>Contraseña:</Label>
                    <input
                        className='input-login'
                        id='password'
                        type='password'
                        placeholder='Contraseña'
                        minLength='6'
                        required
                    />
                </div>

                <br/>
                <Boton1>Iniciar Sesión</Boton1>
                <br/><br/>
            </form>
        </div>
    )
}

export default Login