import { useEffect, useState } from 'react'

import styles from './index.module.css'

import { 
            FaRegEdit,              //Icone Edicao
            FaRegTrashAlt,          //Icone Exclusão
            FaArrowAltCircleRight,  //Icone seta pra Direita
            FaArrowAltCircleDown,   //Icone seta pra baixo
            FaCircle                //Icone circulo cheio
        } from 'react-icons/fa'

import {    BiAddToQueue,           //Duplicar ItemIrmao
            BiSubdirectoryRight     //ItemFilho
        } from "react-icons/bi";

import Modal from '../modal'
import ModImporta from '../modImporta'

import Formulario from "../../pages/engenharia/estruturaControle/formulario.jsx"
import ImportaLista from "../../pages/engenharia/estruturaControle/importar/index.js"


export default function TreeItem({ Recuo, reg, retornoFilho, Elemento, Descricao, ETC, Filhos}){
    const [open, setOpen] = useState(false)

    const [corETC, setCorETC] = useState("")

    const [openModal, setOpenModal] = useState(false)

    const [openModal2, setOpenModal2] = useState(false)

    const [tipoForme, setTipoForm] = useState("")

    const [titulo, setTitulo] = useState("");

    function toggle(){
        setOpen(!open)
    }
    useEffect(() => {
        if(Elemento ===1){
            setOpen(true)
        }
        if(ETC > 0){
            setCorETC("#c3a600")
        }
    }, [])

    const controle =(opcao)=> {
        // Novo Elemento Irmão
        if(opcao === 1){
            setTitulo("Novo Elemento [irmão]")
            setTipoForm("irmao")
            setOpenModal(true)
        }
        // Novo Elemento Filho
        if(opcao === 2){
            setTitulo("Novo Elemento [filho]")
            setTipoForm("filho")
            setOpenModal(true)
        }
        // Alterar elemento
        if(opcao === 3){
            setTitulo("Alterar Elemento")
            setTipoForm("edicao")
            setOpenModal(true)
        }
        // Excluir o elemento
        if(opcao === 4){
            setTitulo("Excluir Elemento")
            setTipoForm("exclusao")
            setOpenModal(true)
        }

        // IMPORTAÇÃO
        if(opcao === 5){
            // setTitulo("Excluir Elemento")
            // setTipoForm("exclusao")
            setOpenModal2(true)
        }

        // alert(JSON.stringify(opcao))
        return null
    }

    const selecionaItem=()=>{
            alert("Teste");
        return null
    }
    

    const eUmPai = Filhos?.length;
    return(
        <>       
            <div className={styles.item}>
                <div className={styles.controles} >
                    <a onClick={() =>  controle(1)} >
                        <BiAddToQueue className={styles.iconeIrmao}/>  
                    </a> 
                    <a onClick={() =>  controle(2)}
                        className={ETC > 0 && styles.desabilitado}
                    >
                        <BiSubdirectoryRight className={styles.iconeFilho} />  
                    </a> 
                    <a onClick={() =>  controle(3)}   
                        className={ETC > 0 && styles.desabilitado}
                    >
                        <FaRegEdit className={styles.iconeEdicao}  />  
                    </a> 
                    <a onClick={() =>  controle(4)} 
                         className={ETC > 0 && styles.desabilitado}
                    >
                        <FaRegTrashAlt className={styles.iconeExclusao}  />  
                    </a> 
                    <a onClick={() =>  controle(5)} 
                         className={ETC > 0 && styles.desabilitado}
                    >
                        <BiAddToQueue className={styles.iconeIrmao}/>   
                    </a> 
                </div>
                <div 
                    className={styles.listItem} 
                    style={{paddingLeft: `${Recuo}px`}}
                    >
                        {
                            eUmPai ?
                            (
                                open ?
                                (
                                    <FaArrowAltCircleDown className={styles.iconePai} onClick={toggle} />
                                ): 
                                (
                                    <FaArrowAltCircleRight className={styles.iconePai} onClick={toggle} />
                                )
                                // <input type="checkbox" onClick={toggle}/>
                            ):
                            (<FaCircle className={styles.iconeItem} style={{color: corETC}}/>)
                        }
                </div> 
                <div 
                    //onClick={() =>  selecionaItem()} 
                    className={styles.descricao}
                    style={{color: corETC}}
                >
                    {Descricao}
                </div>
            </div>
            {   open &&
                Filhos[0]?.map( (item, i) =>(
                    <TreeItem 
                        key={i}
                        Recuo={Recuo+50} 
                        retornoFilho={retornoFilho}
                        reg={item}
                        {...item}
                    />
                ))
            }
            <Modal 
                isOpen={openModal} 
                setModalOpen={()=> setOpenModal(!openModal)}
                titulo={titulo}
            >
                <Formulario 
                    campos={reg} 
                    tipo={tipoForme}
                    setModalOpen={()=> setOpenModal(!openModal)}
                    retornoFilho={retornoFilho}
                />
            </Modal>
            <ModImporta 
                isOpen={openModal2} 
                setModalOpen={()=> setOpenModal2(!openModal2)}
                titulo={titulo}
            >
                <ImportaLista />
            </ModImporta>
        </>
    )
}

