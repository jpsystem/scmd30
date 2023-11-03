import { useEffect, useState } from "react"
import myStyle from "./index.module.css"
import { useQuery } from "react-query";
import useApiListas from "@/hooks/useApiListas";
import Button from "@/componentes/button";

export default function SelecionarItens({familiaID, encomendaID, setModalOpen}){

  const [itensPendentes, setItensPendentes] = useState([])

  //Variavel de estado para controle das opções dos select Familias
  const [opTag, setOpTag] = useState(0);

  //Variavel de estado para controle das opções dos select Familias
  const [opBotao, setOpBotao] = useState(false);

  //Variavel de estado para controle das opções dos select Familias
  const [opSelTodos, setSelTodos] = useState(false);

  //Função para retornar os dados dos
  //itens pendentes da api "/api/etcs/itenspendentes"
  async function retItensPendentes(filTag) {
    let json = [{}]
    
    try {
      const response = await fetch('/api/etcs/itenspendentes', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idEncomenda: encomendaID,
          idFamilia: familiaID,
          idTag: filTag
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

  //carregar o HOOKs UseApiListas
  const [carregarTags, tagsInfo] = useApiListas({
    url: "/api/etcs/seltags/",
    requestOptions: {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idEncomenda: encomendaID,
        idFamilia: familiaID
      })
    }
  })

  //Executar a função CarregarTags no load da pagina.
  useEffect(()=>{
    carregarTags();
  },[])

  useEffect(() =>{
    setOpBotao( va => va = testaLista())
  },[itensPendentes])

  //Função para atualizar a variavel de estado opTag
  //Com o codigo do Tag selecionada no cambo
  const Selecionar = async e => {
    // if(e?.target.id === "IdTag"){
    setOpTag(va => va = e?.target.value)
    // }
  }

  //Execução da consulta através do HOOK UseQuery
  const { data, isLoading } = useQuery( ["dadosPendentes", opTag], async (par) => { 
    const response = await retItensPendentes(par.queryKey[1]); 
    const retorno = await parseItens(response)
    setItensPendentes(va => va = retorno)
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
          ElementoID: linha.ElementoID,
          Elemento: linha.Elemento,
          Descricao: linha.Descricao,
          Desenho: linha.Desenho,
          Rev: linha.Rev,
          GrPos: linha.GrPos,
          Qtd: linha.Qtd,
          PesoTot: linha.PesoTot,
          CWP: linha.CWP,
          FamiliaID: linha.FamiliaID,
          Familia: linha.Familia,
          TagID: linha.TagID,
          Tag: linha.Tag,
          SelItem: false
        }
        dados.push(dado);
    })

    return dados
  }

  function selTodos(event){
    setOpBotao( va => va =  event.target.checked)
    setSelTodos( va => va =  event.target.checked)

    setItensPendentes(
      //prevState contem os dados atuais de itensPendentes
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

    itensPendentes.forEach((item)=>{
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

  //Função para atualizar o array itensPendentes quando
  //for alterado os chekbox dos itens
  function handleChange(id, event){
    if(!event.target.checked){
      setSelTodos( va => va =  event.target.checked)
    }
    setItensPendentes(
        //prevState contem os dados atuais de itensPendentes
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
    <div className={myStyle.corpo}>
      <div className={myStyle.controles}>
        {/* Chek para selecionar tudo */}
        <div className={myStyle.controle}>
          <input
            type="checkbox" 
            name="SelTodos" 
            id="SelTodos" 
            checked={opSelTodos}
            className={myStyle.selecaoTodos}
            onChange={(event)=>selTodos(event)}          
          />
          <label for="SelTodos" className={myStyle.label}>Selecionar todos.</label>
        </div>
        {/* Select para filtra Tags */}
        <div className={myStyle.controle}>
          <label for="IdTag" className={myStyle.label}>Filtro por Tag</label>
          <select 
            className={myStyle.select}
            name="IdTag" 
            id="IdTag"
            value={opTag} 
            onChange={async (e)=>{await Selecionar(e)}}         
          >
          {
            tagsInfo?.loading ?
            (
              <option key={0} value={0}>
                Carregando...
              </option>
            ):
            (
              tagsInfo?.data?.length === 0 ?
              (
                <option key={0} value={0}>
                  Nenhum Tag encontrado...
                </option>
              ):
              (
              <>      
                <option key={0} value={0}>
                    Selecione um tag
                </option>
                {
                  tagsInfo?.data?.map( (it) =>
                      <option 
                        key={it.value} 
                        value={it?.value}
                      >
                        {it?.label}
                      </option>
                  )                  
                }              
              </>
              )
            )
          }          
          </select>
        </div>
        {/* Botão para adicionar os elementos */}
        <div className={myStyle.controle}>
          <Button 
            fontSize={"1.2rem"}
            width={"300px"}
            height={"50px"}
            disabled= {opBotao ? false: true}
          >
              Adicionar os elementos
          </Button>
        </div>
      </div>
      <div className={myStyle.resultado}>
        <table className={myStyle.tabela}>
          <thead>
            <tr>
              <th width="5%">Sel.</th>
              <th width="5%">Elem.</th>
              <th width="15%">Descrição</th>
              <th width="15%">Desenho</th>
              <th  width="5%">Rev.</th>
              <th  width="10%">Gr/Pos</th>
              <th  width="5%">Qtd.</th>
              <th  width="10%">Peso Tot.</th>
              <th  width="15%">CWP</th>
              <th  width="15%">TAG</th>
            </tr>
          </thead>
          <tbody>
            {
              itensPendentes?.map((item) => (
                <tr key={item.id}>
                    <td width="5%">
                        <input 
                            type="checkbox" 
                            // name={`Sel-${item.id}`} 
                            name="SelItem"
                            checked={item?.SelItem}
                            className={myStyle.selecao}
                            onChange={(event)=>handleChange(item.id, event)}
                        />
                    </td>
                    <td width="5%">{item?.Elemento}</td>
                    <td width="15%">{item?.Descricao}</td>
                    <td width="15%">{item?.Desenho}</td>
                    <td width="5%">{item?.Rev}</td>
                    <td width="10%">{item?.GrPos}</td>
                    <td width="5%">{item?.Qtd}</td>
                    <td width="10%">{item?.PesoTot}</td>   
                    <td width="15%">{item?.CWP}</td>
                    <td width="15%">{item?.Tag}</td>                        
                </tr>  
              ))  
            }
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}