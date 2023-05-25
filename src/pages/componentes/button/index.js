import styles from './index.module.css'

export default function Button({children, ...props}){
    return(
        <button className={styles.button} 
                style={{
                            width: `${props.width}`,
                            height: `${props.heigth}`,
                            padding: `${props.padding}`,
                            fontsize: `${props.fontsize}`,
                        }}
                {...props} 
        >
            {children}
        </button>
    )
}