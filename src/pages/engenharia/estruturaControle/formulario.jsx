//Autor: João Magalhães
//Formulario para edição dos itens
//da estrutura de controle

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

    //carregar o HOOKs UseApiListas para buscar as Familias
    const [carregarFamlias, familiasInfo] = useApiListas({
        url: `/api/combos/familias/${encomendaAtiva.idEncomenda}`,
        // onCompleted: (response) =>{
        //     setValues(response);
        // }
    })

    //carregar o HOOKs UseApiListas para buscar os TAGs
    const [carregarTags, tagsInfo] = useApiListas({
        url: `/api/combos/tags/${encomendaAtiva.idEncomenda}`,
    })

    //Carregar as lista de Familias e TAGs da encomenda
    //no load da Pagina.
    useEffect(()=>{
        carregarFamlias();
        carregarTags();
    },[])

    //Variaveis de estado para controle das opções 
    //dos combos de Familias e de TAGs
    const [opFamilia, setOpFamilia] = useState(campos?.IdFamilia? campos?.IdFamilia: 0);
    const [opTag, setOpTag] = useState(campos?.IdTag? campos?.IdTag: 0);

    //Função para setar as variaveis de estados
    //quando selecionar uma Familia ou um TAG
    const Selecionar = e => {
        if(e.target.id === "IdFamilia") 
            setOpFamilia(e.target.value)
        
        if(e.target.id === "IdTag")
            setOpTag(e.target.value)
    }

    //Função para ser executada na submissão do formulario
    //quando o mesmo estiver sido validado pelo HOOK UseForm
    const onSubmit = async (data) =>{
        if(tipo==="irmao" || tipo==="filho" || tipo==="inclusao"){
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
        try {
            let novoPai = 0;
            if(tipo === "filho"){
                novoPai = campos?.Elemento
            }else{
                novoPai = data?.Pai
            }
            const resposta = await fetch ('/api/estruturaControle/cadastro', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idEncomenda: encomendaAtiva.idEncomenda,
                    idTag:          (opTag===1 ? null: opTag),
                    pai:            novoPai,
                    desenho:        data?.Desenho,
                    grpos:          data?.GrPos,
                    idFamilia:      (opFamilia===1 ? null: opFamilia),
                    esp:            data?.Especificacao,  
                    qtd:            data?.Qtd, 
                    unid:           data?.Unid,
                    peso_unit:      data?.Peso_Unit, 
                    peso_total:     data?.Peso_Total, 
                    tipo:           data?.Tipo,
                    codigo:         data?.Codigo,
                    codigoCWP:      data?.CodigoCWP
                })
            });
            const json = await resposta.json();
            if(resposta.status === 201){
                if(json.elemento > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:`Elemento ${json.elemento}, ${json.menssagem}`, id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:"Não é possivel incluir o elemento!", id: Math.random()})
                }
            } else{
                retornoFilho({tipo:"falha", texto:resposta.error, id: Math.random()})
            }

        } catch (error) {
            retornoFilho({tipo:"falha", texto:error.message, id: Math.random()})
        }
    }

    //Função para a alteração do elemento através
    //da API '/api/estruturaControle/edicao'
    async function  edicao (data){
        try {
            let novoPai = 0;
            if(tipo === "filho"){
                novoPai = campos?.Elemento
            }else{
                novoPai = data?.Pai
            }
            const resposta = await fetch ('/api/estruturaControle/edicao', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id:             data?.id,
                    idTag:          (opTag===1 ? null: opTag),
                    pai:            novoPai,
                    desenho:        data?.Desenho,
                    grpos:          data?.GrPos,
                    idFamilia:      (opFamilia===1 ? null: opFamilia),
                    esp:            data?.Especificacao,  
                    qtd:            data?.Qtd, 
                    unid:           data?.Unid,
                    peso_unit:      data?.Peso_Unit, 
                    peso_total:     data?.Peso_Total, 
                    tipo:           data?.Tipo,
                    codigo:         data?.Codigo,
                    codigoCWP:      data?.CodigoCWP
                })
            });
            const json = await resposta.json();
            retornoFilho({tipo: "",texto: ""});
            if(resposta.status === 201){
                retornoFilho( {tipo:"sucesso", texto:"Os dados do elemento foram alterados com sucesso!", id: Math.random()})
            } else{
                retornoFilho( {tipo:"falha", texto: resposta.error, id: Math.random()})
            }
        } catch (error) {
            retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
        }
    }

    //Função para a excluir o elemento através
    //da API '/api/estruturaControle/exclusao/${data.id}'
    async function  exclusao (data){
        console.log("ID",data?.id)
        try {
            const resposta = await fetch (`/api/estruturaControle/exclusao/${data.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const json = await resposta.json();
            if(resposta.status === 200){
                if(json > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:"Elemento excluido!", id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:"Não é possivel excluir o elemento!", id: Math.random()})
                }
            } else{
                retornoFilho( {tipo:"falha", texto: JSON.stringify(json), id: Math.random()})
            }
        } catch (error) {
            retornoFilho( {tipo:"falha", texto:error.message, id: Math.random()})
        }
    }

    return(
        ( tipo !== "exclusao" ? 
            (
                <>
                    <div className={styles.form}>   
                        <div className={styles.corpoCadastro}>
                            {/* GRUPO 01 */}
                            <div className={styles.grupoR}>
                                {/* ID do Elemento na Estrutura de Controle */}
                                <div className={styles.grupoC}>
                                    <label for="id" className={styles.label}>
                                        ID
                                    </label>
                                    <input
                                        style={{width: "150px"}}
                                        type="text"
                                        id="id"
                                        disabled
                                        className={styles.input}
                                        {...register("id")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label for="Elemento" className={styles.label}>
                                        Elemento
                                    </label>
                                    { tipo === "edicao" ?  
                                        (<input
                                            style={{width: "150px"}}
                                            type="text"
                                            id="Elemento" 
                                            disabled={true}
                                            className={styles.input}
                                            {...register("Elemento")}
                                        />):
                                        (<input
                                            style={{width: "150px"}}
                                            type="text"
                                            id="Elemento"
                                            disabled={true}
                                            value={0} 
                                            className={styles.input}
                                            {...register("Elemento")}
                                        />)
                                    } 
                                    {errors?.elemento?.type === "required" && 
                                        <p className={styles.error}>O campo numero do elemento é obrigatório</p>
                                    }
                                </div>
                                <div className={styles.grupoC}>
                                    <label for="Pai" className={styles.label}>
                                        Elemento Pai
                                    </label>
                                    <input
                                        style={{width: "150px"}}
                                        type="text"
                                        id="Pai"
                                        value={ tipo ==="filho" ? campos?.Elemento : campos?.Pai }
                                        disabled={tipo ==="inclusao" ? false : true}
                                        className={styles.input}
                                        {...register("Pai")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label for="Tipo" className={styles.label}>
                                        Tipo
                                    </label>
                                    <input
                                        style={{width: "150px"}}
                                        type="text"
                                        id="Tipo" 
                                        className={styles.input}
                                        {...register("Tipo")}
                                    />
                                </div>
                                {/* ETC */}
                                <div className={styles.grupoC}>
                                    <label for="Etc" className={styles.label}>
                                        Nº ETC
                                    </label>
                                    <input
                                        style={{width: "150px"}}
                                        type="text"
                                        id="ETC"
                                        disabled
                                        className={styles.input}
                                        {...register("ETC")}
                                    />
                                </div>
                                {/* Data_ETC */}
                                <div className={styles.grupoC}>
                                    <label for="Dt_Etc" className={styles.label}>
                                        Data Etc
                                    </label>
                                    <input
                                        style={{width: "200px"}}
                                        type="text"
                                        id="Dt_Etc"
                                        disabled
                                        className={styles.input}
                                        {...register("Dt_Etc")}
                                    />
                                </div>
                            </div>
                            {/* GRUPO 02 */}
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label for="IdFamilia" className={styles.label}>
                                        Familia
                                    </label>
                                    <select 
                                        className={styles.select}
                                        style={{width: "600px"}}
                                        id="IdFamilia"
                                        value={opFamilia}
                                        onChange={Selecionar}
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
                                <div className={styles.grupoC}>
                                    <label for="IdTag" className={styles.label}>
                                        Tags
                                    </label>
                                    <select 
                                        className={styles.select}
                                        style={{width: "600px"}}
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
                                </div>
                            </div>
                            {/* GRUPO 03 */}
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label for="Qtd" className={styles.label}>
                                        Quantidade
                                    </label>
                                    <input
                                        style={{width: "200px"}}
                                        type="text"
                                        id="Qtd" 
                                        className={styles.input}
                                        {...register("Qtd")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label for="Unid" className={styles.label}>
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
                                    <label for="Peso_Unit" className={styles.label}>
                                        Peso Unit. 
                                    </label>             
                                    <input
                                        style={{width: "200px"}}
                                        type="text"
                                        id="Peso_Unit" 
                                        className={styles.input}
                                        {...register("Peso_Unit")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label for="Peso_Total" className={styles.label}>
                                        Peso Total   
                                    </label>                        
                                    <input
                                        style={{width: "200px"}}
                                        type="text"
                                        id="Peso_Total" 
                                        className={styles.input}
                                        {...register("Peso_Total")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label for="Codigo" className={styles.label}>
                                        Código
                                    </label>
                                    <input
                                        style={{width: "200px"}}
                                        type="text"
                                        id="Codigo" 
                                        className={styles.input}
                                        {...register("Codigo")}
                                    />
                                </div>
                            </div>
                            {/* GRUPO 04 */}
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label for="Desenho" className={styles.label}>
                                        Desenho
                                    </label>
                                    <input
                                        style={{width: "450px"}}
                                        type="text"
                                        id="Desenho" 
                                        className={styles.input}
                                        {...register("Desenho")}
                                    />                           
                                </div>
                                <div className={styles.grupoC}>
                                    <label for="GrPos" className={styles.label}>
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
                                    <label for="CodigoCWP" className={styles.label}>
                                        Código CWP
                                    </label>
                                    <input
                                        style={{width: "500px"}}
                                        type="text"
                                        id="CodigoCWP" 
                                        className={styles.input}
                                        {...register("CodigoCWP")}
                                    />
                                </div>
                            </div>
                            {/* GRUPO 05 */}
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label for="Especificacao" className={styles.label}>
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
                {/* Formulário de Exclusão */}
                <div className={LoginStyle.boxExclusao}>   
                    <div className={LoginStyle.corpoExclusão}>
                        <div className={LoginStyle.textExclusao}>
                            <p>Você está prestes a excluir esse elemento da estrutura de controle!</p>
                            <p>Elemento: {campos?.Elemento}</p> 
                            <p>Especificação: {campos?.Especificacao}</p> 
                            <p className={LoginStyle.destaqueExclusao} >CONFIRMA A EXCLUSÃO?</p>
                        </div>
                        {/* BOTÃO ENVIAR */}
                        <div className={LocalStyle.barraBotoes}>
                            <Button  onClick={() => handleSubmit(onSubmit)()} fontSize="1em" width="50%">Confirmar<FaThumbsUp className={LocalStyle.iconeBotao} /></Button>
                            <Button onClick={() => setModalOpen(false)} fontSize="1em" width="50%">Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} /></Button>
                        </div>
                    </div>
                </div>                
                </>
            )
        )
    )
}