import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='enlacesfoot'>
        <ul>
          <li><Link to="/document">Documentos</Link> </li>
          <li><Link to="/nosotros">¿Quienes Somos?</Link> </li>
        </ul>
        <small>©  FillMyDoc</small>
      </div>
    </div>
  )
}
