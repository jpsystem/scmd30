import { useForm } from "react-hook-form";
import { FaPaperPlane, FaThumbsUp, FaTimesCircle, FaRegWindowClose } from 'react-icons/fa'

import styles from "../../../../styles/login.module.css"
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../componentes/button/index"
import { useState } from "react";


export default function Formulario({campos, tipo, setModalOpen, retornoFilho}){
    let tipoFormulario = tipo.replace('"', '');
    tipoFormulario = tipoFormulario.replace('"', '');
    const form = useForm({defaultValues: campos})

    const { register, handleSubmit, formState: {errors} } = form;

    const onSubmit = async (data) =>{
        if(tipoFormulario==="inclusao"){
            await inclusao(data);
            setModalOpen(false);
        }
        if(tipoFormulario==="edicao"){
            await edicao(data);
            setModalOpen(false);
        }
        if(tipoFormulario==="exclusao"){
            await exclusao(data);
            setModalOpen(false);
        }
    }
    

    async function  inclusao (data){
        try {
            const resposta = await fetch ('/api/user/cadastro', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    login: data.login,
                    nome:  data.nome,
                    eMail: data.eMail,
                    cargo: data.cargo,
                    senha: data.senha,
                    administrador: data.administrador,
                })
            });
            const json = await resposta.json();
            if(resposta.status === 201){
                if(json[0][0].idUsuario > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:"Usuário incluido com sucesso!", id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:"Não é possivel incluir usuário com login ou email já cadastrado!", id: Math.random()})
                }
                // setModalOpen(false);
            } else{
                retornoFilho({tipo:"falha", texto:resposta.error, id: Math.random()})
            }

        } catch (error) {
            retornoFilho({tipo:"falha", texto:error.message, id: Math.random()})
        }
    }

    async function  edicao (data){
        try {
            const resposta = await fetch ('/api/user/edicao', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: data.id,
                    login: data.login,
                    nome:  data.nome,
                    eMail: data.eMail,
                    cargo: data.cargo,
                    senha: data.senha,
                    administrador: data.administrador,
                })
            });
            const json = await resposta.json();
            retornoFilho({tipo: "",texto: ""});
            if(resposta.status === 201){
                if(json[0][0].idUsuario > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:"Os dados do usuário foram alterados com sucesso!", id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:"Não é possivel alterar, os dados já pertence a outro usuário!", id: Math.random()})
                }
            } else{
                retornoFilho( {tipo:"falha", texto: resposta.error, id: Math.random()})
            }
        } catch (error) {
            retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
        }
    }

    async function  exclusao (data){
        try {
            const resposta = await fetch (`/api/user/exclusao/${data.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify({
                //     id: data.id,
                // })
            });
            const json = await resposta.json();
            // console.log("JSON", json)
            // console.log("RESPOSTA", resposta)
            if(resposta.status === 200){
                if(json > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:"Usuário excluido!", id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:"Não é possivel excluir o usuário!", id: Math.random()})
                }
            } else{
                retornoFilho( {tipo:"falha", texto: resposta.error, id: Math.random()})
            }
        } catch (error) {
            retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
        }
    }
    return(
        ( tipoFormulario !== "exclusao" ? 
        
            (
            <>
            {/* FORMULÁRIO */}
            <p>{JSON.stringify(tipoFormulario !== "exclusao")}</p>
            <div className={styles.form}>   
                <div className={styles.corpoCadastro}>
                    {/* Login */}
                    <label className={styles.label}>Login</label>
                    <input  type="text" 
                            id="login"
                            name="login"
                            className={styles.input}
                            {...register("login", {required: true,maxLength: 10 })}/>                     
                    {errors?.login?.type === "required" && 
                        <p className={styles.error}>O campo login é obrigatório</p>
                    }
                    {errors?.login?.type === "maxLength" && 
                        <p className={styles.error}>O campo login deve ter no maximo 10 caracteres!</p>
                    }
                    {/* Nome */}
                    <label className={styles.label}>Nome</label>
                    <input  type="text"
                            id="nome"
                            className={styles.input}
                            {...register("nome", {required: true,  })}
                    />                   
                    {errors?.nome?.type === "required" && 
                        <p className={styles.error}>O campo nome é obrigatório</p>
                    }
                    {/* Email */}
                    <label className={styles.label}>Email</label>
                    <input  type="email" 
                            id="eMail"
                            className={styles.input}
                            {...register("eMail")} 
                    />
                    {/* Cargo */}
                    <label className={styles.label}>Cargo</label>
                    <input  type="text"
                            id="cargo"
                            className={styles.input}
                            {...register("cargo")} 
                    />
                    {/* Senha */}
                    <label className={styles.label}>Senha</label>
                    <input  type="password"
                            id="senha"
                            className={styles.input}
                            {...register("senha", {required: true, maxLength: 10, minLength: 2 })} 
                    />    
                    {errors?.senha?.type === "required" && 
                        <p className={styles.error}>O campo senha é obrigatório</p>
                    }
                    {errors?.senha?.type === "maxLength" && 
                        <p className={styles.error}>O campo senha deve ter no maximo 10 caracteres!</p>
                    }
                    {errors?.senha?.type === "minLength" && 
                        <p className={styles.error}>O campo senha deve ter no minimo 2 caracteres!</p>
                    }
                    {/* Admin */}
                    <label className={styles.label}>Admin</label>
                    <input  type="checkbox"
                            id="administrador"
                            className={styles.input}
                            {...register("administrador")} 
                    /> 
                    {/* BOTÃO ENVIAR */}
                    <div className={LocalStyle.barraBotoes}>
                        <Button onClick={() => handleSubmit(onSubmit)()}>Enviar<FaPaperPlane className={LocalStyle.iconeBotao} /></Button>
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
                            <p>Você está prestes a excluir esse usuário do sistema!</p>
                            <p>Login: {campos.login}</p> 
                            <p>Nome: {campos.nome}</p> 
                            <p className={styles.destaqueExclusao} >CONFIRMA A EXCLUSÃO?</p>
                        </div>
                        {/* BOTÃO ENVIAR */}
                        <div className={styles.botoesExclusao}>
                            <Button  onClick={() => handleSubmit(onSubmit)()} >Confirmar<FaThumbsUp className={LocalStyle.iconeBotao} /></Button>
                            {/* <Button onClick={setModalOpen(false)} >Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} /></Button> */}
                        </div>
                    </div>
                </div>
                </>
            )
    
        )

    )
}

