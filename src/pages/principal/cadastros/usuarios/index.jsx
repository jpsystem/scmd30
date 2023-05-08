import { useQuery } from 'react-query'
import LayoutPagina from "../../../componentes/layoutPagina";
import Tabela from "../../../componentes/tabela";
import styles from '../../../../styles/login.module.css'
import Coluna from "../../../componentes/tabela/coluna";
import Linha from "../../../componentes/tabela/linha";
import Button from '@/pages/componentes/button';
import { useState } from 'react';
import Modal2 from "../../../componentes/modal/modal2";
import Formulario from './formulario';




export default function CadUsuarios() {

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

  const { data, isLoading } = useQuery( "tb_usuarios", async () => {
    const response = await retUsuarios();
    return response;
  })

  const dados={
    key: 0,
    id: 1,
    largura_Cabecalho:  "1470px",
    largura_Corpo:      "1500px",
    altura:  "450px", 
    colunas: [
      { key: 1,
        nome: "ID",
        largura: "100px",
        align: "",
      },
      { key: 2,
        nome: "Login",
        largura: "200px",
        align: "",
      },
      { key: 3,
        nome: "Nome",
        largura: "300px",
        align: "",
      },
      { key: 4,
        nome: "E-mail",
        largura: "400px",
        align: "",
      },
      { key: 5,
        nome: "Cargo",
        largura: "200px",
        align: "",
      },   
      { key: 6,
        nome: "Senha",
        largura: "200px",
        align: "",
      },
      { key: 7,
        nome: "Admin",
        largura: "100px",
        align: "center",
      },         
    ],
  }

  const [openModal, setOpenModal] = useState(false)

  if( isLoading) {
    return <div className="loading">
                    <h1>Carregando…</h1>
                </div>
    }

  return (
    <LayoutPagina largura="1700px">
      <div className={styles.barraTitulo}>
        <h2 className={styles.title}>Cadastro de Usuários</h2>
        <Button onClick={() => setOpenModal(true)} width="300px" height="30px" padding="5px">Novo Registro</Button>
      </div>
      <Tabela defTable={dados}>
        {   
          data?.map( (item) => 
          (
            // corpoForm={<Formulario dados={dados}/>}
            <Linha key={item.id} reg={item}>
              <Coluna width="100px">{item.id}</Coluna>
              <Coluna width="200px">{item.login}</Coluna>
              <Coluna width="300px">{item.nome}</Coluna>
              <Coluna width="400px">{item.eMail}</Coluna>
              <Coluna width="200px">{item.cargo}</Coluna>
              <Coluna width="200px">{item.senha}</Coluna>
              <Coluna width="100px" align="center">{item.admin}</Coluna>
            </Linha>
          )
          )
        }   
        </Tabela>
        <Modal2 
          isOpen={openModal} 
          setModalOpen={()=> setOpenModal(!openModal)}
          titulo="Novo usuário"
        >
          <Formulario/>
        </Modal2>  
    </LayoutPagina>
    
  )
}