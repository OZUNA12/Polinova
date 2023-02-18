import axios from 'axios';
import React, { useState } from 'react'
import backend from '../constants';

const AgregarCliente = () => {
    
    const valorInicial = {
        nombre: '',
        empresa: '',
        correo: '',
        telefono: ''
    };

    const [cliente, setCliente] = useState(valorInicial);

    const capturarDato = (e)=>{
        const {name, value} = e.target;
        setCliente({...cliente, [name]: value})
    }

    const submit = async(e)=>{
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const empresa = document.getElementById('empresa').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;

        const formData = new FormData();
        formData.append('id_usuario', localStorage.getItem('id'));
        formData.append('nombre', nombre);
        formData.append('empresa', empresa);
        formData.append('correo', correo);
        formData.append('telefono', telefono);

        const {data} = await axios.post(backend()+'/api/cliente', formData);
        if(data._id !== undefined){
            alert('El cliente se registro exitosamente');

            setCliente({...valorInicial});
        }else{
            alert('Ha ocurrido un error, favor de intentarlo nuevamente')
        }
    }

    return (
        <div>
            <h1>Agregar Cliente</h1>
            <form onSubmit={submit}>
                <label htmlFor='nombre'>Nombre del Cliente:</label>
                <input 
                    id='nombre'
                    name='nombre'
                    type='text'
                    required
                    onChange={capturarDato}

                    value={cliente.nombre}
                />
                
                <label htmlFor='empresa'>Empresa del Cliente:</label>
                <input 
                    id='empresa'
                    name='empresa'
                    type='text'
                    required
                    onChange={capturarDato}

                    value={cliente.empresa}
                />

                <label htmlFor='correo'>Correo del Cliente:</label>
                <input 
                    id='correo'
                    name='correo'
                    type='email'
                    required
                    onChange={capturarDato}

                    value={cliente.correo}
                />

                <label htmlFor='telefono'>Telefono del Cliente:</label>
                <input 
                    id='telefono'
                    name='telefono'
                    type='number'
                    minLength={10}
                    required
                    onChange={capturarDato}

                    value={cliente.telefono}
                />

                <button>Agregar Cliente</button>
            </form>
        </div>
    )
}

export default AgregarCliente