import { useState } from 'react'
import { FaChevronDown, FaChevronRight, FaEllipsisH } from "react-icons/fa";
import styles from './index.module.css'
import TreeView from '../treeView/index'

export default function TreeItem({item}){
    const [open, setOpen] = useState(true)

    function toggle(){
        setOpen(!open)
    }

    return(
        <div className={styles.item}>
            <p key={item.Elemento}>
                { item.eUmPai > 0 &&
                <a onClick={toggle}>
                    { open ? (<FaChevronRight/>) : (<FaChevronDown/>) }
                </a>
                }
                <FaEllipsisH/> 
                {item.Descricao}
            </p>

            {
                item.eUmPai > 0  && 
                    <div className={styles.listItem}>
                        {
                            (item.Elemento === 4) 
                            ?  <p>PIPOCA</p>
                            : null
                        }
                    </div>  
            }


        </div>
    )
}