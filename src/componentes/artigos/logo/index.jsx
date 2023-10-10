import Image from 'next/image'
import styles from './index.module.css'

export default function Logo({children, ...props}){
  return(
    <>    
      <div className={styles.quadro}>
        <div className={styles.image}>
          <Image src={`/images/${props.icone}`} priority={false} width="150" height="120" alt="Icone de Informação"/>
        </div>
        <div className={styles.texto}>
          <p>{children}</p>
        </div>
      </div>
    </>
  )
}