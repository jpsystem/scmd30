import styles from './index.module.css'
import TreeItem from './treeItem'

export default function TreeView({tree}){
    return(
        <>
            {/* cabeçalho */}
            <div>

            </div>

            {/* corpo */}
            <div className={styles.scrollContainer} style={{width: "800px", height: "800px"}}>
                {
                    tree.map( (item, i) =>(
                        <TreeItem key={i} {...item}/>
                    ))
                }
            </div>
        </>
    )
}
