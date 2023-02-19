import axios from 'axios';
import React, { useEffect } from 'react';
import backend from '../constants';

export default function LoggedRoute({ children }) {
    
    useEffect(()=>{
      const getUsuario = async()=>{
        console.log('get usuario')
        const {data} = await axios.get(backend()+'/api/usuario/'+localStorage.getItem('id'))

        if(!data.admin && !data.dios){
            window.location.href = '/'
        }

      }

        getUsuario();
    });

    return  children 
}