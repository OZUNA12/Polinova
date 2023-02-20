import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import axios from 'axios';
import backend from '../constants';
import sweetalert2 from 'sweetalert2';
import Loading from '../components/Loading';
import { PhotoProvider, PhotoView } from 'react-image-previewer';

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
            icon: 'info',
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
            icon: 'info',
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
              icon: 'info',
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
            icon: 'info',
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
      return <img src={imgEditar} className='img-info-editar' alt='' onClick={editarUsuario}/>
    }

    const editarEmpresa = ()=>{
      window.location.href = '/editar/empresa';
    }

    const editarUsuario = ()=>{
      window.location.href = '/editar/usuario';
    }

    const cerrarSesion = ()=>{
      sweetalert2.fire({
        title: '¿Quieres cerrar tu sesión?',
        color: 'black',
        icon: 'warning',
        iconColor: '#F5305C',
        showCancelButton: true,
        confirmButtonColor: '#F5305C',
        cancelButtonColor: '#04BEC7',
        confirmButtonText: 'Si, cerrar sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/logout';
        }
      })
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
                <PhotoProvider>
                  <PhotoView src={empresa.img}>
                    <img src={empresa.img} className='img-info-empresa' alt='' />
                  </PhotoView>
                </PhotoProvider>
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

            <button onClick={cerrarSesion} className='warning-animation boton1'>Cerrar Sesión</button>
            <br/>
        </div>
      )
  }
}

export default Usuario