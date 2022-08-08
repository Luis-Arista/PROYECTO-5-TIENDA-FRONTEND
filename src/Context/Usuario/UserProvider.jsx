import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ( { children } ) => {
    const [ usuario , setUsuario ] = useState('ninguno')

    return(
        <UserContext.Provider value = { { usuario , setUsuario } }>
            { children }
        </UserContext.Provider>
    )
}