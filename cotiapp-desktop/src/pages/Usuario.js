import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import axios from 'axios';
import backend from '../constants';
import sweetalert2 from 'sweetalert2';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Boton1 from '../components/Boton1';

import imgUsuarioNormal from '../assets/usuario-normal.png';
import imgUsuarioModerador from '../assets/usuario-moderador.png';
import imgUsuarioAdmin from '../assets/usuario-admin.png';
import imgUsuarioDios from '../assets/usuario-dios.png';
import imgEditar from '../assets/editar.png';

import '../styles/Usuario.css'

const Usuario = () => {
    const [imgUsuario, setImgUsuario] = useState(imgUsuarioNormal);

    const [usuario, setUsuario] = useState({});
    const [empresa, setEmpresa] = useState({});

    const getEmpresa = async()=>{
      const {data} = await axios.get(backend()+'/api/empresa/'+usuario.id_empresa)
        .catch((err)=>{
          console.log(err)
          sweetalert2.fire({
              icon: 'error',
              iconColor: 'red',
              title: 'ERROR: '+err.message,
              text: 'Ha ocurrido un error al conectar con el servidor. Verifique su conexion a internet',
              color: 'black',
              footer: '<p>Si el problema persiste reporte el error al correo: <a href="mailto:cotiapp.dev@gmail.com">cotiapp.dev@gmail.com</a></p>',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#F5305C'
          })

          return;
        })
      setEmpresa(data);
    }
    
    useEffect(()=>{
      const getUsuario = async()=>{
        const {data} = await axios.get(backend()+'/api/usuario/'+localStorage.getItem('id'))
          .catch((err)=>{
            console.log(err)
            sweetalert2.fire({
                icon: 'error',
                iconColor: 'red',
                title: 'ERROR: '+err.message,
                text: 'Ha ocurrido un error al conectar con el servidor. Verifique su conexion a internet',
                color: 'black',
                footer: '<p>Si el problema persiste reporte el error al correo: <a href="mailto:cotiapp.dev@gmail.com">cotiapp.dev@gmail.com</a></p>',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#F5305C'
            })

            return;
          })
        setUsuario(data);
      }

      if(usuario._id === undefined){
        getUsuario();
      }else{
        
        if(empresa._id === undefined){
          getEmpresa();
        }
        
        if(usuario.dios){
            setImgUsuario(imgUsuarioDios);
        }else if(usuario.admin){
            setImgUsuario(imgUsuarioAdmin);
        }else if(usuario.moderador){
            setImgUsuario(imgUsuarioModerador);
        }
      }
    });

    const cotizar = (bool)=>{
      if(bool){
        return 'Si'
      }else{
        return 'No'
      }
    }

    const btnImgUsuario = ()=>{
      switch (imgUsuario){

        case imgUsuarioDios: 
          sweetalert2.fire({
            icon: 'question',
            iconColor: '#FFBF00',
            title: 'Desarrollador',
            text: 'Eres un Desarrollador, tienes acceso total al sistema',
            color: 'black',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F5305C'
          })
          break;

          case imgUsuarioAdmin: 
          sweetalert2.fire({
            icon: 'question',
            iconColor: '#42e8ff',
            title: 'Administrador',
            text: 'Eres un Administrador, puedes crear cuentas nuevas en tu empresa, recuperar, eliminar y editar cuentas, editar información de tu empresa, designar nuevos administradores o moderadores',
            color: 'black',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F5305C'
          })
          break;
          
          case imgUsuarioModerador: 
            sweetalert2.fire({
              icon: 'question',
              title: 'Moderador',
              iconColor: '#990000',
              text: 'Eres un Moderador, puedes crear cuentas nuevas en tu empresa, recuperar y editar cuentas',
              color: 'black',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#F5305C'
            })
            break;
          
          case imgUsuarioNormal: 
          sweetalert2.fire({
            icon: 'question',
            title: 'Normal',
            iconColor: '#000',
            text: 'Eres un usuario regular, no tienes privilegios especiales',
            color: 'black',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F5305C'
          })
          break;

        default: break;
      }
    }

    const btnEditarEmpresa = ()=>{
    if(usuario.dios || usuario.admin){
      return <img src={imgEditar} className='img-info-editar' alt='' onClick={editarEmpresa}/>
    }else{
      return <div></div>
    }
  }
  
  const btnEditarUsuario = ()=>{
        if(usuario.dios || usuario.admin || usuario.moderador){
        return <img src={imgEditar} className='img-info-editar' alt='' onClick={editarUsuario}/>
      }else{
        return <div></div>
      }
    }

    const editarEmpresa = ()=>{
      window.location.href = '/editar/empresa';
    }

    const editarUsuario = ()=>{
      window.location.href = '/editar/usuario';
    }

    if(usuario._id === undefined){
      return <Loading/>
    }else{
      return (
        <div className='div-usuario-main'>
            <Titulo>Información de Usuario</Titulo>

            <div className='div-info-personal'>
              <img src={imgUsuario} className='img-info-usuario' alt='' onClick={btnImgUsuario}/>
              <div className='div-info-personal-texto'>
                <br/>
                <h3 className='h3-info-nombre'>{usuario.nombre} {usuario.apellido}</h3>
                <p className='p-info-usuario'><b>Correo:</b> {usuario.correo}</p>
                <p className='p-info-usuario'><b>¿Puede Cotizar?</b> {cotizar(usuario.cotizaciones)}</p>
                <p className='p-info-usuario'><b>¿Puede hacer Tickets?</b> {cotizar(usuario.tickets)}</p>
                <br/>
              </div>
              <div className='div-info-usuario-btns'>
                {
                  btnEditarUsuario()
                }
              </div>
            </div>

            <br/><br/>

            <div className='div-info-personal'>
              <div className='div-info-empresa-img'>
                <img src={empresa.img} className='img-info-empresa' alt='' />
              </div>
              <div className='div-info-empresa-texto'>
                <br/>
                <h3 className='h3-info-nombre'>{empresa.nombre}</h3>
                <p className='p-info-usuario'>{empresa.correo}</p>
                <p className='p-info-usuario'>{empresa.telefono}</p>
                <p className='p-info-usuario'>{empresa.direccion}</p>
                <p className='p-info-usuario'><a href={empresa.pagina} rel="noreferrer noopener" target='_blank'>{empresa.pagina}</a></p>
                <br/>
              </div>
              <div className='div-info-empresa-btns'>
                {
                  btnEditarEmpresa()
                }
              </div>
            </div>

            <br/>


            <Link to='/logout'><Boton1>Cerrar Sesión</Boton1></Link>
            <br/>
        </div>
      )
  }
}

export default Usuario