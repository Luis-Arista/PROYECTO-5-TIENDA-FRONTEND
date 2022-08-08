import React , { useState } from 'react'
import './Buscador.css'
import { BsSearch } from "react-icons/bs";
import { BsFillXCircleFill } from "react-icons/bs";


const Buscador = () => {

    const [ buscador , setBuscador ] = useState('')
    
  return (
    <div className="navbar_buscador">
        <label><BsSearch className='lupa'/></label>
        <input value={buscador} onChange={(e) => setBuscador(e.target.value)} type="text" placeholder='Busca tu producto' />
        {
            buscador ? 
            <button onClick={() => setBuscador('')} className='limpiar_buscador'><BsFillXCircleFill className='limpiar'/></button> 
            : ''
        }
    </div>
  )
}

export default Buscador