import React from 'react'
import './FavoritosCard.css'
import {BsHeartFill} from 'react-icons/bs'


const FavoritosCard = ( { articulo } ) => {
  return (
    <div className="favoritos_card">
        <div className="favoritos_img"></div>
        <div className="favoritos_info">
            <div className="favoritos_header">
                {
                  articulo.ofertas === true ? 
                  <p className='mensaje_oferta_favoritos'> Articulo con descuento </p> : ''
                }
                <h4>{articulo.articulo}</h4>
            </div>
            <div className="card_precios_favoritos">
              {
                articulo.ofertas === true ? 
                <div className='precios_promocion_favoritos'>
                    <p className='precio_viejo_favoritos' >${articulo.precio}. M.X.</p>
                    <p className='precio_favoritos' >${articulo.precio_con_descuento}. M.X.</p>
                </div> :
                <p className='precio_favoritos' >${articulo.precio}. M.X.</p>
              }
            </div>
            <div className="card_botones_favoritos">
              <button onClick={() => alert(123)} className='boton_favoritos_favoritos' ><BsHeartFill className='corazon_favoritos_activo'/></button>
            </div>
        </div>
    </div>
  )
}

export default FavoritosCard