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
import { JPConversoes } from "@/jpFuncoes/convercoes";
import TravarETC from "./travar";

export default function FormETC({campos,tipo, setModalOpen, retornoFilho}){
  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva, usuario} = useContext(PerfilContext)  

  const [openModal, setOpenModal] = useState(false)

  const [botoes, setBotoes] = useState({
    bt1: false,   //Emitir
    bt2: false,   //Travar
    bt3: false,   //Destravar
    bt4: true,    //Fechar
  })

  function trataBotoes(b1,b2,b3,b4,){
    setBotoes(
      va => va = {
        bt1: !b1, 
        bt2: !b2, 
        bt3: !b3, 
        bt4: !b4,
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

  //Efetuar o controle da liberação dos botões
  //Emitir - Travar - Destravar - Fechar
  useEffect(()=>{
    if(tipo !== "inclusao"){
      if(aba===1){
        setAba1(Ativo);
        (tipo === "inclusao"? setAba2(Desable): setAba2(Desativo));
      }else{
        setAba1(Desativo);
        setAba2(Ativo);
      }
    }
    if(campos?.Status === "Pendente"){
      trataBotoes(true,false,false,true);
    }
    if(campos?.Status === "Emitida"){
      trataBotoes(false,false,true,true);
    }
    if(campos?.Status === "Destravada"){
      trataBotoes(false,true,false,true);
    }


  },[aba])

  //Rotina para a exclusão da ETC
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

  //Rotina para a emissão da ETC
  const emicaoETC = async () => {
    try {
      const resposta = await fetch ('/api/etcs/emitirEtc', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEncomenda:    encomendaAtiva.idEncomenda,
            idEtc:          campos.id,
            responsavel:    usuario.login,
            data_rev:       JPConversoes.strDate(),
            codEtc:         campos.codETC,
            etc_rev:        0
        })
      });
      const json = await resposta.json();
      retornoFilho({tipo: "",texto: ""});
      if(resposta.status === 201){
        retornoFilho( {tipo:"sucesso", texto: JSON.stringify(json), id: Math.random()})
      } else{
        retornoFilho( {tipo:"falha", texto: JSON.stringify(json), id: Math.random()})
      }              
    } catch (error) {
      retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
    }
  }

  //Rotina para destravar uma ETC
  const destravarETC = async () =>{
    try {
      const resposta = await fetch ('/api/etcs/destravarEtc', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idEtc:          campos.id,
          codEtc:         campos.codETC,
          idEncomenda:    encomendaAtiva.idEncomenda
        })
      }); 
      const json = await resposta.json();
      retornoFilho({tipo: "",texto: ""});
      if(resposta.status === 201){
        retornoFilho( {tipo:"sucesso", texto: JSON.stringify(json), id: Math.random()})
      } else{
        retornoFilho( {tipo:"falha", texto: JSON.stringify(json), id: Math.random()})
      }              
    } catch (error) {
      retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
    }
}
  //Função para retornar quantidade
  // de itens da ETC
  const totItens = async () => {
    let quantidade = 0;
    let json = [{}]
    try {
      const response = await fetch('/api/etcs/qtdItens', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idEtc: campos?.id
        })
      });
      json = await response.json()
      if (response.status !== 200) {
        quantidade = 0;
      }
      else{
        quantidade =  json[0].qtdItens;
      } 
    } catch (error) {
      quantidade = 0;
    }
    return quantidade
  }

    //Função para receber o retorno do componente filho
  //e atualizar os dados na Tela
  const retornoTrava = async (childdata) => {
    let revisao = campos?.Revisao;
    if(childdata?.novaRevisao){
      revisao ++
    }  
    const bodyTrava = {
      idEncomenda: encomendaAtiva.idEncomenda,
      idEtc: campos?.id,
      codEtc: campos?.codETC,
      Revisao: revisao,
      Data_rev: JPConversoes.strDate(),
      Data_emi: campos?.DataEmi,
      Motivo: childdata.Motivo,
      DescMotivo: childdata.Descricao,
      Responsavel: usuario.login,
      novaRevisao: childdata?.novaRevisao,
    }
    await travarETC(bodyTrava);
    setModalOpen(false);
  }

  const travarETC = async (body) =>{
    try {
      const resposta = await fetch ('/api/etcs/travarEtc', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }); 
      const json = await resposta.json();
      retornoFilho({tipo: "",texto: ""});
      if(resposta.status === 201){
        retornoFilho( {tipo:"sucesso", texto: JSON.stringify(json), id: Math.random()})
      } else{
        retornoFilho( {tipo:"falha", texto: JSON.stringify(json), id: Math.random()})
      }       
    } catch (error) {
      retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
    }
  }

  const controle = async (opcao)=> {
    // Emitir ETC
    if(opcao === 1){
      //Passo 1 Verificar se tem itens selecionados
      const qtdItens = await totItens();

      if(qtdItens > 0){
        await emicaoETC();
        setModalOpen(false);
      }
      else{
        alert("É nececario ter itens para emitir a ETC!");
      }
    }
    // Travar ETC
    if(opcao === 2){
      setOpenModal(true);
      // alert(`Opção: ${opcao} - Travar`)
    }
    // Destravar ETC
    if(opcao === 3){
      await destravarETC();
      setModalOpen(false);
      // alert(`Opção: ${opcao} - Destravar`)
    }
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
                  {/* Botão Emitir bt1 */}
                  <Button 
                    onClick={() => controle(1)}
                    fontSize={"1.5em"}
                    width={"250px"}
                    disabled={botoes.bt1}
                  >
                    <FaRegFileAlt className={cssBotoes.bt}/>Emitir ETC
                  </Button> 
                  {/* Botão Travar bt2 */}
                  <Button 
                    onClick={() => controle(2)}
                    fontSize={"1.5em"}
                    width={"250px"}
                    disabled={botoes.bt2}
                  >
                    <FaRegFileAlt className={cssBotoes.bt}/>Travar
                  </Button> 
                  {/* Botão Destravar bt3 */}
                  <Button 
                    onClick={() => controle(3)}
                    fontSize={"1.5em"}
                    width={"250px"}
                    disabled={botoes.bt3}
                  >
                    <FaRegFileAlt className={cssBotoes.bt}/>Destravar
                  </Button> 
                  {/* Botão Fachar bt4 */}
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
                titulo={"[TRAVAR] - Gerar uma nova revisão"}
                larguraMinima="1200px"
            >
                <TravarETC 
                    encomendaID={encomendaAtiva.idEncomenda}
                    setModalOpen={()=> setOpenModal(!openModal)}
                    retornoTrava={retornoTrava}
                />
            </Modal>
          </div>
          </>
      )
    )
  )
}