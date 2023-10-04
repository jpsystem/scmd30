import React, { createContext, useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next"
import jwt from "jsonwebtoken";

export const PerfilContext = createContext();

export default function PerfilProvider( {children}){
    const [auth, setAuth] = useState(false)
    const [pageReload, setPageReload]= useState(false)
    // setCookie("auth",false)
    // setCookie("useID",0)
    // setCookie("useNome","Desconectado")
    // setCookie("useLogin","")
    // setCookie("useAdministrador",false)
    // setCookie("encID",0)
    // setCookie("encCodigo","")
    // setCookie("encCliente","")
    // const useNome = getCookie("useNome")
    // console.log("useNome",useNome)
    const [usuario, setUsuario] = useState({
        nome: "Desconectado",
        login: "",
        id: 0,
        administrador: false,
    })

    const [encomendaAtiva, setEncomendaAtiva] = useState({
        idEncomenda: 0,
        codEncomenda: "",
        cliente: "",
    })

    useEffect(()=>{
        const useNome = getCookie("useNome")
        const useLogin = getCookie("useLogin")
        const useID = getCookie("useID")
        const useAdministrador = getCookie("useAdministrador")

        const encID = getCookie("encID")
        const encCodigo = getCookie("encCodigo")
        const encCliente = getCookie("encCliente")

        const pAuth = getCookie("auth")

        setUsuario({
            nome: `${useNome}`,
            login:  `${useLogin}`,
            id: useID,
            administrador: useAdministrador
        })
        setEncomendaAtiva({
            idEncomenda: encID,
            codEncomenda: `${encCodigo}`,
            cliente: `${encCliente}`,
        })
        setAuth(pAuth)
    },[])

    // const validaToken = ()=>{
    //     const teste = process.env.JWT;
    //     console.log("SECRET",teste)
    //     const token  = getCookie('autorization');
    //     // const dados = jwt.verify(token, SECRET);
    //     if(token){
    //         console.log("TOKEN1",token)
    //         // console.log("DADOS", dados)
    //         return true
    //     }else
    //     {
    //         return false
    //     }
    // }
    

    // const [token, setToken] = useState(validaToken)

    
    return(
        <PerfilContext.Provider value={{
            auth,
            setAuth,
            usuario,
            setUsuario,
            encomendaAtiva,
            setEncomendaAtiva,
            pageReload,
            setPageReload
        }}>
            {children}
        </PerfilContext.Provider>
    )
}

// export const getServerSidePropos = async () => {
//   try {
//     const teste = process.env.JWT;
//     const token = getCookie('autorization', {req, res})
//     const SECRET = process.env.JWT;
//     console.log("SECRET",SECRET)

//     if(!token) throw new Error("Token invalido")

//     console.log("TESTE",verifica(token));

//     return{
//       props: { number: "TESTE"},
//     }
//   } catch (error) {
//     return{
//       redirect:{
//         permanent: false,
//         destination: "/login"
//       },
//     //   props: {token: token},
//     props: { number: "TESTE"},
//     }
//   }
// }

