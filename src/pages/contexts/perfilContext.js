import React, { createContext, useState } from "react";

export const PerfilContext = createContext();

export default function PerfilProvider({children}){
    const [auth, setAuth] = useState(false)
    const [usuario, setUsuario] = useState({
        nome: "Desconectado",
        login: "",
        id: 0,
        administrador: false,
    })
    const [encomendaAtiva, setEncomendaAtiva] = useState({
        idEncomenda: 1,
        codEncomenda: "00154",
        cliente: "YARA Brasil Fertilizantes",
    })
    
    return(
        <PerfilContext.Provider value={{
            auth,
            setAuth,
            usuario,
            setUsuario,
            encomendaAtiva,
            setEncomendaAtiva,
        }}>
            {children}
        </PerfilContext.Provider>
    )
}

