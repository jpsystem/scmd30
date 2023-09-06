//Autor: João Magalhães
//Componente principal para o formulario de ETC.

import { PerfilContext } from "@/pages/contexts/perfilContext"
import { useContext, useEffect, useState } from "react"
import myStyle from "./formETC.module.css"
import cssBotoes from "./botoes.module.css"
import Button from "@/componentes/button"
import FormEtCDados from "./formEtcDados"
import FormEtcItens from "./formEtcItens"
import { FaRegSave, FaRegListAlt, FaRegFileAlt, FaRegFileExcel } from "react-icons/fa"

export default function FormETC({campos,tipo, setModalOpen}){
  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva} = useContext(PerfilContext)  

  const [botoes, setBotoes] = useState({
    bt1: true,
    bt2: true,
    bt3: true,
    bt4: true
  })

  useEffect(()=>{
    if(tipo==="inclusao"){
      setBotoes(
        va => va = {
          bt1: true, 
          bt2: false, 
          bt3: false, 
          bt4: false
        }
      )
    }
  },[])

  //Estado para controlar o Tab que
  //será exibido (Dados ou Itens)
  const Ativo = {backgroundColor: '#FFFFFF'}
  const Desativo = {backgroundColor: '#FD8008', cursor: 'pointer'}
  const Desable = {backgroundColor: '#b19d8a', color: '#505050', cursor: 'move'}

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
      (tipo === "inclusao"? setAba2(Desable): setAba2(Desativo));
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
          {
            tipo === "inclusao"?
            (<>
              <div 
                className={myStyle.aba2}
                style={aba2}
                aria-disabled={true}
              >
                <h1>Itens da ETC</h1>
              </div>
            </>
            ):
            (<>
              <div 
                className={myStyle.aba2}
                onClick={()=>{ativaAba(2)}}
                style={aba2}
                aria-disabled={true}
              >
                <h1>Itens da ETC</h1>
              </div>            
            </>
            )
          }
        </div>
        <div className={myStyle.subforms}>
          {aba === 1 ?
                (<FormEtCDados
                  campos={campos}
                  tipo={tipo} 
                />):
                (<FormEtcItens
                  campos={campos}
                />)
          }
        </div>
      </div>
      {
        tipo !== "inclusao" && (
          <div className={cssBotoes.botoes}>
            <div className={cssBotoes.toolBar}>
              <strong className={  botoes?.bt1 ?
                (`${cssBotoes.botao} ${cssBotoes.bt1}`):
                (`${cssBotoes.botao} ${cssBotoes.btDesabled}`)
              }>
                <FaRegSave className={  botoes?.bt1 ?(`${cssBotoes.icon}`):(`${cssBotoes.btIcon}`) }/>
              </strong>
              <strong className={  botoes?.bt2 ?
                (`${cssBotoes.botao} ${cssBotoes.bt2}`):
                (`${cssBotoes.botao} ${cssBotoes.btDesabled}`)
              }>
                <FaRegListAlt className={  botoes?.bt2 ?(`${cssBotoes.icon}`):(`${cssBotoes.btIcon}`) }/>
              </strong>
              <strong className={  botoes?.bt3 ?
                (`${cssBotoes.botao} ${cssBotoes.bt3}`):
                (`${cssBotoes.botao} ${cssBotoes.btDesabled}`)
              }>
                <FaRegFileAlt className={  botoes?.bt3 ?(`${cssBotoes.icon}`):(`${cssBotoes.btIcon}`) }/>
              </strong>         
              <strong className={  botoes?.bt4 ?
                (`${cssBotoes.botao} ${cssBotoes.bt4}`):
                (`${cssBotoes.botao} ${cssBotoes.btDesabled}`)
              }>
                <FaRegFileExcel className={  botoes?.bt4 ?(`${cssBotoes.icon}`):(`${cssBotoes.btIcon}`) }/>
              </strong>

                {/* <strong className={`${cssBotoes.botao} ${cssBotoes.bt2}`}><FaRegListAlt className={cssBotoes.icon}/></strong>
                <strong className={`${cssBotoes.botao} ${cssBotoes.bt3}`}><FaRegFileAlt className={cssBotoes.icon}/></strong>    
                <strong className={`${cssBotoes.botao} ${cssBotoes.bt4}`}><FaRegFileExcel className={cssBotoes.icon}/></strong> */}
            </div>
            <Button 
              onClick={() => setModalOpen(false)}
              fontSize={"2em"}
              width={"200px"}
            >
              Fechar
            </Button>    
          </div>
        )
      }

    </div>

    </>
  )
}