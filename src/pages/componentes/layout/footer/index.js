import Navbar from '../../navbar/index'
import Link from "next/link";
import Image from "next/image";
import Style from './index.module.css'


export default function Footer(){
    return(
        <footer className="rodape">
            <div className={Style.footerContainer}>
                <div className={Style.item1}>                
                    <p>
                        <span>SCD-3.0</span>
                    </p>
                </div>
                <div className={Style.item2}>                
                    <p>
                        <span> &copy; 2023</span>
                    </p>
                </div>
                <div className={Style.item3}>                
                    <p>
                        <span>JPSystem  &copy; 2023 </span>
                    </p>
                </div>
            </div>
        </footer>
    )
}