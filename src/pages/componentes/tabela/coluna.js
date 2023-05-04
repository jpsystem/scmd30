import styles from './index.module.css'

export default function Coluna({children, ...props}){
    return(
        <>
            {/* <div className={styles.coluna} Style={`width: ${props.width};`} {...props}> */}
            <div className={styles['coluna']}   Style={`
                                                    width: ${props.width}; 
                                                    text-align: ${props.align};
                                                    cursor: ${props.cursor};
                                                `}>
                {children}
            </div>
         </>
    )
}