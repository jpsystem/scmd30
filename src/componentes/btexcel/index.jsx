import styles from './index.module.css'
import { FaFileExcel } from "react-icons/fa";

export default function BtExcel({children, ...props}){
  return(
    <button className={styles.button} 
      style={{
        width: `${props.width}`,
        height: `${props.heigth}`,
        padding: `${props.padding}`,
        fontSize: `${props.fontSize}`,
      }}
      {...props} 
    >
      <FaFileExcel className={styles.icon} />
      <span className={styles.texto}>
        {children}
      </span> 
    </button>
  )
}