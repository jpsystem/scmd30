//Formulario para edição dos itens selecionados em grupo
//para edição em lote na segunda etapa da importação

import { useContext, useState, useEffect, useMemo } from 'react'
import { useForm } from "react-hook-form";
import styles from "../formulario.module.css"
import {CSVContext} from "../../../contexts/csvContext"
import {PerfilContext} from "../../../contexts/perfilContext"
import useApiListas from "@/hooks/useApiListas";
import { FaPaperPlane, FaRegWindowClose } from 'react-icons/fa'
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../../componentes/button/index"

export default function FormEdicaoGrupo({item, setModalOpen}){
  //Ler os dados da Encomenda Ativo do Contexto Atual
  const {encomendaAtiva} = useContext(PerfilContext) 


  //carregar o HOOKs UseApiListas
  const [carregarFamilias, familiasInfo] = useApiListas({
    url: `/api/combos/familias/${encomendaAtiva.idEncomenda}`,
  })

  //Variavel de estado para controle das opções dos select Familias
  const [opFamilia, setOpFamilia] = useState(0);
  
  //Função para atualizar a variavel de estado opFamilia
  //Com o codigo da familia selecionada no cambo
  const Selecionar = async e => {
    if(e?.target.id === "IdFamilia"){
        setOpFamilia(va => va = e?.target.value)
    }
  }    

  //Executar a função CarregarFamilias no load da pagina.
  useEffect(()=>{
    carregarFamilias();
    setOpFamilia(va => va = item?.IdFamilia? item?.IdFamilia: 0)
  },[])

  //Carregar as variaveis de Cotexto do arquivoCSV
  const { 
    setDadosCSV, 
    nomeDesenho
  } = useContext(CSVContext)

  //Variavel de estado para controle da edição da
  //especificação do item
  const [espElemento, setEspElemento] = useState("");  

  //carregar o HOOKs useForm
  const form = useForm({defaultValues:{ 
    IdFamilia: item?.IdFamilia,
    TipoEle: item?.TipoEle,
    Unidade: item?.Unidade,
    CWP: item?.CWP
  }})
  const { register, handleSubmit, formState: {errors} } = form;

  //Função para ser executada na submissão do formulario
  //quando o mesmo estiver sido validado pelo HOOK UseForm
  const onSubmit =  async (data) =>{
    //Pega o nome da failia na coleção
    const familia = await familiasInfo?.data?.find(fan => fan.value == opFamilia);

    //Atualiza os dadosCSV
    await setDadosCSV(
      //prevState contem os dados atuais de dadosCSV
      prevState => {
        //Criu um novo estado para atualizar o item especifico
        //com os dados do formulário
        const  newState =  prevState.map( (i) => { 
          //Se for um item do grupo selecionado atualiza   
          if(i.SelGrupo)
          {
            return {
              ...i,
              IdFamilia: opFamilia,
              Familia: familia?.label,
              TipoEle: data?.TipoEle,
              Unidade: data?.Unidade,
              StatusItem: 0,
              SelGrupo: false,
              CWP: data?.CWP                      
            }
          }else{
            return i
          }
        })
        //Retorna o novo estado atual com as alterações
        //para atualizar.
        return newState                          
      }
    )
    //Fecha o formulário
    setModalOpen(false);   
  }

  return(
    <>
    <div className={styles.form}>   
      <div className={styles.corpoCadastro}>
        <div className={styles.grupoC}>
          {/*Familia */}  
          <label className={styles.label}>
            Familia
          </label>
          <select
            style={{width: "600px"}}
            id="IdFamilia"
            {...register("IdFamilia", {validate: (value) => {
              return value != "0"
            }})}
            className={styles.select}
            onChange={async (e)=>{await Selecionar(e)}}
          >
            {
              familiasInfo?.loading ? 
              (
                <option key={0} value={0}>
                  Carregando...
                </option>
              ):
              (
                familiasInfo?.data?.length === 0 ? 
                (
                  <option key={0} value={0}>
                    Nenhum resultado encontrado
                  </option> 
                ):
                (
                  <>
                    <option key={0} value={0}>
                      Selecione uma Familia
                    </option>
                    {
                      familiasInfo?.data?.map( (item, i) =>
                        <option key={i+1} value={item?.value}>
                          {item?.label}
                        </option>
                      )
                    }
                  </>
                )
              )
            } 
          </select>
          <div className={styles.grupoR}>
            {/*TIPO */}  
            <div className={styles.grupoC}>
              <label className={styles.label}>
                  Tipo
              </label>
              <select 
                className={styles.select}
                id="TipoEle"
                {...register("TipoEle", {validate: (value) => {
                    return value != ""
                }})}
              >
                <option key={0} value={""}> </option>
                <option key={1} value={"C"}>C</option>
                <option key={2} value={"F"}>F</option>
                <option key={3} value={"I"}>I</option>
              </select> 
            </div>
            {/* Unidade */}
            <div className={styles.grupoC}>
              <label className={styles.label}>
                Unidade
              </label>
              <input
                  style={{height: "50px", width:"300px"}}
                  type="text"
                  id="Unidade" 
                  className={styles.input}
                  {...register("Unidade")}
              /> 
            </div>                
          </div>
          {/*Desenho CWP */}
          <div className={styles.grupoR}>
            <div className={styles.grupoC}>
              <label className={styles.label}>
                Desenho CWP
              </label>
              <input
                  style={{height: "50px", width:"600px"}}
                  type="text"
                  id="CWP" 
                  className={styles.input}
                  {...register("CWP")}
              /> 
            </div>                
          </div>
        </div>
        {/* BOTOES */}
        <div className={styles.grupoR} style={{marginTop: "30px"}}>
          <Button 
            onClick={() => handleSubmit(onSubmit)()} 
            fontSize="1em" 
          >
            Enviar<FaPaperPlane className={LocalStyle.iconeBotao} />
          </Button>
          <Button  
            onClick={() => setModalOpen(false)}
            fontSize="1em"
          >
            Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} />
          </Button>
        </div>
      </div>   
    </div>
    </>
  )

}