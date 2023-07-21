import { useQuery, useQueryClient } from 'react-query'
import { useState, useContext } from 'react'
import TreeView from '@/componentes/treeView'
import styles from './index.module.css'
import styleLogin from '@/styles/login.module.css'
import LayoutPagina from '@/pages/componentes/layoutPagina'
import Button from '@/componentes/button'
import FechaForm from '@/componentes/fechaForm';
import Modal from "@/componentes/modal";
import Formulario from './formulario.jsx';
import Alerta from "@/componentes/alerta/alerta";
import {PerfilContext} from "../../contexts/perfilContext"
import {    
            BiSitemap               //ItemInicial
        } from "react-icons/bi";


export default function EstControle() {

    //Carrega dados da Encomenda do Contexto
    const {encomendaAtiva} = useContext(PerfilContext)

    //HOOK para atualizar e redenrizar os
    //dados do usuário na página
    const queryClient = useQueryClient();

    const [inicio, setInicio] = useState(null);

    //Variavel de Estado para controle do formulario Modal
    const [openModal, setOpenModal] = useState(false)

    //Função para retornar os itens ta Estrutura de Controle
    async function retElementos(codEncomenda) {
    
        let json = [{}]

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                encomenda: codEncomenda,          
            })
        };

        
        try {
          const response = await fetch('/api/estruturaControle/treeView', requestOptions )
          
          json = await response.json()
          if (response.status !== 200) {
            throw new Error("Não foi possivel listar os elementos!")
          } 
        } catch (error) {
          throw new Error(error.message)
        }
        return json
    }

    const { data, isLoading } = useQuery( "treeView", async () => {
        const response = await retElementos(`${encomendaAtiva?.idEncomenda}`);
        if(response[0]?.length > 0){
            setInicio(false)
        }else{
            setInicio(true)
        }
        return response;
    })

    const tree2 = [
        {
            label: "FORMUALÁRIO",

            filhos: [
                {

                },
            ],
        },
    ]

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
        queryClient.invalidateQueries("treeView")
    }

    //Função para receber o retorno do componente filho
     //e atualizar os dados na Tela
    if( isLoading) {
        return( 
            <div className="loading">
                <h1>Carregando…</h1>
            </div>
        )
    }

    return (
        <LayoutPagina largura="1500px">
            <div className={styleLogin.barraTitulo}>
                <h2 className={styleLogin.title}>Estrutura de Controle</h2>
                {/* LINHA AVISO */}
                <Alerta tipo={dadosAviso.tipo} texto={dadosAviso.texto} id={dadosAviso.id}/>
                 <FechaForm/>
            </div>

            <div className={styles.corpoEC}>
                <div className={styles.gridEC}>
                    {
                        inicio?(
                            <div style={{ 
                                        height: "600px", 
                                        fontSize: "30px", 
                                        display: "grid", 
                                        alignContent: "center"
                                        }}
                            >
                                <h1 style={{
                                            fontSize: "2em",
                                            color: "red", 
                                            textAlign: "center"
                                            }}
                                >
                                    Encomenda vazia!
                                </h1>
                            </div>
                        ):(
                            <TreeView tree={data[0]} retornoFilho={retornoFilho} />
                        )
                    }
                    
                </div>
                <div className={styles.menuEC}>
                    <Button 
                        heigth={"50px"} 
                        fontSize={"1.2em"}
                        disabled={!inicio}
                        onClick={() => setOpenModal(true)}
                    >
                      <BiSitemap className={styles.icone}/>Item inicial
                    </Button>
                    <Button heigth={"50px"} fontSize={"1.2em"} disabled={inicio}>Importar Lista</Button>
                    <Button heigth={"50px"} fontSize={"1.2em"} disabled={inicio}>Relatórios</Button>
                </div>
            </div>
            <Modal 
                isOpen={openModal} 
                setModalOpen={()=> setOpenModal(!openModal)}
                titulo="Novo Elemento"
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

