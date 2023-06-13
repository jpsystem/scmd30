import styles from './index.module.css'

export default function Select({children, ...props}){
    return(
        <select className={styles.select} {...props}>
            {/* <option key={0} >Selecione a opção</option> */}
            {children}
        </select>
    )
}