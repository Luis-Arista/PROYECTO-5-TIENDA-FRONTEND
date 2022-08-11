import React , { useContext , useEffect  } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import ListaFavoritos from '../../Components/ListaFavoritos/ListaFavoritos'
import { useNavigate } from 'react-router-dom'

const Favoritos = () => {

  const navigate = useNavigate()

  const { usuario } = useContext( UserContext )

  const cargar = () => {
      if( usuario === 'ninguno'){
        navigate('/login' , { state: { pagina : '/favoritos' }})
    }
  }

  useEffect( () => { 
      cargar()
  })

  return (
    <main>
        <ListaFavoritos usuario={usuario} />
    </main>
  )
}

export default Favoritos