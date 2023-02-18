import React from 'react';
import '../styles/Botones.css';

const Boton1 = ({children, onClick}) => {
  return (
    <button
        className='boton1'
        onClick={onclick}
    >   {children}   </button>
  )
}

export default Boton1