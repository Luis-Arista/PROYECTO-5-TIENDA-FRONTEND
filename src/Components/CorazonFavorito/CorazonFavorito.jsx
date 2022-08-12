import React , { useContext , useState , useEffect } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import {BsHeartFill , BsHeart} from 'react-icons/bs'
import './CorazonFavorito.css'
import axios from 'axios'

const CorazonFavorito = ( { pagina , articulo , id} ) => {

    const { usuario } = useContext( UserContext )
    const  [estatus , setEstatus]  = useState()

    const cargar = () => {
      if( usuario === 'ninguno'){
        setEstatus('sin usuario')
      }else {
        let ArticuloFavorito = usuario.favoritos.find( ( favorito ) => {
          return favorito._id === id
        })       
        if(!ArticuloFavorito){
          setEstatus('no')
        }else {
          setEstatus('si')
        }
      }
    }

   useEffect( () => {
    cargar()
   },[id])

 

   const agregarFav = () => {
      const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/usuarios/${usuario.id}`
      usuario.favoritos.push(articulo)
      const favoritos ={
        favoritos: usuario.favoritos
      }
       axios.patch(url , favoritos)
      setEstatus('si')
    }

    const quitarFav = () => {
      const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/usuarios/${usuario.id}`
      usuario.favoritos.forEach( ( favorito , i) => {
        if( favorito._id === id){
        usuario.favoritos.splice( i , 1)
        }
      })
      const favoritos = {
          favoritos: usuario.favoritos
      } 
      axios.patch(url , favoritos)

      if(pagina === 'favoritosCard'){
        setEstatus('si')
      }else{
        setEstatus('no')
      }
    }
  
  return (
    <div className='card_botones'>
        <button  className='boton_favoritos' >
            {
             estatus !== 'sin usuario' ? 
                estatus === 'si' ? <BsHeartFill onClick={() => quitarFav()} className='corazon_favoritos_lleno'/> 
                : <BsHeart onClick={() => agregarFav()}  className='corazon_favoritos_vacio'/>
              :
              ''
           } 
        </button>
    </div>
  )
}

export default CorazonFavorito