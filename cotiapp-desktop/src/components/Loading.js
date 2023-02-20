import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

import '../styles/Loading.css'


const Loading = () => {
  return <LoadingOverlay
    className='loading'
    active={true}
    spinner
    text='Cargando contenido...'
    >
      <p className='p-loading-info'>Si el contenido no carga, intente recargar la pestaña</p>
    </LoadingOverlay>
}

export default Loading