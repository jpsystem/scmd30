import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaThumbsUp, FaRegWindowClose} from 'react-icons/fa'

import styles from "../../../../styles/login.module.css"
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../../componentes/button/index"

import { useState } from "react";
import {PerfilContext} from "../../../contexts/perfilContext"



export default function Formulario({campos, tipo, setModalOpen, retornoFilho}){
    //Ler os dados da Encomenda Ativo do Contexto Atual
    const {encomendaAtiva} = useContext(PerfilContext)
 
    //Estanciar o HOOK UseForm
    const form = useForm({defaultValues: campos})
    const { register, handleSubmit, formState: {errors} } = form;
    
    //Função para ser executada na submissão do formulario
    //quando o mesmo estiver sido validado pelo HOOK UseForm
    const onSubmit = async (data) =>{
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
    
    //Função para a inclusão da familia através
    //da API '/api/user/cadastro'
    async function  inclusao (data){
        try {
            const resposta = await fetch ('/api/familia/cadastro', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idEncomenda: encomendaAtiva.idEncomenda,
                    familia:  data.familia,
                    especificacao: data.especificacao,
                    cod_Erp: data.cod_Erp,
                    enc: encomendaAtiva.codEncomenda,
                })
            });
            const json = await resposta.json();
            if(resposta.status === 201){
                if(json[0][0].idFamilia > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:"Familia incluida com sucesso!", id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:"Não é possivel incluir familia com mesmo nome!", id: Math.random()})
                }
            } else{
                retornoFilho({tipo:"falha", texto:resposta.error, id: Math.random()})
            }

        } catch (error) {
            retornoFilho({tipo:"falha", texto:error.message, id: Math.random()})
        }
    } 

    //Função para a alteração do usuário através
    // da API '/api/familia/edicao'
    async function  edicao (data){
        try {
            const resposta = await fetch ('/api/familia/edicao', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    especificacao: data.especificacao,
                    cod_Erp: data.cod_Erp,
                    id: data.id,
                })
            });
            const json = await resposta.json();
            retornoFilho({tipo: "",texto: ""});
            if(resposta.status === 201){
                retornoFilho( {tipo:"sucesso", texto:"Os dados da familia foram alterados com sucesso!", id: Math.random()})
            } else{
                retornoFilho( {tipo:"falha", texto: resposta.error, id: Math.random()})
            }
        } catch (error) {
            retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
        }
    }

    //Função para excluir a familia através
    // da API /api/familia/exclusao/${data.id}
    async function  exclusao (data){
        try {
            const resposta = await fetch (`/api/familia/exclusao/${data.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const json = await resposta.json();
            if(resposta.status === 200){
                if(json > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:"Familia excluida!", id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:"Não é possivel excluir a familia!", id: Math.random()})
                }
            } else{
                retornoFilho( {tipo:"falha", texto: resposta.error, id: Math.random()})
            }
        } catch (error) {
            retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
        }       
    }
    
    return(
        ( tipo !== "exclusao" ? 
        (
            <>
            {/* FORMULÁRIO */}
            <div className={styles.form}>   
                <div className={styles.corpoCadastro}>
                    {/* Encomenda */}
                    <label className={styles.label}>
                        Encomenda
                    </label>
                    <input  type="text"
                            id="codEncomenda"
                            value={encomendaAtiva?.codEncomenda}
                            className={styles.input}
                            {...register("codEncomenda")}
                    />
                    {/* Nome */}
                    <label className={styles.label}>
                        Familia
                    </label>
                    { tipo === "edicao" ?
                        (<input  type="text"
                                id="familia"
                                value={campos.familia}
                                className={styles.input}
                                {...register("familia", {required: true,  })}
                        />):
                        (<input  type="text"
                                id="familia"
                                className={styles.input}
                                {...register("familia", {required: true,  })}
                        />
                        )
                    }
                    {errors?.familia?.type === "required" && 
                        <p className={styles.error}>O campo familia é obrigatório</p>
                    }

                    {/* Email */}
                    <label className={styles.label}>
                        Especificação
                    </label>
                    <input  type="espcificacao" 
                            id="especificacao"
                            className={styles.input}
                            {...register("especificacao")} 
                    />

                    {/* Cargo */}
                    <label className={styles.label}>
                        Cod_ERP
                    </label>
                    <input  type="text"
                            id="cod_Erp"
                            className={styles.input}
                            {...register("cod_Erp")} 
                    />
                    {/* BOTÃO ENVIAR */}                              
                    <div className={LocalStyle.barraBotoes}>
                        <Button onClick={() => handleSubmit(onSubmit)()} 
                            fontSize="1em" width="80%">
                                Enviar<FaPaperPlane className={LocalStyle.iconeBotao} />
                        </Button>
                        <Button onClick={() => setModalOpen(false)} fontSize="1em" width="80%">Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} /></Button>
                    </div>
                </div>
            </div> 
            </>
            ):
            (
                <>
                <div className={styles.boxExclusao}>   
                    <div className={styles.corpoExclusão}>
                        <div className={styles.textExclusao}>
                            <p>Você está prestes a excluir essa familia do sistema!</p>
                            <p>Familia: {campos.familia}</p> 
                            <p>Especificação: {campos.especificacao}</p> 
                            <p className={styles.destaqueExclusao} >CONFIRMA A EXCLUSÃO?</p>
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

