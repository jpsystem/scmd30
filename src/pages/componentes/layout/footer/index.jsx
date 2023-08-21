import { FaFacebookSquare, FaLinkedin, FaInstagramSquare } from 'react-icons/fa'
import Image from "next/image";
import Style from './index.module.css'


export default function Footer(){
    return(
        <footer className="rodape">
            <div className={Style.footerContainer}>
                <div className={Style.item1}>                
                <Image src="/images/LogoTMSA_Site.jpg" priority={false} width="200" height="60" alt="Logo TMSA"/>
                </div>
                <div className={Style.item2}>                
                    <p>
                        <span>JPSystem  &copy; 2023 </span>
                    </p>
                </div>
                <div className={Style.item3}>                
                    <FaFacebookSquare className={Style.icon}/>
                    <FaInstagramSquare className={Style.icon}/>
                    <FaLinkedin className={Style.icon}/>
                </div>
            </div>
        </footer>
    )
}