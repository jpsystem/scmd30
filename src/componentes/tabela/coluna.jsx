import styles from './index.module.css'

export default function Coluna({children, ...props}){
    return(
        <>
            {/* <div className={styles.coluna} Style={`width: ${props.width};`} {...props}> */}

            <div className={styles['coluna']}   
                style={{
                    width:  `${props.width}`,  
                    textAlign: `${props.align}`, 
                }}>
                {children}
            </div>
         </>
    )
}