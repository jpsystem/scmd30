// import { COMPILER_INDEXES } from "next/dist/shared/lib/constants"
// import LayoutPagina from "./componentes/layoutPagina"

import React from "react"
import styles from './componentes/layoutPagina/index.module.css'

export default function Home(props) {
  // return (
  //   <LayoutPagina>
  //   <div>
  //     Página Segura -{props.nome} Perfil do Usuário (index.js)
  //   </div>
  //   </LayoutPagina>
  // )

  // ESSE RETORNO SEM O LAYOUT DA PAGINA É
  // PARA DEIXA A AREA DO CONTEUDO APENAS COM
  // O FUNDO SEM CONTEUDO
  // alert(props.nome);
  return(
    <div className={styles.container}>
      <div className={styles.containerPag}>
      </div>
    </div>
  )
}

export function getServerSidePropos() {
  console.log("Cheguei aqui")
  return{
    props: {},
  }
}



  
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