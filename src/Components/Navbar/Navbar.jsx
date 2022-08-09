import React , { useState , useContext } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import './Navbar.css'
import { Link , useNavigate} from 'react-router-dom'
import Buscador from '../Buscador/Buscador'
import Logo from '../../assets/img/Logo.jpeg'


const Navbar = () => {

    let navigate = useNavigate()

    const[ flag , setFlag ] = useState(false)
    const { usuario , setUsuario } = useContext( UserContext )

    const mostrarArticulos = (e , busqueda) => {
        e.preventDefault()
        navigate( '/productos' , { state: busqueda })
    }

  return (
    <header>
        <div className="navbar_contenedor">
            <nav>
                <div className="navbar_header">
                    <div className="navbar_imagen">
                        <img className='Logo' src={Logo} alt="Logo" />
                    </div>
                    <div className="navbar_opciones">
                        <Buscador/>
                        <div className="navbar_session">
                            {
                                usuario === 'ninguno' ?
                                <div>
                                    <Link to='/login'>Iniciar Session</Link> |
                                    <Link to='/registrar'>Registrarse</Link>
                                </div> :
                                <div>
                                    <Link to="/perfil">Perfil</Link> |
                                    <Link to="/Carrito">Carrito</Link>
                                    <Link to="/Favoritos">Favoritos</Link>
                                    <Link to="/"><button onClick={()=>setUsuario('ninguno') }>cerrar session</button></Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="navbar_body">
                    <div className="navbar_menu">
                        <Link onMouseEnter={() => setFlag(false)} className='navbar_menu_option' to='/'>Inicio</Link> 
                        <Link onMouseEnter={() => setFlag(true)} style={ flag ? {color: 'blue'} : {}} className='navbar_menu_option' to='/productos'>Productos <span className='flecha_abajo'>▼</span></Link> 
                    </div>
                    {
                        usuario !== 'ninguno' && usuario.role === 'Administrador' ?
                            <div className="agregar_producto">
                                 <Link to="/agregar/productos"><button>Agregar Producto</button></Link>
                            </div> : ''
                            
                    }
                </div>
                
            </nav>
        </div>
        {
            !flag ?
                '':
                <div className="navbar_footer" onMouseLeave={() => setFlag(false)}>
                    <div className="categorias">
                        <button onClick={(e) => mostrarArticulos(e , {})}>Todos</button>
                        <button onClick={(e) => mostrarArticulos(e , { ofertas: true})}>descuentos</button>
                    </div>
                </div>
        }
    </header>
  )
}

export default Navbar