import React from 'react'
import Articulos from '../../Components/Articulos/Articulos'
import { useLocation } from 'react-router-dom'

const Productos = () => {

  let parametro = useLocation().state

  return (
    <main>
        <Articulos parametro ={parametro}/>
    </main>
  )
}

export default Productos