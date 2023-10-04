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
  
    //Função para a inclusão do tag através
    //da API '/api/tag/cadastro'
    async function  inclusao (data){
      try {
          const resposta = await fetch ('/api/tag/cadastro', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  idEncomenda: encomendaAtiva.idEncomenda,
                  tag:  data.tag,
                  enc: encomendaAtiva.codEncomenda,
              })
          });
          const json = await resposta.json();
          if(resposta.status === 201){
              if(json.tagID > 0)
              {
                  retornoFilho( {tipo:"sucesso", texto:"TAG incluido com sucesso!", id: Math.random()})
              }else{
                  retornoFilho( {tipo:"falha", texto:"Não é possivel incluir TAG com mesmo nome!", id: Math.random()})
              }
          } else{
              retornoFilho({tipo:"falha", texto:resposta.error, id: Math.random()})
          }

      } catch (error) {
          retornoFilho({tipo:"falha", texto:error.message, id: Math.random()})
      }
  }   

    //Função para a alteração do Tag através
    // da API '/api/tag/edicao'
    async function  edicao (data){
      
      try {
          const resposta = await fetch ('/api/tag/edicao', {
              method: 'PUT',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                idEncomenda: encomendaAtiva.idEncomenda,
                tag: data.tag,
                id: data.id,
              })
          });
          const json = await resposta.json();
          retornoFilho({tipo: "",texto: ""});
          if(resposta.status === 201){
              retornoFilho( {tipo:"sucesso", texto:"Os dados do Tag foram alterados com sucesso!", id: Math.random()})
          } else{
              retornoFilho( {tipo:"falha", texto: "O TAG não pode ser alterado", id: Math.random()})
          }
      } catch (error) {
          retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
      }
  }

      //Função para excluir o Tag através
    // da API /api/tag/exclusao/${data.Id}
    async function  exclusao (data){
      try {
          const resposta = await fetch (`/api/tag/exclusao/${data.id}`, {
              method: 'DELETE',
              headers: {
                  "Content-Type": "application/json"
              },
          });
          const json = await resposta.json();
          if(resposta.status === 200){
              if(json > 0)
              {
                  retornoFilho( {tipo:"sucesso", texto:"TAG excluido!", id: Math.random()})
              }else{
                  retornoFilho( {tipo:"falha", texto:"Não é possivel excluir o Tag!", id: Math.random()})
              }
          } else{
              retornoFilho( {tipo:"falha", texto: "Não é possivel excluir o Tag!", id: Math.random()})
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
                      id="CodEncomenda"
                      value={encomendaAtiva?.codEncomenda}
                      className={styles.input}
                      {...register("CodEncomenda")}
              />              
              {/* TAG */}
              <label className={styles.label}>
                  TAG
              </label>
              <input  type="text"
                      id="tag"
                      className={styles.input}
                      {...register("tag", {required: true,  })}
              />
              {errors?.tag?.type === "required" && 
                  <p className={styles.error}>O campo TAG é obrigatório</p>
              }
                {/* BOTÃO ENVIAR */}                              
                <div className={LocalStyle.barraBotoes}>
                  <Button onClick={() => handleSubmit(onSubmit)()} 
                      fontSize="1em" width="80%">
                          Enviar<FaPaperPlane className={LocalStyle.iconeBotao} />
                  </Button>
                  <Button onClick={() => setModalOpen(false)} 
                    fontSize="1em" width="80%">
                    Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} />
                  </Button>
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
                    <p>Você está prestes a excluir esse TAG do sistema!</p>
                    <p>Familia: {campos.tag}</p>  
                    <p className={styles.destaqueExclusao} >CONFIRMA A EXCLUSÃO?</p>
                </div>
                {/* BOTÃO ENVIAR */}
                <div className={LocalStyle.barraBotoes}>
                    <Button  onClick={() => handleSubmit(onSubmit)()} 
                      fontSize="1em" width="50%">
                      Confirmar<FaThumbsUp className={LocalStyle.iconeBotao} />
                    </Button>
                    <Button onClick={() => setModalOpen(false)} 
                      fontSize="1em" width="50%">
                      Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} />
                    </Button>
                </div>
            </div>
        </div>
        </>        
      )
    )
  )
}