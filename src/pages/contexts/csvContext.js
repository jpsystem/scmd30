import React, { createContext, useState } from "react";

export const CSVContext = createContext();

export default function CSVProvider({children}){
    const [dadosCSV, setDadosCSV] = useState(null)
    const [nomeDesenho, setNomeDesenho] = useState(null)
    const [tituloDesenho, setTituloDesenho] = useState(null)
    const [pesoTotal, setPesoTotal] = useState(null)
    const [statusPai, setStatusPai] = useState(null)
    const [statusFilhos, setStatusFilhos] = useState(false)
    
    return(
        <CSVContext.Provider value={{
            dadosCSV,
            setDadosCSV,
            nomeDesenho,
            setNomeDesenho,
            tituloDesenho,
            setTituloDesenho,
            pesoTotal,
            setPesoTotal,
            statusPai,
            setStatusPai,
            statusFilhos,
            setStatusFilhos
        }}>
            {children}
        </CSVContext.Provider>
    )
}