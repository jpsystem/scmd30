import React, { createContext, useState } from "react";

export const CSVContext = createContext();

export default function CSVProvider({children}){
    const [dadosCSV, setDadosCSV] = useState(null)
    const [nomeDesenho, setNomeDesenho] = useState(null)
    
    return(
        <CSVContext.Provider value={{
            dadosCSV,
            setDadosCSV,
            nomeDesenho,
            setNomeDesenho,
        }}>
            {children}
        </CSVContext.Provider>
    )
}