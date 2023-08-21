import { useQuery, useQueryClient } from "react-query";
import LayoutPagina from "../../componentes/layoutPagina";
import Tabela from "../../../componentes/tabela";
import styles from '@/styles/login.module.css'
import Coluna from "../../../componentes/tabela/coluna";
import Linha from "../../../componentes/tabela/linha";
import Button from '../../../componentes/button';
import { useContext, useState } from 'react';
import Modal from "../../../componentes/modal";
import Formulario from './formulario.jsx';
import Alerta from "../../../componentes/alerta/alerta";
import FechaForm from '../../../componentes/fechaForm';
import { PerfilContext } from "@/pages/contexts/perfilContext";

//Coleção de dados para cabecalho da tabela
const dados={
  key: 0,
  id: 1,
  largura_Cabecalho:  "1570px",
  largura_Corpo:      "1600px",
  altura:  "450px", 
  colunas: [
    { key: 1,
      nome: "ETC",
      largura: "60px",
      align: "",
    },
    { key: 2,
      nome: "Rev.",
      largura: "50px",
      align: "",
    },
    { key: 3,
      nome: "Familia",
      largura: "300px",
      align: "",
    },
    { key: 4,
      nome: "Data",
      largura: "300px",
      align: "",
    },
    { key: 5,
      nome: "Responsavel",
      largura: "350px",
      align: "",
    },      
    { key: 6,
      nome: "Local",
      largura: "350px",
      align: "",
    }, 
    { key: 7,
      nome: "GRD",
      largura: "60px",
      align: "",
    }, 
    { key: 8,
      nome: "Status",
      largura: "100px",
      align: "",
    },        
  ],
}

export default function CadETCs() {

  //Carrega dados da Encomenda do Contexto
  const {encomendaAtiva} = useContext(PerfilContext)

  //HOOK para atualizar e redenrizar os
  //dados da ETC na página
  const queryClient = useQueryClient();

  //Função para retornar os dados das
  //Etcs da api "/api/etcs/gridetc"
  async function retETCs(codEncomenda) {
    
    let json = [{}]
    
    try {
      const response = await fetch('/api/etcs/gridetc', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEncomenda: codEncomenda,
        })
      });
      
      json = await response.json()
      if (response.status !== 200) {
        throw new Error("Não foi possivel listar as ETCs!")
      } 
    } catch (error) {
      throw new Error(error.message)
    }
    return json
  }

  //Execução da consulta através do HOOK UseQuery
  const { data, isLoading } = useQuery( "tb_etcs", async () => {
    const response = await retETCs(`${encomendaAtiva?.idEncomenda}`);
    return response;
  }) 

  //Variavel de Estado para controle do formulario Modal
  const [openModal, setOpenModal] = useState(false)   
  
  //Variavel de estado para exibição
  //do aviso de execução
  const [dadosAviso, setDadosAviso] = useState({
    tipo: "",
    texto: "",
    id: 0
  })  

  //Função para receber o retorno do componente filho
  //e atualizar os dados na Tela
  const retornoFilho = (childdata) => {
    setDadosAviso(childdata)
    queryClient.invalidateQueries("tb_etcs")
  }

  //Tratamento para exibição de menssagem de espera
  //enquanto estiver processando a consulta do UseQuery
  if( isLoading) {
    return <div className="loading">
              <h1>Carregando…</h1>
            </div>
  }

  return(
        <LayoutPagina largura="1800px">
            <div className={styles.barraFecha}>
                <FechaForm/>
            </div>

            <div className={styles.barraTitulo}>
                <h2 className={styles.title}>Cadastro de ETCs</h2>
                {/* LINHA AVISO */}
                <Alerta tipo={dadosAviso.tipo} texto={dadosAviso.texto} id={dadosAviso.id}/>
                <Button onClick={() => setOpenModal(true)} width="300px" height="30px" padding="5px">Novo Registro</Button>
            </div>

            <Tabela defTable={dados}>
                {   
                    data[0].map( (item) => 
                    (
                        <Linha key={item.id} 
                            nomeForme="ETC" 
                            reg={item}
                            retornoFilho={retornoFilho}
                        >
                            <Coluna width="60px">{item.codETC}</Coluna>
                            <Coluna width="50px">{item.Revisao}</Coluna>
                            <Coluna width="300px">{item.Familia}</Coluna>
                            <Coluna width="300px">{item.DataEmi}</Coluna>
                            <Coluna width="350px">{item.Responsavel}</Coluna>
                            <Coluna width="350px">{item.Local}</Coluna>
                            <Coluna width="60px">{item.GRD}</Coluna>
                            <Coluna width="100px">{item.Status}</Coluna>
                        </Linha>
                    )
                    )
                }   
            </Tabela>

            <Modal 
                isOpen={openModal} 
                setModalOpen={()=> setOpenModal(!openModal)}
                titulo="Nova ETC"
            >
                <Formulario 
                    setModalOpen={()=> setOpenModal(!openModal)} 
                    tipo={"inclusao"}
                    retornoFilho={retornoFilho}
                />
            </Modal>
        </LayoutPagina>
  )
}
