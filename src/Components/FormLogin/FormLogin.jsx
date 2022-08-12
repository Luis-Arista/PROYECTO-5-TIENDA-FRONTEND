import React , { useState , useContext } from 'react'
import './FormLogin.css'
import { Link , useNavigate , useLocation } from 'react-router-dom'
import axios from 'axios'
import env from 'react-dotenv'
import { UserContext } from '../../Context/Usuario/UserContext'

const FormLogin = () => {

  let navigate = useNavigate();
  let location = useLocation()

  const { setUsuario } = useContext( UserContext )
  const [ email , setEmail ] = useState('')
  const [ contraseña , setContraseña ] = useState('')

  const logearse = async() => {
    let url = `https://proyecto-5-tienda.herokuapp.com/api/v1/login`
    
    let urlDos = `https://proyecto-5-tienda.herokuapp.com/api/v1/usuarios/usuario/info`
    const db = {
      email,
      contraseña
    }

    await axios.post( url , db)
    .then( (res) =>{
       return axios.get( urlDos , {
         headers:{
           'autorizacion': `Bearer ${res.data.token}`
         }
       })
       .then( (res) => {
          setUsuario( res.data )
          navigate( !location.state ? '/' : `${location.state.pagina}` , {replace: true } )
       })
    })
    .catch( (error) => {
      console.log(error.response.data.mensaje);
    })
  }

  return (
    <div className="Conteendor_formulario_login">
        <form action="#">
            <div className="login_email">
              <input value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} type="email" />
              <label style={ email !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Email</label>
            </div>
            <div className='login_contraseña'>
              <input value={contraseña} onChange={(e) => setContraseña(e.target.value)} type="password" />
              <label style={ contraseña !== '' ? { top:'-10px', padding: '1px', fontSize: '12px', fontWeight: 'bolder' , backgroundColor: '#fff' , transition :'all, 0.2s' } : {transition :'all, 0.2s'}} >Contraseña</label>
            </div>
            <div className="login_boton">
                <Link to="/login"><button onClick={() => logearse()}>ingresar</button></Link>
                <Link to="/registrar"><button>Registrarse</button></Link>
            </div>
        </form>
    </div>
  )
}

export default FormLogin