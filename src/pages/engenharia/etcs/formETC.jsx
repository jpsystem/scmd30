//Autor: João Magalhães
//Componente principal para o formulario de ETC.

import { PerfilContext } from "@/pages/contexts/perfilContext"
import { useContext, useEffect, useState } from "react"
import myStyle from "./formETC.module.css"
import cssBotoes from "./botoes.module.css"
import Button from "@/componentes/button"
import FormEtCDados from "./formEtcDados"
import FormEtcItens from "./formEtcItens"
import {  FaRegSave, 
          FaRegListAlt, 
          FaRegFileAlt,
          FaRegWindowClose,
          FaThumbsUp,
          FaRegFileExcel } from "react-icons/fa"
import Modal from "@/componentes/modal"

import SelecionarItens from "./selecionar"

export default function FormETC({campos,tipo, setModalOpen, retornoFilho}){
  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva} = useContext(PerfilContext)  

  const [openModal, setOpenModal] = useState(false)

  const [titulo, setTitulo] = useState("");

  const [botoes, setBotoes] = useState({
    bt1: false,
    bt2: true,
    bt3: true,
    bt4: true,
    bt5: true,
    bt6: false,
  })

  function trataBotoes(b1,b2,b3,b4,b5,b6){
    setBotoes(
      va => va = {
        bt1: !b1, 
        bt2: !b2, 
        bt3: !b3, 
        bt4: !b4,
        bt5: !b5,
        bt6: !b6,
      }
    )
  }

  //Estado para controlar o Tab que
  //será exibido (Dados ou Itens)
  const Ativo = {backgroundColor: '#FFFFFF'}
  const Desativo = {backgroundColor: '#FD8008', cursor: 'pointer'}
  const Desable = {backgroundColor: '#b19d8a', color: '#505050', cursor: 'move'}

  const [aba, setAba]= useState(1)
  const [aba1, setAba1]= useState(Ativo)
  const [aba2, setAba2]= useState(Desativo)

  const ativaAba = (n) => {
    if(n===1){
      setAba(1)
    }else{
      setAba(2)
    }
  }

  useEffect(()=>{
    if(tipo !== "inclusao"){
      if(campos?.Status === "Emitida"){
        trataBotoes(false,false,false,true,false,true);
      }
      if(aba===1){
        if(campos?.Status === "Pendente"){
          trataBotoes(true,true,false,false,false,true);
        }
        if(campos?.Status === "Destravada"){
          trataBotoes(true,false,true,false,false,true);
        }
  
        setAba1(Ativo);
        (tipo === "inclusao"? setAba2(Desable): setAba2(Desativo));
  
      }else{
        if(campos?.Status === "Pendente"){
          trataBotoes(true,true,false,false,true,true);
        }
        if(campos?.Status === "Destravada"){
          trataBotoes(true,false,true,false,true,true);
        }
  
        setAba1(Desativo);
        setAba2(Ativo);
  
      }
    }

  },[aba])

  const excluirETC = async () => {
      try {
        const resposta = await fetch ('/api/etcs/exclusao', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              idEncomenda: encomendaAtiva.idEncomenda,
              idEtc: campos.id,
              codEtc: campos.codETC
            })
        });
        const json = await resposta.json();
        if(resposta.status === 200){
          retornoFilho( {tipo:"sucesso", texto:"ETC excluida!", id: Math.random()})

        } else{
            retornoFilho( {tipo:"falha", texto: json, id: Math.random()})
        }
    } catch (error) {
        retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
    } 
    setModalOpen(false);  
  }

  const controle =(opcao)=> {
    // Slavar dados
    if(opcao === 1){
      alert(`Opção: ${opcao} - Salvar`)

      // {
      //   "observacoes":"TESTE DA EDIÇÃO DA ETC",
      //   "responsavel":"FERNANDO",
      //   "prazo":"TESTE PRAZO",
      //   "local":"TESTE LOCAL",
      //   "data_em": "2023-11-20",
      //   "IDguiaETC": 1931
      // }
        // setTitulo("Alterar Elemento")
        // setTipoForm("edicao")
        // setOpenModal(true)
    }

    // Emitir ETC
    if(opcao === 2){
      alert(`Opção: ${opcao} - Emitir`)
        // setTitulo("Novo Elemento [filho]")
        // setTipoForm("filho")
        // setOpenModal(true)
    }
    // Travar ETC
    if(opcao === 3){
      alert(`Opção: ${opcao} - Travar`)
        // setTitulo("Excluir Elemento")
        // setTipoForm("exclusao")
        // setOpenModal(true)
    }
    // Destravar ETC
    if(opcao === 4){
      alert(`Opção: ${opcao} - Destravar`)
        // setTitulo("Excluir Elemento")
        // setTipoForm("exclusao")
        // setOpenModal2(true)
    }
    // if(opcao === 5){
    //   setTitulo("Selecionar elementos para ETC")
    //   // setTipoForm("irmao")
    //   setOpenModal(true)
    //}

    // alert(JSON.stringify(opcao))
    return null
}

  return(
    (tipo === "exclusao" ? (
        <>
        <div className={myStyle.boxExclusao}>   
            <div className={myStyle.corpoExclusão}>
                <div className={myStyle.textExclusao}>
                    <p>Você está prestes a excluir essa ETC!</p>
                    <p>Todos os elementos da etc serão desassociados e ficarão pendentes.</p>
                    <p>Codigo da ETC: {campos.codETC}</p>  
                    <p className={myStyle.destaqueExclusao} >CONFIRMA A EXCLUSÃO?</p>
                </div>

                <div className={cssBotoes.botoes}>
                  {/* Botão Confirmar */}
                  <Button 
                    onClick={() => excluirETC()} 
                    fontSize={"1.5em"}
                    width={"300px"}
                  >
                    <FaThumbsUp className={cssBotoes.bt}/>Confirmar
                  </Button> 
                  {/* Botão Cancelar */}
                  <Button 
                    onClick={() => setModalOpen(false)}
                    fontSize={"1.5em"}
                    width={"250px"}
                  >
                    <FaRegWindowClose className={cssBotoes.bt}/>Cancelar
                  </Button>   
                </div>



            </div>
          </div>
        </>
      ):(
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
                        setModalOpen={setModalOpen}
                        retornoFilho={retornoFilho} 
                      />):
                      (<FormEtcItens
                        campos={campos}
                        encomendaID={encomendaAtiva.idEncomenda}
                      />)
                }
              </div>
            </div>
            {
              tipo !== "inclusao" && (
                <div className={cssBotoes.botoes}>
                  {/* Botão Salvar bt1 */}
                  {/* <Button 
                    onClick={() => controle(1)}
                    fontSize={"1.5em"}
                    width={"250px"}
                    disabled={botoes.bt1}
                  >
                    <FaRegFileAlt className={cssBotoes.bt}/>Salvar
                  </Button>  */}
                  {/* Botão Emitir bt2 */}
                  <Button 
                    onClick={() => controle(2)}
                    fontSize={"1.5em"}
                    width={"250px"}
                    disabled={botoes.bt2}
                  >
                    <FaRegFileAlt className={cssBotoes.bt}/>Emitir ETC
                  </Button> 
                  {/* Botão Travar bt3 */}
                  <Button 
                    onClick={() => controle(3)}
                    fontSize={"1.5em"}
                    width={"250px"}
                    disabled={botoes.bt3}
                  >
                    <FaRegFileAlt className={cssBotoes.bt}/>Travar
                  </Button> 
                  {/* Botão Destravar bt4 */}
                  <Button 
                    onClick={() => controle(4)}
                    fontSize={"1.5em"}
                    width={"250px"}
                    disabled={botoes.bt4}
                  >
                    <FaRegFileAlt className={cssBotoes.bt}/>Destravar
                  </Button> 
                  {/* Botão Buscar bt5 */}
                  {/* <Button 
                    onClick={() => controle(5)}
                    fontSize={"1.5em"}
                    width={"300px"}
                    disabled={botoes.bt5}
                  >
                    <FaRegFileAlt className={cssBotoes.bt}/>Buscar elementos
                  </Button>  */}
                  {/* Botão Fachar bt6 */}
                  <Button 
                    onClick={() => setModalOpen(false)}
                    fontSize={"1.5em"}
                    width={"250px"}
                    disabled={botoes.bt6}
                  >
                    <FaRegFileAlt className={cssBotoes.bt}/>Fechar
                  </Button>   
                </div>
              )
            }
            <Modal 
                isOpen={openModal} 
                setModalOpen={()=> setOpenModal(!openModal)}
                titulo={titulo}
                larguraMinima="1800px"
            >
                <SelecionarItens 
                    encomendaID={encomendaAtiva.idEncomenda}
                    campos={campos} 
                    setModalOpen={()=> setOpenModal(!openModal)}
                    retornoFilho={retornoFilho}
                />
            </Modal>
          </div>
          </>
      )
    )
  )
}