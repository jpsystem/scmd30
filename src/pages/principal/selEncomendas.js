
import styles from '../../styles/login.module.css'
import Select from '../componentes/select/index'
import Button from '../componentes/button/index'
import { useQuery } from 'react-query'
import LayoutPagina from '../componentes/layoutPagina'
export default function SelEncomendas() {

  async function retEncomendas() {
    let json = [{}]
    try {
      const response = await fetch('/api/encomenda/listaEncomenda')
      
      json = await response.json()
      if (response.status !== 200) {
        throw new Error("Não foi possivel listar as encomendas!")
      }   
  
    } catch (error) {
      throw new Error(error.message)
    }
    return json
  }

  const { data, isLoading } = useQuery( "grid", async () => {
    const response = await retEncomendas();
    return response;
  })
 
  if( isLoading) {
  return <div className="loading">
                  <h1>Carregando…</h1>
              </div>
  }

    return (

        <LayoutPagina>
           <h2 className={styles.title}>Selecione a Encomenda</h2>
             <form className={styles.form}>
               <Select 
                name="encomenda_id" 
                text="Selecione uma encomenda"
                 
              >
                <option key="0">Selecione a encomenda...</option>
                 {data?.map( (item ) => 
                     (
                       <option key={item.id}>{item.encomenda}</option>
                     )
                   )
                 }
               </Select>
               <Button>Entrar</Button>
             </form>
        </LayoutPagina>
      )
}
