import styles from './index.module.css'

export default function LayoutPagina(props){
    return (
      <div className={styles.container}>
        <div className={styles.containerPag}>
          <div className={styles.wrapPag} style={{width: `${props.largura}`, height: `${props.altura}`}}>{props.children}</div>
        </div>
      </div>
    );
}