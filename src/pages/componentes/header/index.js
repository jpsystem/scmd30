import Navbar from '../navbar/index'
import Link from "next/link";
import Image from "next/image";
import Style from './index.module.css'
import Perfil from '../perfil/index';


export default function Header(){
    return(
        <>
            <div className={Style.gridContainer}>
                <div className={Style.item1}>
                    <header>
                        <h1>SCMD 3.0 Sistema controle de materiais e documentos e materiais</h1>
                    </header>
                </div>
                <div className={Style.item2}>
                    <Link href='/#'>
                        <Image src="/images/LogoTMSA_Site.jpg" width="200" height="60" alt="Logo TMSA"/>
                    </Link>
                    <Perfil/>
                </div>
                <div className={Style.item3}>
                    <Navbar className={Style.navbar}/>
                </div>
            </div>
        </>
    )
}