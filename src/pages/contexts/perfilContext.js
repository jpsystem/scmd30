import React, { createContext, useState } from "react";

export const PerfilContext = createContext();

export default function PerfilProvider({children}){
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState("JPSystem")
    
    return(
        <PerfilContext.Provider value={{
            auth,
            setAuth,
            name,
            setName,
        }}>
            {children}
        </PerfilContext.Provider>
    )
}

