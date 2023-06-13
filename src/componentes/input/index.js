import styles from './index.module.css'

export default function Input(props){
    return(
        <input className={styles.input} {...props} />
    )
}