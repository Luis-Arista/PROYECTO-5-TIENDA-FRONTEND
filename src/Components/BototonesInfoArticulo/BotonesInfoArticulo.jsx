import React , { useContext , useEffect , useState } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import { useNavigate , Link } from 'react-router-dom'
import './BotonesInfoArticulo.css'
import CheckoutPage from '../CheckoutPages/CheckoutPages'
import axios from 'axios'

const BotonesInfoArticulo = ( { setCompra, articulo , id } ) => {

    let navigate = useNavigate()

    const { usuario } = useContext( UserContext )
    const [ estatus , setEstatus ] = useState('')

    
    const cargar = () => {
       if ( usuario === 'ninguno'){
        setEstatus( 'logeate para comprar' )
       } else {
            const idFavorito = usuario.favoritos.find( ( favorito ) => {
                return favorito._id === id
            })
            if( !idFavorito) {
                setEstatus('Agregar a favoritos')
            } else {
                setEstatus('Quitar de favoritos')
            }
       }
    }

    useEffect( () => {
        cargar()
    },[]) 


    const manejarClick = (e) => {
        e.preventDefault()
        if ( estatus === 'logeate para comprar') {
            navigate('/login' , { state: { pagina : `/productos/${id}`}})
        }else {
            const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/usuarios/${usuario.id}`
            if( estatus === 'Quitar de favoritos'){
                usuario.favoritos.forEach( ( favorito , i) => {
                    if( favorito._id === id){
                    usuario.favoritos.splice( i , 1)
                    }
                })
                const favoritos = {
                    favoritos: usuario.favoritos
                } 
                axios.patch(url , favoritos)
                setEstatus('Agregar a favoritos')
            } else if( estatus === 'Agregar a favoritos' ) {
                usuario.favoritos.push(articulo)       
                const favoritos ={
                    favoritos: usuario.favoritos
                } 
                axios.patch(url , favoritos)
                setEstatus('Quitar de favoritos')
            }
        } 
    }

    const eliminarArticulo = async () => {
        const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/articulos/${id}`
        await axios.delete( url )
        navigate('/productos')
    }

    


  return (
    <div className='informacion_articulos_botones'>
        {
            usuario === 'ninguno' || usuario.role !== 'Administrador' ? 
            '':
            <>
            <div className="informacion_boton_eliminar">
                <button onClick={(e) => eliminarArticulo(e)}>Eliminar</button>
            </div>
            <div className="informacion_boton_editar">
                <Link className='boton_editar' to={`/agregar/productos/${id}`}>Editar</Link>
            </div>
            </>
        }
        <div className="informacion_boton_favoritos">
                <button onClick={(e) => manejarClick(e)}>{estatus}</button>
        </div>
        {
            usuario === 'ninguno' ? '' : 
            <div className="informacion_boton_comprar">
                <CheckoutPage setCompra={setCompra} amount={ articulo.ofertas === true ? articulo.precio_con_descuento : articulo.precio} />
            </div>
        }
    </div>
  )
}

export default BotonesInfoArticulo