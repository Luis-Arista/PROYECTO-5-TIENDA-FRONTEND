import React , { useState , useEffect} from 'react'
import './Articulos.css'
import axios from 'axios'
import env from 'react-dotenv'
import ArticulosCard from '../ArticulosCard/ArticulosCard'
import {BsArrowLeftShort , BsArrowRightShort} from 'react-icons/bs'



const Articulos = () => {

    const [ articulos , setArticulos ] = useState([])

    const cargar = async () => {
        const url = `${env.URL_API}/lista/articulos`
        const respuesta = await axios.get(url)
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