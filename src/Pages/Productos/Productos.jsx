import React from 'react'
import Articulos from '../../Components/Articulos/Articulos'
import { useLocation } from 'react-router-dom'

const Productos = () => {

  let parametro = useLocation().state
  
  if ( parametro === null){
    parametro = {busqueda: {} , titulo: 'Nuestros productos'}
  }

  return (
    <main>
        <Articulos parametro ={parametro}/>
    </main>
  )
}

export default Productos