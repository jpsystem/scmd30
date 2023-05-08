import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import Coluna from './coluna'
import styles from './index.module.css'
import { useState } from 'react';
import Modal from '../modal';
import Formulario from "../../principal/cadastros/usuarios/formulario"



export default function Linha({children, reg, ...props}){
    //style={{width: `${dados.tamanho}`}}

    const [openModal, setOpenModal] = useState(false)

    const cabeca = props.cabecalho;

    return(
        <>
            <div className={styles['linha']} style={{width: `${props.tamanho}`}}  {...props}>
            {children}
                {!cabeca && (
                        <>
                            <Coluna width= "5%" align= "center" cursor="pointer">
                                <a onClick={() => setOpenModal(true)}>
                                    <FaRegEdit/>  
                                </a>                                 
                            </Coluna>
                            <Coluna width= "5%" align= "center"><FaRegTrashAlt/></Coluna>
                        </>
                    ) 
                }
                {cabeca &&
                    (
                        <>
                            <Coluna width= "5%" align= "center" ></Coluna>
                            <Coluna width= "5%" align= "center" ></Coluna>
                        </>
                    )
                }           
            </div>

            <Modal 
                isOpen={openModal} 
                setModalOpen={()=> setOpenModal(!openModal)}
            >
            {/* {
                props.nomeFormulario === "<Formulario/>" && 
                <Formulario/>
            } */}
                <Formulario campos={reg}/>
            </Modal>
        
         </>
    )
}