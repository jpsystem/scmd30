import { useQuery } from 'react-query'
import { useState } from 'react'
import TreeView from '@/componentes/treeView'
import styles from './index.module.css'
import styleLogin from '@/styles/login.module.css'
import LayoutPagina from '@/pages/componentes/layoutPagina'
import Button from '@/componentes/button'
import FechaForm from '@/componentes/fechaForm';
import Modal from "@/componentes/modal";
import Formulario from './formulario.jsx';
import Alerta from "@/componentes/alerta/alerta";
import {  FaRegWindowClose } from 'react-icons/fa'


export default function EstControle() {

    //Variavel de estado para exibição
    //do aviso de execução
    const [dadosAviso, setDadosAviso] = useState({
        tipo: "",
        texto: "",
        id: 0
    })

    //Variavel de Estado para controle do formulario Modal
    const [openModal, setOpenModal] = useState(false)

    //Função para retornar os itens ta Estrutura de Controle
    async function retElementos() {
    
        let json = [{}]

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                encomenda: 1,          
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
        const response = await retElementos();
        return response;
    })


    if( isLoading) {
        return( 
            <div className="loading">
                <h1>Carregando…</h1>
            </div>
        )
    }

    const tree2 = [
        {
            label: "FORMUALÁRIO",

            filhos: [
                {

                },
            ],
        },
    ]

    //Função para receber o retorno do componente filho
    //e atualizar os dados na Tela
    const retornoFilho = (childdata) => {
        setDadosAviso(childdata)
        queryClient.invalidateQueries("treeView")
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
                    <TreeView tree={data[0]} retornoFilho={retornoFilho} />
                </div>
                <div className={styles.menuEC}>
                    <Button 
                        heigth={"50px"} 
                        fontSize={"1.2em"}
                        onClick={() => setOpenModal(true)}
                    >
                        Novo Item
                    </Button>
                    <Button heigth={"50px"} fontSize={"1.2em"}>Importar Lista</Button>
                    <Button heigth={"50px"} fontSize={"1.2em"}>Relatórios</Button>
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

