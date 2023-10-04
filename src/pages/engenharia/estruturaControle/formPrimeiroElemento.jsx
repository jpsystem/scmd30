//Autor: João Magalhães
//Formulario para edição dos itens
//da estrutura de controle

import { FaThumbsUp, FaRegWindowClose } from 'react-icons/fa'
import { useContext } from "react";
import LoginStyle from "@/styles/login.module.css"
import LocalStyle from "@/styles/formulario.module.css";
import Button from "@/componentes/button/index"
import { PerfilContext } from '../../contexts/perfilContext'


export default function FormPrimeiro({setModalOpen, retornoFilho}){

    //Ler os dados da Encomenda Ativo do Contexto Atual
    const {encomendaAtiva} = useContext(PerfilContext) 

    //Função para ser executada na submissão do formulario
    //quando o mesmo estiver sido validado pelo HOOK UseForm
    const onSubmit = async () =>{
      await inclusao();
      setModalOpen(false);
    }

    //Função para a inclusão do elemento através
    //da API '/api/estruturaControle/cadastro'
    async function  inclusao (){
        try {
            const resposta = await fetch ('/api/estruturaControle/primeiroCadastro', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idEncomenda: encomendaAtiva.idEncomenda,
                })
            });
            const json = await resposta.json();
            console.log("json: ", json)
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

    return(
      <>
        {/* Formulário de Exclusão */}
        <div className={LoginStyle.boxExclusao}>   
            <div className={LoginStyle.corpoExclusão}>
                <div className={LoginStyle.textExclusao}>
                    <p>Essa opção ira criar o primiro elemento da encomenda</p>
                    <p>Com uma descrição padrão e elemento pai 0</p> 
                    <p>Posteriormente voce pode alterar a descrição.</p> 
                    <p className={LoginStyle.destaqueExclusao} >Continuar?</p>
                </div>
                {/* BOTÃO ENVIAR */}
                <div className={LocalStyle.barraBotoes}>
                    <Button  onClick={() => onSubmit()} fontSize="1em" width="50%">Confirmar<FaThumbsUp className={LocalStyle.iconeBotao} /></Button>
                    <Button onClick={() => setModalOpen(false)} fontSize="1em" width="50%">Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} /></Button>
                </div>
            </div>
        </div>                
      </>
    )
}