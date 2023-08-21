//Componente GRID para exibir e controlar as itens
//selecionadas da lista de exportação (Etapa 2)

import { useContext, useState } from 'react'
import myStyle from "./etapas.module.css"
import {CSVContext} from "../../../contexts/csvContext"
import Modal from "../../../../componentes/modal";
import Formulario from './formulario';

export default function Etapa2(){

    //Carrega dados do contexto CSVContext
    const {dadosCSV,setDadosCSV} = useContext(CSVContext)

    //Variavel de estado para controle do formulario Modal
    const [openModal, setOpenModal] = useState(false)

    //Variavel de estado para os dados do item em edição
    const [itemEdit, setItemEdit] = useState(0)

    //função para para setar os dados do item na variavel
    //que será passada por parametro para o formulario
    function formEdit(item){
        setItemEdit(item);
        setOpenModal(true);
    }

    return(
        <>
        <div className={myStyle.Etapas}>
            <div className={myStyle.itensLista}>
                <table className={myStyle.tabela}>
                    <thead>
                        <tr>
                            <th width="120px">Status</th>
                            <th width="6%">Grp/Pos</th>
                            <th width="6%">Qtd</th>
                            <th width="5%">Unid.</th>
                            <th width="30%">Descrição</th>
                            <th  width="15%">Obs.</th>
                            <th  width="10%">Material</th>
                            <th  width="8%">Peso</th>
                            <th  width="10%">Familia</th>
                            <th  width="5%">Tipo</th>
                            {/* <th  width="5%">Edit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dadosCSV?.map((item) => (
                                item?.Sel && 
                                
                                <tr key={item.id}>

                                        {item?.StatusItem === -1 && <td onClick={() =>  formEdit(item)} width="120px" className={myStyle.yellow}><span className={myStyle.texto}>Pendente</span></td>}
                                        {item?.StatusItem ===  0 && <td onClick={() =>  formEdit(item)} width="120px" className={myStyle.green}><span className={myStyle.texto}>Novo</span></td>}
                                        {item?.StatusItem ===  1 && <td onClick={() =>  formEdit(item)} width="120px" className={myStyle.yellow}><span className={myStyle.texto}>Alterar</span></td>}
                                        {item?.StatusItem ===  2 && <td onClick={() =>  formEdit(item)} width="120px" className={myStyle.gray}><span className={myStyle.texto}>Bloqueado</span></td>}

                                    <td width="6">{item?.Grupo}{item?.Posicao}</td>
                                    <td width="6%">{item?.Qtd}</td>
                                    <td width="5%">{item?.Unidade}</td>
                                    <td width="30%">{item?.Descricao}</td>
                                    <td width="15%">{item?.Obs}</td>
                                    <td width="10%">{item?.Material}</td>
                                    <td width="8%">{item?.Peso}</td>
                                    <td width="10%">{item?.Familia}</td>
                                    <td width="5%">{item?.TipoEle}</td> 
                                    {/* <td width="5%">                                
                                        <a key={item.id} onClick={() =>  formEdit(item)}>
                                            <FaRegEdit/>  
                                        </a>
                                    </td>                            */}
                                </tr>  
                                
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
            {/* MODAL PARA O FORMLÁRIO */}
            <Modal 
              isOpen={openModal} 
              setModalOpen={()=> setOpenModal(!openModal)}
              titulo="Edição do Item"
            >
              <Formulario item={itemEdit}
                setModalOpen={()=> setOpenModal(!openModal)} 
              />
          </Modal> 
        </>

    )
}