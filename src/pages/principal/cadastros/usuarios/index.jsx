import { useQuery, useQueryClient } from 'react-query'
import LayoutPagina from "../../../componentes/layoutPagina";
import Tabela from "../../../componentes/tabela";
import styles from '../../../../styles/login.module.css'
import Coluna from "../../../componentes/tabela/coluna";
import Linha from "../../../componentes/tabela/linha";
import Button from '@/pages/componentes/button';
import { useEffect, useState } from 'react';
import Modal from "../../../componentes/modal";
import Formulario from './formulario';
import Alerta from "../../../componentes/alerta/alerta";
import FechaForm from '@/pages/componentes/fechaForm';


export default function CadUsuarios() {

  const queryClient = useQueryClient();

  //Função para retornar os dados dos
  //usuarios da api "/api/user/usuarios"
  async function retUsuarios() {
    
    let json = [{}]
    
    try {
      const response = await fetch('/api/user/usuarios')
      
      json = await response.json()
      if (response.status !== 200) {
        throw new Error("Não foi possivel listar os usuários!")
      } 
    } catch (error) {
      throw new Error(error.message)
    }
    return json
  }

  //Criação e execução do HOOK
  // useQuery
  const { data, isLoading } = useQuery( "tb_usuarios", async () => {
    const response = await retUsuarios();
    return response;
  })

  //Dados para montagem da tabela
  //com os cabeçalhos
  const dados={
    key: 0,
    id: 1,
    largura_Cabecalho:  "1670px",
    largura_Corpo:      "1700px",
    altura:  "450px", 
    colunas: [
      { key: 1,
        nome: "ID",
        largura: "50px",
        align: "",
      },
      { key: 2,
        nome: "Login",
        largura: "200px",
        align: "",
      },
      { key: 3,
        nome: "Nome",
        largura: "350px",
        align: "",
      },
      { key: 4,
        nome: "E-mail",
        largura: "450px",
        align: "",
      },
      { key: 5,
        nome: "Cargo",
        largura: "400px",
        align: "",
      },   
      { key: 6,
        nome: "Senha",
        largura: "150px",
        align: "",
      },
      { key: 7,
        nome: "Admin",
        largura: "100px",
        align: "center",
      },         
    ],
  }

  //Variavel de Estado para controle
  // do formulario Modal
  const [openModal, setOpenModal] = useState(false)

  //Variavel de estado para exibição
  //do aviso de execução
  const [dadosAviso, setDadosAviso] = useState({
    tipo: "",
    texto: "",
    id: 0
  })

  //Função para receber o retorno de
  //componente filho
  const retornoFilho = (childdata) => {
    setDadosAviso(childdata)
    queryClient.invalidateQueries("tb_usuarios")
  }

  //Retorno de ReactJS para exibição
  //de Carregando... Enconto estiver em execução da Query
  if( isLoading) {
    return <div className="loading">
                    <h1>Carregando…</h1>
                </div>
  }

  return (
    <LayoutPagina largura="1900px">
      <div className={styles.barraFecha}>
        <FechaForm/>
      </div>

      <div className={styles.barraTitulo}>
        <h2 className={styles.title}>Cadastro de Usuários</h2>
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
                  nomeForme="Usuario" 
                  reg={item}
                  retornoFilho={retornoFilho}
            >
              <Coluna width="50px">{item.id}</Coluna>
              <Coluna width="200px">{item.login}</Coluna>
              <Coluna width="350px">{item.nome}</Coluna>
              <Coluna width="450px">{item.eMail}</Coluna>
              <Coluna width="400px">{item.cargo}</Coluna>
              <Coluna width="150px">{item.senha}</Coluna>
              <Coluna width="100px" align="center">{item.admin}</Coluna>
            </Linha>
          )
          )
        }   
        </Tabela>
        <Modal 
          isOpen={openModal} 
          setModalOpen={()=> setOpenModal(!openModal)}
          titulo="Novo usuário"
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