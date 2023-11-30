//Formulario para edição dos itens selecionados
//na segunda etapa da importação

import { useContext, useState, useEffect, useMemo } from 'react'
import { useForm } from "react-hook-form";
import styles from "../formulario.module.css"
import {CSVContext} from "../../../contexts/csvContext"
import {PerfilContext} from "../../../contexts/perfilContext"
import useApiListas from "@/hooks/useApiListas";
import { FaPaperPlane, FaRegWindowClose } from 'react-icons/fa'
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../../componentes/button/index"

export default function Formulario({item, setModalOpen}){
    //Ler os dados da Encomenda Ativo do Contexto Atual
    const {encomendaAtiva} = useContext(PerfilContext) 

    //carregar o HOOKs UseApiListas
    const [carregarFamilias, familiasInfo] = useApiListas({
        url: `/api/combos/familias/${encomendaAtiva.idEncomenda}`,
    })

    //Executar a função CarregarFamilias no load da pagina.
    useEffect(()=>{
        carregarFamilias();
        //setOpFamilia(va => va = item?.IdFamilia? item?.IdFamilia: 0)
    },[])

    //Variavel de estado para controle das opções dos select Familias
    const [opFamilia, setOpFamilia] = useState(item?.IdFamilia? item?.IdFamilia: 0);

    //Função para atualizar a variavel de estado opFamilia
    //Com o codigo da familia selecionada no cambo
    const Selecionar = async e => {
        if(e?.target.id === "IdFamilia"){
            setOpFamilia(va => va = e?.target.value)
        }
    }

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
        GrPos: item?.Grupo + item?.Posicao,
        Qtd: item?.Qtd,
        Peso: item?.PesoTot,
        Descricao: item?.Descricao,
        Obs: item?.Obs,
        IdFamilia: item?.IdFamilia,
        TipoEle: item?.TipoEle,
        Unidade: item?.Unidade,
        Material: item?.Material,
        Esp: espElemento,
        CWP: item?.CWP,
    }})
    const { register, handleSubmit, formState: {errors} } = form;

    //Executa função para atualizar descrição do 
    //elemento pai apnes no load da página
    useEffect(() => {        
        setEspElemento( prev => 
            item?.Descricao 
            + " - " 
            + item?.Material
            + " - " 
            + item?.Obs 
        )
        
    }, []);   

    //Executa função para atualizar descrição do 
    //elemento quando o campo Observação for alterado   
    const atualizaEsp= (e) => {
        setEspElemento( prev => 
            item?.Descricao 
            + " - " 
            + item?.Material
            + " - " 
            + e.target.value
        )
    }

    //Retornar status 0 [Novo] se já foi definido uma familia
    //Se não retorna -1{Pendente]
    const statusItem = async (data) => {
        let retStatus = -1
        // if(data.IdFamilia > 0){
        if(opFamilia > 0){
            retStatus = 0
        }
        return retStatus;
    }

    //Função para ser executada na submissão do formulario
    //quando o mesmo estiver sido validado pelo HOOK UseForm
    const onSubmit =  async (data) =>{
        //Pega o nome da failia na coleção
        const familia = await familiasInfo?.data?.find(fan => fan.value == opFamilia);
        //const retStatus = await buscaStatusItem(data?.GrPos).then((resposta) => {return resposta})
        const retStatus = await statusItem(data).then((resposta) => {return resposta})
        // const retStatus = 0;
        await setDadosCSV(
            //prevState contem os dados atuais de dadosCSV
             prevState => {
                //Criu um novo estado para atualizar o item especifico
                //com os dados do formulário
                const  newState =  prevState.map( (i) => {
                    
                    if(i.id === item?.id){
                        return { 
                            ...i,
                            Obs: data?.Obs,
                            CWP: data?.CWP,
                            IdFamilia: opFamilia,
                            Familia: familia?.label,
                            TipoEle: data?.TipoEle,
                            Unidade: data?.Unidade,
                            StatusItem: retStatus
                            //[event.target.name]: event.target.checked 
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
                {/* GRUPO 01 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            GrPos
                        </label>
                        <input
                            style={{width: "200px"}}
                            type="text"
                            id="GrPos" 
                            disabled={true}
                            className={styles.input}
                            {...register("GrPos")}
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Qtd
                        </label>
                        <input
                            style={{width: "200px"}}
                            type="text"
                            id="Qtd" 
                            disabled={true}
                            className={styles.input}
                            {...register("Qtd")}
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Peso
                        </label>
                        <input
                            style={{width: "200px"}}
                            type="text"
                            id="Peso" 
                            disabled={true}
                            className={styles.input}
                            {...register("Peso")}
                        />
                    </div>
                </div>
                {/* GRUPO 02 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Descrição
                        </label>
                        <textarea
                            style={{width: "600px"}}
                            id="Descricao" 
                            className={styles.text}
                            disabled={true}
                            //defaultValues={itemEdicao?.Descricao}
                            {...register("Descricao")}
                        />
                    </div>
                </div>
                {/* GRUPO 03 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Observação
                        </label>
                        <textarea
                            style={{width: "600px"}}
                            id="Obs" 
                            className={styles.text}
                            //defaultValues={itemEdicao?.Obs}
                            onChange={(e)=>atualizaEsp(e)}
                            {...register("Obs")}
                        />
                    </div>
                </div>
                {/* GRUPO 04 */}
                <div className={styles.grupoR}>
                    <div style={{width: "80%"}}>  
                        {/*Familia */}  
                        <label for="IdFamilia" className={styles.label}>
                            Familia
                        </label>
                        <select 
                            id="IdFamilia"
                            value={opFamilia}
                            // {...register("IdFamilia", {validate: (value) => {
                            //     return value != "0"
                            // }})}
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
                                        familiasInfo?.data?.map( (it, i) =>
                                            <option 
                                            key={i+1} 
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
                    <div style={{width: "15%"}}>  
                        {/*TIPO */}  
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
                </div>
                {/* ERROS GRUPO 04 */}
                <div className={styles.grupoC}>
                    {errors?.IdFamilia?.type === "validate" && 
                        <p className={styles.error}>O necessário selecionar uma familia</p>
                    }
                    {errors?.TipoEle?.type === "validate" && 
                        <p className={styles.error}>O necessário selecionar o Tipo do elemento</p>
                    }
                </div> 


                {/* GRUPO INCLUSÃO DO CWP */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Desenho CWP
                        </label>
                        <input
                            style={{width: "600px"}}
                            type="text"
                            id="CWP" 
                            className={styles.input}
                            {...register("CWP")}
                        />
                    </div>                        
                </div>             

                {/* GRUPO 05 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Unid
                        </label>
                        <input
                            style={{width: "200px"}}
                            type="text"
                            id="Unidade" 
                            className={styles.input}
                            {...register("Unidade")}
                        />
                    </div>                        
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Material
                        </label>
                        <input
                            style={{width: "400px"}}
                            type="text"
                            id="Material" 
                            className={styles.input}
                            disabled={true}
                            {...register("Material")}
                        />
                    </div>
                </div> 
                {/* GRUPO 06 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Especificação do Elemento
                        </label>
                        <textarea
                            style={{width: "600px"}}
                            id="Esp" 
                            className={styles.text}
                            disabled={true}
                            value={espElemento}
                            {...register("Esp")}
                        />
                    </div>
                </div>
                {/* GRUPO 7 */}
                <div className={styles.grupoR} style={{marginTop: "30px"}}>
                    <Button 
                        onClick={() => handleSubmit(onSubmit)()} 
                        fontSize="1em" width="80%"
                    >
                        Enviar<FaPaperPlane className={LocalStyle.iconeBotao} />
                    </Button>
                    <Button  
                        onClick={() => setModalOpen(false)}
                        fontSize="1em" width="80%"
                    >
                        Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} />
                    </Button>
                </div>
            </div>
        </div>
        </>
        
    )
}