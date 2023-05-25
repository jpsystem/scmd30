
import { useEffect, useState } from 'react'
import styles from './index.module.css'

export default function TreeItem({Elemento, Descricao, ETC, Filhos}){
    const [open, setOpen] = useState(false)
    const [corETC, setCorETC] = useState("")

    function toggle(){
        setOpen(!open)
    }
    useEffect(() => {
        if(Elemento ===1){
            setOpen(true)
        }
        if(ETC > 0){
            setCorETC("red")
        }
    }, [])
    

    const eUmPai = Filhos.length;
    return(
        <>       
            <div className={styles.item} style={{color: corETC}}>
                {
                    eUmPai &&
                    <input type="checkbox" onClick={toggle}/>
                }
            {Descricao}
            </div>
            <div className={styles.listItem}>
            {   open &&
                Filhos[0].map( (item, i) =>(
                    <TreeItem key={i} {...item}/>
                ))
            }
            </div>
        </>
    )
}

