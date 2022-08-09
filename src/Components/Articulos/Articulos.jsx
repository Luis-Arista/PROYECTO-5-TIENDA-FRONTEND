import React , { useState , useEffect} from 'react'
import './Articulos.css'
import axios from 'axios'
import env from 'react-dotenv'
import ArticulosCard from '../ArticulosCard/ArticulosCard'



const Articulos = ( { parametro } ) => {

    const [ articulos , setArticulos ] = useState([])

    const cargar = async () => {
        const url = `${env.URL_API}/articulos/lista`
        const respuesta = await axios.post(url , parametro)
        setArticulos( respuesta.data)
    }

    useEffect( () => {
        cargar()
    },[])
    

  return (
    <section>
        <div className="contenedor_titulo_articulos">
            <h2>Nuestros productos</h2>
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