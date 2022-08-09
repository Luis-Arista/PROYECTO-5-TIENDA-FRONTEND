import React , { useContext , useEffect , useState } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import { useNavigate } from 'react-router-dom'
import './BotonesInfoArticulo.css'
import env from 'react-dotenv'
import axios from 'axios'

const BotonesInfoArticulo = ( { id } ) => {

    let navigate = useNavigate()

    const { usuario } = useContext( UserContext )
    const [ favorito , setFavorito] = useState()
    //let favorito
    const cargar = () => {
           
        setFavorito(
             usuario !== 'ninguno' ?
                usuario.favoritos.find( ( favorito , i) => {
                    return favorito === id
                }):''
                
        )
        
    }

    useEffect( () => {
        cargar()
    },[]) 


   const logeate = (e) => {
        e.preventDefault()
        navigate('/login' , { state: { pagina : `/productos/${id}`}})
    }
 
    const quitarFavorito = ( e ) => {
        e.preventDefault()

        const url = `${env.URL_API}/usuarios/${usuario.id}`

        usuario.favoritos.forEach( ( favorito , i) => {
            if( favorito === id){
               usuario.favoritos.splice( i , 1)
            }
        })
        const favoritos ={
            favoritos: usuario.favoritos
        } 
        console.log(favoritos);

        axios.patch(url , favoritos)
        .then(() => alert('ya esta')) 


    }
 
    const agregarFavoritos = ( e ) => {
        e.preventDefault()

        const url = `${env.URL_API}/usuarios/${usuario.id}`

        usuario.favoritos.push(id)
       
        const favoritos ={
            favoritos: usuario.favoritos
        } 
        console.log(favoritos);

        axios.patch(url , favoritos)
        .then(() => alert('ya esta')) 


    }

  return (
    <div className='informacion_articulos_botones'>
        {
            usuario === 'ninguno' || usuario.role !== 'Administrador' ? 
            '':
            <>
            <div className="informacion_boton_eliminar">
                <button>Eliminar</button>
            </div>
            <div className="informacion_boton_editar">
                <button>Editar</button>
            </div>
            </>
        }
        <div className="informacion_boton_favoritos">
             {
                usuario === 'ninguno' ? <button onClick={ (e) => logeate(e)}>Logeate para agregar a favoritos</button> :
                    favorito === id ? <button onClick={ (e) => quitarFavorito(e)}>Quitar de favorito</button> : 
                    <button onClick={(e) => agregarFavoritos(e)}>Agregar a favoritos</button>
             }
        </div>
        <div className="informacion_boton_comprar">
            <button>Comprar</button>
        </div>
    </div>
  )
}

export default BotonesInfoArticulo