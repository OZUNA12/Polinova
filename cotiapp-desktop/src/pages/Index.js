import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import axios from 'axios';
import sweetalert2 from 'sweetalert2';
import backend from '../constants';
import { PhotoProvider, PhotoView } from 'react-image-previewer';
import Loading from '../components/Loading';

import '../styles/Index.css'

const Index = () => {

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
      }
    });
    
    if(usuario._id === undefined){
      return <Loading/>
    }else{
      return (
        <div>
            <h1 className='titulo h1-index-titulo'>Hola {usuario.nombre}</h1>
            <PhotoProvider>
              <PhotoView src={empresa.img}>   
                <img src={empresa.img} alt='' className='img-logo-empresa-index'/>
              </PhotoView>
            </PhotoProvider>
        </div>
      )
    }

    
}

export default Index