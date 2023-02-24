import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sweetalert2 from 'sweetalert2';
import backend from '../constants';
import { PhotoProvider, PhotoView } from 'react-image-previewer';
import Loading from '../components/Loading';
import Titulo from '../components/Titulo';

import '../styles/ListaClientes.css'

const Listaclientess = () => {

    const [usuario, setUsuario] = useState({});
    const [clientes, setClientes] = useState([]);

    const getclientes = async()=>{
      const {data} = await axios.get(backend()+'/api/cliente/')
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
        });

        const aux = [];
        data.map((d)=>{
            if(d.id_usuario === usuario._id){
                aux.push(d);
            }
        })

        console.log(aux)
        setClientes(aux);
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
        if(clientes.length === 0){
          getclientes();
        }
      }
    });

    if(usuario._id === undefined){
        return <Loading/>
    }else{
        return (
            <div className='div-lista-cliente-main'>
                <Titulo>Mis clientes</Titulo>
                {
                    clientes.map((c)=>{
                        return <div className='div-lista-clientes-cliente'>
                            <h3 className='h3-lista-clientes'>{c.nombre} </h3>
                            <p className='p-lista-clientes'>{c.empresa} </p>
                            <a className='a-lista-clientes' href={'mailto:'+c.correo}>{c.correo} </a>
                            <br/>
                            <a className='a-lista-clientes' href={'callto:'+c.telefono}>{c.telefono} </a>
                        </div>
                    })
                }
            </div>
        )
    }
}

export default Listaclientess