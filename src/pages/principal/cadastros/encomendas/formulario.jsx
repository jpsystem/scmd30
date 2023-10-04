//Autor: João Magalhães
//Componente principal para o formulario da Encomenda.

import { useForm } from "react-hook-form";
import { FaPaperPlane, FaThumbsUp, FaRegWindowClose } from 'react-icons/fa'
import styleLogin from "../../../../styles/login.module.css"
import styles from "./formulario.module.css"
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../../componentes/button/index"


export default function Formulario({campos, tipo, setModalOpen, retornoFilho}){
    
    //Estanciar o HOOK UseForm
    console.log("CAMPOS", campos)
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

    //Função para a inclusão da encomenda através
    //da API '/api/encomenda/cadastro'
    async function  inclusao (data){
        try {

            const resposta = await fetch ('/api/encomenda/cadastro', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    codEncomenda: data.codEncomenda,
                    cliente: data.cliente,
                    razao: data.razao,
                    endereco: data.endereco,
                    localObra: data.localObra,
                    localSetor: data.localSetor,
                    ref_cliente: data.ref_cliente,
                    descricao: data.descricao,
                    dt_pedido: trataData(data.dt_pedido),
                    dt_entrega: trataData(data.dt_entrega),
                    contatoETC: data.contatoETC,
                    deptoETC: data.deptoETC,
                    contato_cml: data.contato_cml,
                    contato_tec: data.contato_tec,
                    coord_proj: data.coord_proj,
                    coord_eng: data.coord_eng,
                    sepaTMSA: data.sepaTMSA,
                    sepaCRet: data.sepaCRet,
                    sepaCEmi: data.sepaCEmi,
                    prazoTMSA: Number(data.prazoTMSA),
                    prazoCli: Number(data.prazoCli),
                    prazoFor: Number(data.prazoFor),
                    pastaDoc: data.pastaDoc,
                    pastaDes: data.pastaDes,
                    pastaGuias: data.pastaGuias,
                })
            });
            
            const json = await resposta.json();
            
            if(resposta.status === 201){
                if(json.encomendaID > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:json.menssagem, id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:json.menssagem, id: Math.random()})
                }
            } else{
                retornoFilho( {tipo:"falha", texto:json.menssagem, id: Math.random()})
            }

        } catch (error) {
            retornoFilho({tipo:"falha", texto:error.message, id: Math.random()})
        }
    } 

    function trataData(sDate ){
        if(sDate){
            return sDate
        }else{
            return null
        }
    }
    //Função para a alteração da encomenda através
    // da API '/api/encomenda/edicao'
    async function  edicao (data){
        try {
            const resposta = await fetch ('/api/encomenda/edicao', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: data.id,
                    cliente: data.cliente,
                    razao: data.razao,
                    endereco: data.endereco,
                    localObra: data.localObra,
                    localSetor: data.localSetor,
                    ref_cliente: data.ref_cliente,
                    descricao: data.descricao,
                    dt_pedido: trataData(data.dt_pedido),
                    dt_entrega: trataData(data.dt_entrega),
                    contatoETC: data.contatoETC,
                    deptoETC: data.deptoETC,
                    contato_cml: data.contato_cml,
                    contato_tec: data.contato_tec,
                    coord_proj: data.coord_proj,
                    coord_eng: data.coord_eng,
                    sepaTMSA: data.sepaTMSA,
                    sepaCRet: data.sepaCRet,
                    sepaCEmi: data.sepaCEmi,
                    prazoTMSA: Number(data.prazoTMSA),
                    prazoCli: Number(data.prazoCli),
                    prazoFor: Number(data.prazoFor),
                    pastaDoc: data.pastaDoc,
                    pastaDes: data.pastaDes,
                    pastaGuias: data.pastaGuias,
                })
            });
            const json = await resposta.json();
            // retornoFilho({tipo: "",texto: ""});
            if(resposta.status === 201){
                if(json.affectedRows > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:"Os dados da encomenda foram alterados com sucesso!", id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:"Não houve alteração nos dados da encomenda!", id: Math.random()})
                }
            } else{
                retornoFilho( {tipo:"falha", texto: json, id: Math.random()})
            }
        } catch (error) {
            retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
        }
    }

    //Função para excluir a encomenda através
    // da API /api/encomenda/exclusao/${data.id}
    async function  exclusao (data){
        try {
            const resposta = await fetch (`/api/encomenda/exclusao/${data.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const json = await resposta.json();
            if(resposta.status === 200){
                if(json > 0)
                {
                    retornoFilho( {tipo:"sucesso", texto:"Encomenda excluida!", id: Math.random()})
                }else{
                    retornoFilho( {tipo:"falha", texto:"Não é possivel excluir a encomenda!", id: Math.random()})
                }
            } else{
                retornoFilho( {tipo:"falha", texto: json, id: Math.random()})
            }
        } catch (error) {
            retornoFilho( {tipo:"falha", texto: error.message, id: Math.random()})
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
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Cod.Encomenda
                            </label>
                            { tipo === "edicao" ?  
                                (<input
                                    maxLength={8}
                                    style={{width: "250px"}}
                                    type="text"
                                    id="codEncomenda" 
                                    value={campos?.codEncomenda}
                                    className={styles.input}
                                    {...register("codEncomenda", {required: true, maxLength: 8, minLength: 5})}
                                />):
                                (<input
                                    style={{width: "250px"}}
                                    type="text"
                                    id="codEncomenda" 
                                    className={styles.input}
                                    {...register("codEncomenda", {required: true, maxLength: 8, minLength: 5})}
                                />)
                            }   
                            {errors?.codEncomenda?.type === "required" && 
                                <p className={styles.error}>O campo codigo da encomenda é obrigatório</p>
                            }
                            {errors?.codEncomenda?.type === "maxLength" && 
                                <p className={styles.error}>O campo codigo da encomenda só pode ter no maximo 8 caracteres!</p>
                            }
                        </div>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Cliente
                            </label>
                            <input
                                type="text"
                                id="cliente" 
                                className={styles.input}
                                {...register("cliente",{maxLength: 25})}
                            />
                            {errors?.cliente?.type === "maxLength" && 
                                <p className={styles.error}>O campo cliente só pode ter no maximo 25 caracteres!</p>
                            }                         
                        </div>
                    </div>
                    {/* GRUPO 02 */}
                    <div className={styles.grupoR}>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Razão Social
                            </label>
                            <input
                                style={{width: "1300px"}}
                                type="text"
                                id="razao" 
                                className={styles.input}
                                {...register("razao",{maxLength: 60})}
                            />
                            {errors?.razao?.type === "maxLength" && 
                                <p className={styles.error}>O campo Razão Social só pode ter no maximo 60 caracteres!</p>
                            }
                        </div>
                    </div>
                    {/* GRUPO 03 */}
                    <div className={styles.grupoR}>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Endereço
                            </label>
                            <textarea
                                id="endereco" 
                                className={styles.text}
                                {...register("endereco",{maxLength: 100})}
                            />
                            {errors?.endereco?.type === "maxLength" && 
                                <p className={styles.error}>O campo Endereço só pode ter no maximo 100 caracteres!</p>
                            }
                        </div>
                    </div>
                    {/* GRUPO 04 */}
                    <div className={styles.grupoR}>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Local da Obra
                            </label>
                            <input
                                style={{width: "420px"}}
                                type="text"
                                id="localObra" 
                                className={styles.input}
                                {...register("localObra",{maxLength: 40})}
                            />
                            {errors?.localObra?.type === "maxLength" && 
                                <p className={styles.error}>O campo Local da Obra só pode ter no maximo 40 caracteres!</p>
                            }
                        </div>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Local/Setor
                            </label>
                            <input
                                style={{width: "420px"}}
                                type="text"
                                id="localSetor" 
                                className={styles.input}
                                {...register("localSetor",{maxLength: 30})}
                            />
                            {errors?.cliente?.type === "maxLength" && 
                                <p className={styles.error}>O campo Local/Setor só pode ter no maximo 30 caracteres!</p>
                            }
                        </div>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Ref. Cliente
                            </label>
                            <input
                                style={{width: "420px"}}
                                type="text"
                                id="ref_cliente" 
                                className={styles.input}
                                {...register("ref_cliente",{maxLength: 30})}
                            />
                            {errors?.cliente?.type === "maxLength" && 
                                <p className={styles.error}>O campo Ref. Cliente só pode ter no maximo 30 caracteres!</p>
                            }
                        </div>
                    </div>
                    {/* GRUPO 05 */}
                    <div className={styles.grupoR}>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Descrição do Projeto
                            </label>
                            <textarea
                                id="descricao" 
                                className={styles.text}
                                {...register("descricao")}
                            />
                        </div>
                    </div>
                    {/* GRUPO 06 */}
                    <div className={styles.grupoR}>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Data do Pedido
                            </label>
                            <input
                                style={{width: "310px"}}
                                type="date"
                                id="dt_pedido" 
                                className={styles.input}
                                {...register("dt_pedido")}
                            />
                        </div>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Data da Entrega
                            </label>
                            <input
                                style={{width: "310px"}}
                                type="date"
                                id="dt_entrega" 
                                className={styles.input}
                                {...register("dt_entrega")}
                            />
                        </div>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Contato ETC
                            </label>
                            <input
                                style={{width: "310px"}}
                                type="text"
                                id="contatoETC" 
                                className={styles.input}
                                {...register("contatoETC",{maxLength: 25})}
                            />
                            {errors?.contatoETC?.type === "maxLength" && 
                                <p className={styles.error}>O campo Contato ETC só pode ter no maximo 25 caracteres!</p>
                            }
                        </div>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Depto. ETC
                            </label>
                            <input
                                style={{width: "310px"}}
                                type="text"
                                id="deptoETC" 
                                className={styles.input}
                                {...register("deptoETC",{maxLength: 25})}
                            />
                            {errors?.deptoETC?.type === "maxLength" && 
                                <p className={styles.error}>O campo Depto. ETC só pode ter no maximo 25 caracteres!</p>
                            }
                        </div>
                    </div>
                    {/* GRUPO 07 */}
                    <div className={styles.grupoR}>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Contato Comercial
                            </label>
                            <input
                                style={{width: "310px"}}
                                type="text"
                                id="contato_cml" 
                                className={styles.input}
                                {...register("contato_cml",{maxLength: 75})}
                            />
                            {errors?.contato_cml?.type === "maxLength" && 
                                <p className={styles.error}>O campo Contato Comercial só pode ter no maximo 75 caracteres!</p>
                            }
                        </div>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Contato Técnico
                            </label>
                            <input
                                style={{width: "310px"}}
                                type="text"
                                id="contato_tec" 
                                className={styles.input}
                                {...register("contato_tec",{maxLength: 75})}
                            />
                            {errors?.contato_tec?.type === "maxLength" && 
                                <p className={styles.error}>O campo Contato Técnico só pode ter no maximo 75 caracteres!</p>
                            }
                        </div>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Coord.Projeto
                            </label>
                            <input
                                style={{width: "310px"}}
                                type="text"
                                id="coord_proj" 
                                className={styles.input}
                                {...register("coord_proj",{maxLength: 25})}
                            />
                            {errors?.coord_proj?.type === "maxLength" && 
                                <p className={styles.error}>O campo Coord.Projeto só pode ter no maximo 25 caracteres!</p>
                            }                            
                        </div>
                        <div className={styles.grupoC}>
                            <label className={styles.label}>
                                Coord. Engenharia
                            </label>
                            <input
                                style={{width: "310px"}}
                                type="text"
                                id="coord_eng" 
                                className={styles.input}
                                {...register("coord_eng",{maxLength: 25})}
                            />
                            {errors?.coord_eng?.type === "maxLength" && 
                                <p className={styles.error}>O campo Coord.Engenharia só pode ter no maximo 25 caracteres!</p>
                            }  
                        </div>
                    </div>
                    {/* GRUPO 08 */}
                    <div className={styles.grupoR} style={{marginTop: "20px"}} >
                        <div className={styles.grupoSC}>
                            <label className={styles.titleGroupS}>Separadores:</label>
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        TMSA
                                    </label>
                                    <input
                                        style={{width: "180px"}}
                                        type="text"
                                        id="sepaTMSA" 
                                        className={styles.input}
                                        {...register("sepaTMSA",{maxLength: 10})}
                                    />
                                    {errors?.sepaTMSA?.type === "maxLength" && 
                                        <p className={styles.error}>O campo Separador TMSA só pode ter no maximo 10 caracteres!</p>
                                    }                                      
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Cliente-Ref
                                    </label>
                                    <input
                                        style={{width: "180px"}}
                                        type="text"
                                        id="sepaCRet" 
                                        className={styles.input}
                                        {...register("sepaCRet",{maxLength: 10})}
                                    />
                                    {errors?.sepaCRet?.type === "maxLength" && 
                                        <p className={styles.error}>O campo Separador Cliente-Ref só pode ter no maximo 10 caracteres!</p>
                                    }                                        
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Cliente-Emiss
                                    </label>
                                    <input
                                        style={{width: "180px"}}
                                        type="text"
                                        id="sepaCEmi" 
                                        className={styles.input}
                                        {...register("sepaCEmi",{maxLength: 10})}
                                    />
                                    {errors?.sepaCEmi?.type === "maxLength" && 
                                        <p className={styles.error}>O campo Separador Cliente-Emiss só pode ter no maximo 10 caracteres!</p>
                                    }                                     
                                </div>
                            </div>
                        </div>
                        <div className={styles.grupoSC}>
                            <label className={styles.titleGroupS }
                                style={{width: "300px"}}
                            >
                                Atender Comentarios:
                            </label>
                            <div className={styles.grupoR}>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        TMSA
                                    </label>
                                    <input
                                        style={{width: "180px"}}
                                        type="text"
                                        id="prazoTMSA" 
                                        className={styles.input}
                                        {...register("prazoTMSA",{valueAsNumber: true})}
                                    />
                                    {errors?.prazoTMSA?.type === "valueAsNumber" && 
                                        <p className={styles.error}>O campo Prazo TMSA deve ser numerico!</p>
                                    }                                      
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Cliente
                                    </label>
                                    <input
                                        style={{width: "180px"}}
                                        type="text"
                                        id="prazoCli" 
                                        className={styles.input}
                                        {...register("prazoCli",{valueAsNumber: true})}
                                    />
                                    {errors?.prazoCli?.type === "valueAsNumber" && 
                                        <p className={styles.error}>O campo Prazo Cliente deve ser numerico!</p>
                                    }                                      
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Fornecedor
                                    </label>
                                    <input
                                        style={{width: "180px"}}
                                        type="text"
                                        id="prazoFor" 
                                        className={styles.input}
                                        {...register("prazoFor",{valueAsNumber: true})}
                                    />
                                    {errors?.prazoFor?.type === "valueAsNumber" && 
                                        <p className={styles.error}>O campo Prazo Fornecedor deve ser numerico!</p>
                                    }                                      
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* GRUPO 09 */}
                    <div className={styles.grupoSC} style={{width: "100%", marginTop: "30px"}} >
                            <label className={styles.titleGroupS}
                                    style={{width: "360px"}}
                            >
                                Pastas de Armazenamento:
                            </label>
                            <div className={styles.grupoC}>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Envio de Documentos
                                    </label>
                                    <input
                                        style={{width: "1250px"}}
                                        type="text"
                                        id="pastaDoc" 
                                        className={styles.input}
                                        {...register("pastaDoc")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Envio de Desenhos
                                    </label>
                                    <input
                                        style={{width: "1250px"}}
                                        type="text"
                                        id="pastaDes" 
                                        className={styles.input}
                                        {...register("pastaDes")}
                                    />
                                </div>
                                <div className={styles.grupoC}>
                                    <label className={styles.label}>
                                        Arquivos de Guias
                                    </label>
                                    <input
                                        style={{width: "1250px"}}
                                        type="text"
                                        id="pastaGuias" 
                                        className={styles.input}
                                        {...register("pastaGuias")}
                                    />
                                </div>
                            </div>
                        </div>
                    {/* GRUPO 10 */}
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
                    <div className={styleLogin.boxExclusao}>   
                        <div className={styleLogin.corpoExclusão}>
                            <div className={styleLogin.textExclusao}>
                                <p>Você está prestes a excluir essa encomenda do sistema!</p>
                                <p>Codigo: {campos.codEncomenda}</p> 
                                <p>Cliente: {campos.cliente}</p> 
                                <p className={styleLogin.destaqueExclusao} >CONFIRMA A EXCLUSÃO?</p>
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