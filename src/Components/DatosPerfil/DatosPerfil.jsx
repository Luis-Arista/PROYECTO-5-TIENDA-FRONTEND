import React from 'react'
import './DatosPerfil.css'
import { Link } from 'react-router-dom'

const DatosPerfil = ( { usuario } ) => {
  
  return (
    <section>
        <div className="contenedor_perfil">
            <div className="info_perfil">
              <div className="nombre_perfil">
                  <h2>{ `${usuario === 'ninguno' ? '' : usuario.nombre.toUpperCase()} ${ usuario === 'ninguno' ? '' : usuario.apellido.toUpperCase() }`}</h2>
              </div>
              <div className="email_perfil">
                  <h3>{ usuario === 'ninguno' ? '' : usuario.email }</h3>
              </div>
            </div>
        </div>
    </section>
  )
}

export default DatosPerfil