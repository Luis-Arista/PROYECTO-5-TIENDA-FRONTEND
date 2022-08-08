import React , { useState , useContext , useEffect } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import './ListaFavoritos.css'
import env from 'react-dotenv'
import axios from 'axios'
import FavoritosCard from '../FavoritosCard/FavoritosCard'

const ListaFavoritos = () => {

    const { usuario } = useContext(UserContext)
    const [ favoritos , setFavoritos ] = useState(usuario.favoritos)
    const [ lista , setLista] = useState([])
   
   
 //aun no funciona bien
 const cargar = async() => {
    const url = `${env.URL_API}/favoritos`
    let arr = []
    favoritos.forEach( async(favorito , i) => {
        await axios.post( url , { id: favorito})
        .then( (res) => {
            arr.push( res.data )
            setLista(arr)
        })
    })  
    
 }

 useEffect( () => {
    if( usuario !== 'ninguno'){
        cargar()
    }
 }, [favoritos])
    

  return (
    <section>
        <div className="lista_favoritos_container">
            {
                lista.map(( articulo , i ) =>{
                    return(
                         <FavoritosCard key={ i } articulo = {articulo} />
                    )
                })
            }
        </div>
    </section>
  )
}

export default ListaFavoritos