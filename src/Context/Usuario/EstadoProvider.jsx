import { useState } from "react";
import { EstadoContext } from "./EstadoContext";

export const EstadoProvider = ( { children } ) => {
    const [ cargando , setCargando  ] = useState(false)

    return(
        <EstadoContext.Provider value = { { cargando , setCargando } }>
            { children }
        </EstadoContext.Provider>
    )
}