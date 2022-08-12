import React , { useState , useEffect , useContext } from 'react'
import { EstadoContext } from '../../Context/Usuario/EstadoContext'
import './FormAgregarProductos.css'
import axios from 'axios'
import env from 'react-dotenv'
import { useNavigate } from 'react-router-dom'


const FormAgregarProductos = () => {

  let navigate = useNavigate()

  const { setCargando } = useContext( EstadoContext )


  const [ listaCategoria , setListaCategoria ] = useState([])
  const [ estatusNuevaCategoria , setEstatusNuevaCategoria] = useState(false)
  const [ nuevaCategoria , setNuevaCategoria] = useState('')

  const [ articulo , setArticulo ] = useState('')
  const [ precio , setPrecio ] = useState('')
  const [ precioConDescuento , setPrecioConDescuento ] = useState(0)
  const [ descripcion , setDescripcion ] = useState('')
  const [ categoria , setCategoria ] = useState('')
  const [ ofertas , setOfertas ] = useState(false)

  const [ imagen , setImagen] = useState('')

  const cargar = async() => {
    const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/categoria/buscar`
    const respuesta = await axios.post( url , {})
    setListaCategoria(respuesta.data)
  }

  useEffect(() => {
    cargar()
  },[])

   const Agregar = async( e ) => {
     e.preventDefault()
    
    let url = `https://proyecto-5-tienda.herokuapp.com/api/v1/articulos`
    let db = {
        articulo : articulo.toLocaleLowerCase(),
        precio : precio,
        precio_con_descuento : precioConDescuento,
        descripcion,
        categorias : categoria,
        ofertas

    }
    await axios.post( url, db)
    .then((res) =>{
      navigate('/productos')
    })
    .catch((err) => alert('Hubo un error al cargar la imagen intenta con otra'))

  }

  const clickNuevaCategoria = (e) => {
    e.preventDefault()
    if( !estatusNuevaCategoria){
      setEstatusNuevaCategoria(true)
    } else{
      setEstatusNuevaCategoria(false)
    }
  }
 

  const agregarCategoria = async(e) => {
    e.preventDefault()
    const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/categoria`
    await axios.post(url , { categoria:nuevaCategoria } )
    setEstatusNuevaCategoria(false)
    setCategoria(nuevaCategoria)
    cargar()
    setCargando(true)
  }

  const agregarImagenes = (e) => {
    setImagen(e.target.files[0])
    console.log(imagen);
  }

/*   const agregarImagen = (e) => {
    let File = e.target.files[0]
    const tamañoMB = File.size < 50 * 1024 *1024
    if( tamañoMB ){
      const reader = new FileReader()
      reader.readAsDataURL(File)
      reader.onloadend = () => {
      setImagen(reader.result)
      }
    }else{
      alert('La imagen es muy grande intente con otra')

    }
    
  } */

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
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}  >
                <option value="">-Selecciona una categoria-</option>
                {
                  listaCategoria.map((categoria, i) => {
                    return(
                      <option key={i} value={categoria.categoria} >{categoria.categoria}</option>
                    )
                  })
                }
              </select>
              <button onClick={(e) => clickNuevaCategoria(e) } >{ estatusNuevaCategoria ? 'Cerrar' : 'Nueva categoria'}</button>
            </div>
            {
                estatusNuevaCategoria === false ? '' :
                <div className="agregar_categoria_nueva">
                    <input value={nuevaCategoria} onChange={(e) => setNuevaCategoria(e.target.value)} type="text" />
                    <label style={ nuevaCategoria !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Nueva categoria</label>
                    <button onClick={(e) => agregarCategoria(e)} >Agregar Categoria</button>
                </div>
            }
            {
              estatusNuevaCategoria === true ? '' :
              <>
                <div className='registrar_Oferta'>
                    <select value={ofertas} onChange={(e) => setOfertas(e.target.value)} >
                        <option value={false}>Articulo sin descuento</option>
                        <option value={true}>Articulo con descuento</option>
                    </select>
                </div>
                 <div className="registrar_imagen">
                  <div className="registrar_imagen_titulo">
                    <p>subir foto del Articulo</p>
                  </div>
                  <div className="registrar_imagen_body">
                    <div className="imagen">
                      <img src='' alt="foto" />
                    </div>
                    <div className="imagen_subir_archivo">
                      <input type="file" onChange={(e) => agregarImagenes(e)} accept="image/png , image/jpeg , image/jpg "  />
                    </div>
                  </div>
                </div> 
                <div className="registrar_boton">
                    <button onClick={ (e) => Agregar(e)}>Agregar articulo</button> 
                </div>
              </>
            }
        </form>
    </div>
  )
}

export default FormAgregarProductos