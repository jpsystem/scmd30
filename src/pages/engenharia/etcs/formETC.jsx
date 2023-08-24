//Autor: João Magalhães
//Componente principal para o formulario de ETC.

import { PerfilContext } from "@/pages/contexts/perfilContext"
import { useContext, useEffect, useState } from "react"
import myStyle from "./formETC.module.css"
import Button from "@/componentes/button"
import FormEtCDados from "./formEtcDados"
import FormEtcItens from "./formEtcItens"

export default function FormETC({campos,tipo, setModalOpen}){
  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva} = useContext(PerfilContext)  

  //Estado para controlar o Tab que
  //será exibido (Dados ou Itens)
  const Ativo = {backgroundColor: '#FFFFFF'}
  const Desativo = {backgroundColor: '#FD8008', cursor: 'pointer'}

  const [aba, setAba]= useState(1)
  //const [abaAtiva, setAbaAtiva] = useState(1)
  const [aba1, setAba1]= useState(Ativo)
  const [aba2, setAba2]= useState(Desativo)

  const ativaAba = (n) => {
    if(n===1){
      setAba(1)
      // setAba1(Ativo);
      // setAba2(Desativo);
    }else{
      setAba(2)
      // setAba1(Desativo);
      // setAba2(Ativo);
    }
  }

  useEffect(()=>{
    if(aba===1){
      setAba1(Ativo);
      setAba2(Desativo);
    }else{
      setAba1(Desativo);
      setAba2(Ativo);
    }
  },[aba])


  return(
    <>
    <div className={myStyle.corpo}>
      <div className={myStyle.conteudo}>
        <div className={myStyle.abas}>
          
          <div 
            className={myStyle.aba1} 
            onClick={()=>{ativaAba(1)}}
            style={aba1}
          >
            <h1>Dados da ETC</h1>
          </div>
          <div 
            className={myStyle.aba2}
            onClick={()=>{ativaAba(2)}}
            style={aba2}
          >
            <h1>Itens da ETC</h1>
          </div>
        </div>
        <div className={myStyle.subforms}>
          {aba === 1 ?
                (<FormEtCDados
                  campos={campos}
                  tipo={tipo} 
                />):
                (<FormEtcItens/>)
          }
        </div>
      </div>

      <div className={myStyle.botoes}>
        <Button 
          onClick={() => setModalOpen(false)}
          fontSize={"2em"}
          width={"200px"}
        >
          Fechar
        </Button>    
      </div>

    </div>

    </>
  )
}