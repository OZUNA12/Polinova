import React, { useEffect, useState } from 'react';
import Titulo from '../components/Titulo';
import axios from 'axios';
import sweetalert2 from 'sweetalert2';
import backend from '../constants';
import Label from '../components/Label'
import { PhotoProvider, PhotoView } from 'react-image-previewer';

import '../styles/CrearCotizacion.css'

import imgPlantillaCotizacion1 from '../assets/plantilla-cotizacion-1.jpg';
import imgPlantillaCotizacion2 from '../assets/plantilla-cotizacion-2.jpg';
import imgPlantillaCotizacion3 from '../assets/plantilla-cotizacion-3.jpg';
import imgPlantillaCotizacion4 from '../assets/plantilla-cotizacion-4.jpg';

const CrearCotizacion = () => {

    const [usuario, setUsuario] = useState({});
    const [clientes, setClientes] = useState([]);
    const [idCliente, setIdCliente] = useState('');
    const [empresa, setEmpresa] = useState({});
    const [cotizacion, setCotizacion] = useState({});

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

        setCotizacion({
            condiciones: data.condiciones,
            footer: data.footer,
            color: data.color,
            iva: 16,
            descuento: 0,
            adicional: 0
        })
      }

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
        setIdCliente(aux[0]._id);
      }

      if(usuario._id === undefined){
        getUsuario();
      }else{
        if(empresa._id === undefined){
            getEmpresa();    
        }
            if(clientes.length === 0)
                getClientes();
      }
    });

    const submit = async(e)=>{
        e.preventDefault();


    }

    const seleccionarCliente = (e)=>{
        const index = e.target.selectedIndex;
        setIdCliente(clientes[index]._id);
    }

    const cambiarValor = (e)=>{
        const {name, value} = e.target;
        setCotizacion({...cotizacion, [name]: value});
      }
    

    return (
        <div className='div-crear-cotizacion-main'>
            <h1>Crear Cotizacion</h1>
            <form onSubmit={submit} className='form-cotizacion'>
            

                <div className='div-cotizacion-grande'>
                    <Label htmlFor='cliente'>Seleccione un cliente:</Label>
                    <select
                        className='select-cotizacion'
                        id='cliente'
                        onChange={seleccionarCliente}
                        >
                        {
                            clientes.map((c)=>{
                                return <option>{c.nombre} de {c.empresa}</option>
                            })
                        }
                    </select>
                </div>
                
                <br/>



                <div className='div-input-editar-empresa-triple'>


                    <div className='div-input-editar-empresa-item-coti'>
                        <Label>IVA (%):</Label>
                        <input
                            type='number'
                            className='input-editar-empresa-completo'
                            value={cotizacion.iva}
                            placeholder='IVA (%)'
                            name='iva'
                            required

                            onChange={cambiarValor}
                        />

                    </div>


                    <div className='div-input-editar-empresa-item-coti'>
                    <Label>Descuento ($):</Label>
                    <input
                        className='input-editar-empresa-completo'
                        type='number'
                        value={cotizacion.descuento}
                        name='descuento'
                        placeholder='Descuento ($)'
                        required

                        onChange={cambiarValor}
                    />
                    </div>

                    <div className='div-input-editar-empresa-item-coti'>
                    <Label>Importe adicional ($):</Label>
                    <input
                        className='input-editar-empresa-completo'
                        type='number'
                        value={cotizacion.adicional}
                        name='adicional'
                        placeholder='Importe adicional ($)'
                        required

                        onChange={cambiarValor}
                    />
                    </div>

                </div>




                <div className='div-input-cotizacion'>
                    <Label>Condiciones de Servicio:</Label>
                    <textarea
                        className='text-area-cotizacion'
                        value={cotizacion.condiciones}
                        name='condiciones'
                        placeholder='Condiciones de Servicio'
                        required

                        onChange={cambiarValor}
                    />
                </div>

                <div className='div-input-cotizacion'>
                    <Label>Footer del ticket/cotización:</Label>
                    <textarea
                        className='text-area-cotizacion'
                        value={cotizacion.footer}
                        name='footer'
                        placeholder='Footer del ticket/cotización'
                        required

                        onChange={cambiarValor}
                    />
                </div>

                <div className='div-input-color'>
                <Label>Color Principal: </Label>
                <input
                    className='input-color'
                    type='color'
                    name='color'
                    value={cotizacion.color}
                    required

                    onChange={cambiarValor}
                    />
                </div>

                <br/>
                <Label>Seleccione la plantilla de la cotización:</Label>

                <div className='div-radio-cotizacion'>

                    <div className='div-radio-item'>
                        <input
                            className='cb'
                            type='radio'
                            id='plantilla1'
                            name='plantilla'
                            value='1'

                            required

                        />
                        <label htmlFor='plantilla1'>
                            <img src={imgPlantillaCotizacion1} className='img-cotizacion-plantilla' alt=''/>
                        </label>
                        <PhotoProvider>
                            <PhotoView src={imgPlantillaCotizacion1}>
                                <p className='p-cotizacion'>Ver</p>
                            </PhotoView>
                        </PhotoProvider>
                    </div>

                    <div className='div-radio-item'>
                        <input
                            className='cb'
                            type='radio'
                            id='plantilla2'
                            name='plantilla'
                            value='2'

                            required
                        />
                        <label htmlFor='plantilla2'>
                            <img src={imgPlantillaCotizacion2} className='img-cotizacion-plantilla' alt=''/>
                        </label>
                        <PhotoProvider>
                            <PhotoView src={imgPlantillaCotizacion2}>
                                <p className='p-cotizacion'>Ver</p>
                            </PhotoView>
                        </PhotoProvider>
                    </div>

                    <div className='div-radio-item'>
                        <input
                            className='cb'
                            type='radio'
                            id='plantilla3'
                            name='plantilla'
                            value='3'

                            required
                        />
                        <label htmlFor='plantilla3'>
                            <img src={imgPlantillaCotizacion3} className='img-cotizacion-plantilla' alt=''/>
                        </label>
                        <PhotoProvider>
                            <PhotoView src={imgPlantillaCotizacion3}>
                                <p className='p-cotizacion'>Ver</p>
                            </PhotoView>
                        </PhotoProvider>
                    </div>

                    <div className='div-radio-item'>
                        <input
                            className='cb'
                            type='radio'
                            id='plantilla4'
                            name='plantilla'
                            value='4'

                            required
                        />
                        <label htmlFor='plantilla4'>
                            <img src={imgPlantillaCotizacion4} className='img-cotizacion-plantilla' alt=''/>
                        </label>
                        <PhotoProvider>
                            <PhotoView src={imgPlantillaCotizacion4}>
                                <p className='p-cotizacion'>Ver</p>
                            </PhotoView>
                        </PhotoProvider>
                    </div>


                </div>

                
                <br/>
                <br/>
                <button className='boton1' id='btn1'>Crear Cotización</button>

                <br/>                
                <br/>


            </form>
        </div>
    )
}

export default CrearCotizacion