import React , { useState , useContext } from 'react'
import './FormRegistrar.css'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import env from 'react-dotenv'
import { UserContext } from '../../Context/Usuario/UserContext'

const FormRegistrar = () => {

  let navigate = useNavigate();

  const { setUsuario } = useContext( UserContext )
  const [ nombre , setNombre ] = useState('')
  const [ apellido , setApellido ] = useState('')
  const [ email , setEmail ] = useState('')
  const [ contraseña , setContraseña ] = useState('')
  const [ confirmarContraseña , setConfirmarContraseña ] = useState('')
  const [ coinside , setCoinside ] = useState(true)

  const registrarse = async() => {

    if ( coinside && contraseña !== '' ) {
        let url = `${env.URL_API}/registrar`
        let urlDos = `${env.URL_API}/usuarios/usuario/info`
        let db = {
            nombre : nombre.toLocaleLowerCase(),
            apellido : apellido.toLocaleLowerCase(),
            email : email.toLocaleLowerCase(),
            contraseña

        }
        await axios.post( url , db)
        .then( (res) => {
          return axios.get( urlDos , {
            headers:{
              'autorizacion': `Bearer ${res.data.token}`
            }
          })
          .then( (res) => {
             setUsuario( res.data )
             navigate( '/perfil' )
          })
        })
        .catch( (error) => console.log('el Correo ya esta registrado'))
        
    }else{
        console.log('la contraseña no coinside');
    }

  }

  const validarContraseña = () => {
    if( contraseña !== confirmarContraseña && contraseña !== '' && confirmarContraseña !== '' ){
        setCoinside(false)
    } else {
        setCoinside(true)
    }
  }


  return (
    <div className="Conteendor_formulario_registrar">
        <form action="#">
            <div className="registrar_nombre">
              <input value={nombre} onChange={(e) => setNombre(e.target.value.toLowerCase())} type="text" />
              <label style={ nombre !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Nombre</label>
            </div>
            <div className="registrar_apellido">
              <input value={apellido} onChange={(e) => setApellido(e.target.value.toLowerCase())} type="text" />
              <label style={ apellido !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Apellido</label>
            </div>
            <div className="registrar_email">
              <input value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} type="email" />
              <label style={ email !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Email</label>
            </div>
            <div className='registrar_contraseña'>
              <input onBlur={() => validarContraseña()} value={contraseña} onChange={(e) => setContraseña(e.target.value)} type="password" />
              <label style={ contraseña !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Contraseña</label>
            </div>
            <div className='registrar_confirmar_contraseña'>
              <input onBlur={() => validarContraseña()} value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} type="password" />
              <label style={ confirmarContraseña !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Confirmar contraseña</label>
              {
                !coinside ?
                <div className='mensaje_contraseña'>
                    <p>Las contraseñas no coinsiden</p>
                </div> :
                ''
              }
            </div>
            
            <div className="registrar_boton">
                <Link to="/registrar"><button onClick={() => registrarse()}>Registrarse</button></Link>
            </div>
        </form>
    </div>
  )
}

export default FormRegistrar