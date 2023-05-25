import Coluna from './coluna'
import styles from './index.module.css'
import Linha from './linha'

export default function Tabela({children, ...props}){
    const itens = props.defTable.colunas;
    return(
        <>
        <div>
            {/* cabeçalho */}
            <div>
                <Linha cabecalho="true" style={{backgroundColor: "#FD8008", color: "#000", width: `${props.defTable.largura_Cabecalho}`}} >
                    {itens.map( (item) => 
                        <Coluna key={item.nome} width={item.largura} align={item.align}>{item.nome}</Coluna>
                    )}  
                </Linha>
            </div>
            {/* corpo */}
            <div className={styles.scrollContainer} style={{width: `${props.defTable.largura_Corpo}`, height: `${props.defTable.altura}`}}>
                {children}
            </div>
        </div>

         </>
    )
}