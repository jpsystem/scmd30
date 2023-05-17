import { useState } from 'react'
import styles from './index.module.css'

export default function TreeItem({label, filhos}){

    const [open, setOpen] = useState(false)

    function toggle(){
        setOpen(!open)
    }
    return(
        <div className={styles.item}>
           <input type="checkbox" onClick={toggle}/> {label}
           <div className={styles.listItem}>
            {   open &&
                filhos.map( (item, i) =>(
                    <TreeItem key={i} {...item}/>
                ))
            }
            </div>
        </div>
    )
}