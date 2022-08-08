import React , { useState } from 'react'
import './FormAgregarProductos.css'
import axios from 'axios'
import env from 'react-dotenv'
import { useNavigate } from 'react-router-dom'


const FormAgregarProductos = () => {

  let navigate = useNavigate()

  const [ articulo , setArticulo ] = useState('')
  const [ precio , setPrecio ] = useState('')
  const [ precioConDescuento , setPrecioConDescuento ] = useState(0)
  const [ descripcion , setDescripcion ] = useState('')
  const [ categoria , setCategoria ] = useState('')
  const [ ofertas , setOfertas ] = useState(true)

   const Agregar = async( e ) => {
     e.preventDefault()
    
    let url = `${env.URL_API}/articulos`
    let db = {
        articulo : articulo.toLocaleLowerCase(),
        precio : precio,
        precio_con_descuento : precioConDescuento,
        descripcion,
        categoria : [categoria],
        ofertas

    }
    axios.post( url, db)    

    navigate('/productos')

  }

 
  return (
    <div className="Conteendor_agregar_producto">
        <form action="#">
            <div className="registrar_articulo">
              <input value={articulo} onChange={(e) => setArticulo(e.target.value)} type="text" />
              <label style={ articulo !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Articulo</label>
            </div>
            <div className="registrar_precio">
              <input value={precio} onChange={(e) => setPrecio(e.target.value)} type="number" />
              <label style={ precio !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Precio</label>
            </div>
            <div className="registrar_precio_descuento">
              <input value={precioConDescuento} onChange={(e) => setPrecioConDescuento(e.target.value)} type="number" />
              <label style={ precioConDescuento !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Precio con descuento</label>
            </div>
            <div className='registrar_descripcion'>
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}   cols="30" rows="10"></textarea>
              <label style={ descripcion !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Descripcion</label>
            </div>
            <div className='registrar_Categoria'>
              <input value={categoria} onChange={(e) => setCategoria(e.target.value)} type="text" />
              <label style={ categoria !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Categoria</label>
            </div>
            <div className='registrar_Oferta'>
                <select value={ofertas} onChange={(e) => setOfertas(e.target.value)} >
                    <option value={false}>Articulo sin Descuento</option>
                    <option value= {true} >Articulo con Descuento</option>
                </select>
            </div>
            
            <div className="registrar_boton">
                <button onClick={ (e) => Agregar(e)}>Agregar articulo</button> 
            </div>
        </form>
    </div>
  )
}

export default FormAgregarProductos