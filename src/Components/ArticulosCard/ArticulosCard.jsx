import React from 'react'
import './ArticulosCard.css'
import { useNavigate  } from 'react-router-dom'
import CorazonFavorito from '../CorazonFavorito/CorazonFavorito'

const ArticulosCard = ( { articulo } ) => {

  const navigate = useNavigate()



  const informacionArticulos = () => {
    navigate(`${articulo._id}`)
  }

  return (
    <div className="card">
      <div onClick={() => informacionArticulos()} className='contenedor_card'>
        <div className="card_imagen">
          <img src={articulo.imagen} alt="" />
        </div>
        <div className="card_titulo">
            {
              articulo.ofertas === true ? 
              <p className='mensaje_oferta'> Articulo con descuento </p> : ''
            }
            <h4>{articulo.articulo}</h4>
        </div>
        <div className="card_precios">
            {
              articulo.ofertas === true ? 
              <div className='precios_promocion'>
                  <p className='precio' >${articulo.precio_con_descuento}. M.X.</p>
                  <p className='precio_viejo' >${articulo.precio}. M.X.</p>
              </div> :
              <p className='precio' >${articulo.precio}. M.X.</p>
            }
        </div>
      </div>
      <div className="boton_favoritos_productos">
        <CorazonFavorito articulo={articulo} id ={articulo._id} />
      </div>
    </div>
  )
}

export default ArticulosCard