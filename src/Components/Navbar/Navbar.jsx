import React , { useState , useContext , useEffect } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import { EstadoContext } from '../../Context/Usuario/EstadoContext'
import './Navbar.css'
import { Link , useNavigate} from 'react-router-dom'
import Logo from '../../assets/img/Logo.jpeg'
import axios from 'axios'
import { BsPersonCircle , BsHeartFill } from "react-icons/bs";


const Navbar = () => {
 
    let navigate = useNavigate()

    const[ flag , setFlag ] = useState(false)
    const { usuario } = useContext( UserContext )
    const { cargando , setCargando } = useContext( EstadoContext )
    const [ categorias , setCategorias ] = useState([])

    const cargar = async() => {
        const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/categoria/buscar`
        const respuesta = await axios.post( url , {})
        setCategorias(respuesta.data)
    }

    useEffect( () => {
        cargar()
        setCargando(false)
    },[cargando , setCargando])

    const mostrarArticulos = (e , busqueda) => {
        e.preventDefault()

        let titulo 

        if ( busqueda.ofertas ) {
            titulo = 'Productos con Descuentos'
        } else if (busqueda.categorias) {
            titulo = busqueda.categorias
        } else {
            titulo = 'Nuestros productos'
        }


        navigate( '/productos' , { state: {busqueda , titulo} })
        setFlag(false)
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
                        <div className="navbar_session">
                            {
                                usuario === 'ninguno' ?
                                <div>
                                    <Link className='menu_ususario_boton' to='/login'>Iniciar sesión</Link>
                                    <Link className='menu_ususario_boton' to='/registrar'>Registrarse</Link>
                                </div> :
                                <div>
                                    <Link to="/perfil"><BsPersonCircle  className='menu_ususario menu_usuario_perfil'/></Link>
                                    <Link to="/Favoritos"><BsHeartFill className='menu_ususario menu_usuario_corazon'/></Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="navbar_body">
                    <div className="navbar_menu">
                        <Link onMouseEnter={() => setFlag(false)} className='navbar_menu_option' to='/'>Inicio</Link> 
                        <Link onClick={() => setFlag(false)} onMouseEnter={() => setFlag(true)} style={ flag ? {color: 'blue'} : {}} className='navbar_menu_option' to='/productos'>Productos <span className='flecha_abajo'>▼</span></Link> 
                    </div>
                    {
                        usuario !== 'ninguno' && usuario.role === 'Administrador' ?
                            <div>
                                 <Link  className="agregar_producto" to="/agregar/productos">Agregar Producto</Link>
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
                        {
                            categorias.map((categoria , i) => {
                                return(
                                    <button key={i} onClick={(e) => mostrarArticulos(e , { categorias: categoria.categoria })}>{categoria.categoria}</button>
                                )
                            })
                        }
                    </div>
                </div>
        }
    </header>
  )
}

export default Navbar