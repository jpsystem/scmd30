// import { useContext } from "react";
import Footer from "./footer/index.jsx";

import Header from "./header/index.jsx";
// import { PerfilContext } from "../../contexts/perfilContext";

export default function Layout({children}){
    // const valor = useContext(PerfilContext)
    return(
        <>
            <Header/>
            <main className="main-container">{children}</main>
            <Footer/>
        </>
    )
}