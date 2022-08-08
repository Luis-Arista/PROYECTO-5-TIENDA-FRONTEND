import React , { useContext , useEffect } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import { useNavigate } from 'react-router-dom'
import FormAgregarProductos from '../../Components/FormAgregarproductos/FormAgregarProductos'


const AgregarProductos = () => {

  const navigate = useNavigate()

  const { usuario } = useContext( UserContext )

  useEffect( () => {
      if( usuario === 'ninguno' || usuario.role !== 'Administrador'){
          navigate('/')
      }
  })


  return (
    <main>
        <FormAgregarProductos/>
    </main>
  )
}

export default AgregarProductos