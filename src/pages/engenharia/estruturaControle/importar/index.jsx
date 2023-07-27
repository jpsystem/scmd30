//Autor: João Magalhães
//Componente Principal para importação dos itens do desenho

import { useForm } from "react-hook-form";
import {useContext, useEffect, useState } from 'react'
import styles from '../../../../styles/login.module.css'
import myStyle from "./index.module.css"
import Button from '../../../../componentes/button'
import Etapa1 from "./etapa1"
import Etapa2 from "./etapa2"
import {CSVContext} from "../../../contexts/csvContext"
import {PerfilContext} from "../../../contexts/perfilContext"
import useApiListas from "@/hooks/useApiListas";


export default function ImportaLista({pai}) {

  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva} = useContext(PerfilContext) 

  //carregar o HOOKs UseApiListas
  const [carregarTags, tagsInfo] = useApiListas({
    url: `/api/combos/tags/${encomendaAtiva.idEncomenda}`,
  })

  useEffect(()=>{
    carregarTags();
  },[])

  //Estados para controle das opções dos selects
  const [opTag, setOpTag] = useState(1);
  const Selecionar = e => {
    if(e.target.id === "IdTag")
        setOpTag(e.target.value)
  }

  // lendo o contexto CSVContext
  const { dadosCSV, 
          setDadosCSV, 
          nomeDesenho,
          setNomeDesenho, 
          tituloDesenho,
          setTituloDesenho,
  } = useContext(CSVContext)

  const pesoTotal = dadosCSV?.reduce(
    function(acumulador, valorAtual) {
      if(valorAtual?.Sel ){
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

  //Ao carregar a página de importação
  //limpar o contexto dos dados
  useEffect(() => {
    setDadosCSV(null);
    setNomeDesenho("");
    console.log("Passe aqui 1")
  }, []);
  useEffect(() => {
    setTituloDesenho("");
    console.log("Passe aqui 2",nomeDesenho," - ", tituloDesenho);
  }, [nomeDesenho]);


  //Variavel qtdDados para verificar se ativa
  //o botão da Segunda Etapa
  let qtdDados = dadosCSV?.length;
  if(qtdDados === undefined) {qtdDados = 0}

  //Estado para controlar a etapa de importação
  //do arquivo dos itens do desenho
  const [etapa, setEtapa] = useState(1)

  //Estanciar o HOOK UseForm
  const form = useForm({defaultValues: {
    desenho: nomeDesenho,
    titulo: "",
    idTag: 0,
    elePai: pai,
    pesoTot: 0.0,
    multLista: 1,
    status: 0,
  }})
  const { register, handleSubmit, formState: {errors}} = form;


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
                  fontSize={"1em"} 
                  width={"40%"} 
                  onClick={() => setEtapa(1)}
                >
                  Primeira Etapa
                </Button>
                <Button  
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
          <div style={{width: "80%"}}> 
            {/*Numero do Desenho */}   
            <label className={styles.label}>
                NºDesenho
            </label>
            <input  type="text"
                id="desenho"
                value={nomeDesenho}  
                className={myStyle.input}
                {...register("desenho")}
                disabled
            />
          </div>
          <div style={{width: "80%"}}>    
            {/*Titulo */}
            <label className={myStyle.label}>
              Titulo
            </label>
            <textarea
              id="titulo"
              className={myStyle.comentario}
              value={tituloDesenho}
              {...register("titulo")}
            />  
          </div>
          <div style={{width: "80%"}}>  
            {/*TAG */}  
            <label className={myStyle.label}>
                TAG
            </label>
            <select 
              className={myStyle.select}
              // style={{width: "500px"}}
              id="IdTag"
              value={opTag}
              onChange={Selecionar}
            >
            {
              tagsInfo?.loading ? (
                <option key={0} value={1}>
                    Carregando...
                </option>
              ):
              (
                tagsInfo?.data?.length === 0 ? 
                (
                  <option key={0} value={1}>
                      Nenhum resultado encontrado
                  </option> 
                ):
                (
                  <>
                    <option key={0} value={1}>
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
          </div>
          <div className={myStyle.emLinha}>    
            <div style={{width: "20%"}}> 
              {/* Elemento Pai */}
              <label className={myStyle.label}>
                Pai
              </label>
              <input  type="text"
                id="elePai"
                // value={pai}
                className={myStyle.input}
                disabled
                {...register("elePai")}
              />
            </div>
            <div style={{width: "40%"}}>
              {/* Peso Total */}
              <label className={myStyle.label}>
                Peso Total
              </label>
              <input  type="text"
                id="pesoTot"
                className={myStyle.input}
                defaultValue={pesoTotal?.toFixed(2)}
                disabled
                {...register("pesoTot")}
              />                       
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
          {/* Controle do botões */}
          <div className={[myStyle.emLinha]}>    
              <Button disabled fontSize={"1.2em"} width={"45%"}>Importar</Button>
              <Button fontSize={"1.2em"} width={"45%"}>Fechar</Button>
          </div>
        </div>
      </div>
    </> 
  )
}
