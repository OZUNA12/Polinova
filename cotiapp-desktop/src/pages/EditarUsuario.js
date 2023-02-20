import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sweetalert2 from 'sweetalert2';
import backend from '../constants';
import Loading from '../components/Loading';
import Titulo from '../components/Titulo';
import Label from '../components/Label';

import '../styles/Toast.css'

const EditarUsuario = () => {

    const [usuario, setUsuario] = useState({});
    const [newUsuario, setNewUsuario] = useState({});
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
        setNewUsuario(data);
      }

      if(usuario._id === undefined){
        getUsuario();
      }
    });

    const cancelar = ()=>{
      window.location.href = '/usuario';
    }

    const submit = async(e)=>{
        e.preventDefault();

        document.getElementById('btn1').disabled = true;

        const password = document.getElementById('password').value;
        const act_pass = document.getElementById('act_pass').value;


        const formData = new FormData();
        formData.append('nombre', newUsuario.nombre);
        formData.append('apellido', newUsuario.apellido);
        formData.append('telefono', newUsuario.telefono);

        if(password !== ''){
          formData.append('password', password);
        }

        const confPass = await axios.post(backend()+'/api/login/'+usuario._id, {password: act_pass})
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
            document.getElementById('btn1').disabled = false;

            return;
          });

        if(confPass.data.password){
          const {data} = await axios.put(backend()+'/api/usuario/'+usuario._id, formData)
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
              document.getElementById('btn1').disabled = false;

              return;
            });
          
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
              document.getElementById('act_pass').value = '';


              Toast.fire({
                icon: 'success',
                title: 'Informacion actualizada!'
              })
            }else{
              document.getElementById('btn1').disabled = false;
      
              sweetalert2.fire({
                icon: 'error',
                iconColor: 'red',
                title: 'Ha ocurrido un error al actualizar el registro',
                text: 'Por favor, intentalo nuevamente',
                color: 'black',
                footer: '<p>Si el problema persiste reporte el error al correo: <a href="mailto:cotiapp.dev@gmail.com">cotiapp.dev@gmail.com</a></p>',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#F5305C'
              })
            }


        }else{
          sweetalert2.fire({
            icon: 'error',
            iconColor: 'red',
            title: 'La contraseña es incorrecta',
            text: 'La contraseña que has introducido es incorrecta, intenta nuevamente',
            color: 'black',
            footer: 'Si olvidaste tu contraseña, comunicate con el administrador de tu empresa para que la reestablezca',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#F5305C'
        });
        document.getElementById('btn1').disabled = false;
      }

    }

    const cambiarValor = (e)=>{
      const {name, value} = e.target;
      setNewUsuario({...newUsuario, [name]: value});
    }
    
    if(usuario._id === undefined){
      return <Loading/>
    }else{
      return (
        <div className='div-editar-empresa-main'>
            <Titulo>Editar mi información</Titulo>

            <form onSubmit={submit} className='form-editar-empresa'>
              <br/>
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
                    placeholder='apellido'
                    required

                    onChange={cambiarValor}
                  />
                </div>
              </div>

              <div className='div-input-editar-empresa-doble'>

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

                <div className='div-input-editar-empresa-item'>
                  <Label>Contraseña:</Label>
                  <input
                    className='input-editar-empresa-completo'
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Cambiar contraseña'
                  />
                </div>

              </div>

              <br/>
              <div className='div-input-editar-empresa-item'>
                  <Label>Contraseña actual:</Label>
                  <input
                    className='input-editar-empresa-completo'
                    type='password'
                    id='act_pass'
                    placeholder='Contraseña actual'

                    required
                  />
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
        </div>
      )
    }
}

export default EditarUsuario