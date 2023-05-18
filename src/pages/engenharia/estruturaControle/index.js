import TreeView from '../../componentes/treeView'
import styles from '../../../styles/login.module.css'
import LayoutPagina from '../../componentes/layoutPagina'

export default function EstControle() {

  
    return (

        <LayoutPagina largura="1800px">
            <div className={styles.barraTitulo}>
                <h2 className={styles.title}>Estrutura de Controle</h2>
            </div>
            <div className={styles.corpoEC}>
            <TreeView numPai={1}/>
            {/* <TreeView tree={tree2}/> */}
            </div>
        </LayoutPagina>
      )
}
