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
    </LoadingOverlay>
}

export default Loading