import Navbar from '../../../../componentes/navbar/index'
import Link from "next/link";
import Image from "next/image";
import Style from './index.module.css'
import Perfil from '../../../../componentes/perfil/index';

import {PerfilContext} from "../../../contexts/perfilContext"
import { useContext } from 'react';

import { FaUserAlt, FaProjectDiagram } from 'react-icons/fa'


export default function Header(){
    const {usuario, encomendaAtiva} = useContext(PerfilContext)

    return(
        <>
            <div className={Style.flexContainer}>
                <div className={Style.headE}>
                    <Link href='/#'>
                        <Image src="/images/Logo_SCMD.png" width="200" height="80" alt="Logo TMSA"/>
                    </Link>
                    <Perfil/>
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
                        <FaProjectDiagram/> {encomendaAtiva?.codEncomenda}
                    </div>
                </div>
            </div>
        </>
    )
}