import myStyle from "./index.module.css"
import { useQuery , useQueryClient} from "react-query";
import Table from "@/componentes/table/table";
export default function RelPadrao({setModalOpen, config}){


  //HOOK para atualizar e redenrizar os
  //dados do usuário na página
  const queryClient = useQueryClient();

    //Função para buscar as familias da encomenda
  //ativa da api '/api/familia/listaFamilias'
  async function retRelatorio() {
    let json = [{}]
    
    try {
      const response = await fetch ('/api/relatorios/relPadrao', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({      
            idEncomenda: config.idEncomenda,
            idTag: config.tag,
            idFamilia: config.familia,
            pai: config.pai,
            ordem: config.ordens
        })
      });
      json = await response.json()
      if (response.status !== 200) {
        throw new Error("Não foi possivel listar os elementos!")
      } 
    } catch (error) {
      throw new Error(error.message)
    }
    return json
  }

  //Execução da consulta através do HOOK UseQuery
  const { data, isLoading } = useQuery( "relPadrao", 
    async () => {
    const response = await retRelatorio();
     
    return response;
    },{
      refetchIntervalInBackground: false,
    }
  )
  //Tratamento para exibição de menssagem de espera
  //enquanto estiver processando a consulta do UseQuery
  if( isLoading) {
    return <div className="loading">
              <h1>Carregando…</h1>
            </div>
  }
  return(
    <>
     <div className={myStyle.corpo}>
        <div className={myStyle.wrapper}>
          <Table data={data} rowsPerPage={40} />
        </div>
      </div>
    </>
  )
}