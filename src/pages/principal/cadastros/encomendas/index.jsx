import { useQuery, useQueryClient } from 'react-query'
import LayoutPagina from "../../../componentes/layoutPagina";
import Tabela from "../../../../componentes/tabela";
import styles from '../../../../styles/login.module.css'
import Coluna from "../../../../componentes/tabela/coluna";
import Linha from "../../../../componentes/tabela/linha";
import Button from '@/componentes/button';
import { useEffect, useState } from 'react';
import Modal from "../../../../componentes/modal";
import Formulario from './formulario.jsx';
import Alerta from "../../../../componentes/alerta/alerta";
import FechaForm from '@/componentes/fechaForm';
// import { Token } from '@/pages/componentes/token';
import {useRouter} from "next/router"
import { getCookie } from 'cookies-next';

// const token = Token;
//Coleção de dados para cabecalho da tabela
const dados={
    key: 0,
    id: 1,
    largura_Cabecalho:  "1570px",
    largura_Corpo:      "1600px",
    altura:  "450px", 
    colunas: [
      { key: 1,
        nome: "ID",
        largura: "50px",
        align: "",
      },
      { key: 2,
        nome: "Cod.Encomenda",
        largura: "250px",
        align: "",
      },
      { key: 3,
        nome: "Cliente",
        largura: "500px",
        align: "",
      },
      { key: 4,
        nome: "Projeto-Cliente",
        largura: "400px",
        align: "",
      },
      { key: 5,
        nome: "Local da Obra",
        largura: "400px",
        align: "",
      },            
    ],
  }
  

export default function CadEncomendas(props) {
  //Rotinas para enviar usuario para tela de login se
  //não for administrador
  const router = useRouter()

  useEffect(()=>{
    const cokieADM = getCookie("useAdministrador")
    if(!cokieADM){
      router.replace('/principal/login')
    }
  },[])

  //HOOK para atualizar e redenrizar os
  //dados do usuário na página
  const queryClient = useQueryClient();
  //console.log("CadEncomendas",token)

  //Função para retornar os dados das
  //encomendas da api "/api/encomenda/encomendas"
  async function retEncomendas() {
    
    let json = [{}]
    
    try {
      const response = await fetch('/api/encomenda/encomendas')
      
      json = await response.json()
      if (response.status !== 200) {
        throw new Error("Não foi possivel listar as encomendas!")
      } 
    } catch (error) {
      throw new Error(error.message)
    }
    return json
  }

  //Criação e execução do HOOK useQuery
  const { data, isLoading } = useQuery( "tb_encomendas", async () => {
    const response = await retEncomendas();
    // console.log("DATA", data)
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
    queryClient.invalidateQueries("tb_encomendas")
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
                <h2 className={styles.title}>Cadastro de Encomendas{props.token}</h2>
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
                            nomeForme="Encomenda" 
                            reg={item}
                            retornoFilho={retornoFilho}
                        >
                            <Coluna width="50px">{item.id}</Coluna>
                            <Coluna width="250px">{item.codEncomenda}</Coluna>
                            <Coluna width="500px">{item.cliente}</Coluna>
                            <Coluna width="400px">{item.ref_cliente}</Coluna>
                            <Coluna width="400px">{item.localObra}</Coluna>
                        </Linha>
                    )
                    )
                }   
            </Tabela>

            <Modal 
                isOpen={openModal} 
                setModalOpen={()=> setOpenModal(!openModal)}
                titulo="Nova Encomenda"
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
// export const getStaticProps = async () => {
//   // return{
//   //   props: {teste: "JPSYSTEM"},
//   // }

//   try {
//     console.log("getStaticProps",token)
//     //const token = "TESTE"
//     if(!token) throw new Error("Token invalido")
//     //const token = "JPSYSTEM"
//     //verifica(token)

//     return{
//       props: {token: "TESTE"},
//     }
//   } catch (error) {
//     return{
//       redirect:{
//         permanent: false,
//         destination: "principal/login"
//       },
//       props: {},
//     }
//   }

// }