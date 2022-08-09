import React , { useContext } from 'react'
import { UserContext } from '../../Context/Usuario/UserContext'
import './BotonesInfoArticulo.css'

const BotonesInfoArticulo = () => {

    const { usuario } = useContext( UserContext )

    console.log(usuario);
  return (
    <div className='informacion_articulos_botones'>
        {
            usuario === 'ninguno' || usuario.role !== 'Administrador' ? 
            '':
            <>
            <div className="informacion_boton_eliminar">
                <button>Eliminar</button>
            </div>
            <div className="informacion_boton_editar">
                <button>Editar</button>
            </div>
            </>
        }
        <div className="informacion_boton_favoritos">
            <button>favoritos</button>
        </div>
        <div className="informacion_boton_comprar">
            <button>Comprar</button>
        </div>
    </div>
  )
}

export default BotonesInfoArticulo