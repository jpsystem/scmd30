
import styles from '../../styles/login.module.css'
import Button from '../../componentes/button/index'
import { useQuery } from 'react-query'
import LayoutPagina from '../componentes/layoutPagina'
import { useContext, useState } from 'react'
import { PerfilContext } from '../contexts/perfilContext'
import {useRouter} from "next/router"
import {setCookie} from "cookies-next"
import FechaForm from '@/componentes/fechaForm'
import Select from '@/componentes/select'

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


      const [selectedOption, setSelectedOption] = useState(null);

      const Selecionar = (e) =>{
        setSelectedOption(e.target.value)
      }

    //Função para ser executada na submissão do formulario
    //quando o mesmo estiver sido validado pelo HOOK UseForm
    const onSubmit = () => {

      const minhaOpcao = options.find((element) => element.value == selectedOption);

      setCookie("encID",minhaOpcao?.value)
      setCookie("encCodigo",minhaOpcao?.tag)
      setCookie("encCliente",minhaOpcao?.label)
      setEncomendaAtiva(
        {
          idEncomenda: minhaOpcao?.value,
          codEncomenda: minhaOpcao?.tag,
          cliente: minhaOpcao?.label,
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
        <div className={styles.barraFecha}>
          <FechaForm/>
        </div>    
        <h2 className={styles.title}>Selecione a Encomenda</h2>
        <div className={styles.form}>
          <div>     
            <Select
              className={styles.select}
              style={{ width: "700px",
                      height: "80px", 
                      padding: "5px",
                      fontSize: "1.2rem",
                      backgroundColor: "rgb(255,255,255)",
                      border: "15px solid #FD8008",
                      marginBottom: "100px"
                    }}
              defaultValue={selectedOption}
              onChange={(e)=>Selecionar(e)}
            >
              <>
                <option key={0} value={0}>
                  Selecione ...
                </option>            
                {
                  options.map((item, i) => 
                    <option 
                      key={i+1} 
                      value={item?.value}
                      tag={item?.tag}
                      label={item?.label}
                    >
                      {item?.label}
                    </option>
                  )
                }
              </>
            </Select>
          </div>
            <Button  onClick={() => onSubmit()}>Selecionar</Button>
        </div>
    </LayoutPagina>
  )
}
