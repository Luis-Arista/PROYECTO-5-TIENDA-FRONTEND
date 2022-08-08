import React , { useContext , useEffect } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import ListaFavoritos from '../../Components/ListaFavoritos/ListaFavoritos'
import { useNavigate } from 'react-router-dom'

const Favoritos = () => {

  const navigate = useNavigate()

  const { usuario } = useContext( UserContext )

  useEffect( () => {
      if( usuario === 'ninguno'){
          navigate('/login' , { state: { pagina : '/favoritos' }})
      }
  })

  return (
    <main>
        <ListaFavoritos />
    </main>
  )
}

export default Favoritos