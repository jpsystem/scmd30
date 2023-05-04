import Coluna from './coluna'
import styles from './index.module.css'
import Linha from './linha'

export default function Tabela({children, ...props}){
    console.log(props.defTable.largura_Cabecalho);
    return(
        <>
        <div>
            {/* cabeçalho */}
            <div>
                <Linha cabecalho="true" style={{"background-color": "#00F", color: "#FFF", width: `${props.defTable.largura_Cabecalho}`}} >
                    {props.defTable.cabecalhos.map( (item) => 
                        <Coluna width={item.largura} align={item.align}>{item.nome}</Coluna>
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