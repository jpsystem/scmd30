import { useContext } from 'react'
import styles from './index.module.css'
import { PerfilContext } from '../../contexts/perfilContext'

export default function Perfil() {
    const {auth, name} = useContext(PerfilContext)
    const display = auth? "grid" : "none"
    return(
        <div style={{display: `${display}`}}>
            <div className={styles.box}>
                <h1 className={styles.title}>Autenticado!</h1>
                <p>{name}</p>
                <p><span>Encomenda:</span>FGRETDE</p>
            </div>
        </div>
    )
}