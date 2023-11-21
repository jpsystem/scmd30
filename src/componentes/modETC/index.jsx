import styles2 from './index.module.css'
import styles from "../../styles/login.module.css"
import { FaRegWindowClose } from 'react-icons/fa'

export default function ModETC({isOpen, setModalOpen, titulo, children, 
                                apagar}){


  if(isOpen){
    return (
      <div className={styles2.fundo}>
        <div className={apagar ? styles2.modal2 : styles2.modal}>
          <div className={styles2.cabeca}>
            <h1 className={styles.tituloCadastro}>{titulo}</h1>
            <a onClick={(setModalOpen)}>
              <FaRegWindowClose className={styles.tituloBotao}/> 
            </a>  
          </div>
          <div className={styles2.form}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  return null
}