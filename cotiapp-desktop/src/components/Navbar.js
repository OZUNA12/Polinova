import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import backend from '../constants';
import AgregarCliente from './AgregarCliente';

import '../styles/Navbar.css';

import imgAgregarCliente from '../assets/agregar-cliente.png';
import imgLogo from '../assets/cotiapp-logo-w.png'
import imgTuerquita from '../assets/icono-dashboard.png';
import imgUsuarioNormal from '../assets/usuario-normal.png';
import imgUsuarioModerador from '../assets/usuario-moderador.png';
import imgUsuarioAdmin from '../assets/usuario-admin.png';
import imgUsuarioDios from '../assets/usuario-dios.png';


const Navbar = () => {


    const [imgUsuario, setImgUsuario] = useState(imgUsuarioNormal);

    const [usuario, setUsuario] = useState({});
    useEffect(()=>{
      const getUsuario = async()=>{
        const {data} = await axios.get(backend()+'/api/usuario/'+localStorage.getItem('id'));
        setUsuario(data);
      }

      if(localStorage.getItem('id') !== null){
        if(usuario._id === undefined){
            getUsuario();
          }else{
            if(usuario.dios){
                setImgUsuario(imgUsuarioDios);
            }else if(usuario.admin){
                setImgUsuario(imgUsuarioAdmin);
            }else if(usuario.moderador){
                setImgUsuario(imgUsuarioModerador);
            }
          }
      }
    });

    const agregarCliente = ()=>{
        document.getElementById('agregar-cliente').style.display = 'flex'
    }
    
    const botones = ()=>{
        if(localStorage.getItem('id') !== null){
            if(usuario.admin || usuario.dios || usuario.moderador){
                return <div className='div-navbar-btns'>
                    <Link to='/dashboard' className='link-navbar'>
                        <img src={imgTuerquita} className='btn-img-navbar' alt=''/>
                    </Link>

                    <Link className='link-navbar' onClick={agregarCliente}>
                        <img src={imgAgregarCliente} className='btn-img-navbar' alt=''/>
                    </Link>

                    <Link to='/usuario' className='link-navbar'>
                        <img src={imgUsuario} className='btn-img-navbar' alt=''/>
                    </Link>
                </div>
            }else{
                return <div className='div-navbar-btns-small'>
                <Link to='/agergar/cliente' className='link-navbar'>
                    <img src={imgAgregarCliente} className='btn-img-navbar' alt=''/>
                </Link>

                <Link to='/usuario' className='link-navbar'>
                    <img src={imgUsuario} className='btn-img-navbar' alt=''/>
                </Link>
            </div>
            }
        }
    }


    return (
        <div className='navbar'>
            <AgregarCliente id='agregar-cliente'/>
            <Link to='/home'  className='link-navbar'>
                <img src={imgLogo} className='logo-navbar' alt=''/>
            </Link>
            {
                botones()
            }
        </div>
    )
}

export default Navbar