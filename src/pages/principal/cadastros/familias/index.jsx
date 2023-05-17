import { useQuery } from 'react-query'
import LayoutPagina from "../../../componentes/layoutPagina";
import Tabela from "../../../componentes/tabela";
import styles from '../../../../styles/login.module.css'
import Coluna from "../../../componentes/tabela/coluna";
import Linha from "../../../componentes/tabela/linha";
import Button from '@/pages/componentes/button';
import { useState } from 'react';
import Modal from "../../../componentes/modal";
import FormFamilia from './formulario';

export default function CadFamilias() {

  async function retFamilias() {
    
    let json = [{}]
    
    try {
      const response = await fetch('/api/familia/listaFamilias')
      
      json = await response.json()
      if (response.status !== 200) {
        throw new Error("Não foi possivel listar as familias!")
      } 
    } catch (error) {
      throw new Error(error.message)
    }
    return json
  }

  const { data, isLoading } = useQuery( "tb_familias", async () => {
    const response = await retFamilias();
    return response;
  })

  const dados={
    key: 0,
    id: 1,
    largura_Cabecalho:  "1170px",
    largura_Corpo:      "1200px",
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

  const [openModal, setOpenModal] = useState(false)

  if( isLoading) {
    return <div className="loading">
                    <h1>Carregando…</h1>
                </div>
    }

  return (
    <LayoutPagina largura="1400px">
      <div className={styles.barraTitulo}>
        <h2 className={styles.title}>Cadastro de Familias</h2>
        <Button onClick={() => setOpenModal(true)} width="300px" height="30px" padding="5px">Novo Registro</Button>
      </div>
      <Tabela defTable={dados}>
        {   
          data?.map( (item) => 
          (
            // corpoForm={<Formulario dados={dados}/>}
            <Linha key={item.id} nomeForme="Familia" reg={item}>
              <Coluna width="100px">{item.id}</Coluna>
              <Coluna width="200px">{item.codEncomenda}</Coluna>
              <Coluna width="250px">{item.familia}</Coluna>
              <Coluna width="450px">{item.espcificacao}</Coluna>
              <Coluna width="200px">{item.cod_erp}</Coluna>
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
          <FormFamilia/>
        </Modal>  
    </LayoutPagina>
    
  )
}