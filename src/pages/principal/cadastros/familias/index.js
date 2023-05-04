import Tabela from "../../../componentes/tabela";
import LayoutPagina from "../../../componentes/layoutPagina";
import styles from '../../../../styles/login.module.css'
import Coluna from "../../../componentes/tabela/coluna";
import Linha from "../../../componentes/tabela/linha";
import Modal from "../../../componentes/modal";
import { useState } from "react";


export default function CadFamilia() {
    const [openModal, setOpenModal] = useState(false)
    const dados={
      largura_Cabecalho:  "970px",
      largura_Corpo:      "1000px",
      altura:  "450px",
      cabecalhos: [
        { 
          nome: "Cab1",
          largura: "150px",
        },
        { 
          nome: "Cab2",
          largura: "150px",
        },
        { 
          nome: "Cab3",
          largura: "200px",
        },
        { 
          nome: "Cab4",
          largura: "250px",
        },
        { 
          nome: "Cab5",
          largura: "250px",
        },           
      ]  
    }
    return (
      <LayoutPagina largura="1100px">
        <h2 className={styles.title}>Cadastro de familias</h2> 
        <Tabela defTable={dados}>
        
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">01</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">02</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">03</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">04</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">05</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">06</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">07</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">08</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">09</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">10</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">11</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">12</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">13</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">14</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">15</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">16</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">17</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
          <Linha tamanho={dados.tamanho}>
            <Coluna width="150px">18</Coluna>
            <Coluna width="150px">João</Coluna>
            <Coluna width="200px">Magalães</Coluna>
            <Coluna width="250px">Silva</Coluna>
            <Coluna width="250px">Pereira</Coluna>
          </Linha>
        </Tabela>
        <div>
          <button 
            onClick={() => setOpenModal(true)}
          >
            Abrir Modal
          </button>
        </div>
        <Modal 
          isOpen={openModal} 
          setModalOpen={()=> setOpenModal(!openModal)}
        >
          <p>Oi eu sou o modal</p>
        </Modal>
      </LayoutPagina>

    )
  }