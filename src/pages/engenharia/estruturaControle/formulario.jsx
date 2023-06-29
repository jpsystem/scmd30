import { useForm } from "react-hook-form";
import { FaPaperPlane, FaThumbsUp, FaRegWindowClose } from 'react-icons/fa'
import { useEffect, useState, useContext } from "react";
import styles from "./formulario.module.css"
import LoginStyle from "@/styles/login.module.css"
import LocalStyle from "@/styles/formulario.module.css";
import Button from "@/componentes/button/index"
import { PerfilContext } from '../../contexts/perfilContext'
import useApiListas from "@/hooks/useApiListas";


export default function Formulario({campos, tipo, setModalOpen, retornoFilho}){
   

    //Estanciar o HOOK UseForm
    const form = useForm({defaultValues: campos})
    const { register, handleSubmit, formState: {errors}} = form;


    //Ler os dados da Encomenda Ativo do Contexto Atual
    const {encomendaAtiva} = useContext(PerfilContext) 

    //carregar o HOOKs UseApiListas
    const [carregarFamlias, familiasInfo] = useApiListas({
        url: `/api/combos/familias/${encomendaAtiva.idEncomenda}`,
        // onCompleted: (response) =>{
        //     setValues(response);
        // }
    })
    const [carregarTags, tagsInfo] = useApiListas({
        url: `/api/combos/tags/${encomendaAtiva.idEncomenda}`,
    })

    useEffect(()=>{
        carregarFamlias();
        carregarTags();
    },[])


    //Função para ser executada na submissão do formulario
    //quando o mesmo estiver sido validado pelo HOOK UseForm
    const onSubmit = async (data) =>{
        console.log("DATA",data)
        if(tipo==="inclusao"){
            await inclusao(data);
            setModalOpen(false);
        }
        if(tipo==="edicao"){
            await edicao(data);
            setModalOpen(false);
        }
        if(tipo==="exclusao"){
            await exclusao(data);
            setModalOpen(false);
        }
    }

    //Função para a inclusão do elemento através
    //da API '/api/estruturaControle/cadastro'
    async function  inclusao (data){

    }

    //Função para a alteração do elemento através
    //da API '/api/estruturaControle/edicao'
    async function  edicao (data){

    }

    //Função para a excluir o elemento através
    //da API '/api/estruturaControle/exclusao/${data.id}'
    async function  exclusao (data){

    }

    return(
        ( tipo !== "exclusao" ? 
            (
                <>
                    <div className={styles.form}>   
                        <div className={styles.corpoCadastro}>
                            {/* GRUPO 01 */}
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Elemento
                                    </label>
                                    { tipo === "edicao" ?  
                                        (<input
                                            style={{width: "400px"}}
                                            type="text"
                                            id="Elemento" 
                                            value={campos?.Elemento}
                                            className={styles.input}
                                            {...register("Elemento", {required: true})}
                                        />):
                                        (<input
                                            style={{width: "400px"}}
                                            type="text"
                                            id="Elemento" 
                                            className={styles.input}
                                            {...register("Elemento", {required: true})}
                                        />)
                                    }   
                                    {errors?.elemento?.type === "required" && 
                                        <p className={styles.error}>O campo numero do elemento é obrigatório</p>
                                    }
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Elemento Pai
                                    </label>
                                    <input
                                        style={{width: "400px"}}
                                        type="text"
                                        id="Pai" 
                                        className={styles.input}
                                        {...register("Pai")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Tipo
                                    </label>
                                    <input
                                        style={{width: "400px"}}
                                        type="text"
                                        id="Tipo" 
                                        className={styles.input}
                                        {...register("Tipo")}
                                    />
                                </div>
                            </div>
                            {/* GRUPO 02 */}
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Familia
                                    </label>
                                    <select 
                                        className={styles.select}
                                        style={{width: "600px"}}
                                        id="Familia"
                                        {...register("Familia", {required: true})}
                                    >

                                    {
                                        familiasInfo?.loading ? (
                                            <option key={0} value={1}>
                                                Carregando...
                                            </option>
                                        ):
                                        (
                                            familiasInfo?.data?.length === 0 ? 
                                            (
                                                <option key={0} value={1}>
                                                    Nenhum resultado encontrado
                                                </option> 
                                            ):
                                            (
                                                <>
                                                    <option key={0} value={1}>
                                                        Selecione uma Familia
                                                    </option>
                                                   {
                                                        familiasInfo?.data?.map( (item, i) =>
                                                                <option 
                                                                    key={i+1} 
                                                                    value={item.value}
                                                                    
                                                                >
                                                                    {item.label}
                                                                </option>
                                                        )
                                                    }
                                                </>

                                            )
                                        )
                                    } 
                                    </select>
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Tags
                                    </label>
                                    <select 
                                        className={styles.select}
                                        style={{width: "600px"}}
                                        id="Tag"
                                        {...register("Tag", {required: true})}
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
                                                                    value={item.value}
                                                                >
                                                                    {item.label}
                                                                </option>
                                                        )
                                                    }
                                                </>

                                            )
                                        )
                                    } 
                                    </select>
                                </div>
                            </div>
                            {/* GRUPO 03 */}
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Quantidade
                                    </label>
                                    <input
                                            style={{width: "200px"}}
                                            type="text"
                                            id="Qtd" 
                                            className={styles.input}
                                            {...register("Qtd", {required: true})}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Unidade
                                    </label>
                                    <input
                                        style={{width: "200px"}}
                                        type="text"
                                        id="Unid" 
                                        className={styles.input}
                                        {...register("Unid")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Peso Unit.
                                    </label>
                                    <input
                                            style={{width: "400px"}}
                                            type="text"
                                            id="Peso_Unit" 
                                            className={styles.input}
                                            {...register("Peso_Unit", {required: true})}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Peso Total
                                    </label>
                                    <input
                                        style={{width: "400px"}}
                                        type="text"
                                        id="Peso_Total" 
                                        className={styles.input}
                                        {...register("Peso_Total")}
                                    />
                                </div>
                            </div>
                            {/* GRUPO 04 */}
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Desenho
                                    </label>
                                    <input
                                            style={{width: "600px"}}
                                            type="text"
                                            id="Desenho" 
                                            className={styles.input}
                                            {...register("Desenho", {required: true})}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Grupo/Posição
                                    </label>
                                    <input
                                        style={{width: "300px"}}
                                        type="text"
                                        id="GrPos" 
                                        className={styles.input}
                                        {...register("GrPos")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Código
                                    </label>
                                    <input
                                            style={{width: "300px"}}
                                            type="text"
                                            id="Codigo" 
                                            className={styles.input}
                                            {...register("Codigo", {required: true})}
                                    />
                                </div>
                            </div>
                            {/* GRUPO 05 */}
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Especificação
                                    </label>
                                    <textarea
                                        id="Especificacao" 
                                        className={styles.text}
                                        {...register("Especificacao")}
                                    />
                                </div>
                            </div>
                            {/* GRUPO 6 */}
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
            ):
            (
                <>
                <div className={LoginStyle.boxExclusao}>   
                    <div className={LoginStyle.corpoExclusão}>
                        <div className={LoginStyle.textExclusao}>
                            <p>Você está prestes a excluir esse elemento da estrutura de controle!</p>
                            <p>Elemento: {campos.Elemento}</p> 
                            <p>Especificação: {campos.Especificacao}</p> 
                            <p className={LoginStyle.destaqueExclusao} >CONFIRMA A EXCLUSÃO?</p>
                        </div>
                        {/* BOTÃO ENVIAR */}
                        <div className={LocalStyle.barraBotoes}>
                            <Button  onClick={() => handleSubmit(onSubmit)()} fontSize="1em" width="50%">Confirmar<FaThumbsUp className={LocalStyle.iconeBotao} /></Button>
                            <Button onClick={() => setModalOpen(false)} fontSize="1em" width="50%">Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} /></Button>
                            {/* <Button onClick={setModalOpen(false)} >Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} /></Button> */}
                        </div>
                    </div>
                </div>                
                </>
            )
        )
    )
}