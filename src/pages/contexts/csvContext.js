import React, { createContext, useState } from "react";

export const CSVContext = createContext();

export default function CSVProvider({children}){
    const [dadosCSV, setDadosCSV] = useState(null)
    
    return(
        <CSVContext.Provider value={{
            dadosCSV,
            setDadosCSV,
        }}>
            {children}
        </CSVContext.Provider>
    )
}