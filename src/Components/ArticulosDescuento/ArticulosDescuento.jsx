import React , { useState , useEffect } from 'react'
import './ArticulosDescuento.css'
import axios from 'axios'
import env from 'react-dotenv'
import ArticulosCard from '../ArticulosCard/ArticulosCard'
import { Link } from 'react-router-dom'

const ArticulosDescuento = () => {

    const [ articulos , setArticulos ] = useState([])
    


    const cargar = async () => {
        const url = `${env.URL_API}/lista/descuentos`
        const respuesta = await axios.get( url )
        if( respuesta.data.length === 0) {
            setArticulos( 'ninguno' )  
        }  else {
            setArticulos( respuesta.data )  
        } 
    } 

    useEffect( () => {
        cargar()
    },[])

  return (
    <section>
        <div className="contenedor_titulo">
            <h2>Articulos con descuento</h2>
        </div>
        <div className="contenedor_articulos_descuento">
           <div className="lista_articulos_descuentos">
                {
                    articulos === 'ninguno' ? 
                    <h1>No hay articulos con descuento por le momento</h1>: 
                    
                        articulos.map( (articulo , i) => {
                            return(
                                <ArticulosCard key={i} articulo = { articulo } />
                            )
                        })
                    
                }
           </div>
        </div>
    </section>
  )
}

export default ArticulosDescuento