import React from 'react'
import './FavoritosCard.css'
import { useNavigate } from 'react-router-dom'
import CorazonFavorito from '../CorazonFavorito/CorazonFavorito'


const FavoritosCard = ( { articuloFavorito } ) => {
  let navigate = useNavigate()

  const manejarClick = () => {
    navigate(`/productos/${articuloFavorito._id}`)
  }
 
  const prueba = () => {
    navigate('/favoritos')
  }

  return (
    <div className="favoritos_card">
        <div onClick={(e) => manejarClick()} className="favoritos_img">
            <img src={articuloFavorito.imagen} alt="" />
        </div>
          <div onClick={() => prueba()} className="boton_favoritos">
              <CorazonFavorito pagina={'favoritosCard'} articulo={articuloFavorito} id ={articuloFavorito._id} /> 
          </div>      
        <div onClick={(e) => manejarClick()} className="favoritos_info">
            <div className="favoritos_header">
                {
                  articuloFavorito.ofertas === true ? 
                  <p className='mensaje_oferta_favoritos'> Articulo con descuento </p> : 
                  <br />
                }
                <h4>{articuloFavorito.articulo}</h4>
            </div>
            <div className="card_precios_favoritos">
              {
                articuloFavorito.ofertas === true ? 
                <div className='precios_promocion_favoritos'>
                    <p className='precio_viejo_favoritos' >${articuloFavorito.precio}. M.X.</p>
                    <p className='precio_favoritos' >${articuloFavorito.precio_con_descuento}. M.X.</p>
                </div> :
                <p className='precio_favoritos' >${articuloFavorito.precio}. M.X.</p>
              }
            </div>
        </div>
    </div>
  )
}

export default FavoritosCard