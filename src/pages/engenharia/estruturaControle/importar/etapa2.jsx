import { useContext, useState, useEffect } from 'react'
import myStyle from "./etapas.module.css"
import { FaRegEdit } from 'react-icons/fa'
import {CSVContext} from "../../../contexts/csvContext"

import Modal from "../../../../componentes/modal";
import Formulario from './formulario';

export default function Etapa2(){

    const {dadosCSV} = useContext(CSVContext)

    const [openModal, setOpenModal] = useState(false)

    const [itemEdit, setItemEdit] = useState(0)

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
                            <th width="6%">Grp/Pos</th>
                            <th width="6%">Qtd</th>
                            <th width="5%">Unid.</th>
                            <th width="30%">Descrição</th>
                            <th  width="15%">Obs.</th>
                            <th  width="10%">Material</th>
                            <th  width="8%">Peso</th>
                            <th  width="10%">Familia</th>
                            <th  width="5%">Tipo</th>
                            <th  width="5%">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dadosCSV?.map((item) => (
                                <>
                                { item?.Sel ? 
                                (
                                    <>
                                    <tr key={item.id}>
                                        <td width="6">{item?.Grupo}{item?.Posicao}</td>
                                        <td width="6%">{item?.Qtd}</td>
                                        <td width="5%">{item?.Unidade}</td>
                                        <td width="30%">{item?.Descricao}</td>
                                        <td width="15%">{item?.Obs}</td>
                                        <td width="10%">{item?.Material}</td>
                                        <td width="8%">{item?.Peso}</td>
                                        <td width="10%">{item?.Familia}</td>
                                        <td width="5%">{item?.TipoEle}</td> 
                                        <td width="5%">                                
                                            <a key={item.id} onClick={() =>  formEdit(item)}>
                                                <FaRegEdit/>  
                                            </a>
                                        </td>                           
                                    </tr>
                                    </>
                                ):(false)}
                                </>   
                                   
                            )
                            )
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