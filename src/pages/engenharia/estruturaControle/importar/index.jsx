//Autor: João Magalhães
//Componente Principal para importação dos itens do desenho
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from 'react'
import styles from '../../../../styles/login.module.css'
import myStyle from "./index.module.css"
import Button from '../../../../componentes/button'
import Etapa1 from "./etapa1"
import Etapa2 from "./etapa2"
import {CSVContext} from "../../../contexts/csvContext"
import {PerfilContext} from "../../../contexts/perfilContext"
import useApiListas from "@/hooks/useApiListas"
//import { edicao } from "../../../services/encomenda"

export default function ImportaLista({pai, setModalOpen}) {
  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva} = useContext(PerfilContext) 

  //carregar o HOOKs UseApiListas
  const [carregarTags, tagsInfo] = useApiListas({
    url: `/api/combos/tags/${encomendaAtiva?.idEncomenda}`,
  })

  //Carrega a lista de Tags da encomenda no load da página
  useEffect(()=>{
    carregarTags();
  },[])

  //Variavel de estado para armazenar o codigo do Tag
  //selecionado no combo
  const [opTag, setOpTag] = useState(0);

  //Setar a variavel de estado opTag com o codigo
  //do tag selecionado
  const Selecionar = e => {
    if(e.target?.id === "idTag"){
        setOpTag(e.target?.value)
    }
  }

  // lendo o contexto CSVContext
  const { dadosCSV, 
          setDadosCSV, 
          nomeDesenho,
          setNomeDesenho, 
          tituloDesenho,
          setTituloDesenho,
          pesoTotal,
          setPesoTotal,
          statusPai,
          setStatusPai,
          statusFilhos,
          setStatusFilhos
  } = useContext(CSVContext)

  //Ao carregar a página de importação
  //limpar o contexto dos dados
  useEffect(() => {
    setDadosCSV(va => va = null);
    setNomeDesenho(va => va = "");
    setTituloDesenho(va => va = "");
    setPesoTotal(va => va = "");
    setStatusPai(va => va = "");
  }, []);

  //Variavel qtdDados para verificar se ativa
  //o botão da Segunda Etapa
  const [qtdDados, setQtdDados] = useState(0);

  //Atualiza a variavel de estado qtdDados no load
  //da página de importação
  useEffect(()=>{
    if(dadosCSV?.length > 0){
      setQtdDados(va => va =dadosCSV?.length)
    }else{
      setQtdDados(va => va = 0)
    }
  },[dadosCSV])

  //Estado para controlar a etapa de importação
  //do arquivo dos itens do desenho
  const [etapa, setEtapa] = useState(1)

  //Estanciar o HOOK UseForm para edição
  //do elemento pai
  const form = useForm({defaultValues: {
    idEncomenda: encomendaAtiva?.idEncomenda,
    desenho: "",
    titulo: "",
    idTag: 0,
    elePai: pai,
    pesoTot: 0.0,
    multLista: 1,
    status: 0,
  }})
  const { register, handleSubmit, formState: {errors}} = form;
  
  //Quando os dados dos itens da lista dadosCSV
  //sofrer auterações atualiza o PesoTotal
  useEffect(()=>{
    const pesoTotal = dadosCSV?.reduce(
      function(acumulador, valorAtual) {
        if(valorAtual?.Sel && valorAtual?.TipoEle !=="I"){
          if(parseFloat(valorAtual?.PesoTot) > 0){
            return acumulador + parseFloat(valorAtual?.PesoTot);
          }else{
            return acumulador
          }
        }else{
          return acumulador
        }
      }, 0.0
    )
    setPesoTotal(va => va = pesoTotal)
  },[dadosCSV])

  //Atualiza o contexto statusFilhos sempre
  //que houver alteração nos dadosCSV
  useEffect( () => {
    const fetchData = async () => {
      const novoStatus = await verificaFilhos()
      setStatusFilhos(va => va = novoStatus)
    }
    fetchData();

  },[dadosCSV])

  //Excutar verificação nos status dos itens para liberar
  //o botão importar sempre que alterar o status de um item  
  async function verificaFilhos(){
      let retorno = false
      let qtdliberados = 0
      let qtdPendentes = 0
      await dadosCSV?.map( (i) => {
          if(i.StatusItem === -1 && i.Sel){
              qtdPendentes ++;
          }else{
              if(i.StatusItem < 2 && i.Sel){
                  qtdliberados ++
              }
          }
      })
      if(qtdPendentes === 0 && qtdliberados > 0){
          retorno = true;
      }
      return retorno
  }


  //Função para ser executada na submissão do formulario
  //quando o mesmo estiver sido validado pelo HOOK UseForm
  const onSubmit = async (data) =>{
    
    data.idTag = opTag;
    data.desenho = nomeDesenho;
    data.titulo = tituloDesenho;
    data.pesoTot = pesoTotal?.toFixed(2);
    const filhos = dadosCSV.filter(st => st.Sel);
    
    //console.log("DADOS DO PAI", data)
    //console.log("DADOS DOS FILHOS", filhos)
    
    // body.push(JSON.stringify(data));
    // body.push(JSON.stringify(filhos))
    // console.log("BODY", body)

    const body = {
      pai: data,
      filhos: filhos
    };

    console.log("BODY", JSON.stringify(body))

    const resposta = await fetch ('/api/estruturaControle/importaLista',{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const json = await resposta.json();
    console.log("Resposta", resposta)
    console.log("JSON", json)
    setModalOpen(false)
  }


  return (    
    <>            
      <div className={myStyle.corpo}>
        {/* Lado Esquerdo onde fica o controle da leitura do arquivo */}
        <div className={myStyle.ladoE}>
          <div className={myStyle.etapas}>
            {etapa === 1 ?
              (<Etapa1/>):
              (<Etapa2/>)
            }
          </div>
          <div className={myStyle.controle}>
                <Button
                  id="btEtapa1"  
                  fontSize={"1em"} 
                  width={"40%"} 
                  onClick={() => setEtapa(1)}
                >
                  Primeira Etapa
                </Button>
                <Button 
                  id="btEtapa2" 
                  fontSize={"1em"} 
                  width={"40%"} 
                  disabled={qtdDados > 0 ? (false):(true)}
                  onClick={() => setEtapa(2)}
                >
                  Segunda Etapa
                </Button>
          </div>
        </div>
        {/* Lado Direito onde fica o formulario do Pai Principal */}
        <div className={myStyle.ladoD}>
          {/*Mostra aviso só se estiver na etapa 2 */}
          {etapa === 2 &&
            <div className={myStyle.aviso}>
              {
                statusPai === 0 &&
                  <>
                  <h1 style={{color: '#269026'}}>Novo desenho!</h1>
                  <h2>Será gerado um elemento pai novo para o desenho</h2>
                  </>
              }
              {
                statusPai === 1 &&
                  <> 
                  <h1>Desenho já cadastrado!</h1>
                  <h2>Os itens ja cadstrado no desenho, se não tiverem ETC, serão atualizados</h2>
                  </>
              }
            </div>
          }
          <form className={myStyle.forme}>          
            <div style={{width: "90%"}}> 
              {/*Numero do Desenho */}   
              <label className={styles.label}>
                  NºDesenho
                  <input  type="text"
                      id="desenho"
                      value={nomeDesenho? nomeDesenho: ""}  
                      className={myStyle.input}
                      {...register("desenho")}
                  />
              </label>
            </div>
            <div style={{width: "90%"}}>    
              {/*Titulo */}
              <label className={myStyle.label}>
                Titulo
                <textarea
                  id="titulo"
                  className={myStyle.comentario}
                  value={tituloDesenho? tituloDesenho:""}
                  {...register("titulo")}
                />          
              </label>    
            </div>
            <div style={{width: "90%"}}>  
              {/*TAG */}  
              <label className={myStyle.label}>
                TAG
                <select 
                  id="idTag"
                  value={opTag}
                  {...register("idTag", {validate: (value) => {
                    return value != "0"
                  } } )}
                  className={myStyle.select}
                  // style={{width: "500px"}}

                  onChange={Selecionar}
                >
                {
                  tagsInfo?.loading ? (
                    <option key={0} value={0}>
                        Carregando...
                    </option>
                  ):
                  (
                    tagsInfo?.data?.length === 0 ? 
                    (
                      <option key={0} value={0}>
                          Nenhum resultado encontrado
                      </option> 
                    ):
                    (
                      <>
                        <option key={0} value={0}>
                            Selecione um Tag
                        </option>
                        {
                          tagsInfo?.data?.map( (item, i) =>
                            <option 
                              key={i+1} 
                              value={item?.value}
                            >
                              {item?.label}
                            </option>
                          )
                        }
                      </>
                    )
                  )
                } 
                </select>
                {errors?.idTag?.type === "validate" && 
                      <p className={myStyle.error}>O necessário selecionar um Tag</p>
                }
              </label>
            </div>
            <div className={myStyle.emLinha}>    
              <div style={{width: "25%"}}> 
                {/* Elemento Pai */}
                <label className={myStyle.label}>
                  Pai
                  <input  type="text"
                    id="elePai"
                    // value={pai}
                    className={myStyle.input}
                    disabled
                    {...register("elePai")}
                  />
                </label>
              </div>
              <div style={{width: "65%"}}>
                {/* Peso Total */}
                <label className={myStyle.label}>
                  Peso Total
                  <input  type="text"
                    id="pesoTot"
                    className={myStyle.input}
                    value={pesoTotal? pesoTotal?.toFixed(2):""}
                    disabled
                    {...register("pesoTot")}
                  />
                </label>
              </div> 
            </div>
            {/* Multiplicar Lista */}
            <div className={myStyle.multLista}>    
                <div > 
                  <label className={myStyle.label}>
                    Mult.Lista X
                  </label>
                </div>
                <div style={{width: "30%"}}>
                  <input  type="text"
                    id="multLista"
                    className={myStyle.input2}
                    // defaultValue={1}
                    {...register("multLista")}
                  /> 
                </div>
            </div>
          </form>
          {/* Controle do botões */}
          <div className={[myStyle.emLinha]}>    
              <Button
                id="btImportar" 
                onClick={() => handleSubmit(onSubmit)()} 
                fontSize={"1.2em"} 
                width={"45%"}
                // disabled= {etapa===2 ? false: true}
                disabled= {statusFilhos ? false: true}
              >
                Importar
              </Button>
              <Button 
                id="btFechar"
                onClick={() => setModalOpen(false)}
                fontSize={"1.2em"}
                width={"45%"}
              >
                Fechar
              </Button>
          </div>
        </div>
      </div>
    </> 
  )
}
