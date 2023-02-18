import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import axios from 'axios';
import backend from '../constants';

const CrearCotizacion = () => {

    const [usuario, setUsuario] = useState({});
    const [clientes, setClientes] = useState([]);

    useEffect(()=>{
      const getUsuario = async()=>{
        const {data} = await axios.get(backend()+'/api/usuario/'+localStorage.getItem('id'));
        setUsuario(data);
      }

      const getClientes = async()=>{
        const {data} = await axios.get(backend()+'/api/cliente');
        var aux = [];
        data.map((d)=>{
            if(d.id_usuario === usuario._id){
                aux.push(d);
            }
        })
        setClientes(aux);
      }

      if(usuario._id === undefined){
        getUsuario();
      }else{
        getClientes();
      }
    });

    const submit = async()=>{
        
    }
    

    return (
        <div>
            <h1>Crear Cotizacion</h1>
            <form onSubmit={submit}>
                <label htmlFor='cliente'></label>
                <select
                    id='cliente'
                >
                    <option>--- Seleccione un cliente ---</option>
                    {
                        clientes.map((c)=>{
                            return <option>{c.nombre} de {c.empresa}</option>
                        })
                    }
                    
                </select>

                <label htmlFor=''></label>
                <input
                    id=''
                    type='text'
                    placeholder=''
                    required
                ></input>

            </form>
        </div>
    )
}

export default CrearCotizacion