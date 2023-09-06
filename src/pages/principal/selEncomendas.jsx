
import styles from '../../styles/login.module.css'
// import Select from '../componentes/select/index'
import Button from '../../componentes/button/index'
import { useQuery } from 'react-query'
import LayoutPagina from '../componentes/layoutPagina'
import { useContext, useState } from 'react'
import { PerfilContext } from '../contexts/perfilContext'
import Select from 'react-select';
import {useRouter} from "next/router"
import {setCookie} from "cookies-next"

export default function SelEncomendas() {
      //Ler os dados da Encomenda Ativo do Contexto Atual
      const {setEncomendaAtiva} = useContext(PerfilContext)  

      const options = [];

      const router = useRouter()

      const  carregaOptions= (dados)=>{
        dados.forEach(item => {
          options.push({
            value: item.id,
            label: item.encomenda,
            tag: item.codEncomenda,
          })
        });
      }
      const Selecionar = (e) =>{
        setSelectedOption(e)
      }

      const [selectedOption, setSelectedOption] = useState(null);


    //Função para ser executada na submissão do formulario
    //quando o mesmo estiver sido validado pelo HOOK UseForm
    const onSubmit = () => {

      setCookie("encID",selectedOption.value)
      setCookie("encCodigo",selectedOption.tag)
      setCookie("encCliente",selectedOption.label)
      setEncomendaAtiva(
        {
          idEncomenda: selectedOption.value,
          codEncomenda: selectedOption.tag,
          cliente: selectedOption.label,
        }
      )
      router.push('/')
  }

  //Execução da API "/api/encomenda/listaEncomenda" para 
  //retornar os dados das encomendas cadastradas.
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
    carregaOptions(json);
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
  }else{
    carregaOptions(data);
  }

  return (
    <LayoutPagina largura="800px" altura="500px">
        <h2 className={styles.title}>Selecione a Encomenda</h2>
        <div className={styles.form}>
          <div>

            <Select
            className={styles.select}
            defaultValue={selectedOption}
            onChange={(e)=>Selecionar(e)}
            options={options}
          />
          </div>
            <Button  onClick={() => onSubmit()}>Selecionar</Button>
        </div>
    </LayoutPagina>
  )
}
