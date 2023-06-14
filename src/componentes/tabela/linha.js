import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import Coluna from './coluna'
import styles from './index.module.css'
import { useEffect, useState } from 'react';
import Modal from '../modal';
import FormUsuario from "../../pages/principal/cadastros/usuarios/formulario"
import FormFamilia from "../../pages/principal/cadastros/familias/formulario.jsx"



export default function Linha({children, reg, nomeForme, retornoFilho, ...props}){
    //style={{width: `${dados.tamanho}`}}

    const [openModal, setOpenModal] = useState(false)

    const [tipoForme, setTipoForm] = useState("")

    const cabeca = props.cabecalho;

    // let  myOpcao = 0

    const controle =(opcao)=> {
        // myOpcao = opcao
        if(opcao === 1){
            setTipoForm("edicao")
            setOpenModal(true)
        }
        if(opcao === 2){
            setTipoForm("exclusao")
            setOpenModal(true)
        }
        // alert(JSON.stringify(opcao))
        return null
    }

    // useEffect(()=> {
    //     setOpenModal(true)
    // },[myOpcao])
    
    return(
        <>
            <div className={styles['linha']} style={{width: `${props.tamanho}`}}  {...props}>
            {children}
                {!cabeca && (
                        <>
                            <Coluna width= "5%" align= "center" cursor="pointer">
                                <a onClick={() =>  controle(1)}>
                                    <FaRegEdit/>  
                                </a>                                 
                            </Coluna>
                            <Coluna width= "5%" align= "center" cursor="pointer">
                                <a  onClick={() =>  controle(2)}>
                                    <FaRegTrashAlt/>
                                </a>
                            </Coluna>
                        </>
                    ) 
                }
                {cabeca &&
                    (
                        <>
                            <Coluna width= "5%" align= "center" >E</Coluna>
                            <Coluna width= "5%" align= "center" >A</Coluna>
                        </>
                    )
                }           
            </div>

            <Modal 
                isOpen={openModal} 
                setModalOpen={()=> setOpenModal(!openModal)}
                titulo={tipoForme==="edicao" ? "Alterar o registro":"Excluir Registro"}
                // titulo={tipoForme}
            >
                {nomeForme ==="Usuario" &&
                    <FormUsuario 
                        campos={reg} 
                        // tipo={JSON.stringify(tipoForme)} 
                        tipo={tipoForme}
                        setModalOpen={()=> setOpenModal(!openModal)}
                        retornoFilho={retornoFilho}
                    />
                }
                {nomeForme ==="Familia" && 
                    <FormFamilia 
                        campos={reg}
                        tipo={tipoForme} 
                        setModalOpen={()=> setOpenModal(!openModal)}
                        retornoFilho={retornoFilho}
                    />
                }
            </Modal>
        
         </>
    )
}