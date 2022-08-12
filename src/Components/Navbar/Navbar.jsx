import React , { useState , useContext , useEffect } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import { EstadoContext } from '../../Context/Usuario/EstadoContext'
import './Navbar.css'
import { Link , useNavigate} from 'react-router-dom'
import Buscador from '../Buscador/Buscador'
import Logo from '../../assets/img/Logo.jpeg'
import env from 'react-dotenv'
import axios from 'axios'


const Navbar = () => {

    let navigate = useNavigate()

    const[ flag , setFlag ] = useState(false)
    const { usuario , setUsuario } = useContext( UserContext )
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
    },[cargando])

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
                                 <Link to="/agregar/productos">Agregar Producto</Link>
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