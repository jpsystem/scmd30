
import { useEffect, useState } from 'react'
import styles from './index.module.css'
import { 
            FaRegEdit,              //Icone Edicao
            FaRegTrashAlt,          //Icone Exclusão
            FaArrowAltCircleRight,  //Icone seta pra Direita
            FaArrowAltCircleDown,   //Icone seta pra baixo
            FaCircle                //Icone circulo cheio
        } from 'react-icons/fa'
import Modal from '../modal';
import Formulario from "../../pages/engenharia/estruturaControle/formulario.jsx"


export default function TreeItem({ Recuo, reg, retornoFilho, Elemento, Descricao, ETC, Filhos}){
    const [open, setOpen] = useState(false)

    const [corETC, setCorETC] = useState("")

    const [openModal, setOpenModal] = useState(false)

    const [tipoForme, setTipoForm] = useState("")

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
                        <FaRegEdit className={styles.iconeEdicao}/>  
                    </a> 
                    <a onClick={() =>  controle(2)} >
                        <FaRegTrashAlt className={styles.iconeExclusao}/>  
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
                    onClick={() =>  selecionaItem()} 
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
                        reg={item}
                        {...item}
                    />
                ))
            }
            <Modal 
                isOpen={openModal} 
                setModalOpen={()=> setOpenModal(!openModal)}
                titulo={tipoForme==="edicao" ? "Alterar o registro":"Excluir Registro"}
                // titulo={tipoForme}
            >
                <Formulario 
                    campos={reg} 
                    // tipo={JSON.stringify(tipoForme)} 
                    tipo={tipoForme}
                    setModalOpen={()=> setOpenModal(!openModal)}
                    retornoFilho={retornoFilho}
                />
            </Modal>
        </>
    )
}

