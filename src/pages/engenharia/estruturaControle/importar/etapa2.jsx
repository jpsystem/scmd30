//Componente GRID para exibir e controlar as itens
//selecionadas da lista de exportação (Etapa 2)

import { useContext, useEffect, useState } from 'react'
import myStyle from "./etapas.module.css"
import {CSVContext} from "../../../contexts/csvContext"
import Modal from "../../../../componentes/modal";
import Formulario from './formulario';
import FormEdicaoGrupo from './formEdicaoGrupo';
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from '@/componentes/button';
import { FaPaperPlane } from 'react-icons/fa'

export default function Etapa2(){

    //Carrega dados do contexto CSVContext
    const {dadosCSV,setDadosCSV} = useContext(CSVContext)

    //Variavel de estado para controle do formulario Modal
    const [openModal, setOpenModal] = useState(false)

    //Variavel de estado para controle do segundo formulario Modal
    const [openModal2, setOpenModal2] = useState(false)

    //Variavel de estado para os dados do item em edição
    const [itemEdit, setItemEdit] = useState(0)

//=================================================================
    //Variavel de estado para controle do check SelTodos
    const [opSelTodos, setSelTodos] = useState(false);

    //Variavel de estado para controle do botão EditarLote
    const [opBotao, setOpBotao] = useState(false);

    function selTodos(event){
        setOpBotao( va => va =  event.target.checked)
        setSelTodos( va => va =  event.target.checked)
    
        setDadosCSV(
          //prevState contem os dados atuais de itensPendentes
          prevState => {
            //Criu um novo estado para atualizar os itens
            //com o valor atual do campo "SelItem"
            const newState = prevState.map((item) => {
              return { 
                  ...item,
                  SelGrupo: event.target.checked 
              }
            }) 
            //Retorna o novo estado atual com as alterações
            //para atualizar.
            return newState    
          }      
        )
      }

    //função que verifica e atualiza o Estado SelTodos
    //verificando os campos SelGrupo da lista de dadosCSV
    function testaLista(){
        let total = 0;
        let ligados = 0;

        dadosCSV.forEach((item)=>{
        total ++;
        if(item.SelGrupo){
            ligados++;
        }
        })
        if(ligados > 0){
        if(ligados === total){
            setSelTodos(va => va = true)
        }
        return true
        }
        setSelTodos(va => va = false)
        return false  
    }
//==================================================================

    //função para para setar os dados do item na variavel
    //que será passada por parametro para o formulario
    function formEdit(item){
        setItemEdit(item);
        setOpenModal(true);
    }

    //Função para atualizar o array dadosCSV quando
    //for alterado os chekbox dos itens
    function handleChange(id, event){

        if(!event.target.checked){
            setSelTodos( va => va =  event.target.checked)
        }

        setDadosCSV(
            //prevState contem os dados atuais de dadosCSV
            prevState => {
                //Criu um novo estado para atualizar o item especifico
                //com o valor atual do campo "Sel"
                const newState = prevState.map((item) => {
                    if(item.id === id){
                        return { 
                            ...item,
                            [event.target.name]: event.target.checked 
                        }
                    }
                    //se não encontrou o item especifico retorna
                    //os dados originais
                    return item
                })
                
                //Retorna o novo estado atual com as alterações
                //para atualizar.
                return newState
            }
        )

    }

    //Variavel de estado para armazenar valores para
    //alteração em lote
    const [altercaoLote, setAuteracaoLote] = useState({
        status: false,
        idFamilia: 0,
        unidade: "",
        tipo:""
    });


    //Excutar verificação nos seleções dos itens para edição em lote
    //e liberar o botão editar lote  
    async function verificaLotes(){
        let retorno = {
            status: false,
            idFamilia: 0,
            unidade: "",
            tipo:""        
        }
        let qtdSel = 0
        //let qtdPendentes = 0
        await dadosCSV?.map( (i) => {
            if(i.SelGrupo){
                qtdSel ++;
                if(qtdSel === 1){
                    retorno.status = true;
                    retorno.idFamilia = i.IdFamilia;
                    retorno.unidade = i.Unidade;
                    retorno.tipo = i.Tipo;
                }
            }
        })
        return retorno;
    }

    //Atualizao estado alteracaoLote sempre
    //que houver alteração nos dadosCSV
    useEffect( () => {
        const fetchData = async () => {
            const novosDados = await verificaLotes()
            setAuteracaoLote(va => va = novosDados)
        }
        fetchData();

        setOpBotao( va => va = testaLista())

    },[dadosCSV])   

    return(
        <>
        
        {/* LINHA ACIMA DA TABELA */}
        <div className={myStyle.linhaTopo}>
            <div className={myStyle.controle}>
                <input
                    type="checkbox" 
                    name="SelTodos" 
                    id="SelTodos" 
                    checked={opSelTodos}
                    className={myStyle.selecaoTodos}
                    onChange={(event)=>selTodos(event)}          
                />
                <label for="SelTodos" className={myStyle.label}>Selecionar todos.</label>
            </div>                
            <div className={myStyle.controle}>
                <Button
                    fontSize={"1.2rem"} 
                    onClick={()=> setOpenModal2(!openModal2)}
                    width={"300px"}      
                    height={"40px"}
                    disabled= {opBotao ? false: true}
                >
                    Editar Selecionados<FaPaperPlane className={LocalStyle.iconeBotao} />
                </Button>
            </div>
        </div>

        <div className={myStyle.Etapas}>
            <div className={myStyle.itensLista}>
                <table className={myStyle.tabela}>
                    <thead>
                        <tr>
                            <th width="5%">Sel.</th>
                            <th width="15%">Status</th>
                            <th width="6%">Grp/Pos</th>
                            <th width="6%">Qtd</th>
                            <th width="5%">Unid.</th>
                            <th width="20%">Descrição</th>
                            <th  width="12%">Obs.</th>
                            <th  width="8%">Material</th>
                            <th  width="8%">Peso</th>
                            <th  width="10%">Familia</th>
                            <th  width="5%">Tipo</th>
                            {/* <th  width="5%">Edit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dadosCSV?.map((item) => (
                                item?.Sel && 
                                
                                <tr key={item.id}>
                                    <td width="5%">
                                        <input 
                                            type="checkbox" 
                                            name="SelGrupo" 
                                            checked={item?.SelGrupo}
                                            className={myStyle.selecao}
                                            onChange={(event)=>handleChange(item.id, event)}
                                        />
                                    </td>

                                    {item?.StatusItem === -1 && <td onClick={() =>  formEdit(item)} width="15%" className={myStyle.yellow}><span className={myStyle.texto}>Pendente</span></td>}
                                    {item?.StatusItem ===  0 && <td onClick={() =>  formEdit(item)} width="15%" className={myStyle.green}><span className={myStyle.texto}>Novo</span></td>}
                                    {item?.StatusItem ===  1 && <td onClick={() =>  formEdit(item)} width="15%" className={myStyle.yellow}><span className={myStyle.texto}>Alterar</span></td>}
                                    {item?.StatusItem ===  2 && <td onClick={() =>  formEdit(item)} width="15%" className={myStyle.gray}><span className={myStyle.texto}>Bloqueado</span></td>}

                                    <td width="6%">{item?.Grupo}{item?.Posicao}</td>
                                    <td width="6%">{item?.Qtd}</td>
                                    <td width="5%">{item?.Unidade}</td>
                                    <td width="20%">{item?.Descricao}</td>
                                    <td width="12%">{item?.Obs}</td>
                                    <td width="8%">{item?.Material}</td>
                                    <td width="8%">{(isNaN(item?.Peso) ? 0 : item?.Peso)}</td>
                                    <td width="10%">{item?.Familia}</td>
                                    <td width="5%">{item?.TipoEle}</td> 
                                    {/* <td width="5%">                                
                                        <a key={item.id} onClick={() =>  formEdit(item)}>
                                            <FaRegEdit/>  
                                        </a>
                                    </td>                            */}
                                </tr>  
                                
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

        {/* {
            altercaoLote.status &&
            <div>
                <Button 
                    onClick={()=> setOpenModal2(!openModal2)}
                    fontSize="1em"
                >
                    Editar Selecionados<FaPaperPlane className={LocalStyle.iconeBotao} />
                </Button>
            </div>
        } */}

        {/* MODAL PARA O FORMLÁRIO  width="80%"*/}
        <Modal 
            isOpen={openModal} 
            setModalOpen={()=> setOpenModal(!openModal)}
            titulo="Edição do Item"
        >
            <Formulario item={itemEdit}
                setModalOpen={()=> setOpenModal(!openModal)} 
            />
        </Modal>
        {/* MODAL PARA O FORME DE EDIÇÃO EM LOTE */}
        <Modal 
            isOpen={openModal2} 
            setModalOpen={()=> setOpenModal2(!openModal2)}
            titulo="Edição em Lote!"
        >
            <FormEdicaoGrupo item={ {IdFamilia: (altercaoLote.idFamilia), TipoEle:  (altercaoLote.tipo), Unidade:  (altercaoLote.unidade)}}
                setModalOpen={()=> setOpenModal2(!openModal2)} 
            />
        </Modal> 

        </>

    )
}