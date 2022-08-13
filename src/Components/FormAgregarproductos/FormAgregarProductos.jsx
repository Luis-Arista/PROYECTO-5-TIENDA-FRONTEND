import React , { useState , useEffect , useContext } from 'react'
import { EstadoContext } from '../../Context/Usuario/EstadoContext'
import './FormAgregarProductos.css'
import axios from 'axios'
import { useNavigate , useParams } from 'react-router-dom'


const FormAgregarProductos = () => {

  let navigate = useNavigate()
  let {id} = useParams()

  const { setCargando } = useContext( EstadoContext )


  const [ listaCategoria , setListaCategoria ] = useState([])
  const [ estatusNuevaCategoria , setEstatusNuevaCategoria] = useState(false)
  const [ nuevaCategoria , setNuevaCategoria] = useState('')
  const[ articuloAEditar , setArticuloAEditar] = useState()
  const[ flag , setFlag ] = useState(false)
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

    if(id){
      const url = `https://proyecto-5-tienda.herokuapp.com/api/v1/articulos/lista`
      const respuesta = await axios.post(url , {_id: id})
      const data = respuesta.data
      setArticuloAEditar(data[0])
      setFlag(true)

    }

  }

  const extablecerCampos = () => {
      setArticulo(articuloAEditar.articulo)
      setPrecio(articuloAEditar.precio)
      setPrecioConDescuento(articuloAEditar.precio_con_descuento)
      setDescripcion(articuloAEditar.descripcion)
      setOfertas(articuloAEditar.ofertas)
      setCategoria(articuloAEditar.categorias)
      setImagen(articuloAEditar.imagen)
  }

  useEffect(() => {
    cargar()
    if(flag){
      extablecerCampos()
    }
            // eslint-disable-next-line react-hooks/exhaustive-deps
  },[flag])

   const Agregar = async( e ) => {
     e.preventDefault()
    
      let url = `https://proyecto-5-tienda.herokuapp.com/api/v1/articulos`
      let db = {
          imagen:imagen,
          articulo : articulo.toLocaleLowerCase(),
          precio : precio,
          precio_con_descuento : precioConDescuento,
          descripcion,
          categorias : categoria,
          ofertas

      }
      await axios.post( url, db )
      .then(() =>{
        navigate('/productos')
      })

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

  const limpiarImagen = (e) => {
      e.preventDefault()
      setImagen('')
  }

  
  const Editar = async(e) => {
    e.preventDefault()
    let url = `https://proyecto-5-tienda.herokuapp.com/api/v1/articulos/${id}`
    let db = {
        imagen:imagen,
        articulo : articulo.toLocaleLowerCase(),
        precio : precio,
        precio_con_descuento : precioConDescuento,
        descripcion,
        categorias : categoria,
        ofertas

    }
    await axios.put( url, db )
    .then(() =>{
      setFlag(false)
      navigate('/productos')
    })
  }


  //aqui empezamos

  return (
    <div className="Conteendor_agregar_producto">
        <form  onSubmit={ flag === false ? Agregar : Editar} encType='multipart/form-data'>
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
                    <div className="imagen_subir_archivo">
                      <input value={imagen} onChange={(e) => setImagen(e.target.value)} type="text" />
                      <button onClick={(e) => limpiarImagen(e)}>Limpiar</button>
                      <label style={ imagen !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >URL de la imagen</label>
                    </div>
                    <div className="imagen">
                      <img src={imagen} alt="foto" />
                    </div>
                </div> 
                <div className="registrar_boton">
                   <input type="submit" />
                </div>
              </>
            }
        </form>
    </div>
  )
}

export default FormAgregarProductos