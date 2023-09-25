import Navbar from '../../../../componentes/navbar/index.jsx'
import Link from "next/link";
import Image from "next/image";
import Style from './index.module.css'
import Perfil from '../../../../componentes/perfil/index';

import {PerfilContext} from "../../../contexts/perfilContext"
import { useContext, useEffect, useState } from 'react';

import { FaUserAlt, FaProjectDiagram } from 'react-icons/fa'


export default function Header(){
    const {usuario, encomendaAtiva} = useContext(PerfilContext)

    const [dadosAviso, setDadosAviso ] = useState({
        nome: "Desconectado",
        encomenda: "Selecione uma encomenda!"
    })

    useEffect(()=>{
        setDadosAviso({
            nome: usuario.nome,
            encomenda: encomendaAtiva.cliente
        })
    },[PerfilContext])


    return(
        <>
            <div className={Style.flexContainer}>
                <div className={Style.headE}>
                    <Link href='/#'>
                        <Image src="/images/Logo_SCMD.png" priority={false} width="200" height="80" alt="Logo SCMD"/>
                    </Link>
                    {/* <Perfil/> */}
                </div>
                <div className={Style.headC}>
                    <div className={Style.headC1}>
                        <header>
                            <h1>SCMD 3.0 Sistema Controle de Materiais e Documentos</h1>
                        </header>
                    </div>
                    <div className={Style.headC2}>
                        <Navbar className={Style.navbar}/>
                    </div>
                </div>
                <div className={Style.headD}>
                    <div className={Style.headD1}>
                        <FaUserAlt/> {usuario?.nome}
                    </div>
                    <div className={Style.headD2}>
                        <FaProjectDiagram/> {encomendaAtiva?.cliente }
                    </div>
                </div>
            </div>
        </>
    )
}