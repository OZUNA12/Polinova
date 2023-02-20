import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import axios from 'axios';
import sweetalert2 from 'sweetalert2';
import backend from '../constants';
import CrearCotizacion from '../components/CrearCotizacion';
import Loading from '../components/Loading';


const Index = () => {

    const [usuario, setUsuario] = useState({});
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
      }
    });
    
    if(usuario._id === undefined){
      return <Loading/>
    }else{
      return (
        <div>
            <Titulo>Hola {usuario.nombre}</Titulo>
  
            <CrearCotizacion/>
        </div>
      )
    }

    
}

export default Index