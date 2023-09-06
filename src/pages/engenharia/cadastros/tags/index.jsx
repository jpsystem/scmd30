import { useQuery, useQueryClient } from 'react-query'
import { useContext } from 'react';
import LayoutPagina from "../../../componentes/layoutPagina";
import Tabela from "../../../../componentes/tabela/index";
import styles from '../../../../styles/login.module.css'
import Coluna from "../../../../componentes/tabela/coluna";
import Linha from "../../../../componentes/tabela/linha";
import Button from '@/componentes/button';
import { useState } from 'react';
import Modal from "../../../../componentes/modal/index";
import Formulario from './formulario';
import FechaForm from '@/componentes/fechaForm';
import Alerta from "../../../../componentes/alerta/alerta";
import {PerfilContext} from "../../../contexts/perfilContext"

//Coleção de dados para cabecalho da tabela
const dados={
  key: 0,
  id: 1,
  largura_Cabecalho:  "970px",
  largura_Corpo:      "1000px",
  altura:  "450px", 
  colunas: [
    { key: 1,
      nome: "ID",
      largura: "100px",
      align: "",
    },
    { key: 2,
      nome: "Encomenda",
      largura: "200px",
      align: "",
    },
    { key: 3,
      nome: "Tag",
      largura: "300px",
      align: "",
    },           
  ],
}

export default function CadTags() {

  //Carrega dados da Encomenda do Contexto
  const {encomendaAtiva} = useContext(PerfilContext)

  //HOOK para atualizar e redenrizar os
  //dados do usuário na página
  const queryClient = useQueryClient();

  //Função para buscar os Tags da encomenda
  //ativa da api '/api/tag/listaTags'
  async function retTags(codEncomenda) {
    
    let json = [{}]
    
    try {
      const response = await fetch ('/api/tag/listaTags', {
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
        throw new Error("Não foi possivel listar os Tags!")
      } 
    } catch (error) {
      throw new Error(error.message)
    }
    return json
  }

  //Execução da consulta através do HOOK UseQuery
  const { data, isLoading } = useQuery( "tb_tags", async () => {
    const response = await retTags(`${encomendaAtiva?.idEncomenda}`);
    return response;
  })

  //Variavel para controle do Modal
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
    queryClient.invalidateQueries("tb_tags")
  }

  //Tratamento para exibição de menssagem de espera
  //enquanto estiver processando a consulta do UseQuery
  if( isLoading) {
    return <div className="loading">
              <h1>Carregando…</h1>
            </div>
  }

  return(
    <LayoutPagina largura="1100px">
      <div className={styles.barraFecha}>
        <FechaForm/>
      </div>
      <div className={styles.barraTitulo}>
        <h2 className={styles.title}>Cadastro de TAGs</h2>
        {/* LINHA AVISO */}
        <Alerta tipo={dadosAviso.tipo} texto={dadosAviso.texto} id={dadosAviso.id}/>
        <Button onClick={() => setOpenModal(true)} width="300px" height="30px" padding="5px">Novo Registro</Button>
      </div>

      <Tabela defTable={dados}>
        {   
          data?.map( (item) => 
          (
            // corpoForm={<Formulario dados={dados}/>}
            <Linha key={item.Id} 
                    nomeForme="Tag" 
                    reg={item}
                    retornoFilho={retornoFilho}
            >
              <Coluna width="100px">{item.Id}</Coluna>
              <Coluna width="200px">{item.CodEncomenda}</Coluna>
              <Coluna width="300px">{item.Tag}</Coluna>
            </Linha>
          )
          )
        }   
        </Tabela>  

        <Modal 
          isOpen={openModal} 
          setModalOpen={()=> setOpenModal(!openModal)}
          titulo="Novo Tag"
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