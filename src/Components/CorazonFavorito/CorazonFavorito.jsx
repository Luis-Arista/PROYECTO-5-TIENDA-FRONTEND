import React , { useContext } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import {BsHeartFill , BsHeart} from 'react-icons/bs'
import './CorazonFavorito.css'

const CorazonFavorito = ( {id} ) => {

    const { usuario } = useContext( UserContext )
 

    let favorito
  
    if( usuario !== 'ninguno'){
       favorito = usuario.favoritos.find( ( favorito , i) => {
           return favorito === id
      })
    }

  
  return (
    <div className='card_botones'>
        <button onClick={() => alert(123)} className='boton_favoritos' >
            {
             usuario !== 'ninguno' ? 
              favorito === id ? <BsHeartFill className='corazon_favoritos_lleno'/> : <BsHeart className='corazon_favoritos_vacio'/> :
              ''
           } 
        </button>
    </div>
  )
}

export default CorazonFavorito