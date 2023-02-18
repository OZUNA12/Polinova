import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import axios from 'axios';
import backend from '../constants';
import AgregarCliente from '../components/AgregarCliente';
import CrearCotizacion from '../components/CrearCotizacion';

const Index = () => {

    const [usuario, setUsuario] = useState({});
    useEffect(()=>{
      const getUsuario = async()=>{
        const {data} = await axios.get(backend()+'/api/usuario/'+localStorage.getItem('id'));
        setUsuario(data);
      }

      if(usuario._id === undefined){
        getUsuario();
      }
    });

    return (
      <div>
          <Titulo>Hola {usuario.nombre}</Titulo>

          <CrearCotizacion/>
          <AgregarCliente/>
      </div>
    )
}

export default Index