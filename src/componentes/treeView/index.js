
import styles from './index.module.css'
import TreeItem from './treeItem'

export default function TreeView({tree}){
    return(
        <>
            {/* cabeçalho */}
            <div>

            </div>
            {/* style={{width: "800px", height: "800px"}} */}
            {/* corpo */}
            <div className={styles.scrollContainer} style={{ height: "600px"}} >
                {
                    tree?.map( (item, i) =>(
                        <TreeItem 
                            key={i}
                            Recuo={0} 
                            reg={item} 
                            {...item} 
                        />
                    ))
                }
            </div>
        </>
    )
}
