import styles from './index.module.css'

export default function Subtitulo({children, ...props}){
    return(
        <div>       
            <a name={props.nomeAncora}><br/></a>
            <span className={styles.subtitulo}>
                    {/* <option key={0} >Selecione a opção</option> */}
                    {children}
            </span>
            <br/><br/>
        </div>
    )
}