import { useQuery } from 'react-query'
import LayoutPagina from "../../../componentes/layoutPagina";
import Tabela from "../../../componentes/tabela";
import styles from '../../../../styles/login.module.css'
import Coluna from "../../../componentes/tabela/coluna";
import Linha from "../../../componentes/tabela/linha";
import Formulario from "./formulario"
import * as yup from "yup";



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
    id: 1,
    largura_Cabecalho:  "1470px",
    largura_Corpo:      "1500px",
    altura:  "450px",
    cabecalhos: [
      { 
        id: "id",
        nome: "ID",
        largura: "100px",
        type: "text",
        exibir: false,
      },
      { 
        id: "login",
        nome: "Login",
        largura: "200px",
        type: "text",
        exibir: true,
      },
      { 
        id: "nome",
        nome: "Nome",
        largura: "300px",
        type: "text",
        exibir: true,
      },
      { 
        id:"email",
        nome: "E-mail",
        largura: "400px",
        type: "email",
        exibir: true,
      },
      { 
        id: "cargo",
        nome: "Cargo",
        largura: "200px",
        type: "text",
        exibir: true,
      },   
      { 
        id: "senha",
        nome: "Senha",
        largura: "200px",
        type: "text",
        exibir: true,
      },
      { 
        id: "admin",
        nome: "Admin",
        largura: "100px",
        align: "center",
        type: "text",
        exibir: true,
      },         
    ]  
  }

  const Validacoes = {
    login: yup.string().required("O Login é obrigatório!").max(15,"Muito grande! Maximo de 15 caracteres"),
    nome: yup.string().required("O Nome é obrigatório!"),
    email: yup.string().required("O E-mail é obrigatório!").email("É necessário um email valido!"),
    cargo: yup.string().required("O Cargo é obrigatório!"),
    senha: yup.string().required("A Senha é obrigatória!"),
    admin: yup.string(),
  }


  if( isLoading) {
    return <div className="loading">
                    <h1>Carregando…</h1>
                </div>
    }

  return (
    <LayoutPagina largura="1600px">
      
      <h2 className={styles.title}>Cadastro de Usuários</h2>
      
      <Tabela defTable={dados}>
        {   
          data?.map( (item) => 
          (
            <Linha regID={item.id} corpoForm={<Formulario dados={dados} validacoes={Validacoes}/>}>
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
      
    </LayoutPagina>
  )
}