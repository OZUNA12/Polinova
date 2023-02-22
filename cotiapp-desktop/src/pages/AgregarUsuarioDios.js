import axios from 'axios';
import React, { useEffect, useState } from 'react'
import backend from '../constants';
import sweetalert2 from 'sweetalert2';
import Label from '../components/Label';
import Titulo from '../components/Titulo';
import Loading from '../components/Loading';

import '../styles/AgregarUsuario.css';

const AgregarUsuarioDios = () => {
  

    const [newUsuario, setNewUsuario] = useState({});
    const [usuario, setUsuario] = useState({});
    const [empresas, setEmpresas] = useState([]);
    const [valorEmpresa, setValorEmpresa] = useState('');

    useEffect(()=>{
        const getEmpresas = async()=>{
            const {data} = await axios.get(backend()+'/api/empresa')
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
            setEmpresas(data)
            setValorEmpresa(data[0]._id)

        }

        if(empresas.length === 0){
            getEmpresas();
        }
    })
    
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
  
  
    const cambiarValor = (e)=>{
    const {name, value} = e.target;
        setNewUsuario({...newUsuario, [name]: value});
    }
  
    const submit = async(e)=>{
        e.preventDefault();

        document.getElementById('btn1').disabled = true;

        var dios = document.getElementById('dios').checked;
        var admin = document.getElementById('admin').checked;
        var moderador = document.getElementById('moderador').checked;
        var cotizaciones = document.getElementById('cotizaciones').checked;
        var tickets = document.getElementById('tickets').checked;

  
        const formData = new FormData();
        formData.append('nombre', newUsuario.nombre);
        formData.append('apellido', newUsuario.apellido);
        formData.append('id_empresa', valorEmpresa);
        formData.append('correo', newUsuario.correo);
        formData.append('telefono', newUsuario.telefono);
        formData.append('password', newUsuario.telefono);
        formData.append('dios', dios);
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

          document.getElementById('select').selectedIndex = 0;
          document.getElementById('dios').checked=false;
          document.getElementById('admin').checked=false;
          document.getElementById('moderador').checked=false;
          document.getElementById('cotizaciones').checked=false;
          document.getElementById('tickets').checked=false;

          Toast.fire({
            icon: 'success',
            title: 'Usuario agregado exitosamente! :D'
          });

          
          
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

      const cambiarEmpresa = (e)=>{
        const index = e.target.selectedIndex;

        setValorEmpresa(empresas[index]._id);
      }


      if(usuario._id === undefined){
        return <Loading/>
      }else{
        return (
          <div className='div-editar-empresa-main'>
            <Titulo>Agregar Usuario</Titulo>
            
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
                
                <div className='div-input-editar-empresa'>
                    <Label>Selecciona la empresa:</Label>
                    <select className='select-agregar-usuario' id='select' onChange={cambiarEmpresa}>
                        {
                            empresas.map((e)=>{
                                return <option className='option-agregar-usuario'>{e.nombre}</option>
                            })
                        }
                    </select>
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
                    <Label>Desarrollador</Label>
                    <input
                        className='cb'
                        type='checkbox'
                        id='dios'
                    />
                </div>

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

export default AgregarUsuarioDios