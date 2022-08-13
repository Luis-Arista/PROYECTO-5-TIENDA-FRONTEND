import React , { useState , useEffect  } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './InformacionDelArticulo.css'
import BotonesInfoArticulo from '../BototonesInfoArticulo/BotonesInfoArticulo'


const InformacionDelArticulo = () => {
  
    const  {id}  = useParams()

    const [ articulo , setArticulo ] = useState({})
    const [ compra , setCompra ] = useState(false)
    
    const cargar = async() => {
        const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/articulos/${id}`
        const respuesta = await axios.get( url )
        setArticulo( respuesta.data)
    }
    
    useEffect( () => {
        cargar()
    },[])


  return (
    <section>
        {
            compra === false ?
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
                                <p className='informacion_articulo_precio'>${articulo.precio} M.X.</p>
                            </div>:
                            <div className="precio_descuento">
                                <p className='informacion_articulo_precio_anterior' >${articulo.precio} M.X.</p>
                                <p className='informacion_articulo_precio' >${articulo.precio_con_descuento} M.X.</p>
                            </div>
                        }
                    </div>
                    <div className="informacion_articulo_descripcion">
                        <h4>Descripcion:</h4>
                        <p>{articulo.descripcion}</p>
                        <hr />
                    </div>
                </div>
                <div className="botones_infp_articulos">
                    <BotonesInfoArticulo setCompra={setCompra} articulo ={articulo} id = {id} />
                </div>
            </div>:
            <div className="mensaje_compra">
                <h1>Gracias por su compra en un momento mas recibira un correo con detalles de su pedido</h1>
            </div>
        }
    </section>
  )
}

export default InformacionDelArticulo