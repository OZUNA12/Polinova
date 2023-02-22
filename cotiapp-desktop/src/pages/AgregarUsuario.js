import axios from 'axios';
import React, { useEffect, useState } from 'react'
import backend from '../constants';
import sweetalert2 from 'sweetalert2';
import Label from '../components/Label';
import Titulo from '../components/Titulo';
import Loading from '../components/Loading';

import '../styles/AgregarUsuario.css';

const AgregarUsuario = () => {

    const [newUsuario, setNewUsuario] = useState({});
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
  
  
    const cambiarValor = (e)=>{
    const {name, value} = e.target;
        setNewUsuario({...newUsuario, [name]: value});
    }
  
    const submit = async(e)=>{
        e.preventDefault();

        console.log(newUsuario);

        document.getElementById('btn1').disabled = true;

        const admin = document.getElementById('admin').checked;
        const moderador = document.getElementById('moderador').checked;
        const cotizaciones = document.getElementById('cotizaciones').checked;
        const tickets = document.getElementById('tickets').checked;
  
        const formData = new FormData();
        formData.append('nombre', newUsuario.nombre);
        formData.append('apellido', newUsuario.apellido);
        formData.append('id_empresa', usuario.id_empresa);
        formData.append('correo', newUsuario.correo);
        formData.append('telefono', newUsuario.telefono);
        formData.append('password', newUsuario.telefono);
        formData.append('dios', false);
        formData.append('admin', admin);
        formData.append('moderador', moderador);
        formData.append('cotizaciones', cotizaciones);
        formData.append('tickets', tickets);

  
        const {data} = await axios.post(backend()+'/api/usuario/', formData)
          .catch(err=>{
            console.log(err);
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
            document.getElementById('btn1').disabled = false;
  
          })
          
  
        if(data._id !== undefined){
          const Toast = sweetalert2.mixin({
            toast: true,
            position: 'bottom-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            showCloseButton: true,
            timer: 4000,
            timerProgressBar: true
          })
  
          document.getElementById('btn1').disabled = false;

          setNewUsuario({});

          const inputs = document.getElementsByTagName('input');
          for(let  i=0;i<inputs.length;i++){
            inputs.item(i).value = '';
          }

          document.getElementById('admin').checked=false;
          document.getElementById('moderador').checked=false;
          document.getElementById('cotizaciones').checked=false;
          document.getElementById('tickets').checked=false;
  
  
          Toast.fire({
            icon: 'success',
            title: 'Usuario agregado exitosamente! :D'
          });

          setNewUsuario({})
          
        }else{
          document.getElementById('btn1').disabled = false;
  
          sweetalert2.fire({
            icon: 'error',
            iconColor: 'red',
            title: 'Ha ocurrido un error al agrgar el usuario',
            text: 'Por favor, intentalo nuevamente',
            color: 'black',
            footer: '<p>Si el problema persiste reporte el error al correo: <a href="mailto:cotiapp.dev@gmail.com">cotiapp.dev@gmail.com</a></p>',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F5305C'
          })
        }
      }
  
      const cancelar = ()=>{
        window.location.href = '/dashboard';
      }


      if(usuario._id === undefined){
        return <Loading/>
      }else{
        return (
          <div className='div-editar-empresa-main'>
            <Titulo>Agregar Usuario en mi empresa</Titulo>
            
            <form onSubmit={submit} className='form-editar-empresa'>
            <br/><br/>
              
  
            <div className='div-input-editar-empresa-doble'>
  
                <div className='div-input-editar-empresa-item'>
                            <Label>Nombre:</Label>
                            <input
                            className='input-editar-empresa-completo'
                            type='text'
                            value={newUsuario.nombre}
                            name='nombre'
                            placeholder='Nombre'
                            required

                            onChange={cambiarValor}
                            />
                        </div>

                        <div className='div-input-editar-empresa-item'>
                            <Label>Apellido:</Label>
                            <input
                            className='input-editar-empresa-completo'
                            type='text'
                            value={newUsuario.apellido}
                            name='apellido'
                            placeholder='Apellido'
                            required

                            onChange={cambiarValor}
                            />
                        </div>

                    </div>
  
              <div className='div-input-editar-empresa-doble'>
  
                <div className='div-input-editar-empresa-item'>
                  <Label>Correo:</Label>
                  <input
                    className='input-editar-empresa-completo'
                    type='email'
                    value={newUsuario.correo}
                    name='correo'
                    placeholder='Correo'
                    required
  
                    onChange={cambiarValor}
                  />
                </div>
  
                <div className='div-input-editar-empresa-item'>
                  <Label>Telefono:</Label>
                  <input
                    className='input-editar-empresa-completo'
                    type='number'
                    value={newUsuario.telefono}
                    name='telefono'
                    minLength='10'
                    placeholder='Telefono'
                    required
  
                    onChange={cambiarValor}
                  />
                </div>
  
            </div>

            <br/>

            <div className='div-checkbox-agregar-usuario'>
                <div className='div-checkbox-item'>
                    <Label>Administrador</Label>
                    <input
                        className='cb'
                        type='checkbox'
                        id='admin'
                    />
                </div>

                <div className='div-checkbox-item'>
                    <Label>Moderador</Label>
                    <input
                        className='cb'
                        type='checkbox'
                        id='moderador'
                    />
                </div>

                <div className='div-checkbox-item'>
                    <Label>Cotizaciones</Label>
                    <input
                        className='cb'
                        type='checkbox'
                        id='cotizaciones'
                    />
                </div>

                <div className='div-checkbox-item'>
                    <Label>Tickets</Label>
                    <input
                        className='cb'
                        type='checkbox'
                        id='tickets'
                    />
                </div>
            </div>

            <div className='div-btns-editar-empresa'>
                <input
                    className='boton1 btn-editar-empresa-cancelar'
                    type='reset'
                    value='Volver'
    
                    onClick={cancelar}
                />
                <button className='boton1' id='btn1'>Guardar Cambios</button>
                </div>
    
                
    
    
            <br/>
            </form>
            <br/>
            <br/>
            <br/>
    
        </div>
        )
    }
}

export default AgregarUsuario