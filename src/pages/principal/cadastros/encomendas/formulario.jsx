import { useForm } from "react-hook-form";
import { FaPaperPlane, FaThumbsUp, FaRegWindowClose } from 'react-icons/fa'

import styles from "./formulario.module.css"
import LocalStyle from "../../../../styles/formulario.module.css";
import Button from "../../../../componentes/button/index"


export default function Formulario({campos, tipo, setModalOpen, retornoFilho}){
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

    return(
        <>
        <div className={styles.form}>   
            <div className={styles.corpoCadastro}>
                {/* GRUPO 01 */}
                <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Cod.Encomenda
                        </label>
                        <input
                            style={{width: "250px"}}
                            type="text"
                            id="codEncomenda" 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Cliente
                        </label>
                        <input
                            type="text"
                            id="codEncomenda" 
                            className={styles.input}
                        />
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
                            id="codEncomenda" 
                            className={styles.input}
                        />
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
                        />
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
                        />
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
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Ref. Cliente
                        </label>
                        <input
                            style={{width: "420px"}}
                            type="text"
                            id="refCliente" 
                            className={styles.input}
                        />
                    </div>
                </div>
                 {/* GRUPO 05 */}
                 <div className={styles.grupoR}>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Descrição do Projeto
                        </label>
                        <textarea
                            id="descProjeto" 
                            className={styles.text}
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
                            id="dtPedido" 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Data da Entrega
                        </label>
                        <input
                            style={{width: "310px"}}
                            type="date"
                            id="dtEntrega" 
                            className={styles.input}
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
                        />
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
                        />
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
                            id="contComercial" 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Contato Técnico
                        </label>
                        <input
                            style={{width: "310px"}}
                            type="text"
                            id="contTecnico" 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Coord.Projeto
                        </label>
                        <input
                            style={{width: "310px"}}
                            type="text"
                            id="coordProjeto" 
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.grupoC}>
                        <label className={styles.label}>
                            Coord. Engenharia
                        </label>
                        <input
                            style={{width: "310px"}}
                            type="text"
                            id="coordEngenharia" 
                            className={styles.input}
                        />
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
                                    id="sepTMSA" 
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.grupoC}>
                                <label className={styles.label}>
                                    Cliente-Ref
                                </label>
                                <input
                                    style={{width: "180px"}}
                                    type="text"
                                    id="sepCli" 
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.grupoC}>
                                <label className={styles.label}>
                                    Cliente-Emiss
                                </label>
                                <input
                                    style={{width: "180px"}}
                                    type="text"
                                    id="sepCE" 
                                    className={styles.input}
                                />
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
                                    id="sepTMSA" 
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.grupoC}>
                                <label className={styles.label}>
                                    Cliente-Ref
                                </label>
                                <input
                                    style={{width: "180px"}}
                                    type="text"
                                    id="sepCli" 
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.grupoC}>
                                <label className={styles.label}>
                                    Cliente-Emiss
                                </label>
                                <input
                                    style={{width: "180px"}}
                                    type="text"
                                    id="sepCE" 
                                    className={styles.input}
                                />
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
                                />
                            </div>
                        </div>
                    </div>
                {/* GRUPO 10 */}
                <div className={styles.grupoR} style={{marginTop: "30px"}}>
                    <Button>
                        Enviar<FaPaperPlane className={LocalStyle.iconeBotao} />
                    </Button>
                    <Button>
                        Cancelar<FaRegWindowClose className={LocalStyle.iconeBotao} />
                    </Button>
                </div>

            </div>
        </div>
        </>
    )
}