import styles from './index.module.css'
import TreeItem from './treeItem'
import { useQuery } from 'react-query'

export default function TreeView({numPai}){


    async function retElementos(numPai) {
    
        let json = [{}]

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                encomenda: 1,
                pai: numPai,           
            })
        };

        try {
          const response = await fetch('/api/estruturaControle/treeViewECs', requestOptions )
          
          json = await response.json()
          if (response.status !== 200) {
            throw new Error("Não foi possivel listar os elementos!")
          } 
        } catch (error) {
          throw new Error(error.message)
        }
        return json
    }

    const { data, isLoading } = useQuery( "treeViewEC", async () => {
        const response = await retElementos(numPai);
        return response;
    })


    if( isLoading) {
        return( 
            <div className="loading">
                <h1>Carregando…</h1>
            </div>
        )
    }

    return(
        <>
            {/* cabeçalho */}
            <div>

            </div>

            {/* corpo */}
            <div className={styles.scrollContainer} style={{width: "800px", height: "800px"}}>
                {
                    data[0].map( (item, i) =>(
                        <>                        
                        <TreeItem key={i} item={item}/>
                        {
                            (item.eUmPai > 0 && item.Elemento === 4) 
                            ?  <TreeView numPai={item.Elemento}/>
                            : null
                        }
                        </>
                    ))
                }
            </div>
        </>
    )
}
