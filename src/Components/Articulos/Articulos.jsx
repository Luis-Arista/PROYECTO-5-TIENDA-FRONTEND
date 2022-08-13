import React , { useState , useEffect} from 'react'
import './Articulos.css'
import axios from 'axios'
import ArticulosCard from '../ArticulosCard/ArticulosCard'



const Articulos = ( { parametro } ) => {

    const [ articulos , setArticulos ] = useState([])

    const cargar = async () => {
        const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/articulos/lista`
        const respuesta = await axios.post(url , parametro.busqueda)
        setArticulos( respuesta.data)
    }

    useEffect( () => {
        cargar()
    },[parametro.busqueda])
    

  return (
    <section>
        <div className="contenedor_titulo_articulos">
            <h2>{parametro.titulo}</h2>
        </div>
        <div className="contenedor_articulos">
            <div className="lista_articulos">
                {
                    articulos.map( (articulo , i) => {
                        return(
                            <ArticulosCard key={i} articulo = {articulo} />
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default Articulos