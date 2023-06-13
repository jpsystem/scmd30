
import styles from './index.module.css'
import TreeItem from './treeItem'

export default function TreeView({tree}){
    console.log("Tree",tree)
    return(
        <>
            {/* cabeçalho */}
            <div>

            </div>
            {/* style={{width: "800px", height: "800px"}} */}
            {/* corpo */}
            <div className={styles.scrollContainer} style={{ height: "800px"}} >
                {
                    tree?.map( (item, i) =>(
                        <TreeItem key={i} {...item}/>
                    ))
                }
            </div>
        </>
    )
}
