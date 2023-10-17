import styles from './index.module.css'
import {useRouter} from "next/router"
import { FaRegWindowClose } from 'react-icons/fa'

export default function FechaForm(props){
    const router = useRouter()
    function fechar(){
        router.push('/')
        return null
    }
    
    return(
        <div className={styles.efeito} >
            <a onClick={fechar}>
                <FaRegWindowClose className={styles.botao} {...props} />
            </a>
        </div>
    )
}