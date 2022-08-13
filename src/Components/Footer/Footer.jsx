import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { BsInstagram , BsFacebook , BsWhatsapp } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer>
        <div className="contenedor_footer">
            <div className="footer_header">
              <div className="redes_sociales">
                <a href="/#"><BsInstagram className='icono_social'/></a>
                <a href="/#"><BsFacebook className='icono_social'/></a>
                <a href="/#"><BsWhatsapp className='icono_social'/></a>
              </div>
            </div>
            <div className="footer_body">
                <Link className='menu_footer' to="/">Inicio</Link> |
                <Link className='menu_footer' to="/productos">productos</Link>  
            </div>
            <div className="footer_footer">
               <p> Stuffy's 2022 Derechos reservados</p>
            </div>
        </div>
    </footer> 
  )
}

export default Footer