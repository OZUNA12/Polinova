import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import backend from '../constants';
import AgregarUsuario from '../pages/AgregarUsuario';
import AgregarUsuarioDios from '../pages/AgregarUsuarioDios';

export default function LoggedRoute() {

    const [usuario, setUsuario] = useState({});
    
    useEffect(()=>{
      const getUsuario = async()=>{
        const {data} = await axios.get(backend()+'/api/usuario/'+localStorage.getItem('id'))

        setUsuario(data)
        if(!data.dios && !data.admin){
            window.location.href = '/home'
        }

      }

        getUsuario();
    });

    if(usuario.dios){
        return <AgregarUsuarioDios/>
    }else if(usuario.admin){
        return <AgregarUsuario/>
    }else{
        return <Loading/>

    }
}