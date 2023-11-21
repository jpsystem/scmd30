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
// import FormFamilia from './formulario';
import Formulario from './formulario';
import FechaForm from '@/componentes/fechaForm';
import Alerta from "../../../../componentes/alerta/alerta";
import {PerfilContext} from "../../../contexts/perfilContext"
import { useRouter } from 'next/router';

//Coleção de dados para cabecalho da tabela
const dados={
  key: 0,
  id: 1,
  largura_Cabecalho:  "1370px",
  largura_Corpo:      "1400px",
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
      nome: "Familia",
      largura: "250px",
      align: "",
    },
    { key: 4,
      nome: "Especificação",
      largura: "450px",
      align: "",
    },
    { key: 5,
      nome: "Cod_ERP",
      largura: "200px",
      align: "",
    },            
  ],
}

export default function CadFamilias() {
  const router = useRouter()

  //Carrega dados da Encomenda do Contexto
  const {encomendaAtiva} = useContext(PerfilContext)

  //HOOK para atualizar e redenrizar os
  //dados do usuário na página
  const queryClient = useQueryClient();

  //Função para buscar as familias da encomenda
  //ativa da api '/api/familia/listaFamilias'
  async function retFamilias(codEncomenda2) {
    let codEncomenda = `${encomendaAtiva?.idEncomenda}`
    let json = [{}]
    
    try {
      const response = await fetch ('/api/familia/listaFamilias', {
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
        throw new Error("Não foi possivel listar as familias!")
      } 
    } catch (error) {
      throw new Error(error.message)
    }
    return json
  }

  //Execução da consulta através do HOOK UseQuery
  const { data, isLoading } = useQuery( "tb_familias", 
    async () => {
    const response = await retFamilias(`${encomendaAtiva?.idEncomenda}`);
     
    return response;
    },{
      refetchIntervalInBackground: false,
    }
  )

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
    queryClient.invalidateQueries("tb_familias")
  }

  //Tratamento para exibição de menssagem de espera
  //enquanto estiver processando a consulta do UseQuery
  if( isLoading) {
    return <div className="loading">
              <h1>Carregando…</h1>
            </div>
  }

  return (
    <LayoutPagina largura="1600px">
      <div className={styles.barraFecha}>
        <FechaForm/>
      </div>
      <div className={styles.barraTitulo}>
        <h2 className={styles.title}>Cadastro de Familias</h2>
        {/* LINHA AVISO */}
        <Alerta tipo={dadosAviso.tipo} texto={dadosAviso.texto} id={dadosAviso.id}/>
        <Button onClick={() => setOpenModal(true)} width="300px" height="30px" padding="5px">Novo Registro</Button>
      </div>
        <Tabela defTable={dados}>
          {   
            data?.map( (item) => 
              (
                // corpoForm={<Formulario dados={dados}/>}
                <Linha key={item.id} 
                        nomeForme="Familia" 
                        reg={item}
                        retornoFilho={retornoFilho}
                >
                  <Coluna width="100px">{item.id}</Coluna>
                  <Coluna width="200px">{item.codEncomenda}</Coluna>
                  <Coluna width="250px">{item.familia}</Coluna>
                  <Coluna width="450px">{item.especificacao}</Coluna>
                  <Coluna width="200px">{item.cod_Erp}</Coluna>
                </Linha>
              )
            )
          }  
        </Tabela>
        <Modal 
          isOpen={openModal} 
          setModalOpen={()=> setOpenModal(!openModal)}
          titulo="Nova familia"
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