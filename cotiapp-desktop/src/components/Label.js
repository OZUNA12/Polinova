import React from 'react';
import '../styles/Label.css'

const Label = ({children, htmlFor}) => {
  return <label
    className='label'
    htmlFor={htmlFor}
  >{children}</label>
}

export default Label