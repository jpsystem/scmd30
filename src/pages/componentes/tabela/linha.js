import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import Coluna from './coluna'
import styles from './index.module.css'
import { useState } from 'react';
import Modal from '../modal';
import FormUsuario from "../../principal/cadastros/usuarios/formulario"
import FormFamilia from "../../principal/cadastros/familias/formulario"



export default function Linha({children, reg, nomeForme, ...props}){
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
                titulo="Alterar o registro"
            >
                {nomeForme ==="Usuario" && <FormUsuario campos={reg}/>}
                {nomeForme ==="Familia" && <FormFamilia campos={reg}/>}
            </Modal>
        
         </>
    )
}