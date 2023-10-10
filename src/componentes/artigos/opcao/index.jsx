import styles from './index.module.css'

export default function Opcao({children, ...props}){
    return(     
        <a href={`#${props.nomeAncora}`} className={styles.opcao}>
            {/* <span className={styles.opcao}> */}
                {/* <option key={0} >Selecione a opção</option> */}
                {children}
            {/* </span> */}
        </a>
    )
}