import React , { useState , useEffect  } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import env from 'react-dotenv'
import './InformacionDelArticulo.css'
import BotonesInfoArticulo from '../BototonesInfoArticulo/BotonesInfoArticulo'


const InformacionDelArticulo = () => {
    const  {id}  = useParams()



    const [ articulo , setArticulo ] = useState({})
    const cargar = async() => {
        let url = `${env.URL_API}/articulos/${id}`
        const respuesta = await axios.get( url )
        setArticulo( respuesta.data)
        
    }
    
    useEffect( () => {
        cargar()
    },[])


  return (
    <section>
        <div className="informacion_articulo_contenedor">
            <div className="informacion_articulo_articulo">
                <div className="informacion_articulo_imagen">
                    <img src={articulo.imagen} alt="foto_articulo" />
                </div>
                <div className="informacion_articulo_titulo">
                    {
                        articulo.ofertas === true ? 
                        <p className='informacion_articulo_mensaje_oferta'> Articulo con descuento </p> : ''
                    }
                    <h2>{articulo.articulo}</h2>
                </div>
                <div className="informacion_articulo_precio">
                    {
                        articulo.ofertas === false ?
                        <div className="precio">
                            <p className='informacion_articulo_precio'>{articulo.precio}</p>
                        </div>:
                        <div className="precio_descuento">
                            <p className='informacion_articulo_precio_anterior' >{articulo.precio} M.X.</p>
                            <p className='informacion_articulo_precio' >{articulo.precio_con_descuento} M.X.</p>
                        </div>
                    }
                </div>
                <div className="informacion_articulo_descripcion">
                    <p>{articulo.descripcion}</p>
                </div>
            </div>
            <BotonesInfoArticulo id = {id} />
        </div>
    </section>
  )
}

export default InformacionDelArticulo