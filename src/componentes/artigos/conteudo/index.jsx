import styles from './index.module.css'

export default function Conteudo({children, ...props}){
    return( 
      <>      
          <p className={styles.conteudo}
            style={{
              paddingLeft: `${props.recuo}`,
              paddingBottom: `${props.espaco}`
            }}
          >
              {children}
          </p>    
      </>
    )
}