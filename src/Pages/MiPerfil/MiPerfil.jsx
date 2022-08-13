import React , { useContext , useEffect } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import { useNavigate } from 'react-router-dom'
import DatosPerfil from '../../Components/DatosPerfil/DatosPerfil'

const MiPerfil = () => {
    const navigate = useNavigate()

    const { usuario , setUsuario } = useContext( UserContext )

    useEffect( () => {
        if( usuario === 'ninguno'){
            navigate('/login' , { state: { pagina : '/perfil' }})
        }
    })

  return (
    <main>
        <DatosPerfil setUsuario={setUsuario} usuario={usuario}/>
    </main>
  )
}

export default MiPerfil