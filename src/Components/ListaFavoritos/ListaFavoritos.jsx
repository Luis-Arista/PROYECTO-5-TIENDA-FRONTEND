import React , { useState , useEffect} from 'react'
import './ListaFavoritos.css'
import FavoritosCard from '../FavoritosCard/FavoritosCard'

const ListaFavoritos = ( { usuario } ) => {

    const [ estatus , setEstatus ] = useState('si')

    const cargar = () => {
        if(usuario.favoritos.length === 0){
            setEstatus('no')
        } else {
            setEstatus('si')
        }
    }
   
    useEffect( () => {
        if(usuario !== 'ninguno'){
            cargar()
        }
    })
    

  return (
    <section>
        <div className="lista_favoritos_container">
            {
                usuario === 'ninguno' ? '' : 
                estatus === 'no' ? <h1>No tienes ningun articulo en tus favoritos</h1>:
                usuario.favoritos.map(( articuloFavorito , i ) =>{
                    return(
                        <FavoritosCard key={ i } articuloFavorito = {articuloFavorito} />
                    )
                })
                
            }
        </div>
    </section>
  )
}

export default ListaFavoritos