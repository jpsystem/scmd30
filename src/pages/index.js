// import { useContext, useEffect } from 'react'
// import { PerfilContext } from './contexts/perfilContext'

import styles from './index.module.css'

// import { getCookie } from "cookies-next"
// import {verifica} from "../services/user"

export default function Home(props) {
                    //const {pageReload,setPageReload} = useContext(PerfilContext)
                    // useEffect(()=>{
                    //   if(pageReload)
                    //   {
                    //     setPageReload(false)
                    //     location.reload()
                    //   }
                    // },[])
                    //location.reload()
  // ESSE RETORNO SEM O LAYOUT DA PAGINA É
  // PARA DEIXA A AREA DO CONTEUDO APENAS COM
  // O FUNDO SEM CONTEUDO
  return(
    
    <div className={styles.container}>
      <div className={styles.containerPag}>
        <h1 className={styles.texto}>SCMD 3.0</h1>
        <h1 className={styles.texto}>Sistema Controle de Materiais e Documentos</h1>
        
      </div>
    </div>
  )
}


// export const getServerSidePropos = async ({req,res}) => {
//   try {
//     const token = getCookie('autorization', {req, res})
//     if(!token) throw new Error("Token invalido")

//     verifica(token)

//     return{
//       props: {},
//     }
//   } catch (error) {
//     return{
//       redirect:{
//         permanent: false,
//         destination: "/login"
//       },
//       props: {}
//     }
//   }
// }



  
  // try {
  //   if(1===1){
  //     console.log("Cheguei aqui")
  //   }
  //   return{
  //     props: { 
  //       auth: true, 
  //       nome: "TESTE",
  //     }
  //   }
  // } catch (error) {
  //       return{
  //         redirect: {
  //           permanent: false,
  //           destination: "/login"
  //         },
  //         props: {}
  //   }
  // }