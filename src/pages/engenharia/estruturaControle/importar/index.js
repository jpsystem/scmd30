import {useContext, useState } from 'react'
import styles from '../../../../styles/login.module.css'
import myStyle from "./index.module.css"
import LayoutPagina from '../../../componentes/layoutPagina'
import Button from '../../../componentes/button'
import Select from '../../../componentes/select'
import Etapa1 from "./etapa1"
import Etapa2 from "./etapa2"

import Modal from "../../../componentes/modal";
import Formulario from './formulario';

import {CSVContext} from "../../../contexts/csvContext"



export default function ImportaLista() {

    // const dados = [];
    const {dadosCSV} = useContext(CSVContext)
    let qtdDados = dadosCSV?.length;
    if(qtdDados === undefined) {qtdDados = 0}

    const [etapa, setEtapa] = useState(1)
    
    const [openModal, setOpenModal] = useState(false)
    
       return (
        <LayoutPagina largura="2000px">     
          <>            
            <div className={styles.barraTitulo}>
                <h2 className={styles.title}>Importar Lista de Materiais</h2>
            </div>
            <div className={myStyle.corpo}>
              <div className={myStyle.ladoE}>
                <div className={myStyle.etapas}>
                  {etapa === 1 ?
                    (<Etapa1/>):
                    (<Etapa2/>)
                  }
                </div>
                <div className={myStyle.controle}>
                      <Button  
                        fontSize={"1em"} 
                        width={"40%"} 
                        onClick={() => setEtapa(1)}
                      >
                        Primeira Etapa
                      </Button>
                      <Button  
                        fontSize={"1em"} 
                        width={"40%"} 
                        disabled={qtdDados > 0 ? (false):(true)}
                        onClick={() => setEtapa(2)}
                      >
                        Segunda Etapa
                      </Button>
                </div>
              </div>
              <div className={myStyle.ladoD}>    
                <div style={{width: "80%"}}> 
                  {/*Numero do Desenho */}   
                  <label className={styles.label}>
                      NºDesenho
                  </label>
                  <Select 
                          name="desenho" 
                          id="cdesenho"
                          disabled
                  >
                      <option key="0">Selecione...</option>
                  </Select>
                </div>
                <div style={{width: "80%"}}>    
                  {/*Titulo */}
                  <label className={myStyle.label}>
                    Titulo
                  </label>
                  <textarea
                    id="titulo"
                    className={myStyle.comentario}
                    disabled
                  />  
                </div>
                <div style={{width: "80%"}}>  
                  {/*TAG */}  
                  <label className={styles.label}>
                      TAG
                  </label>
                  <Select 
                          name="tag" 
                          id="tag"
                          disabled
                  >
                      <option key="0">Selecione...</option>
                  </Select>
                </div>
                <div className={myStyle.emLinha}>    
                  <div style={{width: "40%"}}> 
                    {/* Elemento Pai */}
                    <label className={myStyle.label}>
                      Elemento Pai
                    </label>
                    <input  type="text"
                      id="elePai"
                      className={myStyle.input}
                      disabled
                    />
                  </div>
                  <div style={{width: "40%"}}>
                    {/* Peso Total */}
                    <label className={myStyle.label}>
                      Peso Total
                    </label>
                    <input  type="text"
                      id="pesoTot"
                      className={myStyle.input}
                      disabled
                    />                       
                  </div> 
                </div>
                <div className={[myStyle.emLinha]}>    
                    <Button disabled fontSize={"1em"} width={"40%"}>Importar</Button>
                    <Button  disabled fontSize={"1em"} width={"40%"}>Fechar</Button>
                </div>
              </div>
            </div>
          </> 
            {/* MODAL PARA O FORMLÁRIO */}
            <Modal 
              isOpen={openModal} 
              setModalOpen={()=> setOpenModal(!openModal)}
              titulo="Edição do Item"
            >
              <Formulario/>
          </Modal>  
        </LayoutPagina>
      )
}
