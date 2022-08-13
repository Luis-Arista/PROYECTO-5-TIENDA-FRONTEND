import React from 'react'
import './DatosPerfil.css'
import { Link } from 'react-router-dom'

const DatosPerfil = ( { setUsuario , usuario } ) => {
  
  return (
    <section>
        <div className="contenedor_perfil">
            <div className="info_perfil">
              <div className="imagen_perfil">
                <img src="https://assets.stickpng.com/thumbs/585e4bf3cb11b227491c339a.png" alt="" />
              </div>
              <div className="nombre_perfil">
                  <h3>Nombre del usuario:</h3>
                  <p>{ `${usuario === 'ninguno' ? '' : usuario.nombre.toUpperCase()} ${ usuario === 'ninguno' ? '' : usuario.apellido.toUpperCase() }`}</p>
              </div>
              <div className="email_perfil">
                  <h3>Email:</h3>
                  <p>{ usuario === 'ninguno' ? '' : usuario.email }</p>
              </div>
              <div className="cerrar_session_perfil">
                <Link to="/"><button onClick={()=>setUsuario('ninguno') }>cerrar sesión</button></Link>
              </div>
            </div>
        </div>
    </section>
  )
}

export default DatosPerfil