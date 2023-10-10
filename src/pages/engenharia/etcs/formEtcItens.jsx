//Autor: João Magalhães
//Formulario para os itens da ETC
import useApiListas from "@/hooks/useApiListas"
import styles from "./formETC.module.css"
import { useEffect, useState } from "react";



export default function FormEtcItens({campos}){

  //carregar o HOOKs UseApiListas para buscar os itens da GRD
  const [carregarItensETC, itensInfo] = useApiListas({
    url: `/api/etcs/itensetc`,
    requestOptions: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
          idEtc: campos?.id         
      })
    }
  }) 

  //Variavel de estado para armazenar o codigo do Tag
  //selecionado no combo
  const [pesoTotal, setPesoTotal] = useState(0.00);

  //Carregar a lista de Familias da encomenda
  //no load da Pagina.
  useEffect(()=>{
    carregarItensETC();
  },[])
  
    //Quando os dados dos itens da lista dadosCSV
  //sofrer auterações atualiza o PesoTotal
  useEffect(()=>{
    if(itensInfo?.data?.length !== undefined )
    {
      const pesoTotal = itensInfo?.data?.reduce(
        function(acumulador, valorAtual) {
          if(parseFloat(valorAtual?.PesoTot) > 0){
            return acumulador + parseFloat(valorAtual?.PesoTot);
          }else{
            return acumulador
          }
        }, 0.0
      )
      setPesoTotal(va => va = pesoTotal)
    }else{
      setPesoTotal(va => va = 0.00)
    }
  },[itensInfo])

  return(
    <>
      <div className={styles.form}>
      <div className={styles.grupoR}>
          {/* Itens da GRD */}
          <div className={styles.grupoC}>
            <label className={styles.label}>
                Lista dos elementos
            </label>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th width="5%">Item</th>
                  <th width="5%">Elem.</th>
                  <th width="10%">Desenho</th>
                  <th width="5%">Rev.</th>
                  <th  width="5%">Gr/Pos</th>
                  <th  width="10%">Tag</th>
                  <th width="10%">Descrição</th>
                  <th width="10%">Codigo.</th>
                  <th width="5%">Qtd</th>
                  <th width="5%">Unid.</th>
                  <th  width="10%">PsUnit.</th>
                  <th  width="10%">PsTotal</th>
                  <th  width="5%">CWP</th>
                  <th  width="5%">E</th>                 
                </tr>
              </thead>
              <tbody>
              {
                  itensInfo?.loading ?
                  (
                    <>
                    <tr>
                      <td colSpan={5}>Carregando...</td>
                    </tr>
                    </>
                  ):
                  (
                    itensInfo?.data?.length === undefined ? 
                    (
                      <>
                        <tr>
                          <td colSpan={5}>Nenhum item encontrado...</td>
                        </tr>
                      </>
                    ):
                    (
                      <>
                      {
                        itensInfo?.data?.map( (item, i) =>
                          <tr key={i}>
                            <td width="5%">{item.Item}</td>
                            <td width="5%">{item.Elemento}</td>
                            <td width="10%">{item.Desenho}</td>
                            <td width="5%">{item.Revisao}</td>
                            <td  width="5%">{item.GrPos}</td>
                            <td  width="10%">{item.TAG}</td>
                            <td width="10%">{item.Descricao}</td>
                            <td width="10%">{item.Codigo}</td>
                            <td width="5%">{item.Qtd}</td>
                            <td width="5%">{item.Unid}</td>
                            <td  width="10%">{item.PesoUnit}</td>
                            <td  width="10%">{item.PesoTot}</td>
                            <td  width="5%">{item.CWP}</td>
                            <td  width="5%">X</td>                        
                          </tr> 
                        )
                      }                 
                      </>
                    )
                  )
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.grupoR}>
        {/* Peso total */}
        <label 
          className={styles.label}
          style={{paddingBottom: "10px", color: "blue" }}
        >
            Peso Geral
        </label>
        <input
          style={{width: "200px", borderBlockColor: "blue", color: "blue"}}
          type="text"
          id="PesoTot"
          value={pesoTotal.toLocaleString('pt-BR',{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        }
          className={styles.input}
        />
      </div>      
    </>
  )
}