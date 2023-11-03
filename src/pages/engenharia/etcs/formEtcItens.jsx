//Autor: João Magalhães
//Formulario para os itens da ETC
import useApiListas from "@/hooks/useApiListas"
import styles from "./formETC.module.css"
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Button from "@/componentes/button";



export default function FormEtcItens({campos}){

  // variavel de estado para os itens da ETC
  const [itensETC, setItensETC] = useState([])

   //Função para retornar os dados dos
  //itens da etc pela api "/api/etcs/itenspendentes"
  async function retItensETC() {
    let json = [{}]
    try {
      const response = await fetch('/api/etcs/itensetc', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idEtc: campos?.id
        })
      });
      
      json = await response.json()
      if (response.status !== 200) {
        throw new Error("Não foi possivel listar os usuários!")
      }      
    } catch (error) {
      throw new Error(error.message)
    }
    return json
  } 
  
  //Execução da consulta através do HOOK UseQuery
  const { data, isLoading } = useQuery( ["dadosItensETC"], async () => { 
    const response = await retItensETC(); 
    const retorno = await parseItens(response)
    setItensETC(va => va = retorno)
    return response;
  })

  //Função que preenche os Array de Itens Pendentes
  //com os dados vindo da consulta do BD
  async function parseItens(itens){
    const dados = [];

    //Laço para ler todas itens e salvar em um array de Itens Pendentes
    let key = 0;
    itens.map((linha) => {
        key ++;
        const dado = {
          id: key,
          IdItem: linha.idItem,
          Etc: linha.Etc,
          Item: linha.Item,
          Elemento: linha.Elemento,
          Desenho: linha.Desenho,
          Revisao: linha.Revisao,
          GrPos: linha.GrPos,
          TAG: linha.TAG,
          Descricao: linha.Descricao,
          Codigo: linha.Codigo,
          Qtd: linha.Qtd,
          Unid: linha.Unid,
          PesoUnit: linha.PesoUnit,
          PesoTot: linha.PesoTot,
          CWP: linha.CWP,
          SelItem: false,
        }
        dados.push(dado);
    })

    return dados
  }

  //Variavel de estado para armazenar o codigo do Tag
  //selecionado no combo
  const [pesoTotal, setPesoTotal] = useState(0.00);

  //Variavel de estado para controle da opção selTodos
  const [opSelTodos, setSelTodos] = useState(false);

  //Variavel de estado para controle do botão excluir itens da ETC
  const [opBotao, setOpBotao] = useState(false);  

  function selTodos(event){
    setOpBotao( va => va =  event.target.checked)
    setSelTodos( va => va =  event.target.checked)

    setItensETC(
      //prevState contem os dados atuais de itens da ETC
      prevState => {
        //Criu um novo estado para atualizar os itens
        //com o valor atual do campo "SelItem"
        const newState = prevState.map((item) => {
          return { 
              ...item,
              SelItem: event.target.checked 
          }
        }) 
        //Retorna o novo estado atual com as alterações
        //para atualizar.
        return newState    
      }      
    )
  }
  
  //função que verifica e atualiza o Estado SelTodos
  //verificando os campos SelItem da lista de ItensPendentes
  function testaLista(){
    let total = 0;
    let ligados = 0;

    itensETC.forEach((item)=>{
      total ++;
      if(item.SelItem){
        ligados++;
      }
    })
    if(ligados > 0){
      if(ligados === total){
        setSelTodos(va => va = true)
      }
      return true
    }
    setSelTodos(va => va = false)
    return false  
  }

  //Quando os dados dos itens da lista itensETC
  //sofrer auterações atualiza o PesoTotal
  useEffect(()=>{
    setOpBotao( va => va = testaLista())
    if(itensETC?.length !== undefined )
    {
      const pesoTotal = itensETC?.reduce(
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
  },[itensETC])


  //Função para atualizar o array itensETC quando
  //for alterado os chekbox dos itens
  function handleChange(id, event){

    if(!event.target.checked){
      setSelTodos( va => va =  event.target.checked)
    }
    setItensETC(
        //prevState contem os dados atuais de itensETC
        prevState => {
            //Criu um novo estado para atualizar o item especifico
            //com o valor atual do campo "SelItem"
            const newState = prevState.map((item) => {
                if(item.id === id){
                    return { 
                        ...item,
                        [event.target.name]: event.target.checked 
                    }
                }
                //se não encontrou o item especifico retorna
                //os dados originais
                return item
            })
            
            //Retorna o novo estado atual com as alterações
            //para atualizar.
            return newState
        }
    )
  }

  //Tratamento para exibição de menssagem de espera
  //enquanto estiver processando a consulta do UseQuery
  if( isLoading) {
    return <div className="loading">
              <h1>Carregando…</h1>
            </div>
  }

  return(
    <>
      {
        itensETC?.loading ?
        ( 
          <>
          <tr>
            <td colSpan={5}>Carregando...</td>
          </tr>
          </>
        ):
        ( <> 
          <div className={styles.form}>
          <div className={styles.grupoR}>
              {/* Itens da GRD */}
              <div className={styles.grupoC}>
              <div className={styles.grupoR}>
                <div className={styles.controles}>
                  <label className={styles.controle}>
                      Lista dos elementos
                  </label>
                  <div className={styles.controle}>
                    <input
                      type="checkbox" 
                      name="SelTodos" 
                      id="SelTodos" 
                      checked={opSelTodos}
                      className={styles.selecaoTodos}
                      onChange={(event)=>selTodos(event)}          
                    />
                    <label for="SelTodos" className={styles.label}>Selecionar todos.</label> 
                  </div>
                  {/* Botão para excluir os itens da ETC */}
                  <div className={styles.controle}>
                    <Button 
                      fontSize={"1.2rem"}
                      width={"300px"}
                      height={"50px"}
                      disabled= {opBotao ? false: true}
                    >
                        Excluir itens selecionados...
                    </Button>
                  </div>                  
                </div>
              </div>
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
                    itensETC?.length === undefined ? 
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
                        itensETC?.map( (item, i) =>
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
                            <td  width="5%">
                              <input 
                                type="checkbox" 
                                name="SelItem"
                                checked={item?.SelItem}
                                className={styles.selecao}
                                onChange={(event)=>handleChange(item.id, event)}
                              />                           
                            </td>                        
                          </tr> 
                        )
                      }                 
                      </>
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
              value={pesoTotal?.toLocaleString('pt-BR',{
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
    </>
  )
}